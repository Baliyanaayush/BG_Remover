import React, { useState } from "react";
import { useAuth, useUser } from "@clerk/react";
import { useDispatch } from "react-redux";
import { getCredit } from "../AuthSlice";
import axiosClient from "../utils/axiosClient";

const plans = [
  {
    id: "basic",
    name: "Basic",
    credits: 10,
    price: 49,
  },
  {
    id: "standard",
    name: "Standard",
    credits: 50,
    price: 199,
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    credits: 120,
    price: 399,
  },
];

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

const BuyCredits = () => {
  const { getToken, isSignedIn } = useAuth();
  const { user } = useUser();

  const dispatch = useDispatch();

  const [loadingPlan, setLoadingPlan] = useState(null);

  const handlePurchase = async (plan) => {
    try {
      if (!isSignedIn) {
        alert("Please login first.");
        return;
      }

      setLoadingPlan(plan.id);

      // --------------------------------------
      // Load Razorpay Checkout
      // --------------------------------------

      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Razorpay failed to load.");
        return;
      }

      // --------------------------------------
      // Clerk token
      // --------------------------------------

      const token = await getToken();

      // --------------------------------------
      // Create order on backend
      // --------------------------------------

      const { data } = await axiosClient.post(
        "/user/create-order",
        {
          planId: plan.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!data.success) {
        throw new Error(
          data.message || "Unable to create order"
        );
      }

      // --------------------------------------
      // Razorpay Checkout
      // --------------------------------------

      const options = {
        key: data.key,

        amount: data.order.amount,

        currency: data.order.currency,

        name: "BG Remover",

        description: `${plan.credits} image credits`,

        order_id: data.order.id,

        prefill: {
          name: user?.fullName || "",
          email: user?.primaryEmailAddress?.emailAddress || "",
        },

        theme: {
          color: "#5F6FFF",
        },

        handler: async function (response) {
          try {
            // --------------------------------
            // Verify payment on backend
            // --------------------------------

            const verifyResponse =
              await axiosClient.post(
                "/user/verify-payment",
                {
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

            if (!verifyResponse.data.success) {
              throw new Error(
                verifyResponse.data.message ||
                  "Payment verification failed"
              );
            }

            // Refresh credits
            dispatch(getCredit(getToken));

            alert(
              `${verifyResponse.data.creditsAdded} credits added successfully!`
            );

          } catch (error) {
            console.error(
              "Payment verification error:",
              error
            );

            alert(
              error.response?.data?.message ||
                error.message ||
                "Payment verification failed"
            );
          } finally {
            setLoadingPlan(null);
          }
        },

        modal: {
          ondismiss: () => {
            setLoadingPlan(null);
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment failed:",
            response.error
          );

          alert(
            response.error?.description ||
              "Payment failed"
          );

          setLoadingPlan(null);
        }
      );

      razorpay.open();

    } catch (error) {
      console.error(
        "Create payment error:",
        error
      );

      alert(
        error.response?.data?.message ||
          error.message ||
          "Unable to start payment"
      );

      setLoadingPlan(null);
    }
  };

  return (
    <div className="min-h-[80vh] px-6 py-16">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Buy Credits
          </h1>

          <p className="mt-4 text-slate-500">
            Choose a credit plan and keep removing backgrounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`
                relative
                rounded-2xl
                border
                p-8
                bg-white
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-lg
                ${
                  plan.popular
                    ? "border-purple-300 ring-2 ring-purple-100"
                    : "border-slate-200"
                }
              `}
            >

              {plan.popular && (
                <div className="
                  absolute
                  -top-3
                  left-1/2
                  -translate-x-1/2
                  px-4
                  py-1
                  rounded-full
                  bg-purple-600
                  text-white
                  text-xs
                  font-semibold
                ">
                  Most Popular
                </div>
              )}

              <h2 className="text-xl font-bold text-slate-900">
                {plan.name}
              </h2>

              <p className="mt-4 text-4xl font-bold text-slate-900">
                ₹{plan.price}
              </p>

              <p className="mt-2 text-slate-500">
                {plan.credits} credits
              </p>

              <button
                onClick={() => handlePurchase(plan)}
                disabled={loadingPlan === plan.id}
                className="
                  w-full
                  mt-8
                  py-3
                  rounded-xl
                  bg-slate-900
                  text-white
                  font-medium
                  hover:bg-slate-800
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {loadingPlan === plan.id
                  ? "Processing..."
                  : "Buy Now"}
              </button>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default BuyCredits;


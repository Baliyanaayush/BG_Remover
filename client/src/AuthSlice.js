import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "./utils/axiosClient";

// ==========================================
// GET USER CREDITS
// ==========================================

export const getCredit = createAsyncThunk(
  "/user/credits",

  async (getToken, { rejectWithValue }) => {
    try {
      const token = await getToken();

      const { data } = await axiosClient.get("/user/credits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      console.log(
        "CREDIT ERROR:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        }
      );
    }
  }
);


// ==========================================
// REMOVE BACKGROUND
// ==========================================

export const removeBackground = createAsyncThunk(
  "/user/remove-bg",

  async ({ file, getToken }, { rejectWithValue }) => {
    try {
      const token = await getToken();

      const formData = new FormData();

      formData.append("image", file);

      const response = await axiosClient.post(
        "/user/remove-bg",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      // Convert Blob to object URL
      const imageUrl = URL.createObjectURL(response.data);

      // Return serializable string
      return imageUrl;

    } catch (error) {
      let message = "Failed to remove background";

      // Because responseType is blob,
      // backend errors may also be Blob
      if (error.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text();

          try {
            const parsed = JSON.parse(text);
            message = parsed.message || message;
          } catch {
            message = text || message;
          }
        } catch {
          message = "Server error";
        }
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }

      console.error("REMOVE BACKGROUND ERROR:", message);

      return rejectWithValue({
        message,
      });
    }
  }
);


// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

export const createOrder = createAsyncThunk(
  "/user/create-order",

  async ({ planId, getToken }, { rejectWithValue }) => {
    try {
      const token = await getToken();

      const { data } = await axiosClient.post(
        "/user/create-order",
        {
          planId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!data.success) {
        return rejectWithValue({
          message: data.message || "Unable to create order",
        });
      }

      return data;

    } catch (error) {
      console.error(
        "CREATE ORDER ERROR:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        }
      );
    }
  }
);


// ==========================================
// VERIFY RAZORPAY PAYMENT
// ==========================================

export const verifyPayment = createAsyncThunk(
  "/user/verify-payment",

  async (
    {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      getToken,
    },
    { rejectWithValue }
  ) => {
    try {
      const token = await getToken();

      const { data } = await axiosClient.post(
        "/user/verify-payment",
        {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!data.success) {
        return rejectWithValue({
          message:
            data.message || "Payment verification failed",
        });
      }

      return data;

    } catch (error) {
      console.error(
        "VERIFY PAYMENT ERROR:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        }
      );
    }
  }
);


// ==========================================
// SLICE
// ==========================================

const creditSlice = createSlice({
  name: "credit",

  initialState: {
    // -------------------------------
    // Credits
    // -------------------------------
    creditBalance: 0,
    loading: false,
    error: null,

    // -------------------------------
    // Background removal
    // -------------------------------
    removeBgLoading: false,
    removeBgError: null,
    resultImage: null,

    // -------------------------------
    // Payment
    // -------------------------------
    paymentLoading: false,
    paymentError: null,
    paymentSuccess: false,

    lastPayment: null,
  },

  reducers: {
    clearResult: (state) => {
      state.resultImage = null;
      state.removeBgError = null;
    },

    clearPaymentState: (state) => {
      state.paymentLoading = false;
      state.paymentError = null;
      state.paymentSuccess = false;
      state.lastPayment = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================================
      // GET CREDIT
      // =====================================

      .addCase(getCredit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCredit.fulfilled, (state, action) => {
        state.loading = false;

        state.creditBalance =
          action.payload.creditBalance;
      })

      .addCase(getCredit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // =====================================
      // REMOVE BACKGROUND
      // =====================================

      .addCase(removeBackground.pending, (state) => {
        state.removeBgLoading = true;
        state.removeBgError = null;
        state.resultImage = null;
      })

      .addCase(removeBackground.fulfilled, (state, action) => {
        state.removeBgLoading = false;

        // String URL — safe for Redux
        state.resultImage = action.payload;
      })

      .addCase(removeBackground.rejected, (state, action) => {
        state.removeBgLoading = false;
        state.removeBgError = action.payload;
      })


      // =====================================
      // CREATE ORDER
      // =====================================

      .addCase(createOrder.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
        state.paymentSuccess = false;
      })

      .addCase(createOrder.fulfilled, (state) => {
        // Razorpay checkout opens after this,
        // so keep loading state available.
        state.paymentLoading = false;
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload;
      })


      // =====================================
      // VERIFY PAYMENT
      // =====================================

      .addCase(verifyPayment.pending, (state) => {
        state.paymentLoading = true;
        state.paymentError = null;
        state.paymentSuccess = false;
      })

      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.paymentLoading = false;
        state.paymentSuccess = true;

        state.lastPayment = {
          creditsAdded: action.payload.creditsAdded,
          creditBalance: action.payload.creditBalance,
        };

        // Immediately reflect returned balance
        if (
          typeof action.payload.creditBalance ===
          "number"
        ) {
          state.creditBalance =
            action.payload.creditBalance;
        }
      })

      .addCase(verifyPayment.rejected, (state, action) => {
        state.paymentLoading = false;
        state.paymentError = action.payload;
      });
  },
});

export const {
  clearResult,
  clearPaymentState,
} = creditSlice.actions;

export default creditSlice.reducer;


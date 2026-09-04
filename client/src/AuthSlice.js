
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

      // Create browser URL from successful image Blob
      const imageUrl = URL.createObjectURL(response.data);

      // Return only serializable string
      return imageUrl;

    } catch (error) {
      let errorMessage = "Failed to remove background";

      // Because responseType is "blob", backend errors
      // also arrive as Blob
      if (error.response?.data instanceof Blob) {
        try {
          const text = await error.response.data.text();

          try {
            const parsed = JSON.parse(text);

            errorMessage =
              parsed.message || errorMessage;
          } catch {
            errorMessage = text || errorMessage;
          }
        } catch {
          errorMessage = "Server error";
        }
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (typeof error.response?.data === "string") {
        errorMessage = error.response.data;
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error(
        "REMOVE BACKGROUND ERROR:",
        errorMessage
      );

      return rejectWithValue({
        message: errorMessage,
      });
    }
  }
);


// ==========================================
// SLICE
// ==========================================

const creditSlice = createSlice({
  name: "credit",

  initialState: {
    creditBalance: 0,

    loading: false,
    error: null,

    removeBgLoading: false,
    removeBgError: null,

    // URL string, not Blob
    resultImage: null,
  },

  reducers: {
    clearResult: (state) => {
      state.resultImage = null;
      state.removeBgError = null;
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
        state.creditBalance = action.payload.creditBalance;
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

        // This is a string, so Redux is happy
        state.resultImage = action.payload;
      })

      .addCase(removeBackground.rejected, (state, action) => {
        state.removeBgLoading = false;
        state.removeBgError = action.payload;
      });
  },
});

export const { clearResult } = creditSlice.actions;

export default creditSlice.reducer;

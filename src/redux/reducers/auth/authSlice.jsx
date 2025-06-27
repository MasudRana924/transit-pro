import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privateGet, publicPost } from "../../../api/index";

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  verificationEmail: localStorage.getItem("verificationEmail") || null,
  otpSent: false,
  resendOtpSent: false,
  resendOtpSentLoading: false,
  verifiedSuccess: false,
  bookingsLoading:false,
  bookingsError:false,
  bookings:{}
};

// Async thunks
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await publicPost("/api/register", userData);
      console.log('Setting email to localStorage:', userData.email);
      localStorage.setItem("verificationEmail", userData.email);
      console.log('Current localStorage:', localStorage.getItem("verificationEmail"));
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (otpData, { rejectWithValue }) => {
    try {
      const email = localStorage.getItem("verificationEmail");
      if (!email) {
        throw new Error("No email found for verification");
      }

      const response = await publicPost("/api/verify-otp", {
        email,
        otp: otpData.otp
      });

      // Clear verification email from storage after successful verification
      localStorage.removeItem("verificationEmail");
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (_, { rejectWithValue }) => {
    try {
      const email = localStorage.getItem("verificationEmail");
      if (!email) {
        throw new Error("No email found for verification");
      }

      const response = await publicPost("/api/resend-otp", { email });
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await publicPost("/api/login", credentials);
      localStorage.setItem("token", response.token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getUserBookings = createAsyncThunk(
  "auth/getUserBookings",
  async (token, { rejectWithValue }) => {
    try {
       console.log("user bokkings response",token);
      const response = await privateGet("/api/user/bookings", token);
      console.log("user bokkings response",response);
     
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || { error: "Something went wrong" });
    }
  }
);
// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
    clearVerification: (state) => {
      state.otpSent = false;
      state.resendOtpSent = false;
      state.verifiedSuccess = false;
      state.resendOtpSentLoading = false;
    },
    clearBookingState:(state)=>{
      state.bookingsLoading=false;
      state.bookingsError=false
    }
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.otpSent = true;
        state.verificationEmail = localStorage.getItem("verificationEmail");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Registration failed";
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        state.otpSent = false;
        state.verificationEmail = null;
        state.verifiedSuccess = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "OTP verification failed";
      })
      // Resend OTP
      .addCase(resendOtp.pending, (state) => {
        state.resendOtpSentLoading = true;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.resendOtpSentLoading = false;
        state.error = null;
        state.resendOtpSent = true;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.resendOtpSentLoading = false;
        state.error = action.payload?.error || "Failed to resend OTP";
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Login failed";
      })
      .addCase(getUserBookings.pending, (state) => {
        state.bookingsLoading = true;
        state.bookingsError = null;
      })
      .addCase(getUserBookings.fulfilled, (state, action) => {
        state.bookingsLoading = false;
          state.bookingsLoading = false;
  console.log("Full action:", action);
  console.log("Payload:", action.payload);
  state.bookings = action.payload;
      })
      .addCase(getUserBookings.rejected, (state, action) => {
        state.bookingsLoading = false;
        state.bookingsError = action.payload?.error || "Failed to fetch bookings";
      });
  },
});

export const { logout, clearError, clearVerification } = authSlice.actions;
export default authSlice.reducer;
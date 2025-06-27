// src/features/bookings/bookingsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { privatePost, publicPost } from "../../../api";

// Initial state
const initialState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null,
  isBookingtTrue:false
};

// Async thunk for booking seats
export const bookSeats = createAsyncThunk(
  "bookings/bookSeats",
  async ({ busId, seatIds, token }, { rejectWithValue }) => {
    console.log("Booking seats",seatIds)
    try {
      const endpoint = `/api/buses/${busId}/seats/book`;
      const response = await privatePost(endpoint, token, { seatIds })
      
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice definition
const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
      state.isBookingtTrue = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookSeats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bookSeats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentBooking = action.payload;
        state.isBookingtTrue = true;
        state.error = null;
      })
      .addCase(bookSeats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.error || "Failed to book seats";
      });
  },
});

// Export actions and reducer
export const { clearCurrentBooking, clearError } = bookingsSlice.actions;
export default bookingsSlice.reducer;

// src/features/buses/busesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicGet, privatePost, publicPost } from "../../../api";

// Initial state
const initialState = {
  buses: [],
  selectedBus: null,
  isLoading: false,
  errorr: null,
  isBusFetched:false,
  bus:null
};

// Async thunks
export const fetchBuses = createAsyncThunk(
  "buses/fetchBuses",
  async (searchParams, { rejectWithValue }) => {
    try {
      const { from, to,date } = searchParams;
      const response = await publicGet(`/api/buses?from=${from}&to=${to}&date=${date}`);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBusDetails = createAsyncThunk(
  "buses/fetchBusDetails",
  async (busId, { rejectWithValue }) => {
    try {
      const response = await publicGet(`/api/buses/${busId}`);
      return { busId, seats: response.seats };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBus = createAsyncThunk(
  "buses/createBus",
  async ({ busData, token }, { rejectWithValue }) => {
    try {
      const response = await privatePost("/api/buses", token, busData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const holdSeat = createAsyncThunk(
  "buses/holdSeat",
  async ({ busId, seatId }, { rejectWithValue }) => {
    try {
      const response = await publicPost(
        `/api/buses/${busId}/seats/${seatId}/hold`
      );
      return { busId, seatId, holdUntil: response.holdUntil };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const busesSlice = createSlice({
  name: "buses",
  initialState,
  reducers: {
    clearSelectedBus: (state) => {
      state.selectedBus = null;
    },
    clearError: (state) => {
      state.errorr = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuses.pending, (state) => {
        state.isLoading = true;
          state.isBusFetched=false
      })
      .addCase(fetchBuses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.buses = action.payload;
        state.isBusFetched=true
        state.errorr = null;
      })
      .addCase(fetchBuses.rejected, (state, action) => {
        state.isLoading = false;
        state.errorr = action.payload?.error || "Failed to fetch buses";
        state.isBusFetched=false
      })
      .addCase(fetchBusDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBusDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bus = action.payload;
        state.errorr = null;
      })
      .addCase(fetchBusDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.errorr = action.payload?.error || "Failed to fetch bus details";
      })
      .addCase(createBus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.buses.push(action.payload);
        state.errorr = null;
      })
      .addCase(createBus.rejected, (state, action) => {
        state.isLoading = false;
        state.errorr = action.payload?.error || "Failed to create bus";
      })
      .addCase(holdSeat.fulfilled, (state, action) => {
        const { busId, seatId, holdUntil } = action.payload;
        if (state.selectedBus && state.selectedBus.id === busId) {
          const seat = state.selectedBus.seats.find(
            (s) => s.seatId === seatId
          );
          if (seat) {
            seat.holdUntil = holdUntil;
          }
        }
      });
  },
});

// Exports
export const { clearSelectedBus, clearError } = busesSlice.actions;
export default busesSlice.reducer;

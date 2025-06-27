import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from 'redux-logger';
import authSlice from "./reducers/auth/authSlice";
import busesReducer from "./reducers/bus/busesSlice";
import bookingsReducer from "./reducers/booking/bookingsSlice";
const persistConfig = {
  key: "authentication",
  storage,
};
const persistedReducer = persistReducer(persistConfig,authSlice);
const combinedReducer = {
  user: persistedReducer,
 buses: busesReducer,
    bookings: bookingsReducer,
};
const middlewares = [];
if (process.env.NODE_ENV === "development") {
  // const { logger } = require("redux-logger");
  middlewares.push(logger);
}
export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: true,
});
export const persistor = persistStore(store);
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./services/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

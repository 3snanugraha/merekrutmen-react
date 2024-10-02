import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import userReducer from './userSlice';

export default store = configureStore({
  reducer: {
    user: userSlice,
    user: userReducer,
  },
});

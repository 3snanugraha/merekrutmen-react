import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userData: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthentication(state, action) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action) {
      state.userData = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setIsAuthentication, setUser, setError } = userSlice.actions;

export default userSlice.reducer;
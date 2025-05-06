// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // currentUser: { name, email, role } or null
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // payload: { name, email, role }
    login: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    // payload: { name, email, role }
    register: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
  },
});

export const { login, logout, register } = userSlice.actions;
export default userSlice.reducer;

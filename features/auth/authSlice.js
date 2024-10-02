
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:3001/signin', { email, password });
    const { token } = res.data;

    dispatch(loginSuccess({ user: { email }, token }));
    localStorage.setItem('token', token);
  } catch (error) {
    console.error('Error logging in', error);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(logout());
};

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;

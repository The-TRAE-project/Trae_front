import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import instance from '../../../config/axiosConfig';

import { InitialState, LoginFormValue, TokenValue } from './types';

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: 'idle',
  accessToken: null,
  refreshToken: null,
} as InitialState;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (value: LoginFormValue, { rejectWithValue }) => {
    try {
      const response = await instance.post('/auth/login', { value });

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await instance.post(`/auth/logout${name}`);

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        if (state.isLoading === 'idle') {
          state.isLoading = 'pending';
        }
      })
      .addCase(
        loginUser.fulfilled,
        (state, { payload }: PayloadAction<TokenValue>) => {
          if (state.isLoading === 'pending') {
            state.isLoading = 'idle';
            state.isLoggedIn = !!payload.accessToken;
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
          }
        }
      )
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.accessToken = null;
        state.refreshToken = null;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = authSlice.actions;
export default authSlice.reducer;

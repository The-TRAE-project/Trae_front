import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { InitialState } from './types';

const initialState = {
  isLoggedIn: false,
  employee: {},
  isLoading: 'idle',
  error: {},
} as InitialState;

export const loginEmployee = createAsyncThunk(
  'employee/login',
  // eslint-disable-next-line consistent-return
  async (pinCode: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACK_API_URL}/employee/checkin/${pinCode}`
      );

      // if (!response.statusText) {
      //   throw new Error('Server Error!');
      // }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const employee = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginEmployee.pending, (state) => {
        if (state.isLoading === 'idle') {
          state.isLoading = 'pending';
        }
      })
      .addCase(loginEmployee.fulfilled, (state, action) => {
        if (state.isLoading === 'pending') {
          state.isLoading = 'idle';
          state.employee = action.payload;
          state.isLoggedIn = !!action.payload;
        }
      })
      .addCase(loginEmployee.rejected, (state, action) => {
        if (state.isLoading === 'pending') {
          state.isLoading = 'idle';
          state.error = action.error;
        }
      });
  },
});

export default employee.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { InitialState } from './types';

const initialState = {
  isLoggedIn: false,
  employee: null,
  isLoading: 'idle',
  error: {},
} as InitialState;

export const getEmployee = createAsyncThunk(
  'employee/getEmployee',
  async (pinCode: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACK_API_URL}/employee/checkin/${pinCode}`
      );

      if (response.status !== 200) {
        throw new Error('Server Error!');
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    logOut(state) {
      state.employee = null;
      state.isLoggedIn = false;
    },
    logIn(state, payload) {
      state.isLoggedIn = !!payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployee.pending, (state) => {
        if (state.isLoading === 'idle') {
          state.isLoading = 'pending';
        }
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        if (state.isLoading === 'pending') {
          state.isLoading = 'idle';
          state.employee = action.payload;
        }
      })
      .addCase(getEmployee.rejected, (state, action) => {
        if (state.isLoading === 'pending') {
          state.isLoading = 'idle';
          state.error = action.error;
        }
      });
  },
});

export const { logOut, logIn } = employeeSlice.actions;
export default employeeSlice.reducer;

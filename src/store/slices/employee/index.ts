import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import instance from '../../../config/axiosConfig';

import { InitialState } from './types';

const initialState = {
  isLoggedIn: false,
  employee: null,
  isLoading: 'idle',
  isError: false,
  error: null,
  isModalOpen: false,
} as InitialState;

export const loginEmployee = createAsyncThunk(
  'employee/loginEmployee',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/employee/checkin/${id}`);

      if (response.status === 404) {
        throw new Error(response.data.error);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutEmployee = createAsyncThunk(
  'employee/logoutEmployee',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/employee/checkout/${id}`);

      if (response.status === 404) {
        throw new Error(response.data.error);
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
    toggleModal(state, action) {
      state.isModalOpen = action.payload;
    },
    login(state, action) {
      state.employee = action.payload;
      state.isLoggedIn = !!action.payload;
    },
  },
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
      .addCase(logoutEmployee.fulfilled, (state) => {
        state.employee = null;
        state.isLoggedIn = false;
      });
  },
});

export const { toggleModal, login } = employeeSlice.actions;
export default employeeSlice.reducer;

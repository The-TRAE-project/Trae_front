import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import instance from '../../../config/axiosConfig';
import { InitialState } from './types';

const initialState = {
  isLoggedIn: false,
  employee: null,
  isLoading: 'idle',
  isModalOpen: false,
  employeeToEdit: null,
} as InitialState;

export const loginEmployee = createAsyncThunk(
  'employee/loginEmployee',
  // eslint-disable-next-line consistent-return
  async (id: number, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.accessToken;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (token) {
        const response = await instance.post(
          `/employee/checkin/${id}`,
          {},
          config
        );

        return response.data;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutEmployee = createAsyncThunk(
  'employee/logoutEmployee',
  // eslint-disable-next-line consistent-return
  async (id: number, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.accessToken;

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (token) {
        const response = await instance.post(
          `/employee/checkout/${id}`,
          {},
          config
        );

        return response.data;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
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
    logOutEmployee(state) {
      state.employee = null;
      state.isLoggedIn = false;
      state.isModalOpen = false;
      state.employeeToEdit = null;
    },
    setEmployee(state, action) {
      state.employeeToEdit = action.payload;
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

export const { toggleModal, login, logOutEmployee, setEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;

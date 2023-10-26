import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import Cookies from 'js-cookie';
import instance from '../../../config/axiosConfig';
import { InitialState } from './types';
import { TokenTypes } from '../../../helpers/hooks/useCookies';

const initialState = {
  isLoggedIn: false,
  employee: null,
  isLoading: 'idle',
  isModalOpen: false,
  employeeToEdit: null,
  projectNumber: null,
  timer: 60 * 2,
} as InitialState;

export const loginEmployee = createAsyncThunk(
  'employee/loginEmployee',
  async (id: number, { rejectWithValue }) => {
    try {
      const token = Cookies.get(TokenTypes.ACCESS_TOKEN);

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
      throw new Error('No access token');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutEmployee = createAsyncThunk(
  'employee/logoutEmployee',
  // eslint-disable-next-line consistent-return
  async (id: number, { rejectWithValue }) => {
    try {
      const token = Cookies.get(TokenTypes.ACCESS_TOKEN);

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
      throw new Error('No access token');
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
    setEmployeeCredentials(state, action) {
      state.employee = action.payload;
      state.isLoggedIn = !!action.payload;
      state.timer = 121;
    },
    clearEmployeeState(state) {
      state.timer = 0;
      state.employee = null;
      state.isLoggedIn = false;
      state.isModalOpen = false;
      state.employeeToEdit = null;
      state.projectNumber = null;
    },
    setEmployeeToEdit(state, action) {
      state.employeeToEdit = action.payload;
    },
    setProjectNumber(state, action) {
      state.timer = 121;
      state.projectNumber = action.payload;
    },
    setTimer(state, action) {
      state.timer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginEmployee.pending, (state) => {
        if (state.isLoading === 'idle') {
          state.isLoading = 'pending';
        }
      })
      .addCase(loginEmployee.fulfilled, (state) => {
        if (state.isLoading === 'pending') {
          state.isLoading = 'idle';
        }
      })
      .addCase(logoutEmployee.fulfilled, (state) => {
        state.employee = null;
        state.isLoggedIn = false;
      });
  },
});

export const {
  toggleModal,
  setEmployeeCredentials,
  clearEmployeeState,
  setEmployeeToEdit,
  setProjectNumber,
  setTimer,
} = employeeSlice.actions;
export default employeeSlice.reducer;

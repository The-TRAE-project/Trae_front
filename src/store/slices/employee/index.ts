import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import Cookies from 'js-cookie';
import axios from 'axios';
import instance from '../../../config/axiosConfig';
import { InitialState } from './types';
import { TokenTypes } from '../../../helpers/hooks/useCookies';
import { TokenValue } from '../auth/types';
import { isRefreshTokenNearExpiration } from '../../../helpers/isRefreshTokenNearExpiration';
import { RequestHeader } from '../../../constants/requestHeader';

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
  // eslint-disable-next-line consistent-return
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
      throw new Error('no access token');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.message === 'no access token' ||
        error.response.data.status === 401
      ) {
        const refreshToken = Cookies.get(TokenTypes.REFRESH_TOKEN);
        const accessResponse = await axios({
          method: 'post',
          url: `${import.meta.env.VITE_BACK_API_URL}/auth/token`,
          headers: {},
          data: {
            refreshToken,
          },
        });

        if (accessResponse?.data) {
          const { accessToken } = accessResponse.data as TokenValue;
          Cookies.set(TokenTypes.ACCESS_TOKEN, accessToken);

          if (isRefreshTokenNearExpiration()) {
            const refreshResponse = await axios({
              method: 'post',
              url: `${import.meta.env.VITE_BACK_API_URL}/auth/refresh`,
              headers: {
                Authorization: RequestHeader.AUTHORIZATION_PREFIX + accessToken,
              },
              data: {
                refreshToken,
              },
            });

            const { refreshToken: newRefreshToken } =
              refreshResponse.data as TokenValue;
            Cookies.set(TokenTypes.REFRESH_TOKEN, newRefreshToken);
          }

          const config = {
            headers: { Authorization: `Bearer ${accessToken}` },
          };

          const response = await instance.post(
            `/employee/checkin/${id}`,
            {},
            config
          );
          return response.data;
        }
      }
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
      throw new Error('no access token');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (
        error.message === 'no access token' ||
        error.response.data.status === 401
      ) {
        const refreshToken = Cookies.get(TokenTypes.REFRESH_TOKEN);
        const accessResponse = await axios({
          method: 'post',
          url: `${import.meta.env.VITE_BACK_API_URL}/auth/token`,
          headers: {},
          data: {
            refreshToken,
          },
        });

        if (accessResponse?.data) {
          const { accessToken } = accessResponse.data as TokenValue;
          Cookies.set(TokenTypes.ACCESS_TOKEN, accessToken);

          if (isRefreshTokenNearExpiration()) {
            const refreshResponse = await axios({
              method: 'post',
              url: `${import.meta.env.VITE_BACK_API_URL}/auth/refresh`,
              headers: {
                Authorization: RequestHeader.AUTHORIZATION_PREFIX + accessToken,
              },
              data: {
                refreshToken,
              },
            });

            const { refreshToken: newRefreshToken } =
              refreshResponse.data as TokenValue;
            Cookies.set(TokenTypes.REFRESH_TOKEN, newRefreshToken);
          }

          const config = {
            headers: { Authorization: `Bearer ${accessToken}` },
          };

          const response = await instance.post(
            `/employee/checkout/${id}`,
            {},
            config
          );
          return response.data;
        }
      }
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

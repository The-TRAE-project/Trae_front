// TODO:
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../..';

import instance from '../../../config/axiosConfig';

import {
  InitialState,
  LoginFormValues,
  Response,
  Roles,
  TokenValue,
} from './types';

const initialState = {
  user: null,
  permission: null,
  isLoggedIn: false,
  isLoading: 'idle',
  accessToken: null,
  refreshToken: null,
} as InitialState;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (value: LoginFormValues, { rejectWithValue }) => {
    try {
      const response = await instance.post<
        LoginFormValues,
        Response<TokenValue>
      >('/auth/login', value);

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  // eslint-disable-next-line consistent-return
  async (name: string, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.accessToken;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (token) {
        const response = await instance.post(`/auth/logout${name}`, {}, config);

        return response.data;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserRole = createAsyncThunk(
  'auth/getUserRole',
  async (name: string, { rejectWithValue, getState }) => {
    try {
      const token = (getState() as RootState).auth.accessToken;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const response = await instance.get<string, Response<Roles>>(
        `/manager/role?name=${name}`,
        config
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refresh = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { accessToken, refreshToken } = (getState() as RootState).auth;
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const response = await instance.post(
        'auth/token',
        { refreshToken }
        // config
      );

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
      })
      // TODO:
      .addCase(getUserRole.fulfilled, (state, action) => {
        state.permission = action.payload;
      })
      .addCase(
        refresh.fulfilled,
        (state, { payload }: PayloadAction<TokenValue>) => {
          state.isLoggedIn = !!payload.accessToken;
          state.accessToken = payload.accessToken;
          state.refreshToken = payload.refreshToken;
        }
      );
  },
});

export default authSlice.reducer;

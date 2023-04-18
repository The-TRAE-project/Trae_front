import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import instance from '../../../config/axiosConfig';
import { RootState } from '../..';
import {
  InitialState,
  LoginFormValues,
  Response,
  Roles,
  TokenValue,
  UserRoleValues,
} from './types';

const initialState = {
  username: null,
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
  async (_, { rejectWithValue, getState }) => {
    try {
      const { accessToken } = (getState() as RootState).auth;
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
      };

      const response = await instance.delete('/auth/logout', config);

      return response.data;
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

      const { data } = await instance.get<string, Response<Roles>>(
        `/manager/role?name=${name}`,
        config
      );

      return { permission: data, username: name };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getNewTokens = createAsyncThunk(
  'auth/getNewTokens',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { refreshToken } = (getState() as RootState).auth;

      const { data } = await instance.post(`/auth/token`, { refreshToken });

      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, { payload }: PayloadAction<TokenValue>) => {
      state.isLoggedIn = !!payload.accessToken;
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
    },
    clearUserState: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.username = null;
      state.permission = null;
    },
  },
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
        state.username = null;
        state.permission = null;
      })
      // TODO:
      .addCase(
        getUserRole.fulfilled,
        (state, { payload }: PayloadAction<UserRoleValues>) => {
          state.permission = payload.permission;
          state.username = payload.username;
        }
      )
      .addCase(
        getNewTokens.fulfilled,
        (state, { payload }: PayloadAction<TokenValue>) => {
          state.isLoggedIn = !!payload.accessToken;
          state.accessToken = payload.accessToken;
          state.refreshToken = payload.refreshToken;
        }
      );
  },
});

export const { setCredentials, clearUserState } = authSlice.actions;
export default authSlice.reducer;

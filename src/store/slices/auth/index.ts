import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import instance from '../../../config/axiosConfig';
import {
  ACCESS_TOKEN_EXPIRATION,
  REFRESH_TOKEN_EXPIRATION,
  TokenTypes,
} from '../../../helpers/hooks/useCookies';
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
  isLoggedIn: !!Cookies.get(TokenTypes.ACCESS_TOKEN),
  isLoading: 'idle',
  accessToken: Cookies.get(TokenTypes.ACCESS_TOKEN),
  refreshToken: Cookies.get(TokenTypes.REFRESH_TOKEN),
} as InitialState;

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (value: LoginFormValues, { rejectWithValue }) => {
    try {
      const response = await instance.post<
        LoginFormValues,
        Response<TokenValue>
      >('/auth/login', value);

      if (response.data) {
        Cookies.set(TokenTypes.ACCESS_TOKEN, response.data.accessToken, {
          expires: ACCESS_TOKEN_EXPIRATION,
        });
        Cookies.set(TokenTypes.REFRESH_TOKEN, response.data.refreshToken, {
          expires: REFRESH_TOKEN_EXPIRATION,
        });
      }

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = Cookies.get(TokenTypes.ACCESS_TOKEN);
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
  async (name: string, { rejectWithValue }) => {
    try {
      const accessToken = Cookies.get(TokenTypes.ACCESS_TOKEN);

      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
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

export const getNewRefreshToken = createAsyncThunk(
  'auth/getNewRefreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = Cookies.get(TokenTypes.ACCESS_TOKEN);
      const refreshToken = Cookies.get(TokenTypes.REFRESH_TOKEN);
      const config = {
        headers: { Authorization: `Bearer ${accessToken}` },
        refreshToken,
      };

      const { data } = await instance.post(`/auth/refresh`, config);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getNewAccessToken = createAsyncThunk(
  'auth/getNewAccessToken',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = Cookies.get(TokenTypes.REFRESH_TOKEN);

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
            state.accessToken = Cookies.get(TokenTypes.ACCESS_TOKEN) as string;
            state.isLoggedIn = !!Cookies.get(TokenTypes.ACCESS_TOKEN);
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
      // TODO: add roles to prevent admin unlogin
      .addCase(
        getUserRole.fulfilled,
        (state, { payload }: PayloadAction<UserRoleValues>) => {
          state.permission = payload.permission;
          state.username = payload.username;
        }
      )
      .addCase(
        getNewAccessToken.fulfilled,
        (state, { payload }: PayloadAction<TokenValue>) => {
          state.isLoggedIn = !!payload.accessToken;
          state.accessToken = payload.accessToken;
          state.refreshToken = payload.refreshToken;
        }
      )
      .addCase(
        getNewRefreshToken.fulfilled,
        (state, { payload }: PayloadAction<TokenValue>) => {
          state.refreshToken = payload.refreshToken;
          state.accessToken = payload.accessToken;
        }
      );
  },
});

export const { setCredentials, clearUserState } = authSlice.actions;
export default authSlice.reducer;

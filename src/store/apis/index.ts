import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.PROD
      ? import.meta.env.VITE_BACK_PROD_API_URL
      : import.meta.env.VITE_BACK_DEV_API_URL,
    // baseUrl: 'http://195.80.51.155:8088/api',
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');

      return headers;
    },
  }),
  endpoints: () => ({}),
});

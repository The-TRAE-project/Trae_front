import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.PROD
      ? import.meta.env.VITE_BACK_API_URL
      : import.meta.env.VITE_BACK_API_URL,
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');

      return headers;
    },
  }),
  endpoints: () => ({}),
});

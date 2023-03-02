import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACK_API_URL,
    // mode: 'no-cors',
    // prepareHeaders: (headers) => {
    //   // If we have a token set in state, let's assume that we should be passing it.
    //   headers.set('Authorization', 'Bearer MY_TOKEN');
    //   console.log(headers);
    //   return headers;
    // },
  }),
  endpoints: () => ({}),
});

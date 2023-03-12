import { baseApi } from '..';

import {
  ManagerLoginValue,
  ManagerFormValue,
  ManagerChangeRoleValue,
  ManagerChangePasswordValue,
  Manager,
} from './types';

const managerTags = baseApi.enhanceEndpoints({
  addTagTypes: ['Manager'],
});

const managerApi = managerTags.injectEndpoints({
  endpoints: (build) => ({
    getManagerById: build.query<Manager, number>({
      query: (employeeId) => `/manager/${employeeId}`,
      providesTags: ['Manager'],
    }),

    createManager: build.mutation<ManagerLoginValue, ManagerFormValue>({
      query(body) {
        return {
          url: '/manager/register',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Manager'],
    }),

    updateManager: build.mutation<void, ManagerFormValue>({
      query(body) {
        return {
          url: '/manager/update-data',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Manager'],
    }),

    resetManagerPassword: build.mutation<ManagerLoginValue, ManagerLoginValue>({
      query(body) {
        return {
          url: '/manager/reset-password',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Manager'],
    }),

    changeManagerRole: build.mutation<void, ManagerChangeRoleValue>({
      query(body) {
        return {
          url: '/manager/change-role',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Manager'],
    }),

    changeManagerPassword: build.mutation<void, ManagerChangePasswordValue>({
      query(body) {
        return {
          url: '/manager/change-password',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Manager'],
    }),

    activateManagerAccount: build.mutation<void, number>({
      query(managerId) {
        return {
          url: `/manager/activate-account/${managerId}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Manager'],
    }),

    deactivateManagerAccount: build.mutation<void, number>({
      query(managerId) {
        return {
          url: `/manager/deactivate-account/${managerId}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Manager'],
    }),
  }),
});

export const {
  useGetManagerByIdQuery,
  useCreateManagerMutation,
  useUpdateManagerMutation,
  useResetManagerPasswordMutation,
  useChangeManagerPasswordMutation,
  useChangeManagerRoleMutation,
  useActivateManagerAccountMutation,
  useDeactivateManagerAccountMutation,
} = managerApi;

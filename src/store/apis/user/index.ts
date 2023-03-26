import { baseApi } from '..';

import {
  ConstructorFormValues,
  ManagerLoginValue,
  ManagerFormValue,
  ManagerChangeRoleValue,
  ManagerChangePasswordValue,
  Manager,
  UserShortInfo,
  FilteredResponse,
  UserFilterValues,
} from './types';

const constructorTags = baseApi.enhanceEndpoints({
  addTagTypes: ['Manager', 'Constructor'],
});

const managerApi = constructorTags.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<
      FilteredResponse<UserShortInfo[]>,
      UserFilterValues
    >({
      query: (query) =>
        `/manager/managers?${query.elementPerPage}${query.role}${query.status}`,
      providesTags: ['Constructor'],
    }),

    createConstructor: build.mutation<ManagerLoginValue, ConstructorFormValues>(
      {
        query(body) {
          return {
            url: '/manager/register',
            method: 'POST',
            body,
          };
        },
        invalidatesTags: ['Constructor'],
      }
    ),

    getManagerById: build.query<Manager, number>({
      query: (employeeId) => `/manager/${employeeId}`,
      providesTags: ['Manager'],
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
  useGetAllUsersQuery,
  useGetManagerByIdQuery,
  useCreateConstructorMutation,
  useUpdateManagerMutation,
  useResetManagerPasswordMutation,
  useChangeManagerPasswordMutation,
  useChangeManagerRoleMutation,
  useActivateManagerAccountMutation,
  useDeactivateManagerAccountMutation,
} = managerApi;

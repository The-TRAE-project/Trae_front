import { baseApi } from '..';
import { Roles } from '../../slices/auth/types';
import {
  ConstructorFormValues,
  User,
  UserLoginValue,
  ManagerFormValue,
  ManagerChangePasswordValue,
  UserShortInfo,
  FilteredResponse,
  UserFilterValues,
  ResetPasswordReturnType,
  UserUpdateFormValues,
  UserUpdateReturnType,
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
        `/manager/managers?direction=asc${query.elementPerPage}${query.role}${query.status}${query.page}`,
      providesTags: ['Constructor'],
    }),

    createConstructor: build.mutation<UserLoginValue, ConstructorFormValues>({
      query(body) {
        return {
          url: '/manager/register',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Constructor'],
    }),

    getUserDetails: build.query<User, number>({
      query: (managerId) => `/manager/${managerId}`,
      providesTags: ['Constructor'],
    }),

    resetUserPassword: build.mutation<ResetPasswordReturnType, string>({
      query(query) {
        return {
          url: `/manager/reset-password?username=${query}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Constructor'],
    }),

    getAllRoles: build.query<Roles, void>({
      query: () => '/manager/roles',
    }),

    updateUserSomeFields: build.mutation<
      UserUpdateReturnType,
      UserUpdateFormValues
    >({
      query(body) {
        return {
          url: '/manager/change-role-status',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Constructor'],
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
  useCreateConstructorMutation,
  useGetUserDetailsQuery,
  useUpdateUserSomeFieldsMutation,
  useResetUserPasswordMutation,
  useGetAllRolesQuery,
  useUpdateManagerMutation,
  useChangeManagerPasswordMutation,
  useActivateManagerAccountMutation,
  useDeactivateManagerAccountMutation,
} = managerApi;

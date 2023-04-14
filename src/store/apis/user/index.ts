import { baseApi } from '..';
import { Roles } from '../../slices/auth/types';
import { FilteredResponse, FilterValues } from '../types';
import {
  ConstructorFormValues,
  User,
  UserLoginValue,
  UserShortInfo,
  ResetPasswordReturnType,
  UserUpdateFormValues,
  UserUpdateReturnType,
  UserEditReturnType,
  UserEditFormValues,
  UserAdditionalInfo,
} from './types';

const UserTags = baseApi.enhanceEndpoints({
  addTagTypes: ['Manager', 'Constructor', 'User'],
});

const userApi = UserTags.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<FilteredResponse<UserShortInfo[]>, FilterValues>({
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
      providesTags: ['Constructor', 'User'],
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

    editUser: build.mutation<UserEditReturnType, UserEditFormValues>({
      query(body) {
        return {
          url: `/manager/update-data?name=${body.username}`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['User'],
    }),

    getUserAdditionalInformation: build.query<UserAdditionalInfo, void>({
      query: () => '/manager/account-info',
      providesTags: ['User'],
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
  useEditUserMutation,
  useGetUserAdditionalInformationQuery,
} = userApi;

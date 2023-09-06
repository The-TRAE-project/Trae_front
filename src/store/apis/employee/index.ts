import { baseApi } from '..';
import { FilteredResponse, FilterValues } from '../types';
import {
  Employee,
  CreateEmployeeReturnType,
  EmployeeFormValues,
  EmployeeUpdateFormValues,
  EmployeesShortInfo,
  EmployeesShortInfoParams,
} from './types';

const employeeTags = baseApi.enhanceEndpoints({
  addTagTypes: ['Employee'],
});

const employeeApi = employeeTags.injectEndpoints({
  endpoints: (build) => ({
    createEmployee: build.mutation<
      CreateEmployeeReturnType,
      EmployeeFormValues
    >({
      query(body) {
        return {
          url: '/employee/register',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Employee'],
    }),

    getAllEmployees: build.query<FilteredResponse<Employee[]>, FilterValues>({
      query: (query) =>
        `/employee/employees?direction=asc${query.elementPerPage}${query.isActive}${query.page}${query.typeWorkId}`,
      providesTags: ['Employee'],
    }),

    editEmployee: build.mutation<Employee, EmployeeUpdateFormValues>({
      query(body) {
        return {
          url: '/employee/change-data',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Employee'],
    }),

    getAllEmployeesWithoutPagination: build.query<
      EmployeesShortInfo[],
      EmployeesShortInfoParams
    >({
      query: (query) =>
        `/employee/employees/list${query.projectIds}${query.operationIds}`,
      providesTags: ['Employee'],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useGetAllEmployeesQuery,
  useEditEmployeeMutation,
  useGetAllEmployeesWithoutPaginationQuery,
} = employeeApi;

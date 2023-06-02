import { baseApi } from '..';
import { ParamsForEmployees, EmployeesReports } from './types';

const reportsTags = baseApi.enhanceEndpoints({
  addTagTypes: ['Reports'],
});

const workTypeApi = reportsTags.injectEndpoints({
  endpoints: (build) => ({
    getEmployeesReports: build.query<EmployeesReports, ParamsForEmployees>({
      query: (query) =>
        `/report/working-shifts-for-period${query.startOfPeriod}${query.endOfPeriod}${query.employeeIds}`,
      providesTags: ['Reports'],
    }),
  }),
});

export const { useGetEmployeesReportsQuery } = workTypeApi;

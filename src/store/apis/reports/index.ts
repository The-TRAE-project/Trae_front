import { baseApi } from '..';
import {
  DashboardReport,
  ParamsForEmployeesReports,
  EmployeesReport,
  ParamsForProjectsReports,
  ProjectsReport,
} from './types';

const reportsTags = baseApi.enhanceEndpoints({
  addTagTypes: ['Reports'],
});

const workTypeApi = reportsTags.injectEndpoints({
  endpoints: (build) => ({
    getEmployeesReports: build.query<
      EmployeesReport,
      ParamsForEmployeesReports
    >({
      query: (query) =>
        `/report/working-shifts-for-period${query.startOfPeriod}${query.endOfPeriod}${query.employeeIds}`,
      providesTags: ['Reports'],
    }),

    getProjectsReports: build.query<ProjectsReport, ParamsForProjectsReports>({
      query: (query) =>
        `/report/projects-for-period${query.startOfPeriod}${query.endOfPeriod}`,
      providesTags: ['Reports'],
    }),

    getDashboardReport: build.query<DashboardReport, null>({
      query: () => {
        return `/report/dashboard`;
      },
      providesTags: ['Reports'],
    }),
  }),
});

export const {
  useGetEmployeesReportsQuery,
  useGetProjectsReportsQuery,
  useGetDashboardReportQuery,
} = workTypeApi;

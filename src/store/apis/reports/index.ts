import { baseApi } from '..';
import {
  DashboardReport,
  ParamsForEmployeesReports,
  EmployeesReport,
  ParamsForProjectsReports,
  ProjectsReport,
  DeadlinesReport,
  ParamsForDeadlinesReports,
} from './types';

const reportsTags = baseApi.enhanceEndpoints({
  addTagTypes: ['Reports'],
});

const reportsApi = reportsTags.injectEndpoints({
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

    getDeadlinesReports: build.query<
      DeadlinesReport,
      ParamsForDeadlinesReports
    >({
      query(body) {
        return {
          url: `/report/deadlines`,
          method: 'POST',
          body,
        };
      },
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
  useGetDeadlinesReportsQuery,
  useGetDashboardReportQuery,
} = reportsApi;

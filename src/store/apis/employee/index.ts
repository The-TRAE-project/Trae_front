import { baseApi } from '..';

import { Project } from './types';

const employeeTags = baseApi.enhanceEndpoints({ addTagTypes: ['Employee'] });

const employeeApi = employeeTags.injectEndpoints({
  endpoints: (build) => ({
    getAvailableProjectsByEmployeeId: build.query<Project, number>({
      query: (id) => `/project/employee/available-projects/${id}`,
    }),
  }),
});

export const { useGetAvailableProjectsByEmployeeIdQuery } = employeeApi;

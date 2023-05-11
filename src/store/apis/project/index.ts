import { baseApi } from '..';
import { FilteredResponse } from '../types';
import {
  CreateProjectFormValues,
  Project,
  ProjectShortInfo,
  FilterValues,
} from './types';

const projectTags = baseApi.enhanceEndpoints({
  addTagTypes: ['Project'],
});

const projectApi = projectTags.injectEndpoints({
  endpoints: (build) => ({
    createProject: build.mutation<void, CreateProjectFormValues>({
      query(body) {
        return {
          url: '/project/new',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Project'],
    }),

    deleteProject: build.mutation<void, number>({
      query(projectId) {
        return {
          url: `/project/delete-project/${projectId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Project'],
    }),

    getProjectById: build.query<Project, number>({
      query: (projectId) => `/project/${projectId}`,
      providesTags: ['Project'],
    }),

    closeProjectOperation: build.mutation<void, number>({
      query(operationId) {
        return {
          url: `/operation/close?operationId=${operationId}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Project'],
    }),

    getProjects: build.query<FilteredResponse<ProjectShortInfo>, FilterValues>({
      query: (query) =>
        `/project/projects?direction=asc${query.elementPerPage}${query.page}${query.isEnded}${query.isOnlyFirstOpWithoutAcceptance}${query.isOnlyLastOpInWork}`,
      providesTags: ['Project'],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
  useCloseProjectOperationMutation,
  useGetProjectsQuery,
} = projectApi;

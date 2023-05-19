import { baseApi } from '..';
import { FilteredResponse } from '../types';
import {
  CreateProjectFormValues,
  Project,
  ProjectShortInfo,
  FilterValues,
  SearchValues,
  UpdateProjectFormValues,
  ReturnUpdatedEndDateValues,
  UpdateEndDateFormValues,
  NewOperationFormValues,
} from './types';

const projectTags = baseApi.enhanceEndpoints({
  addTagTypes: ['Project', 'Projects'],
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
      invalidatesTags: ['Projects'],
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
      providesTags: ['Projects'],
    }),

    closeProjectOperation: build.mutation<void, number>({
      query(operationId) {
        return {
          url: `/operation/close?operationId=${operationId}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Projects'],
    }),

    getProjects: build.query<
      FilteredResponse<ProjectShortInfo[]>,
      FilterValues
    >({
      query: (query) =>
        `/project/projects?direction=asc${query.elementPerPage}${query.page}${query.isEnded}${query.isOnlyFirstOpWithoutAcceptance}${query.isOnlyLastOpInWork}`,
      providesTags: ['Projects', 'Project'],
    }),

    searchProjects: build.query<
      FilteredResponse<ProjectShortInfo[]>,
      SearchValues
    >({
      query: (query) =>
        `/project/search?direction=asc${query.elementPerPage}${query.page}${query.projectNumberOrCustomer}`,
      providesTags: ['Projects'],
    }),

    editProject: build.mutation<
      UpdateProjectFormValues,
      UpdateProjectFormValues
    >({
      query(body) {
        return {
          url: '/project/update-common-data',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Projects'],
    }),

    editProjectEndDate: build.mutation<
      ReturnUpdatedEndDateValues,
      UpdateEndDateFormValues
    >({
      query(body) {
        return {
          url: '/project/update-end-dates',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Projects'],
    }),

    closeProject: build.mutation<void, number>({
      query(projectId) {
        return {
          url: `/project/finish-project?projectId=${projectId}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['Projects'],
    }),

    insertNewOperation: build.mutation<void, NewOperationFormValues>({
      query(body) {
        return {
          url: '/operation/insert',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Projects'],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
  useCloseProjectOperationMutation,
  useGetProjectsQuery,
  useSearchProjectsQuery,
  useEditProjectMutation,
  useEditProjectEndDateMutation,
  useCloseProjectMutation,
  useInsertNewOperationMutation,
} = projectApi;

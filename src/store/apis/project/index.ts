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
  // Terminal Workshop
  StageInWork,
  ReceiveProjectStageValue,
  ProjectStage,
  ProjectBriefInfo,
  CloseProjectStageValue,
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
      providesTags: ['Projects', 'Project'],
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

    deleteOperation: build.mutation<void, number>({
      query(operationId) {
        return {
          url: `/operation/delete-operation/${operationId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Project'],
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
    // Terminal Workshop
    getStagesInWorkByEmployeeId: build.query<StageInWork[], number>({
      query: (employeeId) =>
        `/operation/employee/operations-in-work/${employeeId}`,
      providesTags: ['Projects'],
    }),

    finishProjectStage: build.mutation<void, CloseProjectStageValue>({
      query(body) {
        return {
          url: 'operation/employee/finish-operation',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Projects'],
    }),

    receiveProjectStage: build.mutation<void, ReceiveProjectStageValue>({
      query(body) {
        return {
          url: '/operation/employee/receive-operation',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Projects'],
    }),

    getProjectStages: build.query<ProjectStage[], number>({
      query: (projectId) =>
        `operation/employee/project-operations/${projectId}`,
      providesTags: ['Projects'],
    }),

    getAvailableProjectsByEmployeeId: build.query<ProjectBriefInfo[], number>({
      query: (employeeId) =>
        `/project/employee/available-projects/${employeeId}`,
      providesTags: ['Projects'],
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
  useDeleteOperationMutation,
  // Terminal Workshop
  useReceiveProjectStageMutation,
  useFinishProjectStageMutation,
  useGetAvailableProjectsByEmployeeIdQuery,
  useGetStagesInWorkByEmployeeIdQuery,
  useGetProjectStagesQuery,
} = projectApi;

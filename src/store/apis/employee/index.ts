import { baseApi } from '..';
import {
  ProjectStage,
  Project,
  StageInWork,
  ReceiveProjectStageValue,
  EmployeeFormValue,
  WorkType,
  WorkTypeValue,
} from './types';

const employeeTags = baseApi.enhanceEndpoints({
  addTagTypes: ['Employee', 'ProjectStage', 'WorkTypes', 'StagesInWork'],
});
// TODO:
const employeeApi = employeeTags.injectEndpoints({
  endpoints: (build) => ({
    getAvailableProjectsByEmployeeId: build.query<Project[], number>({
      query: (employeeId) =>
        `/project/employee/available-projects/${employeeId}`,
      keepUnusedDataFor: 0,
      providesTags: ['ProjectStage', 'StagesInWork'],
    }),

    getStagesInWorkByEmployeeId: build.query<StageInWork[], number>({
      query: (employeeId) =>
        `/operation/employee/operations-in-work/${employeeId}`,
      keepUnusedDataFor: 0,
      providesTags: ['StagesInWork'],
    }),

    getProjectStages: build.query<ProjectStage[], number>({
      query: (projectId) =>
        `operation/employee/project-operations/${projectId}`,
      providesTags: ['ProjectStage'],
    }),

    receiveProjectStage: build.mutation<void, ReceiveProjectStageValue>({
      query(body) {
        return {
          url: '/operation/employee/receive-operation',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['ProjectStage'],
    }),

    finishProjectStage: build.mutation<void, ReceiveProjectStageValue>({
      query(body) {
        return {
          url: 'operation/employee/finish-operation',
          method: 'POST',
          body,
        };
      },
      // invalidatesTags: ['StagesInWork'],
    }),

    createEmployee: build.mutation<void, EmployeeFormValue>({
      query(body) {
        return {
          url: '/employee/register',
          method: 'POST',
          body,
        };
      },
    }),

    getAllWorkTypes: build.query<WorkType[], void>({
      query: () => '/type-work/types',
      providesTags: ['WorkTypes'],
    }),

    createWorkType: build.mutation<void, WorkTypeValue>({
      query(body) {
        return {
          url: '/type-work/new',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['WorkTypes'],
    }),
  }),
});

export const {
  useGetAvailableProjectsByEmployeeIdQuery,
  useGetStagesInWorkByEmployeeIdQuery,
  useGetProjectStagesQuery,
  useReceiveProjectStageMutation,
  useFinishProjectStageMutation,
  useCreateEmployeeMutation,
  useGetAllWorkTypesQuery,
  useCreateWorkTypeMutation,
} = employeeApi;

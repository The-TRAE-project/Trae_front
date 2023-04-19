import { baseApi } from '..';
import { CreateProjectFormValues } from './types';

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
  }),
});

export const { useCreateProjectMutation, useDeleteProjectMutation } =
  projectApi;

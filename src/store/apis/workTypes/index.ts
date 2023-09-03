import { baseApi } from '..';
import { FilteredResponse, FilterValues } from '../types';
import {
  CreateWorkTypeFormValues,
  ResponseWorkTypeValues,
  EditWorkTypeFormValues,
  WorkType,
} from './types';

const workTypeTags = baseApi.enhanceEndpoints({
  addTagTypes: ['WorkType'],
});

const workTypeApi = workTypeTags.injectEndpoints({
  endpoints: (build) => ({
    getAllWorkTypes: build.query<FilteredResponse<WorkType[]>, FilterValues>({
      query: (query) =>
        `/type-work/types?direction=asc${query.elementPerPage}${query.isActive}${query.page}`,
      providesTags: ['WorkType'],
    }),

    createWorkType: build.mutation<
      ResponseWorkTypeValues,
      CreateWorkTypeFormValues
    >({
      query(body) {
        return {
          url: '/type-work/new',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['WorkType'],
    }),

    editWorkType: build.mutation<
      ResponseWorkTypeValues,
      EditWorkTypeFormValues
    >({
      query(body) {
        return {
          url: '/type-work/change-name-active',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['WorkType'],
    }),

    getActiveWorkTypes: build.query<WorkType[], void>({
      query: () => '/type-work/active/list',
      providesTags: ['WorkType'],
    }),
  }),
});

export const {
  useGetAllWorkTypesQuery,
  useCreateWorkTypeMutation,
  useEditWorkTypeMutation,
  useGetActiveWorkTypesQuery,
} = workTypeApi;

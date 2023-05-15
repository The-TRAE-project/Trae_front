import { Dispatch, useEffect, SetStateAction } from 'react';
import { UseFormReturnType } from '@mantine/form';

import {
  Project,
  UpdateProjectFormValues,
} from '../../../../store/apis/project/types';

type ProjectWithoutId = Omit<UpdateProjectFormValues, 'projectId'>;

export function useSetDefaultValues(
  form: UseFormReturnType<
    ProjectWithoutId,
    (values: ProjectWithoutId) => ProjectWithoutId
  >,
  project: Project | undefined,
  setCurrentProject: Dispatch<SetStateAction<Project | undefined>>
) {
  useEffect(() => {
    form.setFieldValue('projectNumber', project?.number || 0);
    form.setFieldValue('projectName', project?.name || '');
    form.setFieldValue('customer', project?.customer || '');
    form.setFieldValue('commentary', project?.comment || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

  useEffect(() => {
    if (project) {
      setCurrentProject(project);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

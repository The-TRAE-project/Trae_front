import { useEffect } from 'react';
import { UseFormReturnType } from '@mantine/form';

import {
  Project,
  UpdateEndDateFormValues,
} from '../../../../store/apis/project/types';
import { convertToDate } from '../../../../helpers/convertToDate';

type ProjectWithoutId = Omit<UpdateEndDateFormValues, 'projectId'>;

export function useSetDefaultValues(
  form: UseFormReturnType<
    ProjectWithoutId,
    (values: ProjectWithoutId) => ProjectWithoutId
  >,
  project: Project | undefined
) {
  useEffect(() => {
    form.setFieldValue(
      'newPlannedAndContractEndDate',
      project?.endDateInContract
        ? convertToDate(project?.endDateInContract as number[])
        : null
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);
}

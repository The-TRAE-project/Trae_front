import { useEffect } from 'react';
import { UseFormReturnType } from '@mantine/form';

import {
  EditWorkTypeFormValues,
  WorkType,
} from '../../../../store/apis/workTypes/types';

type WorkTypeWithoutId = Omit<EditWorkTypeFormValues, 'typeWorkId'>;

export function useSetDefaultValues(
  form: UseFormReturnType<
    WorkTypeWithoutId,
    (values: WorkTypeWithoutId) => WorkTypeWithoutId
  >,
  workType: WorkType | null,
  setCurrentWorkType: React.Dispatch<React.SetStateAction<WorkType | null>>
) {
  useEffect(() => {
    form.setFieldValue('newName', workType?.name || null);
    form.setFieldValue(
      'isActive',
      workType?.isActive ? 'Активный' : 'Заблокированный' || null
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workType]);

  useEffect(() => {
    setCurrentWorkType(workType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

import { useEffect } from 'react';
import { UseFormReturnType } from '@mantine/form';

import {
  CreateProjectFormValues,
  Operation,
} from '../../../../../store/apis/project/types';
import { ModifiedWorkType } from './useModifyWorkTypes';

export function useSetOperations(
  form: UseFormReturnType<CreateProjectFormValues>,
  selectedOperations: ModifiedWorkType[]
) {
  useEffect(() => {
    const operations = selectedOperations.map<Operation>((item) => ({
      name: item.name,
      typeWorkId: item.typeWorkId,
    }));
    form.setFieldValue('operations', operations);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOperations]);
}

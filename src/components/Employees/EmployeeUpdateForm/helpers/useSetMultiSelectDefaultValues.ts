import { useEffect } from 'react';
import { UseFormReturnType } from '@mantine/form';

import { EmployeeUpdateFormValues } from '../../../../store/apis/employee/types';
import { useAppSelector } from '../../../../helpers/hooks/useAppSelector';

type EmployeeWithoutId = Omit<EmployeeUpdateFormValues, 'employeeId'>;

export function useSetMultiSelectDefaultValues(
  form: UseFormReturnType<
    EmployeeWithoutId,
    (values: EmployeeWithoutId) => EmployeeWithoutId
  >
) {
  const { employeeToEdit } = useAppSelector((store) => store.employee);
  useEffect(() => {
    if (employeeToEdit) {
      const changedTypesIds: string[] = employeeToEdit.types
        ? employeeToEdit.types.map<string>((workType) => String(workType.id))
        : [];

      form.setFieldValue('changedTypesId', changedTypesIds);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeToEdit?.types]);
}

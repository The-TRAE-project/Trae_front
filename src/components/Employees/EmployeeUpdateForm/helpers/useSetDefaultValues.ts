import { useEffect } from 'react';
import { UseFormReturnType } from '@mantine/form';
import dayjs from 'dayjs';

import { EmployeeUpdateFormValues } from '../../../../store/apis/employee/types';
import { EmployeeToEdit } from '../../../../store/slices/employee/types';

type EmployeeWithoutId = Omit<EmployeeUpdateFormValues, 'employeeId'>;

export function useSetDefaultValues(
  form: UseFormReturnType<
    EmployeeWithoutId,
    (values: EmployeeWithoutId) => EmployeeWithoutId
  >,
  employeeToEdit: EmployeeToEdit | null
) {
  useEffect(() => {
    form.setFieldValue('firstName', employeeToEdit?.firstName || null);
    form.setFieldValue('lastName', employeeToEdit?.lastName || null);
    form.setFieldValue('middleName', employeeToEdit?.middleName || null);
    form.setFieldValue('phone', employeeToEdit?.phone || null);
    form.setFieldValue('pinCode', employeeToEdit?.pinCode || null);
    form.setFieldValue(
      'isActive',
      employeeToEdit?.isActive ? 'Активный' : 'Заблокированный'
    );
    form.setFieldValue(
      'dateOfDismissal',
      (employeeToEdit?.dateOfDismissal &&
        dayjs(employeeToEdit?.dateOfDismissal).toDate()) ||
        null
    );
    form.setFieldValue(
      'dateOfEmployment',
      dayjs(employeeToEdit?.dateOfEmployment).toDate() || null
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeToEdit]);
}

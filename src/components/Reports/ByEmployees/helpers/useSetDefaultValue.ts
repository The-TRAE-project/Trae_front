import { useEffect } from 'react';
import { UseFormReturnType } from '@mantine/form';

import { selectOnlyIds } from '../../../../helpers/selectOnlyIds';
import { EmployeeShortInfo } from '../../../../store/apis/employee/types';
import { EmployeeReportFormValues } from '../../../../store/apis/reports/types';

export function useSetDefaultValue(
  form: UseFormReturnType<
    EmployeeReportFormValues,
    (values: EmployeeReportFormValues) => EmployeeReportFormValues
  >,
  employees: EmployeeShortInfo[] | undefined
) {
  useEffect(() => {
    const onlyEmployeesIds = employees ? selectOnlyIds(employees) : [];

    form.setFieldValue('employeeIds', onlyEmployeesIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employees]);
}

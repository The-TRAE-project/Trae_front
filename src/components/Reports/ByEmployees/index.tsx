import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import { Stack } from '@mantine/core';

import { Paths } from '../../../constants/paths';
import { useGetEmployeesReportsQuery } from '../../../store/apis/reports';
import { useGetAllEmployeesWithoutPaginationQuery } from '../../../store/apis/employee';
import {
  EmployeeReportFormValues,
  EmployeeReportSchema,
} from '../../../store/apis/reports/types';
import { selectOnlyIds } from '../../../helpers/selectOnlyIds';
import { useExportToExcel } from '../../../helpers/hooks/useExportToExcel';
import Loader from '../../Loader';
import { FormWrapper } from '../../styles';
import FormHeader from '../FormHeader';
import {
  DATE_30_AHEAD,
  formatToQueryParamDate,
} from './helpers/formatToParamDate';
import { useSetDefaultValue } from './helpers/useSetDefaultValue';
import FormBody from './FormBody';
import TimelineListItem from './TimelineListItem';

const ByEmployees = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [employeeIds, setEmployeeIds] = useState<number[] | null>([]);

  const navigate = useNavigate();

  const { data: employees } = useGetAllEmployeesWithoutPaginationQuery();
  const onlyEmployeesIds = employees ? selectOnlyIds(employees) : [];

  const form = useForm<EmployeeReportFormValues>({
    initialValues: {
      startOfPeriod: new Date(),
      endOfPeriod: DATE_30_AHEAD,
      employeeIds: onlyEmployeesIds,
    },
    validate: (values) => {
      const resolver = zodResolver(EmployeeReportSchema);
      const errors = resolver(values);
      return errors;
    },
  });
  const { startOfPeriod, endOfPeriod } = form.values;

  useSetDefaultValue(form, employees);

  const {
    data: reportsByEmployees,
    isLoading: isGetLoading,
    isFetching,
  } = useGetEmployeesReportsQuery(
    {
      startOfPeriod: startDate ? `?startOfPeriod=${startDate}` : '',
      endOfPeriod: endDate ? `&endOfPeriod=${endDate}` : '',
      employeeIds: employeeIds?.length ? `&employeeIds=${employeeIds}` : '',
    },
    {
      skip: !startDate && !endDate && !employeeIds?.length,
    }
  );

  const { isLoading, exportToExcel } = useExportToExcel();

  const handleSubmit = (values: EmployeeReportFormValues) => {
    setStartDate(formatToQueryParamDate(values.startOfPeriod));
    setEndDate(formatToQueryParamDate(values.endOfPeriod));
    setEmployeeIds(values.employeeIds);
  };

  const handleExportToExcel = () => {
    const data = [['Имя', 'Фамилия', 'День', 'Итого']];
    exportToExcel(data, 'Отчеты по сотрудникам');
  };

  return (
    <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader
        onBack={() => navigate(Paths.REPORTS)}
        isReportFormed={!!reportsByEmployees}
        isFormBtnLoading={isFetching || isGetLoading}
        isFormBtnDisabled={isFetching || isGetLoading}
        isExportToExcelLoading={isLoading}
        onExportToExcel={handleExportToExcel}
      />

      <Stack spacing={40}>
        {employees ? (
          <FormBody form={form} employees={employees} />
        ) : (
          <Loader size={80} isAbsoluteCentered />
        )}
        {startDate &&
          endDate &&
          employeeIds?.length &&
          (!isGetLoading && !!reportsByEmployees ? (
            <TimelineListItem
              defaultTimeStart={startOfPeriod as Date}
              defaultTimeEnd={endOfPeriod as Date}
              employeeGroups={reportsByEmployees.shortEmployeeDtoList}
              employeeItems={reportsByEmployees.workingShiftEmployeeDtoList}
            />
          ) : (
            <Loader size={80} isAbsoluteCentered />
          ))}
      </Stack>
    </FormWrapper>
  );
};

export default ByEmployees;

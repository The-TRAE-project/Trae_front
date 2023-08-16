import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { Stack } from '@mantine/core';

import { useGetEmployeesReportsQuery } from '../../../store/apis/reports';
import { useGetAllEmployeesWithoutPaginationQuery } from '../../../store/apis/employee';
import {
  EmployeeReportFormValues,
  EmployeeReportSchema,
  EmployeeTotalShiftInfo,
  EmployeeWorkingShiftInfo,
  ShortEmployeeInfo,
} from '../../../store/apis/reports/types';
import { selectOnlyIds } from '../../../helpers/selectOnlyIds';
import { useExportToExcel } from '../../../helpers/hooks/useExportToExcel';
import Loader from '../../Loader';
import FormHeader from '../FormHeader';
import { FormWrapper } from '../../styles';
import {
  DATE_30_AHEAD,
  formatToQueryParamDate,
} from '../helpers/formatToParamDate';
import { useSetDefaultValue } from './helpers/useSetDefaultValue';
import FormBody from './FormBody';
import ReportTable from './ReportTable';
import { prepareToExcel } from './helpers/prepareToExcel';

export interface ReportTableData {
  dateStart: number[];
  dateEnd: number[];
  employees: ShortEmployeeInfo[];
  employeeWorkingShifts: EmployeeWorkingShiftInfo[];
  employeeTotalShifts: EmployeeTotalShiftInfo[];
}

const ByEmployees = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [employeeIds, setEmployeeIds] = useState<number[] | null>([]);

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

  const { isLoading: isExcelExportLoading, exportToExcel } = useExportToExcel();

  const handleSubmit = (values: EmployeeReportFormValues) => {
    setStartDate(formatToQueryParamDate(values.startOfPeriod));
    setEndDate(formatToQueryParamDate(values.endOfPeriod));
    setEmployeeIds(values.employeeIds);
  };

  const handleExportToExcel = () => {
    if (!reportsByEmployees) return;

    exportToExcel(
      prepareToExcel({
        dateStart: reportsByEmployees.startPeriod,
        dateEnd: reportsByEmployees.endPeriod,
        employees: reportsByEmployees.shortEmployeeDtoList,
        employeeWorkingShifts: reportsByEmployees.workingShiftEmployeeDtoList,
        employeeTotalShifts: reportsByEmployees.employeeIdTotalPartsDtoList,
      }),
      'Отчеты по сотрудникам'
    );
  };

  const isReportExist =
    !!reportsByEmployees &&
    reportsByEmployees.employeeIdTotalPartsDtoList.length > 0;
  // TODO: add error on date picked futher than 1 year
  return (
    <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader
        isReportFormed={!!reportsByEmployees}
        isFormBtnLoading={isFetching || isGetLoading}
        isFormBtnDisabled={isFetching || isGetLoading}
        isExportToExcelLoading={isExcelExportLoading}
        isExportToExcelBtnDisabled={!isReportExist}
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
          (!isGetLoading && !isFetching && !!reportsByEmployees ? (
            <ReportTable
              dateStart={reportsByEmployees.startPeriod}
              dateEnd={reportsByEmployees.endPeriod}
              employees={reportsByEmployees.shortEmployeeDtoList}
              employeeWorkingShifts={
                reportsByEmployees.workingShiftEmployeeDtoList
              }
              employeeTotalShifts={
                reportsByEmployees.employeeIdTotalPartsDtoList
              }
            />
          ) : (
            <Loader size={80} isAbsoluteCentered />
          ))}
      </Stack>
    </FormWrapper>
  );
};

export default ByEmployees;

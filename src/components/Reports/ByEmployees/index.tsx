import { useMemo, useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { Stack } from '@mantine/core';

import { useGetEmployeesReportsQuery } from '../../../store/apis/reports';
import { useGetAllEmployeesWithoutPaginationQuery } from '../../../store/apis/employee';
import {
  EmployeeReportFormValues,
  EmployeeReportSchema,
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
import { ReportTable } from './ReportTable';
import { prepareToExcel } from './helpers/prepareToExcel';
import { EmployeesShortInfo } from '../../../store/apis/employee/types';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';

const ByEmployees = () => {
  const [queryParams, setQueryParams] = useState<
    | {
        startOfPeriod: string;
        endOfPeriod: string;
        employeeIds: number[];
      }
    | undefined
  >(undefined);

  const { data: employees } = useGetAllEmployeesWithoutPaginationQuery({
    projectIds: '',
    operationIds: '',
  });

  const { sortedEmployees, onlyEmployeesIds } = useMemo((): {
    sortedEmployees: EmployeesShortInfo[] | undefined;
    onlyEmployeesIds: number[];
  } => {
    const sorted = employees
      ? [...employees].sort((a, b) => a.firstName.localeCompare(b.firstName))
      : undefined;

    return {
      sortedEmployees: sorted,
      onlyEmployeesIds: sorted ? selectOnlyIds(sorted) : [],
    };
  }, [employees]);

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

  useSetDefaultValue(form, sortedEmployees);

  const {
    data: reportsByEmployees,
    isLoading: isGetLoading,
    isFetching,
    error,
    isError,
  } = useGetEmployeesReportsQuery(
    {
      startOfPeriod: queryParams?.startOfPeriod
        ? `?startOfPeriod=${queryParams.startOfPeriod}`
        : '',
      endOfPeriod: queryParams?.endOfPeriod
        ? `&endOfPeriod=${queryParams.endOfPeriod}`
        : '',
      employeeIds:
        queryParams?.employeeIds && queryParams.employeeIds.length > 0
          ? `&employeeIds=${queryParams?.employeeIds}`
          : '',
    },
    {
      skip: !queryParams || !form.isValid(),
    }
  );

  useDisplayError(error, isError);

  const { isLoading: isExcelExportLoading, exportToExcel } = useExportToExcel();

  const handleSubmit = (values: EmployeeReportFormValues) => {
    setQueryParams({
      startOfPeriod: formatToQueryParamDate(values.startOfPeriod),
      endOfPeriod: formatToQueryParamDate(values.endOfPeriod),
      employeeIds: values.employeeIds,
    });
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
      `Отчет по сотрудникам`,
      'Employees'
    );
  };

  const isReportExist = !!reportsByEmployees;

  const showBody = !!queryParams && form.isValid();
  const showTable = !isGetLoading && !isFetching && isReportExist;

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
        {sortedEmployees ? (
          <FormBody form={form} employees={sortedEmployees} />
        ) : (
          <Loader size={80} isAbsoluteCentered />
        )}
        {showBody &&
          (showTable ? (
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

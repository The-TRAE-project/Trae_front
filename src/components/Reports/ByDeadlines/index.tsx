import { Stack } from '@mantine/core';
import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import Loader from '../../Loader';
import { FormWrapper } from '../../styles';
import FormBody from '../ByEmployees/FormBody';
import { ReportTable } from './ReportTable';
import FormHeader from '../FormHeader';
import { useGetDeadlinesReportsQuery } from '../../../store/apis/reports';
import { DATE_30_AHEAD } from '../helpers/formatToParamDate';
import { useExportToExcel } from '../../../helpers/hooks/useExportToExcel';
import { useGetAllEmployeesWithoutPaginationQuery } from '../../../store/apis/employee';
import { useGetAllProjectsNumbersQuery } from '../../../store/apis/project';
import { useGetAllOperationsNamesQuery } from '../../../store/apis/workTypes';

export function ByDeadlines() {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // TODO: get all emplyees, all projects, all operations
  // const { data: deadlines } = useGetAllEmployeesWithoutPaginationQuery();

  // const form = useForm<DeadlinesReportFormValues>({
  //   initialValues: {
  //     startOfPeriod: new Date(),
  //     endOfPeriod: DATE_30_AHEAD,
  //   },
  //   validate: (values) => {
  //     const resolver = zodResolver(DeadlinesReportSchema);
  //     const errors = resolver(values);
  //     return errors;
  //   },
  // });

  // useSetDefaultValue(form, employees);

  const employees = useGetAllEmployeesWithoutPaginationQuery();
  const projects = useGetAllProjectsNumbersQuery();
  const operations = useGetAllOperationsNamesQuery();
  console.log(employees.data, projects.data, operations.data);

  const firstValue = employees.data ? employees.data[0].id : '';
  const secondValue = projects.data
    ? projects.data
        .reduce((result, project) => {
          result += `${project.number},`;
          return result;
        }, '[')
        .slice(0, -1)
        .concat(']')
    : '';

  const {
    data: reportsByDeadlines,
    isLoading: isGetLoading,
    isFetching,
  } = useGetDeadlinesReportsQuery(
    {
      firstParameter: '?firstParameter=EMPLOYEE',
      secondParameter: '?secondParameter=PROJECT',
      thirdParameter: '?thirdParameter=OPERATION',
      valueOfFirstParameter: `?valueOfFirstParameter=${firstValue}`,
      valuesOfSecondParameter: `?valuesOfSecondParameter=[1]`,
      valuesOfThirdParameter: '?valuesOfThirdParameter=[1]',
    },
    {
      skip: true,
    }
  );
  console.log(reportsByDeadlines);

  const { isLoading: isExcelExportLoading, exportToExcel } = useExportToExcel();

  // const handleSubmit = (values: DeadlineReportFormValues) => {
  //   setStartDate(formatToQueryParamDate(values.startOfPeriod));
  //   setEndDate(formatToQueryParamDate(values.endOfPeriod));
  // };

  const handleExportToExcel = () => {
    if (!reportsByDeadlines) return;

    exportToExcel('', 'Отчеты по сотрудникам', 'Employees');
  };

  const isReportExist = !!reportsByDeadlines;

  return (
    // <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
    <FormWrapper>
      <FormHeader
        isReportFormed={!!reportsByDeadlines}
        isFormBtnLoading={isFetching || isGetLoading}
        isFormBtnDisabled={isFetching || isGetLoading}
        isExportToExcelLoading={isExcelExportLoading}
        isExportToExcelBtnDisabled={!isReportExist}
        onExportToExcel={handleExportToExcel}
      />

      <Stack spacing={40}>
        {/* {employees ? (
          <FormBody form={form} employees={employees} />
        ) : (
          <Loader size={80} isAbsoluteCentered />
        )} */}
        {startDate &&
          endDate &&
          (!isGetLoading && !isFetching && !!reportsByDeadlines ? (
            <ReportTable />
          ) : (
            <Loader size={80} isAbsoluteCentered />
          ))}
      </Stack>
    </FormWrapper>
  );
}

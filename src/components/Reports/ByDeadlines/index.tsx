import { Stack } from '@mantine/core';
import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import Loader from '../../Loader';
import { FormWrapper } from '../../styles';
import { FormBody } from './FormBody';
import { ReportTable } from './ReportTable';
import FormHeader from '../FormHeader';
import { useGetDeadlinesReportsQuery } from '../../../store/apis/reports';
import { DATE_30_AHEAD } from '../helpers/formatToParamDate';
import { useExportToExcel } from '../../../helpers/hooks/useExportToExcel';
import {
  DeadlineReportSchema,
  DeadlinesReportFormValues,
} from '../../../store/apis/reports/types';
import { useGetAllEmployeesWithoutPaginationQuery } from '../../../store/apis/employee';
import {
  useGetProjectsInfoQuery,
  useGetOperationsInfoQuery,
} from '../../../store/apis/project';

function chooseParameterValue(
  query: string,
  currentParameter: string,
  firstParameter: string[] | null,
  secondParameter: string[] | null,
  thirdParameter: string[] | null,
  valueOfFirstParameter: number[] | null,
  valuesOfSecondParameter: number[] | null,
  valuesOfThirdParameter: number[] | null
) {
  if (
    firstParameter !== null &&
    firstParameter[0] === currentParameter &&
    valueOfFirstParameter &&
    valueOfFirstParameter.length > 0
  )
    return `${query}${valueOfFirstParameter.join(',')}`;
  if (
    secondParameter !== null &&
    secondParameter[0] === currentParameter &&
    valuesOfSecondParameter &&
    valuesOfSecondParameter.length > 0
  )
    return `${query}${valuesOfSecondParameter.join(',')}`;
  if (
    thirdParameter !== null &&
    thirdParameter[0] === currentParameter &&
    valuesOfThirdParameter &&
    valuesOfThirdParameter.length > 0
  )
    return `${query}${valuesOfThirdParameter?.join(',')}`;
  return '';
}

export function ByDeadlines() {
  const [queryParams, setQueryParams] =
    useState<DeadlinesReportFormValues | null>(null);
  const form = useForm<DeadlinesReportFormValues>({
    initialValues: {
      startOfPeriod: new Date(),
      endOfPeriod: DATE_30_AHEAD,
      isDatesActive: false,
      firstParameter: [''],
      secondParameter: [''],
      thirdParameter: [''],
      valueOfFirstParameter: [],
      valuesOfSecondParameter: [],
      valuesOfThirdParameter: [],
    },
    validate: (values) => {
      const resolver = zodResolver(DeadlineReportSchema);
      const errors = resolver(values);
      return errors;
    },
  });

  const employees = useGetAllEmployeesWithoutPaginationQuery({
    projectIds: chooseParameterValue(
      '?projectIds=',
      'PROJECT',
      form.values.firstParameter,
      form.values.secondParameter,
      form.values.thirdParameter,
      form.values.valueOfFirstParameter,
      form.values.valuesOfSecondParameter,
      form.values.valuesOfThirdParameter
    ),
    operationIds: chooseParameterValue(
      '?operationIds=',
      'OPERATION',
      form.values.firstParameter,
      form.values.secondParameter,
      form.values.thirdParameter,
      form.values.valueOfFirstParameter,
      form.values.valuesOfSecondParameter,
      form.values.valuesOfThirdParameter
    ),
  }).data;

  const projects = useGetProjectsInfoQuery({
    employeeIds: chooseParameterValue(
      '?employeeIds=',
      'EMPLOYEE',
      form.values.firstParameter,
      form.values.secondParameter,
      form.values.thirdParameter,
      form.values.valueOfFirstParameter,
      form.values.valuesOfSecondParameter,
      form.values.valuesOfThirdParameter
    ),
    operationIds: chooseParameterValue(
      '?operationIds=',
      'OPERATION',
      form.values.firstParameter,
      form.values.secondParameter,
      form.values.thirdParameter,
      form.values.valueOfFirstParameter,
      form.values.valuesOfSecondParameter,
      form.values.valuesOfThirdParameter
    ),
    startOfPeriod: '',
    endOfPeriod: '',
  }).data;

  const operations = useGetOperationsInfoQuery({
    employeeIds: chooseParameterValue(
      '?employeeIds=',
      'EMPLOYEE',
      form.values.firstParameter,
      form.values.secondParameter,
      form.values.thirdParameter,
      form.values.valueOfFirstParameter,
      form.values.valuesOfSecondParameter,
      form.values.valuesOfThirdParameter
    ),
    projectIds: chooseParameterValue(
      '?projectIds=',
      'PROJECT',
      form.values.firstParameter,
      form.values.secondParameter,
      form.values.thirdParameter,
      form.values.valueOfFirstParameter,
      form.values.valuesOfSecondParameter,
      form.values.valuesOfThirdParameter
    ),
    startOfPeriod: '',
    endOfPeriod: '',
  }).data;

  // console.log(employees, projects, operations, queryParams);

  // console.log(
  //   firstParameter,
  //   secondParameter,
  //   thirdParameter,
  //   valueOfFirstParameter,
  //   valuesOfSecondParameter,
  //   valuesOfThirdParameter
  // );
  const {
    data: reportsByDeadlines,
    isLoading: isGetLoading,
    isFetching,
  } = useGetDeadlinesReportsQuery(
    {
      firstParameter: queryParams ? queryParams.firstParameter[0] : '',
      secondParameter: queryParams ? queryParams.secondParameter[0] : '',
      thirdParameter: queryParams ? queryParams.thirdParameter[0] : '',
      valueOfFirstParameter: queryParams
        ? queryParams.valueOfFirstParameter[0]
        : 0,
      valuesOfSecondParameter: queryParams
        ? queryParams.valuesOfSecondParameter
        : [0],
      valuesOfThirdParameter: queryParams
        ? queryParams.valuesOfThirdParameter
        : [0],
    },
    {
      skip: queryParams === null,
    }
  );
  console.log(
    'REPORT_BY_DEDLINES: ',
    isGetLoading || isFetching,
    reportsByDeadlines,
    queryParams
  );

  const { isLoading: isExcelExportLoading, exportToExcel } = useExportToExcel();

  const handleSubmit = (values: DeadlinesReportFormValues) => {
    console.log('SUBMIT VALUES ', values);
    setQueryParams(values);
  };

  const handleExportToExcel = () => {
    if (!reportsByDeadlines) return;

    exportToExcel('', 'Отчеты по срокам', 'Deadlines');
  };

  const isReportExist = !!reportsByDeadlines;
  const firstParameter = form.values.firstParameter[0];
  const secondParameter = form.values.secondParameter[0];
  const thirdParameter = form.values.thirdParameter[0];

  return (
    <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader
        isReportFormed={!!reportsByDeadlines}
        isFormBtnLoading={isFetching || isGetLoading}
        isFormBtnDisabled={isFetching || isGetLoading}
        isExportToExcelLoading={isExcelExportLoading}
        isExportToExcelBtnDisabled={!isReportExist}
        onExportToExcel={handleExportToExcel}
      />

      <Stack spacing={40}>
        {employees && projects && operations ? (
          <FormBody
            form={form}
            employees={employees}
            projects={projects}
            operations={operations}
          />
        ) : (
          <Loader size={80} isAbsoluteCentered />
        )}
        {!!reportsByDeadlines &&
          !!firstParameter &&
          !!secondParameter &&
          !!thirdParameter &&
          form.isValid() &&
          (!isGetLoading && !isFetching && !!reportsByDeadlines ? (
            <ReportTable
              reportsByDeadlines={reportsByDeadlines}
              firstParameter={firstParameter}
              secondParameter={secondParameter}
              thirdParameter={thirdParameter}
            />
          ) : (
            <Loader size={80} isAbsoluteCentered />
          ))}
      </Stack>
    </FormWrapper>
  );
}

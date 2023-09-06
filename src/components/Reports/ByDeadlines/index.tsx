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
  firstParameter: string | null,
  secondParameter: string | null,
  thirdParameter: string | null,
  valueOfFirstParameter: number | null,
  valuesOfSecondParameter: number[] | null,
  valuesOfThirdParameter: number[] | null
) {
  if (firstParameter === currentParameter)
    return `${query}${valueOfFirstParameter}`;
  if (secondParameter === currentParameter)
    return `${query}${valuesOfSecondParameter?.join(',')}`;
  if (thirdParameter === currentParameter)
    return `${query}${valuesOfThirdParameter?.join(',')}`;
  return '';
}

export function ByDeadlines() {
  const [queryParams, setQueryParams] =
    useState<DeadlinesReportFormValues | null>(null);
  const [firstParameter, setFirstParameter] = useState<string | null>(null);
  const [secondParameter, setSecondParameter] = useState<string | null>(null);
  const [thirdParameter, setThirdParameter] = useState<string | null>(null);
  const [valueOfFirstParameter, setValueOfFirstParameter] = useState<
    number | null
  >(null);
  const [valuesOfSecondParameter, setValuesOfSecondParameter] = useState<
    number[] | null
  >(null);
  const [valuesOfThirdParameter, setValuesOfThirdParameter] = useState<
    number[] | null
  >(null);

  const form = useForm<DeadlinesReportFormValues>({
    initialValues: {
      startOfPeriod: new Date(),
      endOfPeriod: DATE_30_AHEAD,
      isDatesActive: false,
      firstParameter: [''],
      secondParameter: [''],
      thirdParameter: [''],
      valueOfFirstParameter: [0],
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
      firstParameter,
      secondParameter,
      thirdParameter,
      valueOfFirstParameter,
      valuesOfSecondParameter,
      valuesOfThirdParameter
    ),
    operationIds: chooseParameterValue(
      '?operationIds=',
      'OPERATION',
      firstParameter,
      secondParameter,
      thirdParameter,
      valueOfFirstParameter,
      valuesOfSecondParameter,
      valuesOfThirdParameter
    ),
  }).data;

  const projects = useGetProjectsInfoQuery({
    employeeIds: chooseParameterValue(
      '?employeeIds=',
      'EMPLOYEE',
      firstParameter,
      secondParameter,
      thirdParameter,
      valueOfFirstParameter,
      valuesOfSecondParameter,
      valuesOfThirdParameter
    ),
    operationIds: chooseParameterValue(
      '?operationIds=',
      'OPERATION',
      firstParameter,
      secondParameter,
      thirdParameter,
      valueOfFirstParameter,
      valuesOfSecondParameter,
      valuesOfThirdParameter
    ),
    startOfPeriod: '',
    endOfPeriod: '',
  }).data;

  const operations = useGetOperationsInfoQuery({
    employeeIds: chooseParameterValue(
      '?employeeIds=',
      'EMPLOYEE',
      firstParameter,
      secondParameter,
      thirdParameter,
      valueOfFirstParameter,
      valuesOfSecondParameter,
      valuesOfThirdParameter
    ),
    projectIds: chooseParameterValue(
      '?projectIds=',
      'PROJECT',
      firstParameter,
      secondParameter,
      thirdParameter,
      valueOfFirstParameter,
      valuesOfSecondParameter,
      valuesOfThirdParameter
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
      firstParameter: queryParams ? queryParams?.firstParameter?.at(0) : '',
      secondParameter: queryParams ? queryParams?.secondParameter?.at(0) : '',
      thirdParameter: queryParams ? queryParams?.thirdParameter?.at(0) : '',
      valueOfFirstParameter: queryParams
        ? queryParams?.valueOfFirstParameter?.at(0)
        : 0,
      valuesOfSecondParameter: queryParams
        ? queryParams?.valuesOfSecondParameter
        : [0],
      valuesOfThirdParameter: queryParams
        ? queryParams?.valuesOfThirdParameter
        : [0],
    },
    {
      skip: queryParams === null,
    }
  );
  // console.log(
  //   'REPORT_BY_DEDLINES: ',
  //   isGetLoading || isFetching,
  //   reportsByDeadlines,
  //   queryParams
  // );

  const { isLoading: isExcelExportLoading, exportToExcel } = useExportToExcel();

  const handleSubmit = (values: DeadlinesReportFormValues) => {
    setQueryParams(values);
  };

  const handleExportToExcel = () => {
    if (!reportsByDeadlines) return;

    exportToExcel('', 'Отчеты по срокам', 'Deadlines');
  };

  const isReportExist = !!reportsByDeadlines;

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
            firstParameter={firstParameter}
            secondParameter={secondParameter}
            thirdParameter={thirdParameter}
            setFirstParameter={setFirstParameter}
            setSecondParameter={setSecondParameter}
            setThirdParameter={setThirdParameter}
            setValueOfFirstParameter={setValueOfFirstParameter}
            setValuesOfSecondParameter={setValuesOfSecondParameter}
            setValuesOfThirdParameter={setValuesOfThirdParameter}
          />
        ) : (
          <Loader size={80} isAbsoluteCentered />
        )}
        {!!reportsByDeadlines &&
          (!isGetLoading && !isFetching && !!reportsByDeadlines ? (
            <ReportTable />
          ) : (
            <Loader size={80} isAbsoluteCentered />
          ))}
      </Stack>
    </FormWrapper>
  );
}

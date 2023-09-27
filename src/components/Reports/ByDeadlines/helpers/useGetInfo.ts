import { useGetAllEmployeesWithoutPaginationQuery } from '../../../../store/apis/employee';
import {
  useGetProjectsInfoQuery,
  useGetOperationsInfoQuery,
} from '../../../../store/apis/project';
import { DeadlinesReportFormValues } from '../../../../store/apis/reports/types';
import { formatToQueryParamDate } from '../../helpers/formatToParamDate';

function chooseParameterValue(
  currentParameter: string,
  values: DeadlinesReportFormValues
) {
  if (
    values.firstParameter[0].id === currentParameter &&
    values.valueOfFirstParameter.length > 0
  )
    return `${values.valueOfFirstParameter.map((item) => item.id).join(',')}`;
  if (
    values.secondParameter[0].id === currentParameter &&
    values.valuesOfSecondParameter.length > 0
  )
    return `${values.valuesOfSecondParameter.map((item) => item.id).join(',')}`;
  if (
    values.thirdParameter[0].id === currentParameter &&
    values.valuesOfThirdParameter.length > 0
  )
    return `${values.valuesOfThirdParameter.map((item) => item.id).join(',')}`;
  return '';
}

export function useGetInfo(values: DeadlinesReportFormValues) {
  const employees = useGetAllEmployeesWithoutPaginationQuery(
    {
      projectIds:
        values.firstParameter[0].id === 'OPERATION'
          ? ''
          : chooseParameterValue('PROJECT', values),
      operationIds: chooseParameterValue('OPERATION', values),
    },
    {
      skip:
        (values.firstParameter[0].id === 'EMPLOYEE' &&
          values.secondParameter[0].id !== '') ||
        (values.secondParameter[0].id === 'EMPLOYEE' &&
          values.thirdParameter[0].id !== ''),
    }
  );

  const projects = useGetProjectsInfoQuery(
    {
      employeeIds:
        values.firstParameter[0].id === 'OPERATION'
          ? ''
          : chooseParameterValue('EMPLOYEE', values),
      operationIds: chooseParameterValue('OPERATION', values),
      startOfPeriod: formatToQueryParamDate(values.startOfPeriod),
      endOfPeriod: formatToQueryParamDate(values.endOfPeriod),
    },
    {
      skip:
        (values.firstParameter[0].id === 'PROJECT' &&
          values.secondParameter[0].id !== '') ||
        (values.secondParameter[0].id === 'PROJECT' &&
          values.thirdParameter[0].id !== ''),
    }
  );

  const operations = useGetOperationsInfoQuery(
    {
      employeeIds: chooseParameterValue('EMPLOYEE', values),
      projectIds: chooseParameterValue('PROJECT', values),
      startOfPeriod: formatToQueryParamDate(values.startOfPeriod),
      endOfPeriod: formatToQueryParamDate(values.endOfPeriod),
    },
    {
      skip:
        (values.firstParameter[0].id === 'OPERATION' &&
          values.secondParameter[0].id !== '') ||
        (values.secondParameter[0].id === 'OPERATION' &&
          values.thirdParameter[0].id !== ''),
    }
  );
  return {
    employees: employees.data,
    projects: projects.data,
    operations: operations.data,
  };
}

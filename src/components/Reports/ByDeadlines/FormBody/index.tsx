import { UseFormReturnType } from '@mantine/form';
import { useMemo, useState } from 'react';
import DropdownSelect, { MenuItemData } from '../../../DropdownSelect';
import {
  OperationsShortInfo,
  ProjectsShortInfo,
} from '../../../../store/apis/project/types';
import { ThreeColumnGrid } from '../../../styles';
import { EmployeesShortInfo } from '../../../../store/apis/employee/types';
import DatePicker from '../../../DatePicker';
import { CheckboxInput } from '../../../CheckboxInput';
import { DeadlinesReportFormValues } from '../../../../store/apis/reports/types';

interface Props {
  form: UseFormReturnType<
    DeadlinesReportFormValues,
    (values: DeadlinesReportFormValues) => DeadlinesReportFormValues
  >;
  employees: EmployeesShortInfo[] | undefined;
  projects: ProjectsShortInfo[] | undefined;
  operations: OperationsShortInfo[] | undefined;
}

export function FormBody({ form, employees, projects, operations }: Props) {
  const [isDatesActive, setIsDatesActive] = useState(false);
  const ParametersChoices = useMemo(
    () => [
      { id: 'EMPLOYEE', value: 'Сотрудник' },
      { id: 'PROJECT', value: 'Проект' },
      { id: 'OPERATION', value: 'Этап' },
    ],
    []
  );
  const test = form.values;
  console.log(test);

  const selectEmployees = useMemo(
    () =>
      employees?.map((employee) => {
        return {
          id: employee.id,
          value: `${employee.firstName} ${employee.lastName}`,
        };
      }),
    [employees]
  );

  const selectProjects = useMemo(
    () =>
      projects?.map((project) => {
        return {
          id: project.projectId,
          value: project.number,
        };
      }),
    [projects]
  );

  const selectOperations = useMemo(
    () =>
      operations?.map((operation) => {
        return {
          id: operation.operationId,
          value: operation.name,
        };
      }),
    [operations]
  );

  const selectOrder = useMemo(() => {
    return [
      { id: 'EMPLOYEE', value: selectEmployees },
      { id: 'PROJECT', value: selectProjects },
      { id: 'OPERATION', value: selectOperations },
    ];
  }, [selectEmployees, selectOperations, selectProjects]);

  const labels = [
    ParametersChoices.find((item) => item.id === form.values.firstParameter[0])
      ?.value || 'Критерий',
    ParametersChoices.find((item) => item.id === form.values.secondParameter[0])
      ?.value || 'Критерий',
    ParametersChoices.find((item) => item.id === form.values.thirdParameter[0])
      ?.value || 'Критерий',
  ];
  // TODO: Order of choosing parameters
  return (
    <ThreeColumnGrid>
      <DatePicker
        {...form.getInputProps('startOfPeriod')}
        title="Дата начало"
        disabled={!isDatesActive}
      />
      <DatePicker
        {...form.getInputProps('endOfPeriod')}
        title="Дата окончания"
        disabled={!isDatesActive}
      />

      <CheckboxInput
        checked={isDatesActive}
        onChange={(event) => setIsDatesActive(event.currentTarget.checked)}
      />
      <DropdownSelect
        form={form}
        label="Критерий 1"
        items={ParametersChoices}
        error={form.errors.firstParameter}
        id="firstParameter"
      />
      <DropdownSelect
        isDisabled={
          form.values.firstParameter[0] === '' ||
          form.values.valueOfFirstParameter === null ||
          form.values.valueOfFirstParameter.length === 0
        }
        form={form}
        label="Критерий 2"
        items={ParametersChoices.filter(
          (item) => item.id !== form.values.firstParameter[0]
        )}
        error={form.errors.secondParameter}
        id="secondParameter"
      />
      <DropdownSelect
        isDisabled={
          form.values.secondParameter[0] === '' ||
          form.values.valuesOfSecondParameter === null ||
          form.values.valuesOfSecondParameter?.length === 0
        }
        form={form}
        label="Критерий 3"
        items={ParametersChoices.filter(
          (item) =>
            item.id !== form.values.firstParameter[0] &&
            item.id !== form.values.secondParameter[0]
        )}
        error={form.errors.thirdParameter}
        id="thirdParameter"
      />

      <DropdownSelect
        isDisabled={form.values.firstParameter[0] === ''}
        form={form}
        label={labels[0]}
        items={
          form.values.firstParameter[0] !== ''
            ? (selectOrder.find(
                (item) => item.id === form.values.firstParameter[0]
              )?.value as MenuItemData[])
            : []
        }
        error={form.errors.valueOfFirstParameter}
        id="valueOfFirstParameter"
      />

      <DropdownSelect
        isDisabled={form.values.secondParameter[0] === ''}
        form={form}
        label={labels[1]}
        items={
          form.values.secondParameter[0] !== ''
            ? (selectOrder.find(
                (item) => item.id === form.values.secondParameter[0]
              )?.value as MenuItemData[])
            : []
        }
        error={form.errors.valuesOfSecondParameter}
        id="valuesOfSecondParameter"
      />
      <DropdownSelect
        isDisabled={form.values.thirdParameter[0] === ''}
        form={form}
        label={labels[2]}
        items={
          form.values.thirdParameter[0] !== ''
            ? (selectOrder.find(
                (item) => item.id === form.values.thirdParameter[0]
              )?.value as MenuItemData[])
            : []
        }
        error={form.errors.valuesOfThirdParameter}
        id="valuesOfThirdParameter"
      />
    </ThreeColumnGrid>
  );
}

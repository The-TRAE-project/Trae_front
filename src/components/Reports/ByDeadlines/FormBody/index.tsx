import { UseFormReturnType } from '@mantine/form';
import { useMemo } from 'react';
import DropdownSelect, { MenuItemData } from '../../../DropdownSelect';
import {
  OperationsShortInfo,
  ProjectsShortInfo,
} from '../../../../store/apis/project/types';
import { ThreeColumnGrid } from '../../../styles';
import { EmployeesShortInfo } from '../../../../store/apis/employee/types';
import DatePicker from '../../../DatePicker';

interface Props<T> {
  form: UseFormReturnType<T, (values: T) => T>;
  employees: EmployeesShortInfo[] | undefined;
  projects: ProjectsShortInfo[] | undefined;
  operations: OperationsShortInfo[] | undefined;
  firstParameter: string | null;
  secondParameter: string | null;
  thirdParameter: string | null;
  setFirstParameter: React.Dispatch<React.SetStateAction<string | null>>;
  setSecondParameter: React.Dispatch<React.SetStateAction<string | null>>;
  setThirdParameter: React.Dispatch<React.SetStateAction<string | null>>;
  setValueOfFirstParameter: React.Dispatch<React.SetStateAction<number | null>>;
  setValuesOfSecondParameter: React.Dispatch<
    React.SetStateAction<number[] | null>
  >;
  setValuesOfThirdParameter: React.Dispatch<
    React.SetStateAction<number[] | null>
  >;
}

export function FormBody<T>({
  form,
  employees,
  projects,
  operations,
  firstParameter,
  secondParameter,
  thirdParameter,
  setFirstParameter,
  setSecondParameter,
  setThirdParameter,
  setValueOfFirstParameter,
  setValuesOfSecondParameter,
  setValuesOfThirdParameter,
}: Props<T>) {
  const ParametersChoices = useMemo(
    () => [
      { id: 'EMPLOYEE', value: 'Сотрудник' },
      { id: 'PROJECT', value: 'Проект' },
      { id: 'OPERATION', value: 'Этап' },
    ],
    []
  );

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

  // console.log('SELECT_OPERATIONS_FINAL: ', operations);
  // console.log(
  //   'PARAMETERS CHOOSEN: ',
  //   firstParameter,
  //   secondParameter,
  //   thirdParameter
  // );
  // TODO: Order of choosing parameters
  return (
    <ThreeColumnGrid>
      <DatePicker
        {...form.getInputProps('startOfPeriod')}
        title="Дата начало"
      />
      <DatePicker
        {...form.getInputProps('endOfPeriod')}
        title="Дата окончания"
      />

      <div>Сделать чекбокс</div>
      <DropdownSelect
        form={form}
        label="Критерий 1"
        items={ParametersChoices}
        error={form.errors.firstParameter}
        id="firstParameter"
        stateCallback={setFirstParameter}
      />
      <DropdownSelect
        form={form}
        label="Критерий 2"
        items={ParametersChoices}
        error={form.errors.secondParameter}
        id="secondParameter"
        stateCallback={setSecondParameter}
      />
      <DropdownSelect
        form={form}
        label="Критерий 3"
        items={ParametersChoices}
        error={form.errors.thirdParameter}
        id="thirdParameter"
        stateCallback={setThirdParameter}
      />

      <DropdownSelect
        form={form}
        label="Критерий"
        items={
          firstParameter
            ? (selectOrder.find((item) => item.id === firstParameter[0])
                ?.value as MenuItemData[])
            : []
        }
        error={form.errors.valueOfFirstParameter}
        id="valueOfFirstParameter"
        stateCallback={setValueOfFirstParameter}
      />

      <DropdownSelect
        form={form}
        label="Критерий"
        items={
          secondParameter
            ? (selectOrder.find((item) => item.id === secondParameter[0])
                ?.value as MenuItemData[])
            : []
        }
        error={form.errors.valuesOfSecondParameter}
        id="valuesOfSecondParameter"
        stateCallback={setValuesOfSecondParameter}
      />
      <DropdownSelect
        form={form}
        label="Критерий"
        items={
          thirdParameter
            ? (selectOrder.find((item) => item.id === thirdParameter[0])
                ?.value as MenuItemData[])
            : []
        }
        error={form.errors.valuesOfThirdParameter}
        id="valuesOfThirdParameter"
        stateCallback={setValuesOfThirdParameter}
      />
    </ThreeColumnGrid>
  );
}

import { UseFormReturnType } from '@mantine/form';
import { useMemo, useState } from 'react';
import DropdownSelect, { MenuItemData } from '../../../DropdownSelect';
import { ThreeColumnGrid } from '../../../styles';
import DatePicker from '../../../DatePicker';
import { CheckboxInput } from '../../../CheckboxInput';
import { DeadlinesReportFormValues } from '../../../../store/apis/reports/types';
import { useGetInfo } from '../helpers/useGetInfo';

interface Props {
  form: UseFormReturnType<
    DeadlinesReportFormValues,
    (values: DeadlinesReportFormValues) => DeadlinesReportFormValues
  >;
}

export function FormBody({ form }: Props) {
  const [isDatesActive, setIsDatesActive] = useState(false);
  const { employees, projects, operations } = useGetInfo(form.values);

  const parametersChoices = useMemo(
    () => [
      { id: 'EMPLOYEE', value: 'Сотрудник' },
      { id: 'PROJECT', value: 'Проект' },
      { id: 'OPERATION', value: 'Этап' },
    ],
    []
  );

  const selectEmployees = useMemo(
    () =>
      employees
        ?.map((employee) => {
          return {
            id: employee.id,
            value: `${employee.firstName} ${employee.lastName}`,
          };
        })
        .sort((a, b) => {
          // eslint-disable-next-line no-nested-ternary
          return a.value < b.value ? -1 : a.value === b.value ? 0 : 1;
        }),
    [employees]
  );

  const selectProjects = useMemo(
    () =>
      projects
        ?.map((project) => {
          return {
            id: project.projectId,
            value: project.number,
          };
        })
        .sort((a, b) => {
          return a.value - b.value;
        }),
    [projects]
  );

  const selectOperations = useMemo(
    () =>
      operations
        ?.map((operation) => {
          return {
            id: operation.operationId,
            value: `${operation.name} ${operation.projectNumber}`,
          };
        })
        .sort((a, b) => {
          // eslint-disable-next-line no-nested-ternary
          return a.value < b.value ? -1 : a.value === b.value ? 0 : 1;
        }),
    [operations]
  );

  const labels = {
    firstParameter:
      parametersChoices.find(
        (item) => item.id === form.values.firstParameter[0].id
      )?.value || 'Критерий',
    secondParameter:
      parametersChoices.find(
        (item) => item.id === form.values.secondParameter[0].id
      )?.value || 'Критерий',
    thirdParameter:
      parametersChoices.find(
        (item) => item.id === form.values.thirdParameter[0].id
      )?.value || 'Критерий',
  };

  const selectOrder = [
    { id: 'EMPLOYEE', value: selectEmployees },
    { id: 'PROJECT', value: selectProjects },
    { id: 'OPERATION', value: selectOperations },
  ];

  const firstParameter = parametersChoices;
  const secondParameter = parametersChoices.filter(
    (item) => item.id !== form.values.firstParameter[0].id
  );

  const thirdParameter = parametersChoices.filter(
    (item) =>
      item.id !== form.values.firstParameter[0].id &&
      item.id !== form.values.secondParameter[0].id
  );

  const valueOfFirstParameter =
    form.values.firstParameter[0].id !== ''
      ? (selectOrder.find(
          (item) => item.id === form.values.firstParameter[0].id
        )?.value as MenuItemData[])
      : [];

  const valuesOfSecondParameter =
    form.values.secondParameter[0].id !== ''
      ? (selectOrder.find(
          (item) => item.id === form.values.secondParameter[0].id
        )?.value as MenuItemData[])
      : [];

  const valuesOfThirdParameter =
    form.values.thirdParameter[0].id !== ''
      ? (selectOrder.find(
          (item) => item.id === form.values.thirdParameter[0].id
        )?.value as MenuItemData[])
      : [];

  const reset = {
    firstParameter: () => {
      form.setValues({
        secondParameter: [{ id: '', value: '' }],
        thirdParameter: [{ id: '', value: '' }],
        valueOfFirstParameter: [],
        valuesOfSecondParameter: [],
        valuesOfThirdParameter: [],
      });
    },
    secondParameter: () => {
      form.setValues({
        thirdParameter: [{ id: '', value: '' }],
        valuesOfSecondParameter: [],
        valuesOfThirdParameter: [],
      });
    },
    valueOfFirstParameter: () => {
      form.setValues({
        secondParameter: [{ id: '', value: '' }],
        thirdParameter: [{ id: '', value: '' }],
        valuesOfSecondParameter: [],
        valuesOfThirdParameter: [],
      });
    },
  };

  // TODO: change disabled styles similiar to DetailsCard
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
        onChange={(event) => {
          reset.firstParameter();
          form.setValues({
            startOfPeriod: undefined,
            endOfPeriod: undefined,
          });
          setIsDatesActive(event.currentTarget.checked);
        }}
      />
      <DropdownSelect
        form={form}
        label="Критерий 1"
        items={firstParameter}
        error={form.errors.firstParameter}
        id="firstParameter"
        isRadio
        partialReset={reset.firstParameter}
      />
      <DropdownSelect
        isDisabled={
          form.values.firstParameter[0].id === '' ||
          form.values.valueOfFirstParameter.length === 0
        }
        form={form}
        label="Критерий 2"
        items={secondParameter}
        error={form.errors.secondParameter}
        id="secondParameter"
        isRadio
        partialReset={reset.secondParameter}
      />
      <DropdownSelect
        isDisabled={
          (form.values.secondParameter[0].id === '' ||
            form.values.valuesOfSecondParameter.length === 0) &&
          form.values.thirdParameter[0].id === ''
        }
        form={form}
        label="Критерий 3"
        items={thirdParameter}
        error={form.errors.thirdParameter}
        id="thirdParameter"
        isRadio
      />

      <DropdownSelect
        isDisabled={form.values.firstParameter[0].id === ''}
        form={form}
        label={labels.firstParameter}
        items={valueOfFirstParameter}
        error={form.errors.valueOfFirstParameter}
        id="valueOfFirstParameter"
        isRadio
        partialReset={reset.valueOfFirstParameter}
      />

      <DropdownSelect
        isDisabled={form.values.secondParameter[0].id === ''}
        form={form}
        label={labels.secondParameter}
        items={valuesOfSecondParameter}
        error={form.errors.valuesOfSecondParameter}
        id="valuesOfSecondParameter"
      />
      <DropdownSelect
        isDisabled={form.values.thirdParameter[0].id === ''}
        form={form}
        label={labels.thirdParameter}
        items={valuesOfThirdParameter}
        error={form.errors.valuesOfThirdParameter}
        id="valuesOfThirdParameter"
      />
    </ThreeColumnGrid>
  );
}

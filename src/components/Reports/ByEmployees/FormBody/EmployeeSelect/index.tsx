import { useState } from 'react';
import { Checkbox, Menu } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { EmployeeReportFormValues } from '../../../../../store/apis/reports/types';
import { EmployeeShortInfo } from '../../../../../store/apis/employee/types';
import { selectOnlyIds } from '../../../../../helpers/selectOnlyIds';
import {
  ErrorMessage,
  FilterMenuItemGroup,
  FilterMenuItemTitle,
  SelectArrow,
  SelectDisplayInput,
  SelectLabel,
  SelectWrapper,
  useCheckboxStyles,
  useFilterMenuStyles,
} from '../../../../styles';
import {
  SelectAllTitle,
  SelectedEmployee,
  useEmployeeSelectMenuStyles,
} from './styles';

interface Props {
  form: UseFormReturnType<
    EmployeeReportFormValues,
    (values: EmployeeReportFormValues) => EmployeeReportFormValues
  >;
  employees: EmployeeShortInfo[];
}

const EmployeeSelect = ({ form, employees }: Props) => {
  const [opened, setOpened] = useState<boolean>(false);
  const [selectedEmployees, setSelectedEmployees] = useState<
    EmployeeShortInfo[]
  >([]);

  const {
    classes: { input, inner, icon },
  } = useCheckboxStyles();
  const {
    classes: { item },
  } = useFilterMenuStyles();
  const {
    classes: { dropdown },
  } = useEmployeeSelectMenuStyles();

  const { employeeIds } = form.values;
  const isAllSelected = employeeIds.length === employees.length;

  const handleSetEmployeeIds = (employee: EmployeeShortInfo) => {
    form.setFieldValue('employeeIds', []);
    if (!selectedEmployees.includes(employee)) {
      const newEmployees = [...selectedEmployees, employee];
      setSelectedEmployees(newEmployees);
      form.setFieldValue('employeeIds', selectOnlyIds(newEmployees));
    } else if (selectedEmployees.includes(employee)) {
      const filteredEmployees =
        selectedEmployees?.filter((it) => it.id !== employee.id) || [];
      form.setFieldValue('employeeIds', selectOnlyIds(filteredEmployees));
      setSelectedEmployees(filteredEmployees);
    }
  };

  const handleSelectAll = () =>
    form.setFieldValue('employeeIds', selectOnlyIds(employees));

  return (
    <SelectWrapper>
      <SelectLabel>Сотрудники</SelectLabel>
      <Menu
        opened={opened}
        onChange={setOpened}
        closeOnItemClick={false}
        classNames={{
          dropdown,
          item,
        }}
      >
        <Menu.Target>
          <SelectDisplayInput>
            <input {...form.getInputProps('employeeIds')} type="text" />
            {isAllSelected ? (
              <SelectAllTitle>Все</SelectAllTitle>
            ) : (
              selectedEmployees.map((selectedEmployee) => (
                <SelectedEmployee key={selectedEmployee.id}>
                  {selectedEmployee.firstName}&nbsp;
                  {selectedEmployee.lastName}
                </SelectedEmployee>
              ))
            )}
            <SelectArrow $isOpen={opened} size={34} />
          </SelectDisplayInput>
        </Menu.Target>
        {form.errors && form.errors.employeeIds && (
          <ErrorMessage>{form.errors.employeeIds}</ErrorMessage>
        )}

        <Menu.Dropdown>
          <Menu.Item onClick={handleSelectAll}>
            <FilterMenuItemGroup>
              <Checkbox
                readOnly
                checked={isAllSelected}
                classNames={{ input, inner, icon }}
              />
              <FilterMenuItemTitle $active={isAllSelected}>
                Все
              </FilterMenuItemTitle>
            </FilterMenuItemGroup>
          </Menu.Item>

          {employees.map((employee) => (
            <Menu.Item
              key={employee.id}
              onClick={() => handleSetEmployeeIds(employee)}
            >
              <FilterMenuItemGroup>
                <Checkbox
                  readOnly
                  checked={
                    selectedEmployees.includes(employee) && !isAllSelected
                  }
                  classNames={{ input, inner, icon }}
                />
                <FilterMenuItemTitle
                  $active={
                    selectedEmployees.includes(employee) && !isAllSelected
                  }
                >
                  {employee.firstName} {employee.lastName}
                </FilterMenuItemTitle>
              </FilterMenuItemGroup>
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </SelectWrapper>
  );
};

export default EmployeeSelect;

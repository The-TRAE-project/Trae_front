import { useState } from 'react';
import { Menu } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { EmployeeReportFormValues } from '../../../../../store/apis/reports/types';
import { EmployeeShortInfo } from '../../../../../store/apis/employee/types';
import { selectOnlyIds } from '../../../../../helpers/selectOnlyIds';
import MenuItem from '../../../../FilterMenu/MenuItem';
import {
  ErrorMessage,
  SelectArrow,
  SelectDisplayInput,
  SelectLabel,
  SelectWrapper,
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
    classes: { dropdown, item },
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
          <MenuItem
            title="Все"
            onClick={handleSelectAll}
            isActive={isAllSelected}
          />

          {employees.map((employee) => (
            <MenuItem
              key={employee.id}
              title={`${employee.firstName} ${employee.lastName}`}
              onClick={() => handleSetEmployeeIds(employee)}
              isActive={selectedEmployees.includes(employee) && !isAllSelected}
            />
          ))}
        </Menu.Dropdown>
      </Menu>
    </SelectWrapper>
  );
};

export default EmployeeSelect;

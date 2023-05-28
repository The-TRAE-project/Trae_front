import { useState } from 'react';
import { Checkbox, Menu } from '@mantine/core';
import {
  FilterMenuItemGroup,
  FilterMenuItemTitle,
  SelectArrow,
  SelectDisplayInput,
  SelectLabel,
  SelectWrapper,
  useCheckboxStyles,
  useFilterMenuStyles,
} from '../../../../styles';
import { useEmployeeSelectMenuStyles } from './styles';

const EmployeeSelect = () => {
  const [opened, setOpened] = useState<boolean>(false);

  const {
    classes: { input, inner, icon },
  } = useCheckboxStyles();
  const {
    classes: { item },
  } = useFilterMenuStyles();
  const {
    classes: { dropdown },
  } = useEmployeeSelectMenuStyles();

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
            <SelectArrow $isOpen={opened} size={34} />
          </SelectDisplayInput>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>
            <FilterMenuItemGroup>
              <Checkbox
                readOnly
                // checked={!status}
                classNames={{ input, inner, icon }}
              />
              <FilterMenuItemTitle $active>Все</FilterMenuItemTitle>
            </FilterMenuItemGroup>
          </Menu.Item>

          <Menu.Item>
            <FilterMenuItemGroup>
              <Checkbox
                readOnly
                // checked={item.value === status}
                classNames={{ input, inner, icon }}
              />
              <FilterMenuItemTitle $active>Иван Иванов</FilterMenuItemTitle>
            </FilterMenuItemGroup>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </SelectWrapper>
  );
};

export default EmployeeSelect;

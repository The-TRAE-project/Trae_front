import { useState } from 'react';
import { Menu } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import MenuItem from '../FilterMenu/MenuItem';
import {
  ErrorMessage,
  SelectArrow,
  SelectDisplayInput,
  SelectLabel,
  SelectWrapper,
} from '../styles';
import {
  SelectAllTitle,
  SelectedMenuItem,
  useDropdownSelectMenuStyles,
} from './styles';

export interface MenuItemData {
  id: number | string;
  value: number | string;
}

interface Props {
  form: UseFormReturnType<any, (values: any) => any>;
  items: MenuItemData[];
  label: string;
  id: string;
  stateCallback: React.Dispatch<React.SetStateAction<any | null>>;
  error?: React.ReactNode;
  isRadio?: boolean;
}

function DropdownSelect({
  form,
  items,
  label,
  id,
  error,
  isRadio,
  stateCallback,
}: Props) {
  const [opened, setOpened] = useState<boolean>(false);
  const [selectedMenuItems, setSelectedMenuItems] = useState<MenuItemData[]>(
    []
  );

  const {
    classes: { dropdown, item },
  } = useDropdownSelectMenuStyles();

  const ids = form.values[id];
  const isAllSelected = ids ? ids.length === items.length : false;

  const handleSetItemIds = (menuItem: MenuItemData) => {
    form.setFieldValue(id, []);

    if (!selectedMenuItems.includes(menuItem)) {
      const newMenuItem = [...selectedMenuItems, menuItem];
      setSelectedMenuItems(newMenuItem);
      form.setFieldValue(
        id,
        newMenuItem.map((i) => i.id)
      );
      stateCallback(newMenuItem.map((i) => i.id));
    } else if (selectedMenuItems.includes(menuItem)) {
      const filteredMenuItems =
        selectedMenuItems?.filter((it) => it.id !== menuItem.id) || [];
      form.setFieldValue(
        id,
        filteredMenuItems.map((i) => i.id)
      );
      setSelectedMenuItems(filteredMenuItems);
      stateCallback(filteredMenuItems.map((i) => i.id));
    }
  };

  const handleSelectAll = () => {
    form.setFieldValue(
      id,
      items.map((i) => i.id)
    );
    stateCallback(items.map((i) => i.id));
  };

  return (
    <SelectWrapper>
      <SelectLabel>{label}</SelectLabel>
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
            <input {...form.getInputProps(id)} type="text" />
            {isAllSelected ? (
              <SelectAllTitle>Все</SelectAllTitle>
            ) : (
              selectedMenuItems.map((selectedMenuItem) => (
                <SelectedMenuItem key={selectedMenuItem.id}>
                  {selectedMenuItem.value}
                </SelectedMenuItem>
              ))
            )}
            <SelectArrow $isOpen={opened} size={34} />
          </SelectDisplayInput>
        </Menu.Target>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Menu.Dropdown>
          <MenuItem
            title="Все"
            onClick={handleSelectAll}
            isActive={isAllSelected}
          />

          {items.map((currentItem) => (
            <MenuItem
              key={currentItem.id}
              title={`${currentItem.value}`}
              onClick={() => handleSetItemIds(currentItem)}
              isActive={
                selectedMenuItems.includes(currentItem) && !isAllSelected
              }
            />
          ))}
        </Menu.Dropdown>
      </Menu>
    </SelectWrapper>
  );
}

export default DropdownSelect;

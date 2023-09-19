import { useCallback, useEffect, useState } from 'react';
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

export interface DropdownSelectProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturnType<any, (values: any) => any>;
  items: MenuItemData[];
  label: string;
  id: string;
  error?: React.ReactNode;
  isRadio?: boolean;
  isDisabled?: boolean;
  partialReset?: () => void;
}

function DropdownSelect({
  form,
  items,
  label,
  id,
  error,
  isRadio,
  isDisabled,
  partialReset,
}: DropdownSelectProps) {
  const [opened, setOpened] = useState<boolean>(false);

  const {
    classes: { dropdown, item },
  } = useDropdownSelectMenuStyles();

  const handleSetItem = useCallback(
    (newMenuItem: MenuItemData) => {
      form.setFieldValue(id, [newMenuItem]);
    },
    [form, id]
  );

  useEffect(() => {
    if (items.length === 1 && !isDisabled) {
      handleSetItem(items[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabled]);

  const selectedMenuItems = form.values[id];

  const handleSetItemIds = (menuItem: MenuItemData) => {
    form.setFieldValue(id, []);
    if (!selectedMenuItems.find((it: MenuItemData) => it.id === menuItem.id)) {
      const newMenuItem = [...selectedMenuItems, menuItem];
      form.setFieldValue(id, newMenuItem);
    } else if (
      selectedMenuItems.find((it: MenuItemData) => it.id === menuItem.id)
    ) {
      const filteredMenuItems =
        selectedMenuItems?.filter(
          (it: MenuItemData) => it.id !== menuItem.id
        ) || [];
      form.setFieldValue(id, filteredMenuItems);
    }
  };

  const handleSelectAll = () => {
    form.setFieldValue(id, items || []);
  };

  const ids = form.values[id];
  const isAllSelected = ids && items ? ids.length === items.length : false;

  return (
    <SelectWrapper>
      <SelectLabel>{label}</SelectLabel>
      <Menu
        disabled={isDisabled}
        opened={opened}
        onChange={setOpened}
        closeOnItemClick={false}
        classNames={{
          dropdown,
          item,
        }}
      >
        <Menu.Target>
          <SelectDisplayInput $disabled={isDisabled}>
            <input
              {...form.getInputProps(id)}
              type="text"
              disabled={isDisabled}
            />
            {isAllSelected && !isDisabled && !isRadio ? (
              <SelectAllTitle>Все</SelectAllTitle>
            ) : (
              selectedMenuItems.map((selectedMenuItem: MenuItemData) => {
                const result =
                  selectedMenuItem.value !== '' ? (
                    <SelectedMenuItem key={selectedMenuItem.id}>
                      {selectedMenuItem.value}
                    </SelectedMenuItem>
                  ) : null;
                return result;
              })
            )}
            <SelectArrow $isOpen={opened} size={34} $isDisabled={isDisabled} />
          </SelectDisplayInput>
        </Menu.Target>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Menu.Dropdown>
          {!isRadio && (
            <MenuItem
              title="Все"
              onClick={handleSelectAll}
              isActive={isAllSelected}
            />
          )}

          {items.map((currentItem) => (
            <MenuItem
              key={currentItem.id}
              title={`${currentItem.value}`}
              onClick={() => {
                if (isRadio) {
                  handleSetItem(currentItem);
                } else {
                  handleSetItemIds(currentItem);
                }
                if (
                  form.values[id].length !== 0 &&
                  form.values[id][0].id !== '' &&
                  !!partialReset
                ) {
                  partialReset();
                }
              }}
              isActive={
                !!selectedMenuItems.find(
                  (it: MenuItemData) => it.id === currentItem.id
                ) && !isAllSelected
              }
              isCircle={isRadio}
            />
          ))}
        </Menu.Dropdown>
      </Menu>
    </SelectWrapper>
  );
}

export default DropdownSelect;

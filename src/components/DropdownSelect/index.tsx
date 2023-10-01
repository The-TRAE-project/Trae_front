import { useCallback, useEffect, useState } from 'react';
import { Menu } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

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
import MenuItem from './MenuItem/MenuItem';

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
    classes: { dropdown },
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
  const handleMenuItemClick = (currentItem: MenuItemData) => {
    if (isRadio) {
      handleSetItem(currentItem);
      setOpened(false);
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
                return selectedMenuItem.value !== '' ? (
                  <SelectedMenuItem key={selectedMenuItem.id}>
                    {selectedMenuItem.value}
                  </SelectedMenuItem>
                ) : null;
              })
            )}
            <SelectArrow $isOpen={opened} size={34} $isDisabled={isDisabled} />
          </SelectDisplayInput>
        </Menu.Target>
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Menu.Dropdown>
          {!isRadio && (
            <MenuItem
              onClick={handleSelectAll}
              isActive={isAllSelected}
              title="Все"
            />
          )}

          {items.map((currentItem) => {
            const isActive =
              !!selectedMenuItems.find(
                (it: MenuItemData) => it.id === currentItem.id
              ) && !isAllSelected;
            return (
              <MenuItem
                key={currentItem.id}
                onClick={() => handleMenuItemClick(currentItem)}
                isActive={isActive}
                isRadio={isRadio}
                title={`${currentItem.value}`}
              />
            );
          })}
        </Menu.Dropdown>
      </Menu>
    </SelectWrapper>
  );
}

export default DropdownSelect;

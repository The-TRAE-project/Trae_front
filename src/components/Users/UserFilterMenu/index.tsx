import { Dispatch, SetStateAction } from 'react';
import { Menu, Checkbox, Group } from '@mantine/core';

import { Status as StatusTitle } from '../../../store/types';
import { Status } from '../../../store/apis/user/types';
import { useGetAllRolesQuery } from '../../../store/apis/user';
import Filter from '../../svgs/Filter';
import {
  FilterMenuItemTitle,
  UnstyledButton,
  useCheckboxStyles,
  useFilterMenuStyles,
} from '../../styles';

const statuses = [
  {
    value: Status.ACTIVE,
    title: StatusTitle.ACTIVE,
  },
  {
    value: Status.NOT_ACTIVE,
    title: StatusTitle.BLOCKED,
  },
];

interface Props {
  role: string | null;
  setRole: Dispatch<SetStateAction<string | null>>;
  resetRole: () => void;
  status: Status | null;
  setStatus: Dispatch<SetStateAction<Status | null>>;
  resetStatus: () => void;
}

const UserFilterMenu = ({
  role,
  setRole,
  resetRole,
  status,
  setStatus,
  resetStatus,
}: Props) => {
  const { classes } = useFilterMenuStyles();
  const {
    classes: { input, inner, icon },
  } = useCheckboxStyles();
  const { data: roles } = useGetAllRolesQuery();

  return (
    <Menu
      closeOnItemClick={false}
      classNames={{
        dropdown: classes.dropdown,
        label: classes.label,
        item: classes.item,
      }}
    >
      <Menu.Target>
        <UnstyledButton>
          <Filter />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Статус</Menu.Label>
        {statuses.map((item) => (
          <Menu.Item key={item.value} onClick={() => setStatus(item.value)}>
            <Group spacing={12}>
              <Checkbox
                readOnly
                checked={item.value === status}
                classNames={{ input, inner, icon }}
              />
              <FilterMenuItemTitle $active={item.value === status}>
                {item.title}
              </FilterMenuItemTitle>
            </Group>
          </Menu.Item>
        ))}
        <Menu.Item onClick={resetStatus}>
          <Group spacing={12}>
            <Checkbox
              readOnly
              checked={!status}
              classNames={{ input, inner, icon }}
            />
            <FilterMenuItemTitle $active={!status}>Все</FilterMenuItemTitle>
          </Group>
        </Menu.Item>

        <Menu.Label>Категория</Menu.Label>
        {!!roles &&
          Object.values(roles).map((item) => (
            <Menu.Item key={item} onClick={() => setRole(item)}>
              <Group spacing={12}>
                <Checkbox
                  readOnly
                  checked={item === role}
                  classNames={{ input, inner, icon }}
                />
                <FilterMenuItemTitle $active={item === role}>
                  {item}
                </FilterMenuItemTitle>
              </Group>
            </Menu.Item>
          ))}
        <Menu.Item onClick={resetRole}>
          <Group spacing={12}>
            <Checkbox
              readOnly
              checked={!role}
              classNames={{ input, inner, icon }}
            />
            <FilterMenuItemTitle $active={!role}> Все</FilterMenuItemTitle>
          </Group>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserFilterMenu;

import { Dispatch, SetStateAction } from 'react';
import { Menu } from '@mantine/core';

import { useGetAllRolesQuery } from '../../../store/apis/user';
import { Status } from '../../../store/apis/user/types';
import { UnstyledButton } from '../../styles';
import Filter from '../../svgs/Filter';
import { MenuItemTitle, useUserFilterStyles } from './styles';

const statuses = [
  {
    value: Status.ACTIVE,
    title: 'Активный',
  },
  {
    value: Status.NOT_ACTIVE,
    title: 'Заблокированный',
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
  const { classes } = useUserFilterStyles();
  const { data: roles } = useGetAllRolesQuery();

  return (
    <Menu
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
            <MenuItemTitle $active={item.value === status}>
              {item.title}
            </MenuItemTitle>
          </Menu.Item>
        ))}
        <Menu.Item onClick={resetStatus}>
          <MenuItemTitle $active={!status}>Все</MenuItemTitle>
        </Menu.Item>

        <Menu.Label>Категория</Menu.Label>
        {!!roles &&
          Object.values(roles).map((item) => (
            <Menu.Item key={item} onClick={() => setRole(item)}>
              <MenuItemTitle $active={item === role}>{item}</MenuItemTitle>
            </Menu.Item>
          ))}
        <Menu.Item onClick={resetRole}>
          <MenuItemTitle $active={!role}> Все</MenuItemTitle>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserFilterMenu;

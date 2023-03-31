import { Dispatch, SetStateAction } from 'react';
import { Menu } from '@mantine/core';

import { Roles } from '../../../store/slices/auth/types';
import { useGetAllRolesQuery } from '../../../store/apis/user';
import { Status } from '../../../store/apis/user/types';
import { UnstyledButton } from '../../styles';
import Filter from '../../svgs/Filter';
import { MenuItem, useUserFilterStyles } from './styles';

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

  // TODO:
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
          <MenuItem
            key={item.value}
            onClick={() => setStatus(item.value)}
            $active={item.value === status}
          >
            {item.title}
          </MenuItem>
        ))}
        <MenuItem onClick={resetStatus} $active={!status}>
          Все
        </MenuItem>

        <Menu.Label>Категория</Menu.Label>
        {!!roles &&
          Object.values(roles).map((item) => (
            <MenuItem
              key={item}
              onClick={() => setRole(item)}
              $active={item === role}
            >
              {item}
            </MenuItem>
          ))}
        <MenuItem onClick={resetRole} $active={!role}>
          Все
        </MenuItem>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserFilterMenu;

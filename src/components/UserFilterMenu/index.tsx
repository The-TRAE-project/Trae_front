import { Dispatch, SetStateAction } from 'react';
import { Menu } from '@mantine/core';

import { Roles } from '../../store/slices/auth/types';
import { Status } from '../../store/apis/user/types';
import { UnstyledButton } from '../styles';
import Filter from '../svgs/Filter';
import { MenuItem, useUserFilterStyles } from './styles';

const filterValues = {
  byStatus: [
    {
      value: Status.ACTIVE,
      title: 'Активный',
    },
    {
      value: Status.NOT_ACTIVE,
      title: 'Заблокированный',
    },
  ],
  byRole: [
    {
      value: Roles.CONSTRUCTOR,
      title: 'Конструктор',
    },
    {
      value: Roles.EMPLOYEE,
      title: 'Терминал цех',
    },
    {
      value: Roles.ADMIN,
      title: 'Администратор',
    },
  ],
};

interface Props {
  role: Roles | null;
  setRole: Dispatch<SetStateAction<Roles | null>>;
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
        {filterValues.byStatus.map((item) => (
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

        <Menu.Divider />

        <Menu.Label>Категория</Menu.Label>
        {filterValues.byRole.map((item) => (
          <MenuItem
            key={item.value}
            onClick={() => setRole(item.value)}
            $active={item.value === role}
          >
            {item.title}
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

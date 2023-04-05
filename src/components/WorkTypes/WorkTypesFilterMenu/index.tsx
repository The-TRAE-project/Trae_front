import { Dispatch, SetStateAction } from 'react';
import { Menu } from '@mantine/core';

import { Status } from '../../../store/apis/user/types';
import {
  FilterMenuItemTitle,
  UnstyledButton,
  useFilterMenuStyles,
} from '../../styles';
import Filter from '../../svgs/Filter';

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
  status: Status | null;
  setStatus: Dispatch<SetStateAction<Status | null>>;
  resetStatus: () => void;
}

const WorkTypesFilterMenu = ({ status, setStatus, resetStatus }: Props) => {
  const { classes } = useFilterMenuStyles();

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
            <FilterMenuItemTitle $active={item.value === status}>
              {item.title}
            </FilterMenuItemTitle>
          </Menu.Item>
        ))}
        <Menu.Item onClick={resetStatus}>
          <FilterMenuItemTitle $active={!status}>Все</FilterMenuItemTitle>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default WorkTypesFilterMenu;

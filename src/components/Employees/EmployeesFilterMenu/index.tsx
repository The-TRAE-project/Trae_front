import { Dispatch, SetStateAction } from 'react';
import { Menu } from '@mantine/core';

import { useGetActiveWorkTypesQuery } from '../../../store/apis/workTypes';
import { Status } from '../../../store/apis/user/types';
import Filter from '../../svgs/Filter';
import {
  FilterMenuItemTitle,
  UnstyledButton,
  useFilterMenuStyles,
} from '../../styles';
import { OverflowWrapper } from './styles';

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
  typeWork: number | null;
  setTypeWork: Dispatch<SetStateAction<number | null>>;
  resetTypeWork: () => void;
  status: Status | null;
  setStatus: Dispatch<SetStateAction<Status | null>>;
  resetStatus: () => void;
}

const EmployeesFilterMenu = ({
  typeWork,
  setTypeWork,
  resetTypeWork,
  status,
  setStatus,
  resetStatus,
}: Props) => {
  const { classes } = useFilterMenuStyles();
  const { data: workTypes } = useGetActiveWorkTypesQuery();

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

        <Menu.Label>Категория</Menu.Label>
        <OverflowWrapper>
          <Menu.Item onClick={resetTypeWork}>
            <FilterMenuItemTitle $active={!typeWork}> Все</FilterMenuItemTitle>
          </Menu.Item>
          {!!workTypes &&
            workTypes.map((workType) => (
              <Menu.Item
                key={workType.id}
                onClick={() => setTypeWork(workType.id)}
              >
                <FilterMenuItemTitle $active={workType.id === typeWork}>
                  {workType.name}
                </FilterMenuItemTitle>
              </Menu.Item>
            ))}
        </OverflowWrapper>
      </Menu.Dropdown>
    </Menu>
  );
};

export default EmployeesFilterMenu;

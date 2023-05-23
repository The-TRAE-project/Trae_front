import { Dispatch, SetStateAction } from 'react';
import { Menu, Checkbox } from '@mantine/core';

import { Status as StatusTitle } from '../../../store/types';
import { Status } from '../../../store/apis/user/types';
import Filter from '../../svgs/Filter';
import {
  FilterMenuItemGroup,
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
  status: Status | null;
  setStatus: Dispatch<SetStateAction<Status | null>>;
  resetStatus: () => void;
}

const WorkTypesFilterMenu = ({ status, setStatus, resetStatus }: Props) => {
  const { classes } = useFilterMenuStyles();
  const {
    classes: { input, inner, icon },
  } = useCheckboxStyles();

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
        <UnstyledButton $isFilterIcon>
          <Filter />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Статус</Menu.Label>
        {statuses.map((item) => (
          <Menu.Item key={item.value} onClick={() => setStatus(item.value)}>
            <FilterMenuItemGroup>
              <Checkbox
                readOnly
                checked={item.value === status}
                classNames={{ input, inner, icon }}
              />
              <FilterMenuItemTitle $active={item.value === status}>
                {item.title}
              </FilterMenuItemTitle>
            </FilterMenuItemGroup>
          </Menu.Item>
        ))}
        <Menu.Item onClick={resetStatus}>
          <FilterMenuItemGroup>
            <Checkbox
              readOnly
              checked={!status}
              classNames={{ input, inner, icon }}
            />
            <FilterMenuItemTitle $active={!status}>Все</FilterMenuItemTitle>
          </FilterMenuItemGroup>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default WorkTypesFilterMenu;

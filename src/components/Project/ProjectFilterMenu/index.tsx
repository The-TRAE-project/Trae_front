import { Dispatch, SetStateAction } from 'react';
import { Menu, Checkbox, Group } from '@mantine/core';

import Filter from '../../svgs/Filter';
import {
  FilterMenuItemTitle,
  UnstyledButton,
  useCheckboxStyles,
  useFilterMenuStyles,
} from '../../styles';

const inWorkStatuses = [
  {
    value: true,
    title: 'Новые',
  },
  {
    value: true,
    title: 'Новые',
  },
];

interface Props {
  isEnded: boolean;
  setIsEnded: Dispatch<SetStateAction<boolean>>;
  isFirstNoAcceptance: boolean;
  setIsFirstNoAcceptance: Dispatch<SetStateAction<boolean>>;
  isLastInWork: boolean;
  setIsLastInWork: Dispatch<SetStateAction<boolean>>;
  isCurrentOverdue: boolean;
  setParamIsCurrentOverdue: Dispatch<SetStateAction<boolean>>;
  reset: () => void;
}

const ProjectFilterMenu = ({
  isEnded,
  setIsEnded,
  isFirstNoAcceptance,
  setIsFirstNoAcceptance,
  isLastInWork,
  setIsLastInWork,
  isCurrentOverdue,
  setParamIsCurrentOverdue,
  reset,
}: Props) => {
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
        <UnstyledButton>
          <Filter />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={() => setIsEnded(true)}>
          <Group spacing={12}>
            <Checkbox
              readOnly
              checked={isEnded}
              classNames={{ input, inner, icon }}
            />
            <FilterMenuItemTitle $active={isEnded}>
              Выполнены
            </FilterMenuItemTitle>
          </Group>
        </Menu.Item>
        <Menu.Item onClick={reset}>
          <Group spacing={12}>
            <Checkbox
              readOnly
              checked={!isEnded}
              classNames={{ input, inner, icon }}
            />
            <FilterMenuItemTitle $active={!isEnded}>Все</FilterMenuItemTitle>
          </Group>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProjectFilterMenu;

import { Menu as MantineMenu } from '@mantine/core';
import { ReactNode } from 'react';

import { UnstyledButton } from '../../styles';
import Filter from '../../svgs/Filter';
import { useMenuStyles } from './styles';

interface Props {
  onClick?: () => void;
  closeOnItemClick?: boolean;
  children: ReactNode;
}

const Menu = ({ onClick, closeOnItemClick = false, children }: Props) => {
  const {
    classes: { dropdown, label, item },
  } = useMenuStyles();

  const toggle = () => onClick?.();

  return (
    <MantineMenu
      closeOnItemClick={closeOnItemClick}
      classNames={{
        dropdown,
        label,
        item,
      }}
    >
      <MantineMenu.Target>
        <UnstyledButton onClick={toggle} $isFilterIcon>
          <Filter />
        </UnstyledButton>
      </MantineMenu.Target>
      <MantineMenu.Dropdown>{children}</MantineMenu.Dropdown>
    </MantineMenu>
  );
};

export default Menu;

import { Menu as MantineMenu } from '@mantine/core';
import { ReactNode } from 'react';

import { BgWhiteCardLinkBtn, UnstyledButton } from '../../styles';
import Filter from '../../svgs/Filter';
import { useMenuStyles } from './styles';

interface Props {
  onClick?: () => void;
  closeOnItemClick?: boolean;
  children: ReactNode;
  isButton?: boolean;
  title?: string;
}

// TODO add styles for button variant
const Menu = ({
  onClick,
  closeOnItemClick = false,
  children,
  isButton = false,
  title,
}: Props) => {
  const {
    classes: { dropdown, label, item },
  } = useMenuStyles();

  const toggle = () => onClick?.();

  // TODO: complete styling for sorting button
  return (
    <MantineMenu
      closeOnItemClick={closeOnItemClick}
      classNames={{
        dropdown,
        label,
        item,
      }}
    >
      <div>
        {isButton && <p>Сортировка</p>}
        <MantineMenu.Target>
          {isButton ? (
            <BgWhiteCardLinkBtn onClick={toggle}>{title}</BgWhiteCardLinkBtn>
          ) : (
            <UnstyledButton onClick={toggle} $isFilterIcon>
              <Filter />
            </UnstyledButton>
          )}
        </MantineMenu.Target>
      </div>
      <MantineMenu.Dropdown>{children}</MantineMenu.Dropdown>
    </MantineMenu>
  );
};

export default Menu;

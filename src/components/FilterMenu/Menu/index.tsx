import { Menu as MantineMenu } from '@mantine/core';
import { ReactNode, useState } from 'react';

import {
  BgWhiteMenuBtn,
  TitleMenuButton,
  UnstyledButton,
  SelectArrow,
} from '../../styles';
import Filter from '../../svgs/Filter';
import { ButtonTitle, useMenuStyles } from './styles';

interface Props {
  onClick?: () => void;
  closeOnItemClick?: boolean;
  children: ReactNode;
  isButton?: boolean;
  title?: string;
}

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
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(() => !isOpen);
    onClick?.();
  };

  // TODO: button title to the left, add arrow
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
        {isButton && <TitleMenuButton>Сортировка</TitleMenuButton>}
        <MantineMenu.Target>
          {isButton ? (
            <BgWhiteMenuBtn onClick={toggle}>
              <ButtonTitle>{title}</ButtonTitle>
              <SelectArrow $isOpen={isOpen} />
            </BgWhiteMenuBtn>
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

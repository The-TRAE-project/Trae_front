import { useId } from 'react';
import { Collapse } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Menu from '../../FilterMenu/Menu';
import MenuItem from '../../FilterMenu/MenuItem';
import { MenuItemStack } from './styles';
// TODO:
interface Props {
  onClearInput: () => void;
  isEnded: boolean;
  setIsEnded: () => void;
  isFirstNoAcceptance: boolean;
  setIsFirstNoAcceptance: () => void;
  isLastInWork: boolean;
  setIsLastInWork: () => void;
  isCurrentOpOverdue: boolean;
  setIsCurrentOpOverdue: () => void;
  isCurrentPrOverdue: boolean;
  setIsCurrentPrOverdue: () => void;
  isCurrentInWork: boolean;
  setIsCurrentInWork: () => void;
  reset: () => void;
  onEnded: () => void;
  isAllInWork: boolean;
}

const ProjectFilterMenu = ({
  onClearInput,
  isEnded,
  setIsEnded,
  isFirstNoAcceptance,
  setIsFirstNoAcceptance,
  isLastInWork,
  setIsLastInWork,
  isCurrentOpOverdue,
  setIsCurrentOpOverdue,
  isCurrentPrOverdue,
  setIsCurrentPrOverdue,
  isCurrentInWork,
  setIsCurrentInWork,
  reset,
  onEnded,
  isAllInWork,
}: Props) => {
  const [opened, { toggle }] = useDisclosure(false);

  const filterValues = [
    {
      id: useId(),
      title: 'Новые',
      onClick: setIsFirstNoAcceptance,
      isActive: isFirstNoAcceptance,
    },
    {
      id: useId(),
      title: 'В работе сейчас',
      onClick: setIsCurrentInWork,
      isActive: isCurrentInWork,
    },
    {
      id: useId(),
      title: 'Готовые к отгрузке',
      onClick: setIsLastInWork,
      isActive: isLastInWork,
    },
    {
      id: useId(),
      title: 'Истек срок этапа',
      onClick: setIsCurrentOpOverdue,
      isActive: isCurrentOpOverdue,
    },
    {
      id: useId(),
      title: 'Истек срок проекта',
      onClick: setIsCurrentPrOverdue,
      isActive: isCurrentPrOverdue,
    },
    {
      id: useId(),
      title: 'Все',
      onClick: onEnded,
      isActive: isAllInWork,
    },
  ];

  const isInWorkActive =
    isFirstNoAcceptance ||
    isLastInWork ||
    isCurrentInWork ||
    isCurrentOpOverdue ||
    isCurrentPrOverdue ||
    isAllInWork;

  const isAllSelected =
    !isEnded &&
    !isFirstNoAcceptance &&
    !isLastInWork &&
    !isCurrentOpOverdue &&
    !isCurrentPrOverdue &&
    !isCurrentInWork &&
    !isAllInWork;

  return (
    <Menu onClick={onClearInput}>
      <MenuItem title="В работе" onClick={toggle} isActive={isInWorkActive} />

      <Collapse in={opened}>
        <MenuItemStack>
          {filterValues.map((filterValue) => (
            <MenuItem
              key={filterValue.id}
              title={filterValue.title}
              onClick={filterValue.onClick}
              isActive={filterValue.isActive}
              isCircle
            />
          ))}
        </MenuItemStack>
      </Collapse>

      <MenuItem title="Выполнены" onClick={setIsEnded} isActive={isEnded} />
      <MenuItem title="Все" onClick={reset} isActive={isAllSelected} />
    </Menu>
  );
};

export default ProjectFilterMenu;

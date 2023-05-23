import { Menu, Checkbox, Collapse } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Filter from '../../svgs/Filter';
import {
  FilterMenuItemGroup,
  FilterMenuItemTitle,
  UnstyledButton,
  useCheckboxStyles,
  useFilterMenuStyles,
} from '../../styles';
import {
  MenuItemStack,
  useCircleCheckboxStyles,
  useMenuStyles,
} from './styles';
// TODO:
interface Props {
  onClearInput: () => void;
  isEnded: boolean;
  setIsEnded: () => void;
  isFirstNoAcceptance: boolean;
  setIsFirstNoAcceptance: () => void;
  isLastInWork: boolean;
  setIsLastInWork: () => void;
  isCurrentOverdue: boolean;
  setParamIsCurrentOverdue: () => void;
  reset: () => void;
}

const ProjectFilterMenu = ({
  onClearInput,
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
  const [opened, { toggle }] = useDisclosure(false);

  const { classes } = useFilterMenuStyles();
  const {
    classes: { input, inner, icon },
  } = useCheckboxStyles();

  const {
    classes: { dropdown },
  } = useMenuStyles();
  const {
    classes: { circleInput, circleInner, circleIcon },
  } = useCircleCheckboxStyles();

  return (
    <Menu
      closeOnItemClick={false}
      classNames={{
        dropdown,
        label: classes.label,
        item: classes.item,
      }}
    >
      <Menu.Target>
        <UnstyledButton onClick={onClearInput} $isFilterIcon>
          <Filter />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={toggle}>
          <FilterMenuItemGroup>
            <Checkbox
              readOnly
              checked={isFirstNoAcceptance || isLastInWork}
              classNames={{ input, inner, icon }}
            />
            <FilterMenuItemTitle $active={isFirstNoAcceptance || isLastInWork}>
              В работе
            </FilterMenuItemTitle>
          </FilterMenuItemGroup>
        </Menu.Item>

        <Collapse in={opened}>
          <MenuItemStack>
            <Menu.Item onClick={setIsFirstNoAcceptance}>
              <FilterMenuItemGroup>
                <Checkbox
                  readOnly
                  checked={isFirstNoAcceptance}
                  classNames={{
                    input: circleInput,
                    inner: circleInner,
                    icon: circleIcon,
                  }}
                />
                <FilterMenuItemTitle $active={isFirstNoAcceptance}>
                  Новые
                </FilterMenuItemTitle>
              </FilterMenuItemGroup>
            </Menu.Item>
            <Menu.Item onClick={setIsLastInWork}>
              <FilterMenuItemGroup>
                <Checkbox
                  readOnly
                  checked={isLastInWork}
                  classNames={{
                    input: circleInput,
                    inner: circleInner,
                    icon: circleIcon,
                  }}
                />
                <FilterMenuItemTitle $active={isLastInWork}>
                  Отгружаются
                </FilterMenuItemTitle>
              </FilterMenuItemGroup>
            </Menu.Item>
          </MenuItemStack>
        </Collapse>

        <Menu.Item onClick={setIsEnded}>
          <FilterMenuItemGroup>
            <Checkbox
              readOnly
              checked={isEnded}
              classNames={{ input, inner, icon }}
            />
            <FilterMenuItemTitle $active={isEnded}>
              Выполнены
            </FilterMenuItemTitle>
          </FilterMenuItemGroup>
        </Menu.Item>

        <Menu.Item onClick={setParamIsCurrentOverdue}>
          <FilterMenuItemGroup>
            <Checkbox
              readOnly
              checked={isCurrentOverdue}
              classNames={{
                input,
                inner,
                icon,
              }}
            />
            <FilterMenuItemTitle $active={isCurrentOverdue}>
              Просроченные
            </FilterMenuItemTitle>
          </FilterMenuItemGroup>
        </Menu.Item>

        <Menu.Item onClick={reset}>
          <FilterMenuItemGroup>
            <Checkbox
              readOnly
              checked={
                !isEnded &&
                !isFirstNoAcceptance &&
                !isLastInWork &&
                !isCurrentOverdue
              }
              classNames={{ input, inner, icon }}
            />
            <FilterMenuItemTitle
              $active={
                !isEnded &&
                !isFirstNoAcceptance &&
                !isLastInWork &&
                !isCurrentOverdue
              }
            >
              Все
            </FilterMenuItemTitle>
          </FilterMenuItemGroup>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProjectFilterMenu;

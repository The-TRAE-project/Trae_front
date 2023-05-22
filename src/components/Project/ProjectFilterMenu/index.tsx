import { Menu, Checkbox, Group, Collapse } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Filter from '../../svgs/Filter';
import {
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
        <UnstyledButton onClick={onClearInput}>
          <Filter />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={toggle}>
          <Group spacing={12}>
            <Checkbox
              readOnly
              checked={isFirstNoAcceptance || isLastInWork}
              classNames={{ input, inner, icon }}
            />
            <FilterMenuItemTitle $active={isFirstNoAcceptance || isLastInWork}>
              В работе
            </FilterMenuItemTitle>
          </Group>
        </Menu.Item>

        <Collapse in={opened}>
          <MenuItemStack>
            <Menu.Item onClick={setIsFirstNoAcceptance}>
              <Group spacing={12}>
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
              </Group>
            </Menu.Item>
            <Menu.Item onClick={setIsLastInWork}>
              <Group spacing={12}>
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
              </Group>
            </Menu.Item>
          </MenuItemStack>
        </Collapse>

        <Menu.Item onClick={setIsEnded}>
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

        <Menu.Item onClick={setParamIsCurrentOverdue}>
          <Group spacing={12}>
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
          </Group>
        </Menu.Item>

        <Menu.Item onClick={reset}>
          <Group spacing={12}>
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
          </Group>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProjectFilterMenu;

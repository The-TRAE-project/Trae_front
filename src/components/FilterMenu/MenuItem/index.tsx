import { Menu, Checkbox } from '@mantine/core';
import {
  Group,
  Title,
  useCircleCheckboxStyles,
  useSquareCheckboxStyles,
} from './styles';

interface Props {
  title: string;
  onClick: () => void;
  isActive: boolean;
  isCircle?: boolean;
}

const MenuItem = ({ title, onClick, isActive, isCircle = false }: Props) => {
  const {
    classes: { squareInput, inner, icon },
  } = useSquareCheckboxStyles();

  const {
    classes: { circleInput },
  } = useCircleCheckboxStyles();

  const input = isCircle ? circleInput : squareInput;

  return (
    <Menu.Item onClick={onClick}>
      <Group>
        <Checkbox
          readOnly
          checked={isActive}
          classNames={{ input, inner, icon }}
        />
        <Title $active={isActive}>{title}</Title>
      </Group>
    </Menu.Item>
  );
};

export default MenuItem;

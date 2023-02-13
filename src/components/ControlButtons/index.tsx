import { Group } from '@mantine/core';
import { useLocation } from 'react-router-dom';

import { colors } from '../../constants/colors';
import { Paths } from '../../constants/paths';
import ControlArrowLeft from '../svgs/ControlArrowLeft';
import ControlArrowRight from '../svgs/ControlArrowRight';
import { Button, InformTitle, Wrapper } from './styles';

interface Props {
  current: number;
  quantity: number;
  prevSlide: () => void;
  nextSlide: () => void;
}

const ControlButtons = ({ current, quantity, prevSlide, nextSlide }: Props) => {
  const location = useLocation();

  const isProjectPage = location.pathname === Paths.PROJECTS;

  return (
    <Wrapper>
      <Group spacing={58}>
        <Button
          onClick={prevSlide}
          disabled={current === 1}
          isWhite={isProjectPage}
        >
          <ControlArrowRight
            color={isProjectPage ? colors.white : colors.whiteBlack}
          />
        </Button>
        <InformTitle isWhite={isProjectPage}>
          {current}/{quantity}
        </InformTitle>
        <Button
          onClick={nextSlide}
          disabled={current === quantity}
          isWhite={isProjectPage}
        >
          <ControlArrowLeft
            color={isProjectPage ? colors.white : colors.whiteBlack}
          />
        </Button>
      </Group>
    </Wrapper>
  );
};

export default ControlButtons;

import { Group } from '@mantine/core';
import { useLocation } from 'react-router-dom';

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

  const isEmployeeProjectPage = location.pathname === Paths.EMPLOYEE_PROJECTS;

  return (
    <Wrapper>
      <Group spacing={44}>
        <Button
          onClick={prevSlide}
          disabled={current === 1}
          isWhite={isEmployeeProjectPage}
        >
          <ControlArrowRight
            color={
              isEmployeeProjectPage ? 'var(--white)' : 'var(--white-black)'
            }
          />
        </Button>
        <InformTitle isWhite={isEmployeeProjectPage}>
          {current}/{quantity}
        </InformTitle>
        <Button
          onClick={nextSlide}
          disabled={current === quantity}
          isWhite={isEmployeeProjectPage}
        >
          <ControlArrowLeft
            color={
              isEmployeeProjectPage ? 'var(--white)' : 'var(--white-black)'
            }
          />
        </Button>
      </Group>
    </Wrapper>
  );
};

export default ControlButtons;

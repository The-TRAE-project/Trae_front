import { Group } from '@mantine/core';

import ControlArrowLeft from '../../svgs/ControlArrowLeft';
import ControlArrowRight from '../../svgs/ControlArrowRight';
import { Button, InformTitle, Wrapper } from './styles';

interface Props {
  current: number;
  quantity: number;
  prevSlide: () => void;
  nextSlide: () => void;
}

const ControlButtons = ({ current, quantity, prevSlide, nextSlide }: Props) => {
  return (
    <Wrapper>
      <Group spacing={58}>
        <Button onClick={prevSlide} disabled={current === 1}>
          <ControlArrowRight />
        </Button>
        <InformTitle>
          {current}/{quantity}
        </InformTitle>
        <Button onClick={nextSlide} disabled={current === quantity}>
          <ControlArrowLeft />
        </Button>
      </Group>
    </Wrapper>
  );
};

export default ControlButtons;

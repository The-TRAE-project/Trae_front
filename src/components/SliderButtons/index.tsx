import ControlArrowLeft from '../svgs/ControlArrowLeft';
import ControlArrowRight from '../svgs/ControlArrowRight';
import { Button, Group, InformTitle, Wrapper } from './styles';

interface Props {
  current: number;
  quantity: number;
  prevSlide: () => void;
  nextSlide: () => void;
  color: string;
  isVertical?: boolean;
  isResponsive?: boolean;
}

const SliderButtons = ({
  current,
  quantity,
  prevSlide,
  nextSlide,
  color,
  isVertical,
  isResponsive = true,
}: Props) => {
  return (
    <Wrapper $vertical={isVertical}>
      <Group $vertical={isVertical} $responsive={isResponsive}>
        <Button
          onClick={prevSlide}
          disabled={current === 1}
          color={color}
          $vertical={isVertical}
          $responsive={isResponsive}
        >
          <ControlArrowRight color={color} />
        </Button>
        <InformTitle color={color}>
          {current}/{quantity}
        </InformTitle>
        <Button
          onClick={nextSlide}
          disabled={current === quantity}
          color={color}
          $vertical={isVertical}
          $responsive={isResponsive}
        >
          <ControlArrowLeft color={color} />
        </Button>
      </Group>
    </Wrapper>
  );
};

export default SliderButtons;

import { useTimer } from '../../../../../helpers/hooks/useTimer';
import { TimerTitle } from './styles';

interface Props {
  isStart: boolean;
  onStop: () => void;
  timer: number;
}

const Timer = ({ isStart, onStop, timer }: Props) => {
  const { seconds, minutes } = useTimer(isStart, onStop, timer);

  return <TimerTitle>{`${minutes}:${seconds}`}</TimerTitle>;
};

export default Timer;

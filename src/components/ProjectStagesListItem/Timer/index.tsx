import { useTimer } from '../../../helpers/hooks/useTimer';
import { TimerTitle } from './styles';

interface Props {
  isStart: boolean;
  onStop: () => void;
}

const Timer = ({ isStart, onStop }: Props) => {
  const { seconds, minutes } = useTimer(isStart, onStop);

  return <TimerTitle>{`${minutes}:${seconds}`}</TimerTitle>;
};

export default Timer;

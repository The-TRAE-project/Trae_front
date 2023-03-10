import { useEffect, useState } from 'react';

export function useTimer(isStart: boolean, onClose: () => void) {
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    let timerId: number | undefined;

    if (isStart) {
      setCountDown(60 * 1.92);
      timerId = setInterval(() => {
        setCountDown((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isStart]);

  useEffect(() => {
    if (Math.floor(countDown) < 0 && isStart) {
      onClose();
      setCountDown(0);
    }
  }, [countDown, isStart, onClose]);

  const seconds = String(Math.floor(countDown % 60)).padStart(2, '0');
  const minutes = String(Math.floor(countDown / 60)).padStart(2, '0');

  return { seconds, minutes };
}

import { useEffect, useState } from 'react';

export function useTimer(isStart: boolean, onClose: () => void, timer: number) {
  const [countDown, setCountDown] = useState(0);

  useEffect(() => {
    let timerId: any;

    if (isStart) {
      setCountDown(timer);
      timerId = setInterval(() => {
        setCountDown((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isStart, timer]);

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

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export function useDate() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const date = dayjs(time).format('HH:mm');

  return { date };
}

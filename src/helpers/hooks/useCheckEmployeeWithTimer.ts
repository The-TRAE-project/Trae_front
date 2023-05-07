import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paths } from '../../constants/paths';
import { clearEmployeeState, setTimer } from '../../store/slices/employee';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export function useCheckEmployeeWithTimer() {
  const [countDown, setCountDown] = useState(0);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { timer, isLoggedIn } = useAppSelector((store) => store.employee);

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval> = setInterval(() => {});

    if (isLoggedIn && timer >= 1) {
      setCountDown(timer);
      timerId = setInterval(() => {
        setCountDown((prevTime) => Math.floor(prevTime - 1));
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isLoggedIn, timer]);

  useEffect(() => {
    if (countDown >= 1) {
      dispatch(setTimer(countDown));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown]);

  useEffect(() => {
    if (!isLoggedIn) return;

    if (countDown === 1) {
      setCountDown(0);
      dispatch(setTimer(0));
      dispatch(clearEmployeeState());
      navigate(Paths.EMPLOYEE_LOGIN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countDown, isLoggedIn]);

  return null;
}

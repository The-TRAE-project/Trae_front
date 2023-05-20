// TODO:
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '../../constants/paths';
import { LocalStorage } from '../../constants/localStorage';
import { Roles } from '../../store/slices/auth/types';
import { clearEmployeeState } from '../../store/slices/employee';
import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { clearUserState } from '../../store/slices/auth';
import { clearWorkTypeState } from '../../store/slices/workType';
import { clearProjectState } from '../../store/slices/project';
import { removeItem } from '../removeItem';

export function useNavigateLoggedInUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { accessToken, permission } = useAppSelector((store) => store.auth);

  useEffect(() => {
    if (accessToken) {
      if (location.pathname === Paths.MAIN) {
        if (permission === Roles.ADMIN) {
          navigate(Paths.DASHBOARD);
        } else if (permission === Roles.EMPLOYEE) {
          navigate(Paths.EMPLOYEES);
        }
      } else {
        navigate(location.pathname);
      }
    } else {
      dispatch(clearUserState());
      dispatch(clearEmployeeState());
      dispatch(clearWorkTypeState());
      dispatch(clearProjectState());
      removeItem(LocalStorage.NAVBAR_LIST);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, location.pathname]);
}

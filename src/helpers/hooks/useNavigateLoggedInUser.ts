// TODO:
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '../../constants/paths';
import { Roles } from '../../store/slices/auth/types';

import { useAppSelector } from './useAppSelector';

export function useNavigateLoggedInUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken, permission } = useAppSelector((store) => store.auth);

  useEffect(() => {
    if (accessToken) {
      if (location.pathname === Paths.MAIN) {
        if (permission === Roles.ADMIN) {
          navigate(Paths.PROJECTS);
        } else if (permission === Roles.EMPLOYEE) {
          navigate(Paths.EMPLOYEE_LOGIN);
        }
      } else {
        navigate(location.pathname);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, location.pathname]);
}

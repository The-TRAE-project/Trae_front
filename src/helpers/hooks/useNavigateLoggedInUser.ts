// TODO:
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAppSelector } from './useAppSelector';

export function useNavigateLoggedInUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken } = useAppSelector((store) => store.auth);

  useEffect(() => {
    if (accessToken) {
      navigate(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, location.pathname]);
}

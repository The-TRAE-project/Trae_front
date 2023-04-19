import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { LocalStorage } from '../../constants/localStorage';
import { Paths } from '../../constants/paths';
import { getItem } from '../getItem';
import { removeItem } from '../removeItem';

export function useClearLocalStorageByPath() {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes(Paths.EMPLOYEES)) {
      const employeesModifiedTypeWorks = getItem(
        LocalStorage.EMPLOYEE_MODIFIED_TYPE_WORKS
      );
      const employeeTypeWorks = getItem(LocalStorage.EMPLOYEE_TYPE_WORKS);

      if (employeesModifiedTypeWorks?.length || employeeTypeWorks?.length) {
        removeItem(LocalStorage.EMPLOYEE_MODIFIED_TYPE_WORKS);
        removeItem(LocalStorage.EMPLOYEE_STATUS);
        removeItem(LocalStorage.EMPLOYEE_PAGE);
        removeItem(LocalStorage.EMPLOYEE_TYPE_WORKS);
      }
    }

    if (!location.pathname.includes(Paths.WORK_TYPES)) {
      const typeWorkPage = getItem(LocalStorage.WORK_TYPE_PAGE);
      const typeWorkStatus = getItem(LocalStorage.WORK_TYPE_STATUS);

      if (typeWorkStatus || !typeWorkStatus || typeWorkPage) {
        removeItem(LocalStorage.WORK_TYPE_PAGE);
        removeItem(LocalStorage.WORK_TYPE_STATUS);
      }
    }

    if (!location.pathname.includes(Paths.CONSTRUCTORS)) {
      const userStatus = getItem(LocalStorage.USER_STATUS);
      const userPage = getItem(LocalStorage.USER_PAGE);
      const userRole = getItem(LocalStorage.USER_ROLE);

      if (!userStatus || userStatus || userRole || userPage) {
        removeItem(LocalStorage.USER_STATUS);
        removeItem(LocalStorage.USER_PAGE);
        removeItem(LocalStorage.USER_ROLE);
      }
    }
  }, [location.pathname]);
}

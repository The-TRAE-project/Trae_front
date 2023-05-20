import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { LocalStorage } from '../../constants/localStorage';
import { Paths } from '../../constants/paths';
import { getItem } from '../getItem';
import { removeItem } from '../removeItem';

export function useClearLocalStorageByPath() {
  const location = useLocation();

  useEffect(() => {
    const slicedPath = location.pathname.split('/')[1];

    if (!Paths.EMPLOYEES.includes(slicedPath)) {
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

    if (!Paths.WORK_TYPES.includes(slicedPath)) {
      const typeWorkPage = getItem(LocalStorage.WORK_TYPE_PAGE);
      const typeWorkStatus = getItem(LocalStorage.WORK_TYPE_STATUS);

      if (typeWorkStatus || !typeWorkStatus || typeWorkPage) {
        removeItem(LocalStorage.WORK_TYPE_PAGE);
        removeItem(LocalStorage.WORK_TYPE_STATUS);
      }
    }

    if (!Paths.CONSTRUCTORS.includes(slicedPath)) {
      const userStatus = getItem(LocalStorage.USER_STATUS);
      const userPage = getItem(LocalStorage.USER_PAGE);
      const userRole = getItem(LocalStorage.USER_ROLE);

      if (!userStatus || userStatus || userRole || userPage) {
        removeItem(LocalStorage.USER_STATUS);
        removeItem(LocalStorage.USER_PAGE);
        removeItem(LocalStorage.USER_ROLE);
      }
    }

    if (!Paths.PROJECTS.includes(slicedPath)) {
      const projectSearchPage = getItem(LocalStorage.PROJECT_SEARCH_PAGE);
      const projectFilterPage = getItem(LocalStorage.PROJECT_FILTER_PAGE);
      const projectIsEnded = getItem(LocalStorage.PROJECT_FILTER_IS_ENDED);

      if (
        projectSearchPage ||
        projectFilterPage ||
        projectIsEnded ||
        !projectIsEnded
      ) {
        removeItem(LocalStorage.PROJECT_SEARCH_PAGE);
        removeItem(LocalStorage.PROJECT_FILTER_PAGE);
        removeItem(LocalStorage.PROJECT_FILTER_IS_ENDED);
        removeItem(LocalStorage.PROJECT_FILTER_IS_NOT_ACCEPTANCE);
        removeItem(LocalStorage.PROJECT_FILTER_IS_LAST_IN_WORK);
        removeItem(LocalStorage.PROJECT_FILTER_IS_CURRENT_OVERDUE);
      }
    }
  }, [location.pathname]);
}

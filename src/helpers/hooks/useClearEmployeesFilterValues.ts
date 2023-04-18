import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Paths } from '../../constants/paths';

export function useClearEmployeesFilterValues() {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes(Paths.EMPLOYEES)) {
      const employeesFilter = JSON.parse(
        localStorage.getItem('employees-filter') as string
      );
      const typeWorksIds = JSON.parse(
        localStorage.getItem('type-works-ids') as string
      );
      if (employeesFilter?.length && typeWorksIds?.length) {
        localStorage.removeItem('employees-filter');
        localStorage.removeItem('type-works-ids');
        localStorage.removeItem('status');
      }
    }
  }, [location.pathname]);
}

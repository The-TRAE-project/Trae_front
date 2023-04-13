import { useEffect } from 'react';

import { useAppDispatch } from '../../../../helpers/hooks/useAppDispatch';
import { Employee } from '../../../../store/apis/employee/types';
import { setEmployeeToEdit } from '../../../../store/slices/employee';

export function useSetUpdatedValues(
  updatedEmployee: Employee | undefined,
  isUpdate: boolean
) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (updatedEmployee) {
      dispatch(setEmployeeToEdit(updatedEmployee));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);
}

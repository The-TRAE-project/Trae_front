import { EmployeeShortInfo } from '../store/apis/employee/types';

export const selectOnlyIds = (data: EmployeeShortInfo[]) =>
  data.map((item) => item.id);

// TODO:
/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import { EmployeeUpdateFormValues } from '../../../../store/apis/employee/types';
import { EmployeeToEdit } from '../../../../store/slices/employee/types';

export const compareValues = (
  values: Omit<EmployeeUpdateFormValues, 'employeeId'>,
  employeeToEdit: EmployeeToEdit
) => {
  const convertToNumberArray = (data: any) =>
    data.map((item: any) => ({ id: Number(item.id || item.value) }));

  const findDifference = {
    employeeId: employeeToEdit.id,
    firstName:
      employeeToEdit.firstName === values.firstName ? null : values.firstName,
    lastName:
      employeeToEdit.lastName === values.lastName ? null : values.lastName,
    middleName:
      employeeToEdit.middleName === values.middleName
        ? null
        : values.middleName,
    phone: employeeToEdit.phone === values.phone ? null : values.phone,
    // eslint-disable-next-line no-unneeded-ternary
    isActive: values.isActive === 'Активный' ? true : false,
    pinCode: employeeToEdit.pinCode === values.pinCode ? null : values.pinCode,
    dateOfEmployment:
      dayjs(employeeToEdit?.dateOfEmployment).toDate().getTime() ===
      values.dateOfEmployment?.getTime()
        ? null
        : values.dateOfEmployment,
    dateOfDismissal:
      dayjs(employeeToEdit?.dateOfDismissal).toDate().getTime() ===
      values.dateOfDismissal?.getTime()
        ? null
        : values.dateOfDismissal,
    changedTypesId:
      JSON.stringify(convertToNumberArray(employeeToEdit.types)) ===
      JSON.stringify(convertToNumberArray(values.changedTypesId))
        ? null
        : (values.changedTypesId?.map((typeId) => +typeId) as any),
  };
  // eslint-disable-next-line consistent-return
  return findDifference;
};

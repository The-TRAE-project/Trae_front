// TODO:
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-nested-ternary */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import { EmployeeUpdateFormValues } from '../../../../store/apis/employee/types';
import { EmployeeToEdit } from '../../../../store/slices/employee/types';

export const isObjectsEqual = (leftSide: any, rightSide: any): any => {
  return typeof leftSide === 'object' && Object.keys(leftSide).length > 0
    ? Object.keys(leftSide).length === Object.keys(rightSide).length &&
        Object.keys(leftSide).every((p) =>
          isObjectsEqual(leftSide[p], rightSide[p])
        )
    : leftSide === rightSide;
};

export const convertToNumberArray = (data: any) =>
  data.map((item: any) => ({ id: Number(item.id || item) }));

export const convertToDate = (value: any) => dayjs(value).toDate().getTime();

export const compareValues = (
  values: Omit<EmployeeUpdateFormValues, 'employeeId'>,
  employeeToEdit: EmployeeToEdit
) => {
  const isEmployeeActive = employeeToEdit.isActive
    ? 'Активный'
    : 'Заблокированный';

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
    isActive:
      isEmployeeActive === values.isActive
        ? null
        : values.isActive === 'Активный'
        ? true
        : false,
    pinCode: employeeToEdit.pinCode === values.pinCode ? null : values.pinCode,
    dateOfEmployment:
      convertToDate(employeeToEdit?.dateOfEmployment) ===
      values.dateOfEmployment?.getTime()
        ? null
        : values.dateOfEmployment,
    dateOfDismissal:
      convertToDate(employeeToEdit?.dateOfDismissal) ===
      values.dateOfDismissal?.getTime()
        ? null
        : values.dateOfDismissal,
    changedTypesId: isObjectsEqual(
      convertToNumberArray(employeeToEdit.types),
      convertToNumberArray(values.changedTypesId)
    )
      ? null
      : (values.changedTypesId?.map((typeId) => +typeId) as any),
  };
  // eslint-disable-next-line consistent-return
  return findDifference;
};

export const checkValues = (
  leftSide: string | number | null | undefined,
  rightSide: string | number | undefined
) => leftSide === rightSide;

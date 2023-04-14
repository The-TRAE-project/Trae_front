import {
  UserAdditionalInfo,
  UserEditFormValues,
} from '../../../../store/apis/user/types';

export const compareValues = (
  values: Omit<UserEditFormValues, 'username'>,
  user: UserAdditionalInfo | undefined
) => {
  const findDifference = {
    firstName: values.firstName === user?.firstName ? null : values.firstName,
    lastName: values.lastName === user?.lastName ? null : values.lastName,
    middleName:
      values.middleName === user?.middleName ? null : values.middleName,
    phone: values.phone === user?.phone ? null : values.phone,
    oldPassword: null,
    newPassword: null,
  };

  return findDifference;
};

export const checkValues = (
  leftSide: string | null,
  rightSide: string | undefined
) => leftSide === rightSide;

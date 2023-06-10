import { User, UserUpdateFormValues } from '../../../../store/apis/user/types';

export const compareValues = (
  values: Omit<UserUpdateFormValues, 'managerId'>,
  user: User | undefined
) => {
  const isUserActive = user?.status ? 'Активный' : 'Заблокированный';

  const findDifference = {
    newRole: values.newRole === user?.role ? null : values.newRole,
    accountStatus:
      // eslint-disable-next-line no-nested-ternary
      values.accountStatus === isUserActive
        ? null
        : // eslint-disable-next-line no-unneeded-ternary
        values.accountStatus === 'Активный'
        ? true
        : false,
    dateOfDismissal:
      values.accountStatus === isUserActive ? null : values.dateOfDismissal,
  };

  return findDifference;
};

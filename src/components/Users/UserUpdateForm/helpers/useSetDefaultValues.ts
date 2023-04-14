import { useEffect } from 'react';
import { UseFormReturnType } from '@mantine/form';

import {
  UserAdditionalInfo,
  UserEditFormValues,
} from '../../../../store/apis/user/types';

type UserWithoutUsername = Omit<UserEditFormValues, 'username'>;

export function useSetDefaultValues(
  form: UseFormReturnType<
    UserWithoutUsername,
    (values: UserWithoutUsername) => UserWithoutUsername
  >,
  user: UserAdditionalInfo | undefined
) {
  useEffect(() => {
    if (user) {
      form.setFieldValue('firstName', user.firstName || null);
      form.setFieldValue('lastName', user.lastName || null);
      form.setFieldValue('middleName', user.middleName || null);
      form.setFieldValue('phone', user.phone || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
}

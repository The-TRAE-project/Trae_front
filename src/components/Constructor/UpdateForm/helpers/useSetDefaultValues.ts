import { useEffect } from 'react';
import { UseFormReturnType } from '@mantine/form';

import { User, UserUpdateFormValues } from '../../../../store/apis/user/types';

type UserWithoutId = Omit<UserUpdateFormValues, 'managerId'>;

export function useSetDefaultValues(
  form: UseFormReturnType<
    UserWithoutId,
    (values: UserWithoutId) => UserWithoutId
  >,
  user: User | undefined
) {
  useEffect(() => {
    form.setFieldValue('newRole', user?.role || null);
    form.setFieldValue(
      'accountStatus',
      user?.status ? 'Активный' : 'Заблокированный' || null
    );
    form.setFieldValue('dateOfDismissal', user?.dateOfDismissal || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
}

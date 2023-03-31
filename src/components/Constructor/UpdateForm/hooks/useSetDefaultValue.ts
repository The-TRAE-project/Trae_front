import { useEffect } from 'react';
import { UseFormReturnType } from '@mantine/form';
import dayjs from 'dayjs';
import { User, UserUpdateFormValues } from '../../../../store/apis/user/types';

type UserWithoutId = Omit<UserUpdateFormValues, 'managerId'>;

export function useSetDefaultValue(
  user: User | undefined,
  form: UseFormReturnType<
    UserWithoutId,
    (values: UserWithoutId) => UserWithoutId
  >,
  isUpdate: boolean
) {
  useEffect(() => {
    if (user) {
      form.setValues({
        newRole: user.role || '',
        accountStatus: user.status ? 'Активный' : 'Заблокированный',
        dateOfDismissal: user.dateOfDismissal
          ? dayjs(user.dateOfDismissal).toDate()
          : null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isUpdate]);
}

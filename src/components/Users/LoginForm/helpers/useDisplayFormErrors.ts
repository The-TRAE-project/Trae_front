import { useEffect } from 'react';
import { UseFormReturnType } from '@mantine/form';

import { LoginFormValues } from '../../../../store/slices/auth/types';
import { Error } from '..';

export function useDisplayFormErrors(
  form: UseFormReturnType<
    LoginFormValues,
    (values: LoginFormValues) => LoginFormValues
  >,
  error: Error | null
) {
  useEffect(() => {
    const handleError = (errorType: string) => {
      switch (errorType) {
        case 'Invalid username format':
          form.setErrors({ username: 'Неверный Логин, попробуйте ещё раз.' });
          break;
        case 'Invalid password format':
          form.setErrors({ password: 'Неверный пароль, попробуйте ещё раз.' });
          break;
        case 'Invalid login credentials':
          form.setErrors({ password: 'Неверный пароль, попробуйте ещё раз.' });
          break;
        case 'This account is locked':
          form.setErrors({
            username: 'Эта учетная запись заблокирована.',
            password: 'Эта учетная запись заблокирована.',
          });
          break;

        default:
          form.setErrors({
            username: 'Неверный Логин, попробуйте ещё раз.',
          });
          break;
      }
    };

    if (error !== null) {
      handleError(error.error as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);
}

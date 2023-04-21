import { useState } from 'react';
import { PasswordInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../../helpers/hooks/useAppDispatch';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { getUserRole, loginUser } from '../../../store/slices/auth';
import { Paths } from '../../../constants/paths';
import {
  LoginFormSchema,
  LoginFormValues,
  Roles,
} from '../../../store/slices/auth/types';
import Loader from '../../Loader';
import { Button, FormWrapper, Input, useInputStyles } from './styles';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { classes } = useInputStyles();
  const form = useForm({
    initialValues: {
      password: '',
      username: '',
    },
    validate: zodResolver(LoginFormSchema),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      await dispatch(loginUser(values)).unwrap();
      const { permission } = await dispatch(
        getUserRole(values.username)
      ).unwrap();

      if (permission === Roles.EMPLOYEE) {
        navigate(Paths.EMPLOYEE_LOGIN, { replace: true });
      } else if (permission === Roles.ADMIN) {
        navigate(Paths.DASHBOARD, { replace: true });
      }

      form.reset();
      setIsLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      form.reset();
      showErrorNotification(error.status, error.error);
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
      <Input
        {...form.getInputProps('username')}
        label="Логин"
        aria-label="Логин"
        maxLength={15}
        classNames={{
          error: classes.error,
          label: classes.label,
        }}
      />
      <PasswordInput
        {...form.getInputProps('password')}
        label="Пароль"
        aria-label="Пароль"
        maxLength={15}
        classNames={{
          root: classes.root,
          wrapper: classes.wrapper,
          label: classes.label,
          innerInput: classes.innerInput,
          input: classes.input,
          rightSection: classes.rightSection,
          error: classes.error,
        }}
      />
      <Button disabled={isLoading}>
        {isLoading ? <Loader size={40} /> : 'Войти'}
      </Button>
    </FormWrapper>
  );
};

export default Login;

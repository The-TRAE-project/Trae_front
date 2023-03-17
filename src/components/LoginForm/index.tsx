import { useState } from 'react';
import { PasswordInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { useAppDispatch } from '../../helpers/hooks/useAppDispatch';
import { showErrorNotification } from '../../helpers/showErrorNotification';
import { loginUser } from '../../store/slices/auth';
import {
  LoginFormSchema,
  LoginFormValues,
} from '../../store/slices/auth/types';
import Loader from '../Loader';
import { Button, FormWrapper, Input, useInputStyles, Wrapper } from './styles';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    <Wrapper>
      <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
        <Input
          {...form.getInputProps('username')}
          placeholder="Логин"
          aria-label="Логин"
          maxLength={15}
          classNames={{
            error: classes.error,
          }}
        />
        <PasswordInput
          {...form.getInputProps('password')}
          placeholder="Пароль"
          aria-label="Пароль"
          maxLength={15}
          classNames={{
            root: classes.root,
            wrapper: classes.wrapper,
            innerInput: classes.innerInput,
            input: classes.input,
            rightSection: classes.rightSection,
            error: classes.error,
          }}
        />
        <Button>{isLoading ? <Loader size={40} /> : 'Войти'}</Button>
      </FormWrapper>
    </Wrapper>
  );
};

export default Login;

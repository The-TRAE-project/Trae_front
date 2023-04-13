import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import { Group, Stack } from '@mantine/core';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';

import { Paths } from '../../../constants/paths';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { useEditUserMutation } from '../../../store/apis/user';
import {
  UserChangePasswordSchema,
  UserChangePasswordFormValues,
} from '../../../store/apis/user/types';
import InformModal from '../../InformModal';
import Loader from '../../Loader';
import TextInput from '../../TextInput';
import {
  FormWrapper,
  InformModalText,
  OrangeButton,
  UnstyledButton,
} from '../../styles';

const UserChangePasswordForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { username } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();

  const [editUser, { data: editedUser, isLoading }] = useEditUserMutation();

  const form = useForm<Omit<UserChangePasswordFormValues, 'username'>>({
    initialValues: {
      firstName: null,
      lastName: null,
      middleName: null,
      phone: null,
      oldPassword: '',
      newPassword: '',
    },
    validate: (values) => {
      const resolver = zodResolver(
        UserChangePasswordSchema.omit({ username: true })
      );
      const errors = resolver(values);
      return errors;
    },
  });

  const handleSubmit = async (
    values: Omit<UserChangePasswordFormValues, 'username'>
  ) => {
    try {
      if (username) {
        await editUser({
          ...values,
          username,
        }).unwrap();
        setIsOpen(true);
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err?.data?.status, err?.data?.error);
    }
  };

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Изменения сохранены"
        backPath={Paths.PERSONAL_CABINET}
      >
        <InformModalText>
          Новый пароль : <strong>zdfvkrcfd1gf125</strong>
        </InformModalText>
      </InformModal>

      <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
        <Group position="apart" spacing={100}>
          <Group spacing={42}>
            <UnstyledButton
              onClick={() => navigate(Paths.PERSONAL_CABINET)}
              type="button"
            >
              <BsArrowLeft size={50} color="var(--orange)" />
            </UnstyledButton>
            <UnstyledButton
              onClick={() => navigate(Paths.PROJECTS)}
              type="button"
            >
              <BsFillHouseFill size={44} color="var(--orange)" />
            </UnstyledButton>
          </Group>

          <OrangeButton disabled={isLoading} $width={171} type="submit">
            {isLoading ? <Loader size={35} /> : <span>Сохранить</span>}
          </OrangeButton>
        </Group>

        <Stack spacing={40} style={{ width: 400 }}>
          <TextInput
            {...form.getInputProps('oldPassword')}
            label="Старый пароль"
            maxLength={30}
          />
          <TextInput
            {...form.getInputProps('newPassword')}
            label="Новый пароль"
            maxLength={30}
          />
        </Stack>
      </FormWrapper>
    </>
  );
};

export default UserChangePasswordForm;

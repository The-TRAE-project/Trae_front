import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import { Stack } from '@mantine/core';

import { Paths } from '../../../constants/paths';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { useOpenModal } from '../../../helpers/hooks/useOpenModal';
import { useEditUserMutation } from '../../../store/apis/user';
import {
  UserChangePasswordSchema,
  UserChangePasswordFormValues,
} from '../../../store/apis/user/types';
import InformModal from '../../InformModal';
import TextInput from '../../TextInput';
import FormHeader from '../../FormHeader';
import { FormWrapper, InformModalText } from '../../styles';

const UserChangePasswordForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { username } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();

  const [editUser, { data: editedUser, isLoading: isEditLoading, isSuccess }] =
    useEditUserMutation();

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
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      form.reset();
      showErrorNotification(err?.data?.status, err?.data?.error);
    }
  };

  useOpenModal(setIsOpen, isSuccess);

  const navigateBack = () => navigate(Paths.PERSONAL_CABINET);

  const closeModal = () => {
    setIsOpen(false);
    navigateBack();
  };

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Изменения сохранены"
        backPath={Paths.PERSONAL_CABINET}
      >
        <InformModalText>
          Новый пароль : <strong>{editedUser?.password}</strong>
        </InformModalText>
      </InformModal>

      <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
        <FormHeader
          isSubmitBtnDisabled={isEditLoading}
          isSubmitBtnLoading={isEditLoading}
          onBack={navigateBack}
        />

        <Stack spacing={40} style={{ width: 400 }}>
          <TextInput
            {...form.getInputProps('oldPassword')}
            label="Старый пароль"
            placeholder="Старый пароль"
            maxLength={30}
          />
          <TextInput
            {...form.getInputProps('newPassword')}
            label="Новый пароль"
            placeholder="Новый пароль"
            maxLength={30}
          />
        </Stack>
      </FormWrapper>
    </>
  );
};

export default UserChangePasswordForm;

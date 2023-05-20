import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import { Stack } from '@mantine/core';

import { Paths } from '../../../constants/paths';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { useOpenModal } from '../../../helpers/hooks/useOpenModal';
import { checkForEquality } from '../../../helpers/checkForEquality';
import {
  useEditUserMutation,
  useGetUserAdditionalInformationQuery,
} from '../../../store/apis/user';
import {
  UserEditFormValues,
  UserEditSchema,
} from '../../../store/apis/user/types';
import InformModal from '../../InformModal';
import Loader from '../../Loader';
import TextInput from '../../TextInput';
import MaskedTextInput from '../../MaskedInput';
import {
  FormBodyWrapper,
  FormWrapper,
  ThreeColumnGrid,
  InformModalText,
} from '../../styles';
import { useSetDefaultValues } from './helpers/useSetDefaultValues';
import { compareValues } from './helpers/compareValues';
import FormHeader from '../../FormHeader';

const UserUpdateForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { username } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();

  const { data: user, isLoading: isGetLoading } =
    useGetUserAdditionalInformationQuery();
  const [editUser, { data: editedUser, isLoading: isEditLoading, isSuccess }] =
    useEditUserMutation();

  const form = useForm<Omit<UserEditFormValues, 'username'>>({
    initialValues: {
      firstName: user?.firstName || null,
      lastName: user?.lastName || null,
      middleName: user?.middleName || null,
      phone: user?.phone || null,
      oldPassword: null,
      newPassword: null,
    },
    validate: (values) => {
      const resolver = zodResolver(UserEditSchema.omit({ username: true }));
      const errors = resolver(values);
      return errors;
    },
  });
  const { firstName, lastName, middleName, phone } = form.values;

  const handleSubmit = async (values: Omit<UserEditFormValues, 'username'>) => {
    try {
      if (username) {
        const comparedValues = compareValues(values, user);
        await editUser({
          ...comparedValues,
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

  useSetDefaultValues(form, user);

  useOpenModal(setIsOpen, isSuccess);

  const isDisabled =
    checkForEquality(firstName, user?.firstName) &&
    checkForEquality(lastName, user?.lastName) &&
    checkForEquality(middleName, user?.middleName) &&
    checkForEquality(phone, user?.phone);

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
        <Stack spacing={20}>
          {!!editedUser && (
            <>
              {editedUser.lastName !== user?.lastName && (
                <InformModalText>
                  Фамилия: <strong>{editedUser.lastName}</strong>
                </InformModalText>
              )}
              {editedUser.firstName !== user?.firstName && (
                <InformModalText>
                  Имя: <strong>{editedUser.firstName}</strong>
                </InformModalText>
              )}
              {editedUser.middleName !== user?.middleName && (
                <InformModalText>
                  Отчество: <strong>{editedUser.middleName}</strong>
                </InformModalText>
              )}
              {editedUser.phone !== user?.phone && (
                <InformModalText>
                  Номер телефона:&nbsp;
                  <strong>{editedUser.phone}</strong>
                </InformModalText>
              )}
            </>
          )}
        </Stack>
      </InformModal>

      <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
        <FormHeader
          isSubmitBtnDisabled={isEditLoading || isDisabled}
          isSubmitBtnLoading={isEditLoading}
          onBack={navigateBack}
        />

        <FormBodyWrapper>
          {!isGetLoading && user ? (
            <ThreeColumnGrid>
              <TextInput
                {...form.getInputProps('lastName')}
                label="Фамилия"
                placeholder="Фамилия"
                maxLength={15}
              />
              <TextInput
                {...form.getInputProps('middleName')}
                label="Отчество"
                placeholder="Отчество"
                minLength={2}
                maxLength={15}
              />
              <br />
              <TextInput
                {...form.getInputProps('firstName')}
                label="Имя"
                placeholder="Имя"
                maxLength={15}
              />
              <MaskedTextInput
                {...form.getInputProps('phone')}
                mask="+7 (000) 000 0000"
                label="Номер телефона"
                placeholder="+7 (000) 000 0000"
              />
              <br />
            </ThreeColumnGrid>
          ) : (
            <Loader size={80} isAbsoluteCentered />
          )}
        </FormBodyWrapper>
      </FormWrapper>
    </>
  );
};

export default UserUpdateForm;

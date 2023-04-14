import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import { Group, Stack } from '@mantine/core';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';

import { Paths } from '../../../constants/paths';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { showInformNotification } from '../../../helpers/showInformNotification';
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
  FormWrapper,
  Grid,
  InformModalText,
  OrangeButton,
  UnstyledButton,
} from '../../styles';
import { checkValues, compareValues } from './helpers/compareValues';
import { useSetDefaultValues } from './helpers/useSetDefaultValues';
import { FormBodyWrapper } from './styles';

const UserUpdateForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { username } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();

  const { data: user } = useGetUserAdditionalInformationQuery();
  const [editUser, { data: editedUser, isLoading }] = useEditUserMutation();

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

  const handleSubmit = async (values: Omit<UserEditFormValues, 'username'>) => {
    try {
      if (username) {
        const { firstName, lastName, middleName, phone } = values;
        if (
          checkValues(firstName, user?.firstName) &&
          checkValues(lastName, user?.lastName) &&
          checkValues(middleName, user?.middleName) &&
          checkValues(phone, user?.phone)
        ) {
          showInformNotification(
            'Мы уведомляем вас, что',
            'вы не сделали никаких изменений.'
          );
          navigate(Paths.PERSONAL_CABINET);
          return;
        }
        const comparedValues = compareValues(values, user);
        await editUser({
          ...comparedValues,
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

  useSetDefaultValues(form, user);

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
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

        <FormBodyWrapper>
          {!isLoading && user ? (
            <Grid>
              <TextInput
                {...form.getInputProps('lastName')}
                label="Фамилия"
                maxLength={15}
              />
              <TextInput
                {...form.getInputProps('middleName')}
                label="Отчество"
                minLength={2}
                maxLength={15}
              />
              <br />
              <TextInput
                {...form.getInputProps('firstName')}
                label="Имя"
                maxLength={15}
              />
              <MaskedTextInput
                {...form.getInputProps('phone')}
                label="Номер телефона"
                mask="+7 (000) 000 0000"
              />
              <br />
            </Grid>
          ) : (
            <Loader size={80} isAbsoluteCentered />
          )}
        </FormBodyWrapper>
      </FormWrapper>
    </>
  );
};

export default UserUpdateForm;

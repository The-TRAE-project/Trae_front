import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import { Group, Stack } from '@mantine/core';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';

import { Paths } from '../../../constants/paths';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import {
  useEditUserMutation,
  useGetUserDetailsQuery,
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
import { compareValues } from './helpers/compareValues';

const UserUpdateForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { username } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();

  const { data: user } = useGetUserDetailsQuery(1);
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
              <InformModalText>
                Фамилия: <strong>{editedUser.lastName}</strong>
              </InformModalText>
              <InformModalText>
                Имя: <strong>{editedUser.firstName}</strong>
              </InformModalText>
              <InformModalText>
                Отчество: <strong>{editedUser.middleName}</strong>
              </InformModalText>
              <InformModalText>
                Номер телефона:&nbsp;
                <strong>{editedUser.phone}</strong>
              </InformModalText>
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

        <Grid>
          <TextInput
            {...form.getInputProps('lastName')}
            label="Фамилия"
            maxLength={30}
          />
          <TextInput
            {...form.getInputProps('middleName')}
            label="Отчество"
            maxLength={30}
          />
          <br />
          <TextInput
            {...form.getInputProps('firstName')}
            label="Имя"
            maxLength={30}
          />
          <MaskedTextInput
            {...form.getInputProps('phone')}
            label="Номер телефона"
            mask="+7 (000) 000 0000"
          />
          <br />
        </Grid>
      </FormWrapper>
    </>
  );
};

export default UserUpdateForm;

import { useState } from 'react';
import { SelectItem } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import dayjs from 'dayjs';

import { showErrorNotification } from '../../../../helpers/showErrorNotification';
import {
  useGetAllRolesQuery,
  useResetUserPasswordMutation,
} from '../../../../store/apis/user';
import { UserUpdateFormValues, User } from '../../../../store/apis/user/types';
import { Roles } from '../../../../store/slices/auth/types';
import Loader from '../../../Loader';
import InformModal from '../../InformModal';
import { InformText } from '../../styles';
import Select from './Select';
import DetailsCard from './DetailsCard';
import DatePicker from './DatePicker';
import { Grid, ResetPasswordButton, SelectWrapper, Wrapper } from './styles';

type UserWithoutId = Omit<UserUpdateFormValues, 'managerId'>;

interface Props {
  form: UseFormReturnType<
    UserWithoutId,
    (values: UserWithoutId) => UserWithoutId
  >;
  isLoading: boolean;
  isUpdate: boolean;
  completeUpdate: () => void;
  user: User | undefined;
}

const FormBody = ({
  form,
  isUpdate,
  isLoading,
  user,
  completeUpdate,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [
    resetPassword,
    { data: passwordChangedUser, isLoading: isResetPasswordLoading },
  ] = useResetUserPasswordMutation();
  const { data: roles } = useGetAllRolesQuery();

  const rolesSelectItems: SelectItem[] = Object.values(
    roles as Roles
  ).map<SelectItem>((role) => ({
    value: role,
    label: role,
  }));
  // TODO:
  const statusesSelectItems: SelectItem[] = [
    {
      value: 'Активный',
      label: 'Активный',
    },
    {
      value: 'Заблокированный',
      label: 'Заблокированный',
    },
  ];

  const handleResetUserPassword = async () => {
    try {
      if (user) {
        await resetPassword(user.username).unwrap();
        setIsOpen(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err.data.status, err.data.error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    completeUpdate();
  };

  return (
    <Wrapper>
      <InformModal
        isOpen={isOpen}
        onClose={handleClose}
        title={`${passwordChangedUser?.firstName} ${passwordChangedUser?.lastName} пароль сброшен`}
      >
        <InformText>
          Новый пароль:&nbsp;
          <strong>{passwordChangedUser?.newPassword}</strong>
        </InformText>
      </InformModal>

      {!isLoading && !!user ? (
        <Grid>
          <DetailsCard label="Фамилия" text={user.lastName} />
          <DetailsCard
            text={dayjs(user.dateOfEmployment).format('DD.MM.YYYY')}
            label="Дата регистрации"
          />
          {isUpdate ? (
            <SelectWrapper>
              <Select
                {...form.getInputProps('newRole')}
                title="Категория"
                data={rolesSelectItems}
              />
            </SelectWrapper>
          ) : (
            <DetailsCard text={user.role} label="Категория" />
          )}
          <DetailsCard text={user.firstName} label="Имя" />
          <DetailsCard text={user.phone} label="Номер телефона" />
          {isUpdate ? (
            <SelectWrapper>
              <Select
                {...form.getInputProps('accountStatus')}
                title="Статус"
                data={statusesSelectItems}
              />
            </SelectWrapper>
          ) : (
            <DetailsCard
              text={user.status ? 'Активный' : 'Заблокированный'}
              label="Статус"
            />
          )}
          <DetailsCard text={user.middleName} label="Отчество" />
          <DetailsCard text={user.username} label="Логин" />
          {isUpdate ? (
            <DatePicker {...form.getInputProps('dateOfDismissal')} />
          ) : (
            <DetailsCard
              text={
                user.dateOfDismissal
                  ? dayjs(user.dateOfDismissal).format('DD.MM.YYYY')
                  : ''
              }
              label="Дата увольнения"
            />
          )}
          {isUpdate && (
            <ResetPasswordButton
              onClick={handleResetUserPassword}
              type="button"
            >
              {isResetPasswordLoading ? (
                <Loader size={35} />
              ) : (
                <span>Сбросить пароль</span>
              )}
            </ResetPasswordButton>
          )}
        </Grid>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </Wrapper>
  );
};

export default FormBody;

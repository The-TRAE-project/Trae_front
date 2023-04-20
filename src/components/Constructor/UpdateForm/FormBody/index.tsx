import { useEffect, useState } from 'react';
import { SelectItem } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import dayjs from 'dayjs';

import { showErrorNotification } from '../../../../helpers/showErrorNotification';
import { Status } from '../../../../store/types';
import {
  useGetAllRolesQuery,
  useResetUserPasswordMutation,
} from '../../../../store/apis/user';
import { UserUpdateFormValues, User } from '../../../../store/apis/user/types';
import { Roles } from '../../../../store/slices/auth/types';
import { Paths } from '../../../../constants/paths';
import Loader from '../../../Loader';
import Select from '../../../Select';
import DatePicker from '../../../DatePicker';
import InformModal from '../../../InformModal';
import { DashedOrangeButton, Grid, InformModalText } from '../../../styles';
import DetailsCard from './DetailsCard';
import { Wrapper } from './styles';

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

  const rolesSelectItems: SelectItem[] = roles
    ? Object.values(roles as Roles).map<SelectItem>((role) => ({
        value: role,
        label: role,
      }))
    : [];

  const statusesSelectItems: SelectItem[] = [
    {
      value: Status.ACTIVE,
      label: Status.ACTIVE,
    },
    {
      value: Status.BLOCKED,
      label: Status.BLOCKED,
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

  useEffect(() => {
    if (
      form.values.accountStatus === Status.BLOCKED &&
      !form.values.dateOfDismissal
    ) {
      form.setFieldError(
        'dateOfDismissal',
        'Пожалуйста, выберите дату увольнения'
      );
    } else {
      form.setFieldValue('dateOfDismissal', null);
      form.clearFieldError('dateOfDismissal');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.accountStatus]);

  return (
    <Wrapper>
      <InformModal
        isOpen={isOpen}
        onClose={handleClose}
        title={`${passwordChangedUser?.firstName} ${passwordChangedUser?.lastName} пароль сброшен`}
        backPath={Paths.CONSTRUCTORS}
      >
        <InformModalText>
          Новый пароль:&nbsp;
          <strong>{passwordChangedUser?.newPassword}</strong>
        </InformModalText>
      </InformModal>

      {!isLoading && !!user ? (
        <Grid>
          <DetailsCard label="Фамилия" text={user.lastName} />
          <DetailsCard
            text={dayjs(user.dateOfEmployment).format('DD.MM.YYYY')}
            label="Дата регистрации"
          />
          {isUpdate ? (
            <Select
              {...form.getInputProps('newRole')}
              title="Категория"
              placeholder="Категория"
              data={rolesSelectItems}
            />
          ) : (
            <DetailsCard text={user.role} label="Категория" />
          )}
          <DetailsCard text={user.firstName} label="Имя" />
          <DetailsCard text={user.phone} label="Номер телефона" />
          {isUpdate ? (
            <Select
              {...form.getInputProps('accountStatus')}
              title="Статус"
              placeholder="Статус"
              data={statusesSelectItems}
            />
          ) : (
            <DetailsCard
              text={user.status ? 'Активный' : 'Заблокированный'}
              label="Статус"
            />
          )}
          <DetailsCard text={user.middleName} label="Отчество" />
          <DetailsCard text={user.username} label="Логин" />
          {isUpdate ? (
            <DatePicker
              {...form.getInputProps('dateOfDismissal')}
              title="Дата увольнения"
              disabled={form.values.accountStatus === Status.ACTIVE}
            />
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
            <DashedOrangeButton onClick={handleResetUserPassword} type="button">
              {isResetPasswordLoading ? (
                <Loader size={35} />
              ) : (
                <span>Сбросить пароль</span>
              )}
            </DashedOrangeButton>
          )}
        </Grid>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </Wrapper>
  );
};

export default FormBody;

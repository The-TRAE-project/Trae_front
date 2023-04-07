import { useState } from 'react';
import { SelectItem } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';

import { showErrorNotification } from '../../../../helpers/showErrorNotification';
import {
  useGetAllRolesQuery,
  useResetUserPasswordMutation,
} from '../../../../store/apis/user';
import { UserUpdateFormValues, User } from '../../../../store/apis/user/types';
import { Roles } from '../../../../store/slices/auth/types';
import { Paths } from '../../../../constants/paths';
import Loader from '../../../Loader';
import Select from '../../../Select';
// TODO:
// import DatePicker from '../../../DatePicker';
import { useDateInputStyles } from '../../../DatePicker/styles';
import InformModal from '../../../InformModal';
import { InformModalText } from '../../../styles';
import DetailsCard from './DetailsCard';
import { Grid, ResetPasswordButton, Wrapper } from './styles';

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

  const {
    classes: {
      input,
      label,
      error,
      wrapper,
      calendar,
      calendarHeaderControl,
      calendarHeaderLevel,
      weekday,
      day,
      rightSection,
    },
  } = useDateInputStyles();
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
            <DatePickerInput
              {...form.getInputProps('dateOfDismissal')}
              label="Дата увольнения"
              placeholder="Выберите дату"
              clearable
              valueFormat="DD.MM.YYYY"
              classNames={{
                wrapper,
                calendar,
                calendarHeaderControl,
                calendarHeaderLevel,
                weekday,
                day,
                label,
                input,
                error,
                rightSection,
              }}
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

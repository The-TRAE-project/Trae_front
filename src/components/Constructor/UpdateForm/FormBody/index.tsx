import { useEffect } from 'react';
import { SelectItem } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import dayjs from 'dayjs';

import { Status } from '../../../../store/types';
import { useGetAllRolesQuery } from '../../../../store/apis/user';
import { UserUpdateFormValues, User } from '../../../../store/apis/user/types';
import { Roles } from '../../../../store/slices/auth/types';
import Loader from '../../../Loader';
import Select from '../../../Select';
import DatePicker from '../../../DatePicker';
import DetailsCard from '../../../DetailsCard';
import { FormBodyWrapper, ThreeColumnGrid } from '../../../styles';

type UserWithoutId = Omit<UserUpdateFormValues, 'managerId'>;

interface Props {
  form: UseFormReturnType<
    UserWithoutId,
    (values: UserWithoutId) => UserWithoutId
  >;
  isLoading: boolean;
  isUpdate: boolean;
  user: User | undefined;
}

const FormBody = ({ form, isUpdate, isLoading, user }: Props) => {
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
    <FormBodyWrapper>
      {!isLoading && !!user ? (
        <ThreeColumnGrid>
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
        </ThreeColumnGrid>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </FormBodyWrapper>
  );
};

export default FormBody;

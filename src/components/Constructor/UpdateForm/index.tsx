import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import dayjs from 'dayjs';

import {
  useGetUserDetailsQuery,
  useUpdateUserSomeFieldsMutation,
} from '../../../store/apis/user';
import {
  UserUpdateFormValues,
  UserUpdateSchema,
} from '../../../store/apis/user/types';
import { Paths } from '../../../constants/paths';
import { Status } from '../../../store/types';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { showInformNotification } from '../../../helpers/showInformNotification';
import { FormWrapper } from '../../styles';
import { useSetDefaultValues } from './helpers/useSetDefaultValues';
import { checkValues, compareValues } from './helpers/compareValues';
import FormBody from './FormBody';
import FormHeader from './FormHeader';

const UpdateForm = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const navigate = useNavigate();
  const { constructorId } = useAppSelector((store) => store.builder);

  const [
    updateUserSomeFields,
    { isLoading: isUpdateLoading, data: updatedUser },
  ] = useUpdateUserSomeFieldsMutation();
  const {
    data: user,
    isLoading: isGetLoading,
    error,
    isError,
  } = useGetUserDetailsQuery(constructorId as number);

  const form = useForm<Omit<UserUpdateFormValues, 'managerId'>>({
    initialValues: {
      newRole: user?.role || null,
      accountStatus: user?.status ? 'Активный' : 'Заблокированный' || null,
      dateOfDismissal: user?.dateOfDismissal
        ? dayjs(user?.dateOfDismissal).toDate()
        : null,
    },
    validate: (values) => {
      const resolver = zodResolver(UserUpdateSchema.omit({ managerId: true }));
      const errors = resolver(values);
      return errors;
    },
  });

  useDisplayError(error, isError);

  useSetDefaultValues(form, user);

  const handleSubmit = async (
    values: Omit<UserUpdateFormValues, 'managerId'>
  ) => {
    try {
      if (user) {
        const { newRole, accountStatus } = values;
        const isUserActive = user.status ? 'Активный' : 'Заблокированный';
        if (
          checkValues(newRole, user.role) &&
          checkValues(accountStatus, isUserActive)
        ) {
          showInformNotification(
            'Мы уведомляем вас, что',
            'вы не сделали никаких изменений.'
          );
          navigate(Paths.CONSTRUCTORS);
          return;
        }

        if (
          values.accountStatus === Status.BLOCKED &&
          !form.values.dateOfDismissal
        ) {
          form.setFieldError(
            'dateOfDismissal',
            'Пожалуйста, выберите дату увольнения'
          );
          return;
        }

        const comparedValues = compareValues(values, user);
        await updateUserSomeFields({
          managerId: user.id,
          ...comparedValues,
        }).unwrap();
        setIsModalOpen(true);
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err.data.status, err.data.error);
    }
  };

  const handleCloseModal = () => {
    setIsUpdate(false);
    setIsModalOpen(false);
  };

  return (
    <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader
        isLoading={isUpdateLoading}
        isUpdate={isUpdate}
        onUpdate={() => setIsUpdate(true)}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        updatedUser={updatedUser}
        isSubmitBtnDisabled={
          !form.values.newRole &&
          !form.values.dateOfDismissal &&
          !form.values.accountStatus
        }
      />

      <FormBody
        form={form}
        isLoading={isGetLoading}
        isUpdate={isUpdate}
        user={user}
        completeUpdate={() => setIsUpdate(false)}
      />
    </FormWrapper>
  );
};

export default UpdateForm;

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import FormHeader from './FormHeader';
import FormBody from './FormBody';
import { Form } from './styles';
import { useSetDefaultValue } from './hooks/useSetDefaultValue';

const UpdateForm = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const location = useLocation();
  const constructorId = location.state.id;

  const [
    updateUserSomeFields,
    { isLoading: isUpdateLoading, data: updatedUser },
  ] = useUpdateUserSomeFieldsMutation();
  const {
    data: user,
    isLoading: isGetLoading,
    error,
    isError,
  } = useGetUserDetailsQuery(constructorId);

  const form = useForm<Omit<UserUpdateFormValues, 'managerId'>>({
    initialValues: {
      newRole: user?.role || '',
      accountStatus: user?.status ? 'Активный' : 'Заблокированный',
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

  useSetDefaultValue(user, form, isUpdate);

  useDisplayError(error, isError);

  const handleSubmit = async (
    values: Omit<UserUpdateFormValues, 'managerId'>
  ) => {
    try {
      if (user) {
        await updateUserSomeFields({
          managerId: user.id,
          newRole: values.newRole,
          // eslint-disable-next-line no-unneeded-ternary
          accountStatus: values.accountStatus === 'Активный' ? true : false,
          dateOfDismissal: values.dateOfDismissal,
        }).unwrap();
        setIsModalOpen(true);
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
    <Form onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader
        isLoading={isUpdateLoading}
        isUpdate={isUpdate}
        onUpdate={() => setIsUpdate(true)}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={updatedUser}
      />

      <FormBody
        form={form}
        isLoading={isGetLoading}
        isUpdate={isUpdate}
        user={user}
        completeUpdate={() => setIsUpdate(false)}
      />
    </Form>
  );
};

export default UpdateForm;

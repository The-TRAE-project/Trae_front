import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';

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
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import FormHeader from './FormHeader';
import FormBody from './FormBody';
import { Form } from './styles';

const UpdateForm = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

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
      newRole: null,
      accountStatus: null,
      dateOfDismissal: null,
    },
    validate: (values) => {
      const resolver = zodResolver(UserUpdateSchema.omit({ managerId: true }));
      const errors = resolver(values);
      return errors;
    },
  });

  useDisplayError(error, isError);

  const handleSubmit = async (
    values: Omit<UserUpdateFormValues, 'managerId'>
  ) => {
    try {
      if (user) {
        await updateUserSomeFields({
          managerId: user.id,
          newRole: values.newRole,
          accountStatus: values.accountStatus
            ? values.accountStatus === 'Активный'
            : null,
          dateOfDismissal: values.dateOfDismissal,
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
    <Form onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader
        isLoading={isUpdateLoading}
        isUpdate={isUpdate}
        onUpdate={() => setIsUpdate(true)}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={updatedUser}
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
    </Form>
  );
};

export default UpdateForm;

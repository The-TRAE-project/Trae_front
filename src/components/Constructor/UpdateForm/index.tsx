import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import dayjs from 'dayjs';

import {
  useGetUserDetailsQuery,
  useResetUserPasswordMutation,
  useUpdateUserSomeFieldsMutation,
} from '../../../store/apis/user';
import {
  User,
  UserUpdateFormValues,
  UserUpdateSchema,
} from '../../../store/apis/user/types';
import { Status } from '../../../store/types';
import { Paths } from '../../../constants/paths';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { checkForEquality } from '../../../helpers/checkForEquality';
import { useOpenModal } from '../../../helpers/hooks/useOpenModal';
import InformModal from '../../InformModal';
import { FormWrapper, InformModalText } from '../../styles';
import { useSetDefaultValues } from './helpers/useSetDefaultValues';
import { compareValues } from './helpers/compareValues';
import FormBody from './FormBody';
import FormHeader from './FormHeader';

const UpdateForm = () => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const { id } = useParams();

  const [
    updateUserSomeFields,
    {
      isLoading: isUpdateLoading,
      data: updatedUser,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateUserSomeFieldsMutation();
  const [
    resetPassword,
    {
      data: passwordChangedUser,
      isLoading: isChangePasswordLoading,
      isSuccess: isChangePasswordSuccess,
    },
  ] = useResetUserPasswordMutation();
  const {
    data: user,
    isLoading: isGetLoading,
    error,
    isError,
  } = useGetUserDetailsQuery(Number(id as string));
  const isUserActive = user?.status ? 'Активный' : 'Заблокированный';

  const form = useForm<Omit<UserUpdateFormValues, 'managerId'>>({
    initialValues: {
      newRole: user?.role || null,
      accountStatus: isUserActive || null,
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

  useSetDefaultValues(form, user, setCurrentUser);

  const handleSubmit = async (
    values: Omit<UserUpdateFormValues, 'managerId'>
  ) => {
    try {
      if (user) {
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
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      form.reset();
      showErrorNotification(err?.data?.status, err?.data?.error);
    }
  };

  useOpenModal(setIsUpdateModalOpen, isUpdateSuccess);

  const closeUpdateModal = () => {
    setIsUpdate(false);
    setIsUpdateModalOpen(false);
    setCurrentUser(user);
  };

  const handleUpdate = () => {
    setIsUpdate(true);
    setCurrentUser(user);
  };

  const handleChangePassword = async () => {
    try {
      if (user) {
        await resetPassword(user.username).unwrap();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err?.data?.status, err?.data?.error);
    }
  };

  useOpenModal(setIsChangePasswordModalOpen, isChangePasswordSuccess);

  const closeChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
    setIsUpdate(false);
  };

  return (
    <>
      <InformModal
        isOpen={isChangePasswordModalOpen}
        onClose={closeChangePasswordModal}
        title={`${passwordChangedUser?.firstName} ${passwordChangedUser?.lastName} пароль сброшен`}
        backPath={Paths.CONSTRUCTORS}
      >
        <InformModalText>
          Новый пароль:&nbsp;
          <strong>{passwordChangedUser?.newPassword}</strong>
        </InformModalText>
      </InformModal>

      <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
        <FormHeader
          isLoading={isUpdateLoading}
          isUpdate={isUpdate}
          onUpdate={handleUpdate}
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          currentUser={currentUser}
          updatedUser={updatedUser}
          isDisabled={
            checkForEquality(form.values.newRole, user?.role) &&
            checkForEquality(form.values.accountStatus, isUserActive)
          }
          onChangePassword={handleChangePassword}
          isChangePasswordLoading={isChangePasswordLoading}
        />

        <FormBody
          form={form}
          isLoading={isGetLoading}
          isUpdate={isUpdate}
          user={user}
        />
      </FormWrapper>
    </>
  );
};

export default UpdateForm;

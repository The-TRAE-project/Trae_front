import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import {
  ConstructorFormSchema,
  ConstructorFormValues,
} from '../../../store/apis/user/types';
import { useCreateConstructorMutation } from '../../../store/apis/user';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { useOpenModal } from '../../../helpers/hooks/useOpenModal';
import { onClipboardPaste } from '../../../helpers/onClipboardPaste';
import { Paths } from '../../../constants/paths';
import MaskedTextInput from '../../MaskedInput';
import DatePicker from '../../DatePicker';
import TextInput from '../../TextInput';
import InformModal from '../../InformModal';
import FormHeader from '../../FormHeader';
import { FormWrapper, ThreeColumnGrid, InformModalText } from '../../styles';

const CreateForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const form = useForm<ConstructorFormValues>({
    initialValues: {
      dateOfEmployment: new Date(),
      firstName: '',
      lastName: '',
      middleName: null,
      phone: '',
      username: '',
    },
    validate: (values) => {
      const resolver = zodResolver(ConstructorFormSchema);
      const errors = resolver(values);
      return errors;
    },
  });

  const [
    createConstructor,
    { isLoading: isCreateLoading, data: newConstructor, isSuccess },
  ] = useCreateConstructorMutation();

  const handleSubmit = async (values: ConstructorFormValues) => {
    try {
      await createConstructor(values).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err?.data?.status, err?.data?.error);
    }
  };

  useOpenModal(setIsOpen, isSuccess);

  const navigateBack = () => navigate(Paths.OFFICE);

  const closeModal = () => {
    form.reset();
    setIsOpen(false);
    navigateBack();
  };

  const handlePaste = (value: string) => form.setFieldValue('phone', value);

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={closeModal}
        title={`${form.values.firstName} ${form.values.lastName} успешно добавлен(а)`}
        backPath={Paths.OFFICE}
      >
        <Stack spacing={20}>
          {newConstructor && (
            <>
              <InformModalText>
                Логин: <strong>{newConstructor.username}</strong>
              </InformModalText>
              <InformModalText>
                Пароль: <strong>{newConstructor.password}</strong>
              </InformModalText>
            </>
          )}
        </Stack>
      </InformModal>

      <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
        <FormHeader
          isSubmitBtnLoading={isCreateLoading}
          isSubmitBtnDisabled={isCreateLoading}
          onBack={navigateBack}
        />

        <ThreeColumnGrid>
          <TextInput
            {...form.getInputProps('lastName')}
            label="Фамилия"
            placeholder="Фамилия"
            maxLength={15}
          />
          <TextInput
            {...form.getInputProps('middleName')}
            label="Отчество"
            placeholder="Отчество"
            minLength={2}
            maxLength={15}
          />
          <MaskedTextInput
            {...form.getInputProps('phone')}
            mask="+7 (000) 000 0000"
            label="Номер телефона"
            placeholder="+7 (000) 000 0000"
            onPaste={(event) => onClipboardPaste(event, handlePaste)}
          />
          <TextInput
            {...form.getInputProps('firstName')}
            label="Имя"
            placeholder="Имя"
            maxLength={15}
          />
          <DatePicker
            {...form.getInputProps('dateOfEmployment')}
            title="Дата регистрации"
          />
          <TextInput
            {...form.getInputProps('username')}
            label="Логин"
            placeholder="Логин"
            maxLength={15}
          />
        </ThreeColumnGrid>
      </FormWrapper>
    </>
  );
};

export default CreateForm;

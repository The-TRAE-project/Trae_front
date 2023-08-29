import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectItem } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { Paths } from '../../../constants/paths';
import { useCreateEmployeeMutation } from '../../../store/apis/employee';
import {
  EmployeeFormSchema,
  EmployeeFormValues,
} from '../../../store/apis/employee/types';
import { useGetActiveWorkTypesQuery } from '../../../store/apis/workTypes';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { useOpenModal } from '../../../helpers/hooks/useOpenModal';
import { onClipboardPaste } from '../../../helpers/onClipboardPaste';
import { sortWorkTypesByPriority } from '../../../helpers/sortWorkTypesByPriority';
import InformModal from '../../InformModal';
import MaskedTextInput from '../../MaskedInput';
import MultiSelect from '../../MultiSelect';
import TextInput from '../../TextInput';
import DatePicker from '../../DatePicker';
import FormHeader from '../../FormHeader';
import { FormWrapper, ThreeColumnGrid, InformModalText } from '../../styles';

const EmployeeCreateForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const form = useForm<EmployeeFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      middleName: null,
      phone: '',
      typesId: [],
      dateOfEmployment: new Date(),
    },
    validate: (values) => {
      const resolver = zodResolver(EmployeeFormSchema);
      const errors = resolver(values);
      return errors;
    },
  });

  const [
    createEmployee,
    { data: createdEmployee, isLoading: isCreateLoading, isSuccess },
  ] = useCreateEmployeeMutation();
  const { data: workTypes } = useGetActiveWorkTypesQuery();

  const handleSubmit = async (values: EmployeeFormValues) => {
    try {
      await createEmployee({
        ...values,
        typesId: values.typesId.map((typeId) => +typeId),
      }).unwrap();
      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err?.data?.status, err?.data?.error);
    }
  };

  useOpenModal(setIsOpen, isSuccess);

  const workTypeSelectItems: SelectItem[] = workTypes
    ? sortWorkTypesByPriority(workTypes).map<SelectItem>((workType) => ({
        value: String(workType.id),
        label: workType.name,
      }))
    : [];

  const navigateBack = () => navigate(Paths.EMPLOYEES);

  const closeModal = () => {
    setIsOpen(false);
    navigateBack();
  };

  const handlePaste = (value: string) => form.setFieldValue('phone', value);

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={closeModal}
        title={`${createdEmployee?.firstName} ${createdEmployee?.lastName} успешно добавлен(а)`}
        backPath={Paths.EMPLOYEES}
      >
        {!!createdEmployee && (
          <InformModalText>
            Пароль: <strong>{createdEmployee.pinCode}</strong>
          </InformModalText>
        )}
      </InformModal>

      <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
        <FormHeader
          isSubmitBtnDisabled={isCreateLoading}
          isSubmitBtnLoading={isCreateLoading}
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
          <MultiSelect
            data={workTypeSelectItems}
            label="Типы работ"
            {...form.getInputProps('typesId')}
          />
        </ThreeColumnGrid>
      </FormWrapper>
    </>
  );
};

export default EmployeeCreateForm;

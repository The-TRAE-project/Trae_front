import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';

import { Paths } from '../../../constants/paths';
import { useCreateWorkTypeMutation } from '../../../store/apis/workTypes';
import {
  CreateWorkTypeFormValues,
  WorkTypeSchema,
} from '../../../store/apis/workTypes/types';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { useOpenModal } from '../../../helpers/hooks/useOpenModal';
import FormHeader from '../../FormHeader';
import TextInput from '../../TextInput';
import InformModal from '../../InformModal';
import { FormWrapper } from '../../styles';
import { FormFlexContainer } from '../styles';

const CreateWorkTypeForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const form = useForm<CreateWorkTypeFormValues>({
    initialValues: {
      name: '',
    },
    validate: (values) => {
      const resolver = zodResolver(WorkTypeSchema);
      const errors = resolver(values);
      return errors;
    },
  });

  const [
    createWorkType,
    { isLoading: isCreateLoading, data: createdTypeWork, isSuccess },
  ] = useCreateWorkTypeMutation();

  const handleSubmit = async (values: CreateWorkTypeFormValues) => {
    try {
      await createWorkType({
        name: values.name,
      }).unwrap();
      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      form.reset();
      showErrorNotification(err?.data?.status, err?.data?.error);
    }
  };

  useOpenModal(setIsOpen, isSuccess);

  const navigateBack = () => navigate(Paths.WORK_TYPES);

  const closeModal = () => {
    setIsOpen(false);
    navigateBack();
  };

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={closeModal}
        title={`Тип работ ${createdTypeWork?.name} успешно добавлен`}
        backPath={Paths.WORK_TYPES}
      />

      <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
        <FormHeader
          isSubmitBtnDisabled={isCreateLoading}
          isSubmitBtnLoading={isCreateLoading}
          onBack={navigateBack}
        />

        <FormFlexContainer>
          <TextInput
            {...form.getInputProps('name')}
            label="Название"
            placeholder="Название"
            maxLength={30}
          />
        </FormFlexContainer>
      </FormWrapper>
    </>
  );
};

export default CreateWorkTypeForm;

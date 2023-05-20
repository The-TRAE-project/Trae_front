import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';

import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { useOpenModal } from '../../../helpers/hooks/useOpenModal';
import {
  useGetProjectByIdQuery,
  useInsertNewOperationMutation,
} from '../../../store/apis/project';
import {
  NewOperationFormValues,
  NewOperationSchema,
} from '../../../store/apis/project/types';
import FormHeader from '../../FormHeader';
import Loader from '../../Loader';
import NumberInput from '../../NumberInput';
import InformModal from '../../InformModal';
import { FormStack, InformModalText, TwoColumnGrid } from '../../styles';
import StageSelect from './StageSelect';

const NewStageForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: project,
    isLoading,
    error,
    isError,
  } = useGetProjectByIdQuery(Number(id as string));
  const [insertNewOperation, { isLoading: isInsertLoading, isSuccess }] =
    useInsertNewOperationMutation();

  const form = useForm<Omit<NewOperationFormValues, 'projectId'>>({
    initialValues: {
      name: '',
      priority: 0,
      typeWorkId: 0,
    },
    validate: (values) => {
      const resolver = zodResolver(
        NewOperationSchema.omit({ projectId: true })
      );
      const errors = resolver(values);
      return errors;
    },
  });

  useDisplayError(error, isError);

  const handleSubmit = async (
    values: Omit<NewOperationFormValues, 'projectId'>
  ) => {
    try {
      if (!project) return;

      await insertNewOperation({
        ...values,
        projectId: project.id,
      }).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err.status, err?.data?.error);
      form.reset();
    }
  };

  useOpenModal(setIsOpen, isSuccess);

  const navigateBack = () => navigate(`/project/${id}/new-stage`);

  const closeModal = () => {
    form.reset();
    setIsOpen(false);
    navigateBack();
  };

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Изменения сохранены"
        onBack={navigateBack}
      >
        <InformModalText>
          Добавлен этап : <strong>{form.values.name}</strong>
        </InformModalText>
      </InformModal>
      <FormStack onSubmit={form.onSubmit(handleSubmit)}>
        {!isLoading && !!project ? (
          <>
            <FormHeader
              isSubmitBtnDisabled={isInsertLoading}
              isSubmitBtnLoading={isInsertLoading}
              onBack={navigateBack}
            />

            <TwoColumnGrid>
              <StageSelect form={form} />
              <NumberInput
                {...form.getInputProps('priority')}
                label="Приоритет"
                placeholder="Приоритет"
                min={0}
                max={999}
                minLength={1}
                maxLength={3}
              />
            </TwoColumnGrid>
          </>
        ) : (
          <Loader size={80} isAbsoluteCentered />
        )}
      </FormStack>
    </>
  );
};

export default NewStageForm;

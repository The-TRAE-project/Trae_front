import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';

import { Paths } from '../../../constants/paths';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { useOpenModal } from '../../../helpers/hooks/useOpenModal';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import {
  useDeleteProjectMutation,
  useGetProjectByIdQuery,
} from '../../../store/apis/project';
import {
  ProjectDeleteFormValues,
  ProjectDeleteSchema,
} from '../../../store/apis/project/types';
import NumberInput from '../../NumberInput';
import Loader from '../../Loader';
import InformModal from '../../InformModal';
import FormHeader from '../../FormHeader';
import { FormStack, TwoColumnGrid } from '../../styles';

const DeleteForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: project,
    isLoading: isGetLoading,
    error,
    isError,
  } = useGetProjectByIdQuery(Number(id as string));
  const [deleteProject, { isLoading: isDeleteLoading, isSuccess }] =
    useDeleteProjectMutation();

  const form = useForm<ProjectDeleteFormValues>({
    initialValues: {
      projectNumber: 0,
    },
    validate: (values) => {
      const resolver = zodResolver(ProjectDeleteSchema);
      const errors = resolver(values);
      return errors;
    },
  });

  useDisplayError(error, isError);

  const handleUpdateProjectEndDate = async (
    values: ProjectDeleteFormValues
  ) => {
    try {
      if (!project) return;

      if (project.number !== values.projectNumber) {
        form.setFieldError(
          'projectNumber',
          'Номер проекта не соответствует текущему номеру!'
        );
        return;
      }

      await deleteProject(project.id).unwrap();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err.status, err?.data?.error);
    }
  };

  useOpenModal(setIsOpen, isSuccess);

  const navigateBack = () => navigate(Paths.PROJECTS);

  const closeModal = () => {
    setIsOpen(false);
    navigateBack();
  };

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={closeModal}
        title={`Проект №${project?.number} удален`}
        onBack={navigateBack}
      />

      <FormStack onSubmit={form.onSubmit(handleUpdateProjectEndDate)}>
        {!isGetLoading && !!project ? (
          <>
            <FormHeader
              submitBtnText="Удалить"
              isSubmitBtnLoading={isDeleteLoading}
              isSubmitBtnDisabled={isDeleteLoading}
              onBack={() => navigate(`/project/${id}/details`)}
            />

            <TwoColumnGrid>
              <NumberInput
                {...form.getInputProps('projectNumber')}
                label="Введите номер удаляемого проекта"
                placeholder="Номер проекта"
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

export default DeleteForm;

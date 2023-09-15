import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';

import { useLocalStorage } from '@mantine/hooks';
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
import { LocalStorage } from '../../../constants/localStorage';

const DeleteForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isProjectDeleted, setIsProjectDeleted] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const [fromReports] = useLocalStorage<boolean>({
    key: LocalStorage.PROJECT_DETAILS_FROM_REPORTS,
  });

  const {
    data: project,
    isLoading: isGetLoading,
    error,
    isError,
  } = useGetProjectByIdQuery(Number(id as string), {
    skip: isProjectDeleted,
  });
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

  const handleDeleteProject = async (values: ProjectDeleteFormValues) => {
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
      setIsProjectDeleted(true);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err.status, err?.data?.error);
    }
  };

  useOpenModal(setIsOpen, isSuccess);

  const navigateBack = () =>
    navigate(fromReports ? `/reports/by-projects` : Paths.PROJECTS);

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

      <FormStack onSubmit={form.onSubmit(handleDeleteProject)}>
        {!isGetLoading && !!project ? (
          <>
            <FormHeader
              submitBtnText="Удалить"
              isSubmitBtnLoading={isDeleteLoading}
              isSubmitBtnDisabled={isDeleteLoading}
              onBack={() =>
                navigate(
                  fromReports
                    ? `/reports/by-projects/project/${id}/details`
                    : `/project/${id}/details`
                )
              }
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

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';
import { Stack } from '@mantine/core';

import {
  Project,
  UpdateProjectFormValues,
  UpdateProjectSchema,
} from '../../../store/apis/project/types';
import { checkForEquality } from '../../../helpers/checkForEquality';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { useOpenModal } from '../../../helpers/hooks/useOpenModal';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import {
  useEditProjectMutation,
  useGetProjectByIdQuery,
} from '../../../store/apis/project';
import Loader from '../../Loader';
import InformModal from '../../InformModal';
import FormHeader from '../../FormHeader';
import { FormStack, InformModalText } from '../../styles';
import { useSetDefaultValues } from './helpers/useSetDefaultValues';
import { compareValues } from './helpers/compareValues';
import FormBody from './FormBody';

const UpdateGeneralInfo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<Project | undefined>();

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: project,
    isLoading: isGetLoading,
    error,
    isError,
  } = useGetProjectByIdQuery(Number(id as string));
  const [
    editProject,
    { data: updatedProject, isLoading: isEditLoading, isSuccess },
  ] = useEditProjectMutation();

  useDisplayError(error, isError);

  const form = useForm<Omit<UpdateProjectFormValues, 'projectId'>>({
    initialValues: {
      projectNumber: project?.number || 0,
      projectName: project?.name || '',
      customer: project?.customer || '',
      commentary: project?.comment || null,
    },
    validate: (values) => {
      const resolver = zodResolver(
        UpdateProjectSchema.omit({ projectId: true })
      );
      const errors = resolver(values);
      return errors;
    },
  });
  const { projectNumber, projectName, customer, commentary } = form.values;

  useSetDefaultValues(form, project, setCurrentProject);

  const handleUpdateProject = async (
    values: Omit<UpdateProjectFormValues, 'projectId'>
  ) => {
    try {
      if (project) {
        const comparedValues = compareValues(values, project);
        await editProject(comparedValues).unwrap();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err.status, err?.data?.error);
    }
  };

  useOpenModal(setIsOpen, isSuccess);

  const isDisabled =
    checkForEquality(projectNumber, project?.number) &&
    checkForEquality(projectName, project?.name) &&
    checkForEquality(customer, project?.customer) &&
    checkForEquality(commentary, project?.comment);

  const navigateToBack = () => navigate(`/project/${id}/details`);

  const closeModal = () => {
    setIsOpen(false);
    navigateToBack();
  };

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Изменения сохранены"
        onBack={navigateToBack}
      >
        <Stack spacing={20}>
          {!!updatedProject && (
            <>
              {!checkForEquality(
                updatedProject.projectNumber,
                currentProject?.number
              ) && (
                <InformModalText>
                  Номер проекта: <strong>{updatedProject.projectNumber}</strong>
                </InformModalText>
              )}
              {!checkForEquality(
                updatedProject.projectName,
                currentProject?.name
              ) && (
                <InformModalText>
                  Наименование изделия:&nbsp;
                  <strong>{updatedProject.projectName}</strong>
                </InformModalText>
              )}
              {!checkForEquality(
                updatedProject.customer,
                currentProject?.customer
              ) && (
                <InformModalText>
                  Клиент: <strong>{updatedProject.customer}</strong>
                </InformModalText>
              )}
              {!checkForEquality(
                updatedProject.commentary,
                currentProject?.comment
              ) && (
                <InformModalText>
                  Комментарий: <strong>{updatedProject.commentary}</strong>
                </InformModalText>
              )}
            </>
          )}
        </Stack>
      </InformModal>

      <FormStack onSubmit={form.onSubmit(handleUpdateProject)}>
        {!isGetLoading && !!project ? (
          <>
            <FormHeader
              isSubmitBtnLoading={isEditLoading}
              isSubmitBtnDisabled={isEditLoading || isDisabled}
              onBack={navigateToBack}
            />

            <FormBody form={form} />
          </>
        ) : (
          <Loader size={80} isAbsoluteCentered />
        )}
      </FormStack>
    </>
  );
};

export default UpdateGeneralInfo;

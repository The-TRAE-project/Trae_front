import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';

import {
  Project,
  UpdateProjectFormValues,
  UpdateProjectSchema,
} from '../../../store/apis/project/types';
import { checkForEquality } from '../../../helpers/checkForEquality';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import {
  useEditProjectMutation,
  useGetProjectByIdQuery,
} from '../../../store/apis/project';
import { useSetDefaultValues } from './helpers/useSetDefaultValues';
import { useOpenModal } from './helpers/useOpenModal';
import { compareValues } from './helpers/compareValues';
import FormBody from './FormBody';
import FormHeader from './FormHeader';
import { FormWrapper } from './styles';

const UpdateGeneralInfo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<Project | undefined>();

  const navigate = useNavigate();
  const { projectId } = useAppSelector((store) => store.project);

  const {
    data: project,
    isLoading: isGetLoading,
    error,
    isError,
  } = useGetProjectByIdQuery(projectId as number);
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
      showErrorNotification(err.status, err.error);
    }
  };

  useOpenModal(setIsOpen, isSuccess);

  const isDisabled =
    checkForEquality(projectNumber, project?.number) &&
    checkForEquality(projectName, project?.name) &&
    checkForEquality(customer, project?.customer) &&
    checkForEquality(commentary, project?.comment);

  const closeModal = () => {
    setIsOpen(false);
    // TODO:
    navigate(-2);
  };

  return (
    <FormWrapper onSubmit={form.onSubmit(handleUpdateProject)}>
      <FormHeader
        isOpen={isOpen}
        closeModal={closeModal}
        updatedProject={updatedProject}
        currentProject={currentProject}
        isGetLoading={isGetLoading}
        isEditLoading={isEditLoading}
        isDisabled={isDisabled}
      />

      <FormBody form={form} />
    </FormWrapper>
  );
};

export default UpdateGeneralInfo;

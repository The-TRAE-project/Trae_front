import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';

import { convertToDate } from '../../../helpers/convertToDate';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { useOpenModal } from '../../../helpers/hooks/useOpenModal';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import {
  useEditProjectEndDateMutation,
  useGetProjectByIdQuery,
} from '../../../store/apis/project';
import {
  UpdateEndDateFormValues,
  UpdateEndDateSchema,
} from '../../../store/apis/project/types';
import DatePicker from '../../DatePicker';
import Loader from '../../Loader';
import InformModal from '../../InformModal';
import FormHeader from '../../FormHeader';
import { FormStack, InformModalText, TwoColumnGrid } from '../../styles';
import { formatDate } from '../helpers/formatDate';
import { useSetDefaultValues } from './helpers/useSetDefaultValues';

const UpdateEndDateForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: project,
    isLoading: isGetLoading,
    error,
    isError,
  } = useGetProjectByIdQuery(Number(id as string));
  const [
    editProjectEndDate,
    { data: updatedEndDate, isLoading: isEditLoading, isSuccess },
  ] = useEditProjectEndDateMutation();

  const form = useForm<Omit<UpdateEndDateFormValues, 'projectId'>>({
    initialValues: {
      newPlannedAndContractEndDate: project?.endDateInContract
        ? convertToDate(project?.endDateInContract as number[])
        : null,
    },
    validate: (values) => {
      const resolver = zodResolver(
        UpdateEndDateSchema.omit({ projectId: true })
      );
      const errors = resolver(values);
      return errors;
    },
  });

  useSetDefaultValues(form, project);

  useDisplayError(error, isError);

  const handleUpdateProjectEndDate = async (
    values: Omit<UpdateEndDateFormValues, 'projectId'>
  ) => {
    try {
      if (project) {
        await editProjectEndDate({ ...values, projectId: project.id }).unwrap();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err?.data?.status, err?.data?.error);
    }
  };

  useOpenModal(setIsOpen, isSuccess);

  const navigateToBack = () => navigate(`/project/${id}/details`);

  const closeModal = () => {
    setIsOpen(false);
    navigateToBack();
  };

  const isDisabled =
    project?.endDateInContract &&
    convertToDate(project?.endDateInContract as number[]).getTime() ===
      form.values.newPlannedAndContractEndDate?.getTime();

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Изменения сохранены"
        onBack={navigateToBack}
      >
        {!!updatedEndDate && (
          <InformModalText>
            Дата окончания проекта (договор) :&nbsp;
            <strong>
              {formatDate(updatedEndDate.updatedPlannedAndContractEndDate)}
            </strong>
          </InformModalText>
        )}
      </InformModal>

      <FormStack onSubmit={form.onSubmit(handleUpdateProjectEndDate)}>
        {!isGetLoading && !!project ? (
          <>
            <FormHeader
              isSubmitBtnLoading={isEditLoading}
              isSubmitBtnDisabled={isEditLoading || isDisabled}
              onBack={navigateToBack}
            />

            <TwoColumnGrid>
              <DatePicker
                {...form.getInputProps('newPlannedAndContractEndDate')}
                title="Дата окончания проекта (договор)"
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

export default UpdateEndDateForm;

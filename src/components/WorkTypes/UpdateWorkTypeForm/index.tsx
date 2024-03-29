import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SelectItem, Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { Paths } from '../../../constants/paths';
import { Status } from '../../../store/types';
import { useEditWorkTypeMutation } from '../../../store/apis/workTypes';
import {
  EditWorkTypeFormValues,
  EditWorkTypeSchema,
  WorkType,
} from '../../../store/apis/workTypes/types';
import { setWorkType } from '../../../store/slices/workType';
import { useAppSelector } from '../../../helpers/hooks/useAppSelector';
import { useAppDispatch } from '../../../helpers/hooks/useAppDispatch';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { checkForEquality } from '../../../helpers/checkForEquality';
import { useOpenModal } from '../../../helpers/hooks/useOpenModal';
import Select from '../../Select';
import TextInput from '../../TextInput';
import InformModal from '../../InformModal';
import FormHeader from '../../FormHeader';
import { FormWrapper, InformModalText } from '../../styles';
import { FormFlexContainer } from '../styles';
import { useSetDefaultValues } from './helpers/useSetDefaultValues';
import { compareValues } from './helpers/compareValues';

const UpdateWorkTypeForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentWorkType, setCurrentWorkType] = useState<WorkType | null>(null);

  const navigate = useNavigate();
  const { workType } = useAppSelector((store) => store.workType);
  const dispatch = useAppDispatch();

  const isWorkTypeActive = workType?.isActive ? 'Активный' : 'Заблокированный';

  const form = useForm<Omit<EditWorkTypeFormValues, 'typeWorkId'>>({
    initialValues: {
      newName: workType?.name || null,
      isActive: isWorkTypeActive || null,
    },
    validate: (values) => {
      const resolver = zodResolver(
        EditWorkTypeSchema.omit({ typeWorkId: true })
      );
      const errors = resolver(values);
      return errors;
    },
  });
  const { newName, isActive } = form.values;

  const [
    editWorkType,
    { isLoading: isEditLoading, data: editedTypeWork, isSuccess },
  ] = useEditWorkTypeMutation();

  useSetDefaultValues(form, workType, setCurrentWorkType);

  const handleSubmit = async (
    values: Omit<EditWorkTypeFormValues, 'typeWorkId'>
  ) => {
    try {
      if (workType?.id) {
        const comparedValues = compareValues(values, workType);
        const response = await editWorkType({
          typeWorkId: workType.id,
          ...comparedValues,
        }).unwrap();
        form.reset();
        dispatch(setWorkType(response));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      form.reset();
      showErrorNotification(err?.data?.status, err?.data?.error);
    }
  };

  useOpenModal(setIsOpen, isSuccess);

  const statusesSelectItems: SelectItem[] = [
    {
      value: Status.ACTIVE,
      label: Status.ACTIVE,
    },
    {
      value: Status.BLOCKED,
      label: Status.BLOCKED,
    },
  ];

  const navigateBack = () => navigate(Paths.WORK_TYPES);

  const closeModal = () => {
    setIsOpen(false);
    setCurrentWorkType(workType);
    navigateBack();
  };

  const isDisabled =
    checkForEquality(newName, workType?.name) &&
    checkForEquality(isActive, isWorkTypeActive);

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Изменения сохранены"
        backPath={Paths.WORK_TYPES}
      >
        <Stack spacing={20}>
          {!!editedTypeWork && (
            <>
              {editedTypeWork.name !== currentWorkType?.name && (
                <InformModalText>
                  Название: <strong>{editedTypeWork.name}</strong>
                </InformModalText>
              )}
              {editedTypeWork.isActive !== currentWorkType?.isActive && (
                <InformModalText>
                  Статус:&nbsp;
                  <strong>
                    {editedTypeWork.isActive ? 'Активный' : 'Заблокированный'}
                  </strong>
                </InformModalText>
              )}
            </>
          )}
        </Stack>
      </InformModal>

      <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
        <FormHeader
          isSubmitBtnDisabled={isDisabled || !workType || isEditLoading}
          isSubmitBtnLoading={isEditLoading}
          onBack={navigateBack}
        />

        <FormFlexContainer>
          <TextInput
            {...form.getInputProps('newName')}
            label="Название"
            placeholder="Название"
            maxLength={30}
          />
          <Select
            {...form.getInputProps('isActive')}
            title="Статус"
            placeholder="Статус"
            data={statusesSelectItems}
          />
        </FormFlexContainer>
      </FormWrapper>
    </>
  );
};

export default UpdateWorkTypeForm;

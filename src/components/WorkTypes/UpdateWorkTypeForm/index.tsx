import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Group, SelectItem, Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { Paths } from '../../../constants/paths';
import { useEditWorkTypeMutation } from '../../../store/apis/workTypes';
import {
  EditWorkTypeFormValues,
  EditWorkTypeSchema,
  WorkType,
} from '../../../store/apis/workTypes/types';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import Loader from '../../Loader';
import Select from '../../Select';
import ArrowLeft from '../../svgs/ArrowLeft';
import Home from '../../svgs/Home';
import TextInput from '../../TextInput';
import InformModal from '../../InformModal';
import { InformModalText, OrangeButton, UnstyledButton } from '../../styles';
import { FlexContainer, Form, Grid } from './styles';

const UpdateWorkTypeForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const workType = location.state.workType as WorkType;

  const form = useForm<Omit<EditWorkTypeFormValues, 'typeWorkId'>>({
    initialValues: {
      newName: null,
      isActive: null,
    },
    validate: (values) => {
      const resolver = zodResolver(
        EditWorkTypeSchema.omit({ typeWorkId: true })
      );
      const errors = resolver(values);
      return errors;
    },
  });

  const [editWorkType, { isLoading: isEditLoading, data: editedTypeWork }] =
    useEditWorkTypeMutation();

  const handleSubmit = async (
    values: Omit<EditWorkTypeFormValues, 'typeWorkId'>
  ) => {
    try {
      if (workType?.id) {
        await editWorkType({
          typeWorkId: workType?.id,
          // eslint-disable-next-line prettier/prettier
          isActive: values.isActive ? values.isActive === 'Активный' : null,
          newName: values.newName,
        }).unwrap();
        setIsOpen(true);
        form.reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err.data.status, err.data.error);
    }
  };
  // TODO:
  const statusesSelectItems: SelectItem[] = [
    {
      value: 'Активный',
      label: 'Активный',
    },
    {
      value: 'Заблокированный',
      label: 'Заблокированный',
    },
  ];

  const isDisabled = !form.values.newName && !form.values.isActive;

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Изменения сохранены"
      >
        <Stack spacing={20}>
          {editedTypeWork?.name && (
            <InformModalText>Название: {editedTypeWork.name}</InformModalText>
          )}
          {editedTypeWork?.isActive && (
            <InformModalText>
              Статус: {editedTypeWork.isActive ? 'Активный' : 'Заблокированный'}
            </InformModalText>
          )}
        </Stack>
      </InformModal>

      <Form onSubmit={form.onSubmit(handleSubmit)}>
        <Group position="apart" spacing={100}>
          <Group spacing={42}>
            <UnstyledButton onClick={() => navigate(-1)} type="button">
              <ArrowLeft />
            </UnstyledButton>
            <UnstyledButton
              onClick={() => navigate(Paths.PROJECTS)}
              type="button"
            >
              <Home />
            </UnstyledButton>
          </Group>

          <OrangeButton
            disabled={isDisabled || !workType || isEditLoading}
            $width={171}
            type="submit"
          >
            {isEditLoading ? <Loader size={35} /> : <span>Сохранить</span>}
          </OrangeButton>
        </Group>

        <Grid>
          <FlexContainer>
            <TextInput
              {...form.getInputProps('newName')}
              label="Название"
              maxLength={15}
            />
            <Select
              {...form.getInputProps('isActive')}
              title="Статус"
              data={statusesSelectItems}
            />
          </FlexContainer>
        </Grid>
      </Form>
    </>
  );
};

export default UpdateWorkTypeForm;

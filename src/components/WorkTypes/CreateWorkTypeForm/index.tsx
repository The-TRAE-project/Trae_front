import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { Paths } from '../../../constants/paths';
import { useCreateWorkTypeMutation } from '../../../store/apis/workTypes';
import {
  CreateWorkTypeFormValues,
  WorkTypeSchema,
} from '../../../store/apis/workTypes/types';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import Loader from '../../Loader';
import ArrowLeft from '../../svgs/ArrowLeft';
import Home from '../../svgs/Home';
import TextInput from '../../TextInput';
import InformModal from '../../InformModal';
import { OrangeButton, UnstyledButton } from '../../styles';
import { Form, FlexContainer, Grid } from './styles';

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
    { isLoading: isCreateLoading, data: createdTypeWork },
  ] = useCreateWorkTypeMutation();

  const handleSubmit = async (values: CreateWorkTypeFormValues) => {
    try {
      await createWorkType({
        name: values.name,
      }).unwrap();
      setIsOpen(true);
      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err.data.status, err.data.error);
    }
  };

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`Тип работ ${createdTypeWork?.name} успешно добавлен`}
        backPath={Paths.WORK_TYPES}
      />

      <Form onSubmit={form.onSubmit(handleSubmit)}>
        <Group position="apart" spacing={100}>
          <Group spacing={42}>
            <UnstyledButton
              onClick={() => navigate(Paths.WORK_TYPES)}
              type="button"
            >
              <ArrowLeft />
            </UnstyledButton>
            <UnstyledButton
              onClick={() => navigate(Paths.PROJECTS)}
              type="button"
            >
              <Home />
            </UnstyledButton>
          </Group>

          <OrangeButton disabled={isCreateLoading} $width={171} type="submit">
            {isCreateLoading ? <Loader size={35} /> : <span>Сохранить</span>}
          </OrangeButton>
        </Group>

        <Grid>
          <FlexContainer>
            <TextInput
              {...form.getInputProps('name')}
              label="Название"
              maxLength={30}
            />
          </FlexContainer>
        </Grid>
      </Form>
    </>
  );
};

export default CreateWorkTypeForm;

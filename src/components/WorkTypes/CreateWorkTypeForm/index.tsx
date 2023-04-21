import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';

import { Paths } from '../../../constants/paths';
import { useCreateWorkTypeMutation } from '../../../store/apis/workTypes';
import {
  CreateWorkTypeFormValues,
  WorkTypeSchema,
} from '../../../store/apis/workTypes/types';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import Loader from '../../Loader';
import TextInput from '../../TextInput';
import InformModal from '../../InformModal';
import { FormWrapper, OrangeButton, UnstyledButton } from '../../styles';
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

      <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
        <Group position="apart" spacing={100}>
          <Group spacing={42}>
            <UnstyledButton
              onClick={() => navigate(Paths.WORK_TYPES)}
              type="button"
            >
              <BsArrowLeft size={50} color="var(--orange)" />
            </UnstyledButton>
            <UnstyledButton
              onClick={() => navigate(Paths.DASHBOARD)}
              type="button"
            >
              <BsFillHouseFill size={44} color="var(--orange)" />
            </UnstyledButton>
          </Group>

          <OrangeButton disabled={isCreateLoading} $width={171} type="submit">
            {isCreateLoading ? <Loader size={35} /> : <span>Сохранить</span>}
          </OrangeButton>
        </Group>

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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';

import {
  CreateProjectFormValues,
  CreateProjectSchema,
} from '../../../store/apis/project/types';
import { useCreateProjectMutation } from '../../../store/apis/project';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { Paths } from '../../../constants/paths';
import Loader from '../../Loader';
import DatePicker from '../../DatePicker';
import TextInput from '../../TextInput';
import NumberInput from '../../NumberInput';
import InformModal from '../../InformModal';
import Textarea from '../../Textarea';
import { FormWrapper, OrangeButton, UnstyledButton } from '../../styles';
import OperationsInput from './OperationsInput';
import { Grid } from './styles';

const CreateForm = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const navigate = useNavigate();
  const form = useForm<CreateProjectFormValues>({
    initialValues: {
      customer: '',
      name: '',
      number: 0,
      operations: [],
      comment: '',
      plannedEndDate: new Date(),
    },
    validate: (values) => {
      const resolver = zodResolver(CreateProjectSchema);
      const errors = resolver(values);
      return errors;
    },
  });

  const [createProject, { isLoading }] = useCreateProjectMutation();

  const handleSubmit = async (values: CreateProjectFormValues) => {
    try {
      await createProject(values).unwrap();
      setIsModalOpen(true);
      setIsSuccess(true);
      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err.status, err.error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate(Paths.PROJECTS);
  };

  return (
    <>
      <InformModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Проект успешно добавлен"
        backPath={Paths.PROJECTS}
      />

      <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
        <Group position="apart" spacing={100}>
          <Group spacing={42}>
            <UnstyledButton
              onClick={() => navigate(Paths.PROJECTS)}
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

          <OrangeButton disabled={isLoading} type="submit" $width={148}>
            {isLoading ? <Loader size={35} /> : <span>Сохранить</span>}
          </OrangeButton>
        </Group>

        <Grid>
          <NumberInput
            {...form.getInputProps('number')}
            label="Номер проекта"
            placeholder="Номер проекта"
            min={0}
            max={999}
            minLength={1}
            maxLength={3}
          />
          <TextInput
            {...form.getInputProps('name')}
            label="Наименование изделия"
            placeholder="Наименование изделия"
            minLength={2}
            maxLength={15}
          />
          <TextInput
            {...form.getInputProps('customer')}
            label="Клиент"
            placeholder="Клиент"
            minLength={2}
            maxLength={15}
          />
          <DatePicker
            {...form.getInputProps('plannedEndDate')}
            title="Срок изготовления"
            defaultValue={new Date()}
          />
          <Textarea
            {...form.getInputProps('comment')}
            label="Комментарий"
            placeholder="Комментарий"
            maxLength={1000}
          />
          <OperationsInput form={form} isSuccess={isSuccess} />
        </Grid>
      </FormWrapper>
    </>
  );
};

export default CreateForm;

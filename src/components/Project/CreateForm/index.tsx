import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, zodResolver } from '@mantine/form';

import {
  CreateProjectFormValues,
  CreateProjectSchema,
} from '../../../store/apis/project/types';
import { useCreateProjectMutation } from '../../../store/apis/project';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { useOpenModal } from '../../../helpers/hooks/useOpenModal';
import { Paths } from '../../../constants/paths';
import DatePicker from '../../DatePicker';
import TextInput from '../../TextInput';
import NumberInput from '../../NumberInput';
import InformModal from '../../InformModal';
import Textarea from '../../Textarea';
import FormHeader from '../../FormHeader';
import { FormWrapper, TwoColumnGrid } from '../../styles';
import StageSelect from './StageSelect';

const CreateForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const [createProject, { isLoading, isSuccess }] = useCreateProjectMutation();

  const handleSubmit = async (values: CreateProjectFormValues) => {
    try {
      await createProject(values).unwrap();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err?.data?.status, err?.data?.error);
    }
  };

  useOpenModal(setIsOpen, isSuccess);

  const closeModal = () => {
    setIsOpen(false);
    navigate(Paths.PROJECTS);
    form.reset();
  };

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={closeModal}
        title={`Проект №${form.values.number} успешно добавлен`}
        backPath={Paths.PROJECTS}
      />

      <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
        <FormHeader
          isSubmitBtnDisabled={isLoading}
          isSubmitBtnLoading={isLoading}
          onBack={() => navigate(Paths.PROJECTS)}
        />

        <TwoColumnGrid>
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
            maxLength={30}
          />
          <TextInput
            {...form.getInputProps('customer')}
            label="Клиент"
            placeholder="Клиент"
            minLength={2}
            maxLength={30}
          />
          <DatePicker
            {...form.getInputProps('plannedEndDate')}
            title="Дата окончания проекта (договор)"
          />
          <Textarea
            {...form.getInputProps('comment')}
            label="Комментарий"
            placeholder="Комментарий"
            maxLength={1000}
          />
          <StageSelect form={form} isSuccess={isSuccess} />
        </TwoColumnGrid>
      </FormWrapper>
    </>
  );
};

export default CreateForm;

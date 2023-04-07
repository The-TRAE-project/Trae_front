import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, Stack } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import {
  ConstructorFormSchema,
  ConstructorFormValues,
} from '../../../store/apis/user/types';
import { useCreateConstructorMutation } from '../../../store/apis/user';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import { Paths } from '../../../constants/paths';
import Loader from '../../Loader';
import MaskedTextInput from '../../MaskedInput';
import DatePicker from '../../DatePicker';
import ArrowLeft from '../../svgs/ArrowLeft';
import TextInput from '../../TextInput';
import InformModal from '../../InformModal';
import Home from '../../svgs/Home';
import { InformModalText, OrangeButton, UnstyledButton } from '../../styles';
import { Form, Grid } from './styles';

const CreateForm = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const form = useForm<ConstructorFormValues>({
    initialValues: {
      dateOfEmployment: new Date(),
      firstName: '',
      lastName: '',
      middleName: null,
      phone: '',
      username: '',
    },
    validate: (values) => {
      const resolver = zodResolver(ConstructorFormSchema);
      const errors = resolver(values);
      return errors;
    },
  });

  const [createConstructor, { isLoading, data }] =
    useCreateConstructorMutation();

  const handleSubmit = async (values: ConstructorFormValues) => {
    try {
      await createConstructor(values).unwrap();
      setIsModalOpen(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err.status, err.error);
    }
  };

  const handleCloseModal = () => {
    form.reset();
    setIsModalOpen(false);
  };

  return (
    <>
      <InformModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={`${form.values.firstName} ${form.values.lastName} успешно добавлен`}
        backPath={Paths.CONSTRUCTORS}
      >
        <Stack spacing={20}>
          <InformModalText>
            Логин: <strong>{data?.username}</strong>
          </InformModalText>
          <InformModalText>
            Пароль: <strong>{data?.password}</strong>
          </InformModalText>
        </Stack>
      </InformModal>

      <Form onSubmit={form.onSubmit(handleSubmit)}>
        <Group position="apart" spacing={100}>
          <Group spacing={42}>
            <UnstyledButton
              onClick={() => navigate(Paths.CONSTRUCTORS)}
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

          <OrangeButton disabled={isLoading} type="submit" $width={148}>
            {isLoading ? <Loader size={35} /> : <span>Сохранить</span>}
          </OrangeButton>
        </Group>

        <Grid>
          <TextInput
            {...form.getInputProps('lastName')}
            label="Фамилия"
            maxLength={15}
          />
          <TextInput
            {...form.getInputProps('middleName')}
            label="Отчество"
            minLength={2}
            maxLength={15}
          />
          <MaskedTextInput
            // eslint-disable-next-line react/jsx-curly-brace-presence
            mask={'+7 (000) 000 0000'}
            {...form.getInputProps('phone')}
            label="Номер телефона"
          />
          <TextInput
            {...form.getInputProps('firstName')}
            label="Имя"
            maxLength={15}
          />
          <DatePicker
            {...form.getInputProps('dateOfEmployment')}
            defaultValue={new Date()}
          />
          <TextInput
            {...form.getInputProps('username')}
            label="Логин"
            maxLength={15}
          />
        </Grid>
      </Form>
    </>
  );
};

export default CreateForm;

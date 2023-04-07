import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, SelectItem } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';

import { Paths } from '../../../constants/paths';
import { useCreateEmployeeMutation } from '../../../store/apis/employee';
import {
  EmployeeFormSchema,
  EmployeeFormValues,
} from '../../../store/apis/employee/types';
import { useGetActiveWorkTypesQuery } from '../../../store/apis/workTypes';
import { showErrorNotification } from '../../../helpers/showErrorNotification';
import InformModal from '../../InformModal';
import Loader from '../../Loader';
import MaskedTextInput from '../../MaskedInput';
import MultiSelect from '../../MultiSelect';
import ArrowLeft from '../../svgs/ArrowLeft';
import Home from '../../svgs/Home';
import TextInput from '../../TextInput';
import { useDateInputStyles } from '../../DatePicker/styles';
import { InformModalText, OrangeButton, UnstyledButton } from '../../styles';
import { Form, Grid } from './styles';

const EmployeeCreateForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    classes: {
      input,
      label,
      error,
      wrapper,
      calendar,
      calendarHeaderControl,
      calendarHeaderLevel,
      weekday,
      day,
      rightSection,
    },
  } = useDateInputStyles();
  const navigate = useNavigate();
  const form = useForm<EmployeeFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      middleName: null,
      phone: '',
      typesId: [],
      dateOfEmployment: new Date(),
    },
    validate: (values) => {
      const resolver = zodResolver(EmployeeFormSchema);
      const errors = resolver(values);
      return errors;
    },
  });

  const [createEmployee, { data: createdEmployee, isLoading }] =
    useCreateEmployeeMutation();
  const { data: workTypes } = useGetActiveWorkTypesQuery();

  const handleSubmit = async (values: EmployeeFormValues) => {
    try {
      await createEmployee({
        ...values,
        typesId: values.typesId.map((typeId) => +typeId),
      }).unwrap();
      setIsOpen(true);
      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showErrorNotification(err.status, err.error);
    }
  };

  const workTypeSelectItems: SelectItem[] = workTypes
    ? workTypes.map<SelectItem>((workType) => ({
        value: String(workType.id),
        label: workType.name,
      }))
    : [];

  return (
    <>
      <InformModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={`${createdEmployee?.firstName} ${createdEmployee?.firstName} успешно добавлен`}
        backPath={Paths.EMPLOYEES}
      >
        {!!createdEmployee && (
          <InformModalText>Пароль: {createdEmployee.pinCode}</InformModalText>
        )}
      </InformModal>

      <Form onSubmit={form.onSubmit(handleSubmit)}>
        <Group position="apart" spacing={100}>
          <Group spacing={42}>
            <UnstyledButton
              onClick={() => navigate(Paths.EMPLOYEES)}
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
            {...form.getInputProps('phone')}
            label="Номер телефона"
            // eslint-disable-next-line react/jsx-curly-brace-presence
            mask={'+7 (000) 000 0000'}
          />
          <TextInput
            {...form.getInputProps('firstName')}
            label="Имя"
            maxLength={15}
          />
          <DatePickerInput
            {...form.getInputProps('dateOfEmployment')}
            label="Дата регистрации"
            placeholder="Выберите дату"
            clearable
            valueFormat="DD.MM.YYYY"
            classNames={{
              wrapper,
              calendar,
              calendarHeaderControl,
              calendarHeaderLevel,
              weekday,
              day,
              label,
              input,
              error,
              rightSection,
            }}
          />
          <MultiSelect
            data={workTypeSelectItems}
            label="Типы работ"
            {...form.getInputProps('typesId')}
          />
        </Grid>
      </Form>
    </>
  );
};

export default EmployeeCreateForm;

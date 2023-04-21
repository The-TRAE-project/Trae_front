import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group, SelectItem } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { BsArrowLeft, BsFillHouseFill } from 'react-icons/bs';

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
import TextInput from '../../TextInput';
import DatePicker from '../../DatePicker';
import {
  FormWrapper,
  Grid,
  InformModalText,
  OrangeButton,
  UnstyledButton,
} from '../../styles';

const EmployeeCreateForm = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        title={`${createdEmployee?.firstName} ${createdEmployee?.lastName} успешно добавлен`}
        backPath={Paths.EMPLOYEES}
      >
        {!!createdEmployee && (
          <InformModalText>Пароль: {createdEmployee.pinCode}</InformModalText>
        )}
      </InformModal>

      <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
        <Group position="apart" spacing={100}>
          <Group spacing={42}>
            <UnstyledButton
              onClick={() => navigate(Paths.EMPLOYEES)}
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
          <TextInput
            {...form.getInputProps('lastName')}
            label="Фамилия"
            placeholder="Фамилия"
            maxLength={15}
          />
          <TextInput
            {...form.getInputProps('middleName')}
            label="Отчество"
            placeholder="Отчество"
            minLength={2}
            maxLength={15}
          />
          <MaskedTextInput
            {...form.getInputProps('phone')}
            mask="+7 (000) 000 0000"
            label="Номер телефона"
            placeholder="+7 (000) 000 0000"
          />
          <TextInput
            {...form.getInputProps('firstName')}
            label="Имя"
            placeholder="Имя"
            maxLength={15}
          />
          <DatePicker
            {...form.getInputProps('dateOfEmployment')}
            title="Дата регистрации"
          />
          <MultiSelect
            data={workTypeSelectItems}
            label="Типы работ"
            {...form.getInputProps('typesId')}
          />
        </Grid>
      </FormWrapper>
    </>
  );
};

export default EmployeeCreateForm;

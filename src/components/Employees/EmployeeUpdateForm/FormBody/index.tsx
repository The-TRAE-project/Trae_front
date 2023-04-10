// TODO:
import { SelectItem } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';
import dayjs from 'dayjs';

import { useGetActiveWorkTypesQuery } from '../../../../store/apis/workTypes';
import { EmployeeUpdateFormValues } from '../../../../store/apis/employee/types';
import { EmployeeToEdit } from '../../../../store/slices/employee/types';
import Loader from '../../../Loader';
import Select from '../../../Select';
import { useDateInputStyles } from '../../../DatePicker/styles';
import TextInput from '../../../TextInput';
import MaskedTextInput from '../../../MaskedInput';
import MultiSelect from '../../../MultiSelect';
import NumberInput from '../../../NumberInput';
import DetailsCard from './DetailsCard';
import { Grid, Wrapper } from './styles';
import WorkTypesDetailsCard from './WorkTypesDetailsCard';
// import DatePicker from '../../../DatePicker';

type EmployeeWithoutId = Omit<EmployeeUpdateFormValues, 'employeeId'>;

interface Props {
  employee: EmployeeToEdit | null;
  form: UseFormReturnType<
    EmployeeWithoutId,
    (values: EmployeeWithoutId) => EmployeeWithoutId
  >;
  isUpdate: boolean;
}

const FormBody = ({ employee, form, isUpdate }: Props) => {
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
  const { data: workTypes } = useGetActiveWorkTypesQuery();

  const workTypesSelectItems: SelectItem[] = workTypes
    ? workTypes.map<SelectItem>((workType) => ({
        value: String(workType.id),
        label: workType.name,
      }))
    : [];
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

  return (
    <Wrapper>
      {employee ? (
        <Grid>
          {isUpdate ? (
            <TextInput {...form.getInputProps('lastName')} label="Фамилия" />
          ) : (
            <DetailsCard label="Фамилия" text={employee.lastName} />
          )}
          {isUpdate ? (
            <DatePickerInput
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
              {...form.getInputProps('dateOfEmployment')}
            />
          ) : (
            <DetailsCard
              text={dayjs(employee.dateOfEmployment).format('DD.MM.YYYY')}
              label="Дата регистрации"
            />
          )}
          {isUpdate ? (
            <DatePickerInput
              label="Дата увольнения"
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
              {...form.getInputProps('dateOfDismissal')}
            />
          ) : (
            <DetailsCard
              text={
                employee.dateOfDismissal
                  ? dayjs(employee.dateOfDismissal).format('DD.MM.YYYY')
                  : ''
              }
              label="Дата увольнения"
            />
          )}
          {isUpdate ? (
            <TextInput {...form.getInputProps('firstName')} label="Имя" />
          ) : (
            <DetailsCard text={employee.firstName} label="Имя" />
          )}
          {isUpdate ? (
            <MaskedTextInput
              mask="+7 (000) 000 0000"
              {...form.getInputProps('phone')}
              label="Номер телефона"
            />
          ) : (
            <DetailsCard text={employee.phone} label="Номер телефона" />
          )}
          {isUpdate ? (
            <Select
              {...form.getInputProps('isActive')}
              data={statusesSelectItems}
              title="Статус"
              defaultValue={employee.isActive ? 'Активный' : 'Заблокированный'}
            />
          ) : (
            <DetailsCard
              text={employee.isActive ? 'Активный' : 'Заблокированный'}
              label="Статус"
            />
          )}
          {isUpdate ? (
            <TextInput {...form.getInputProps('middleName')} label="Отчество" />
          ) : (
            <DetailsCard text={employee.middleName} label="Отчество" />
          )}
          {isUpdate ? (
            <NumberInput {...form.getInputProps('pinCode')} label="Пароль" />
          ) : (
            <DetailsCard text={String(employee.pinCode)} label="Пароль" />
          )}
          {isUpdate ? (
            <MultiSelect
              {...form.getInputProps('changedTypesId')}
              data={workTypesSelectItems}
              // defaultValue={defaultWorkTypes}
              label="Тип работ"
            />
          ) : (
            <WorkTypesDetailsCard workTypes={employee.types} />
          )}
        </Grid>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </Wrapper>
  );
};

export default FormBody;

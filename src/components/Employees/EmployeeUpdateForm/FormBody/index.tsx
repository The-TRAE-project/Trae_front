import { useEffect } from 'react';
import { SelectItem, MultiSelect } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import dayjs from 'dayjs';

import { useGetActiveWorkTypesQuery } from '../../../../store/apis/workTypes';
import { EmployeeUpdateFormValues } from '../../../../store/apis/employee/types';
import { EmployeeToEdit } from '../../../../store/slices/employee/types';
import { Status } from '../../../../store/types';
import Loader from '../../../Loader';
import Select from '../../../Select';
import TextInput from '../../../TextInput';
import MaskedTextInput from '../../../MaskedInput';
// TODO:
// import MultiSelect from '../../../MultiSelect';
import NumberInput from '../../../NumberInput';
import DatePicker from '../../../DatePicker';
import DetailsCard from '../../../DetailsCard';
import { useMultiSelectStyles } from '../../../MultiSelect/styles';
import { FormBodyWrapper, Grid } from '../../../styles';
import WorkTypesDetailsCard from './WorkTypesDetailsCard';

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
  const { data: workTypes } = useGetActiveWorkTypesQuery();
  const {
    classes: { dropdown, input, inputLabel, error, item, itemsWrapper, value },
  } = useMultiSelectStyles();

  const workTypesSelectItems: SelectItem[] = workTypes
    ? workTypes.map<SelectItem>((workType) => ({
        value: String(workType.id),
        label: workType.name,
      }))
    : [];

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

  useEffect(() => {
    if (
      form.values.isActive === Status.BLOCKED &&
      !form.values.dateOfDismissal
    ) {
      form.setFieldError(
        'dateOfDismissal',
        'Пожалуйста, выберите дату увольнения'
      );
    } else {
      form.setFieldValue('dateOfDismissal', null);
      form.clearFieldError('dateOfDismissal');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.isActive]);

  return (
    <FormBodyWrapper>
      {employee ? (
        <Grid>
          {isUpdate ? (
            <TextInput
              {...form.getInputProps('lastName')}
              label="Фамилия"
              placeholder="Фамилия"
              maxLength={15}
            />
          ) : (
            <DetailsCard label="Фамилия" text={employee.lastName} />
          )}
          {isUpdate ? (
            <DatePicker
              {...form.getInputProps('dateOfEmployment')}
              title="Дата регистрации"
            />
          ) : (
            <DetailsCard
              text={dayjs(employee.dateOfEmployment).format('DD.MM.YYYY')}
              label="Дата регистрации"
            />
          )}
          {isUpdate ? (
            <DatePicker
              {...form.getInputProps('dateOfDismissal')}
              title="Дата увольнения"
              disabled={form.values.isActive === Status.ACTIVE}
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
            <TextInput
              {...form.getInputProps('firstName')}
              label="Имя"
              placeholder="Имя"
              maxLength={15}
            />
          ) : (
            <DetailsCard text={employee.firstName} label="Имя" />
          )}
          {isUpdate ? (
            <MaskedTextInput
              {...form.getInputProps('phone')}
              mask="+7 (000) 000 0000"
              label="Номер телефона"
              placeholder="+7 (000) 000 0000"
            />
          ) : (
            <DetailsCard text={employee.phone} label="Номер телефона" />
          )}
          {isUpdate ? (
            <Select
              {...form.getInputProps('isActive')}
              data={statusesSelectItems}
              title="Статус"
              placeholder="Статус"
              defaultValue={employee.isActive ? 'Активный' : 'Заблокированный'}
            />
          ) : (
            <DetailsCard
              text={employee.isActive ? 'Активный' : 'Заблокированный'}
              label="Статус"
            />
          )}
          {isUpdate ? (
            <TextInput
              {...form.getInputProps('middleName')}
              label="Отчество"
              placeholder="Отчество"
              minLength={2}
              maxLength={15}
            />
          ) : (
            <DetailsCard text={employee.middleName} label="Отчество" />
          )}
          {isUpdate ? (
            <NumberInput
              {...form.getInputProps('pinCode')}
              label="Пароль"
              placeholder="Пароль"
              maxLength={3}
            />
          ) : (
            <DetailsCard text={String(employee.pinCode)} label="Пароль" />
          )}
          {isUpdate ? (
            <MultiSelect
              {...form.getInputProps('changedTypesId')}
              data={workTypesSelectItems}
              label="Тип работ"
              maxDropdownHeight={284}
              classNames={{
                dropdown,
                input,
                label: inputLabel,
                error,
                item,
                itemsWrapper,
                value,
              }}
            />
          ) : (
            <WorkTypesDetailsCard workTypes={employee.types} />
          )}
        </Grid>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </FormBodyWrapper>
  );
};

export default FormBody;

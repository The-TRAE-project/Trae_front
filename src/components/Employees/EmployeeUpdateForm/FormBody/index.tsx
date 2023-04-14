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
import { useMultiSelectStyles } from '../../../MultiSelect/styles';
import { Grid } from '../../../styles';
import DetailsCard from './DetailsCard';
import WorkTypesDetailsCard from './WorkTypesDetailsCard';
import { Wrapper } from './styles';

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
    </Wrapper>
  );
};

export default FormBody;

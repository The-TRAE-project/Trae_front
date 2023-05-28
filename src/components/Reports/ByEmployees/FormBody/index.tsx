import { UseFormReturnType } from '@mantine/form';

import { ParamsForEmployees } from '../../../../store/apis/reports/types';
import DatePicker from '../../../DatePicker';
import { ThreeColumnGrid } from '../../../styles';
import EmployeeSelect from './EmployeeSelect';

interface Props {
  form: UseFormReturnType<
    ParamsForEmployees,
    (values: ParamsForEmployees) => ParamsForEmployees
  >;
}

const FormBody = ({ form }: Props) => {
  return (
    <ThreeColumnGrid>
      <EmployeeSelect />
      <DatePicker
        {...form.getInputProps('startOfPeriod')}
        title="Дата начало"
      />
      <DatePicker
        {...form.getInputProps('endOfPeriod')}
        title="Дата окончания"
      />
    </ThreeColumnGrid>
  );
};

export default FormBody;

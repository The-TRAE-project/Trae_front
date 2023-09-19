import { UseFormReturnType } from '@mantine/form';
import { EmployeesShortInfo } from '../../../../store/apis/employee/types';
import { EmployeeReportFormValues } from '../../../../store/apis/reports/types';
import DatePicker from '../../../DatePicker';
import { ThreeColumnGrid } from '../../../styles';
import EmployeeSelect from './EmployeeSelect';

interface Props {
  form: UseFormReturnType<
    EmployeeReportFormValues,
    (values: EmployeeReportFormValues) => EmployeeReportFormValues
  >;
  employees: EmployeesShortInfo[];
}

const FormBody = ({ form, employees }: Props) => {
  return (
    <ThreeColumnGrid>
      <EmployeeSelect form={form} employees={employees} />
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

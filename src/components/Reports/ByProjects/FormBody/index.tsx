import { UseFormReturnType } from '@mantine/form';

import { ProjectReportFormValues } from '../../../../store/apis/reports/types';
import DatePicker from '../../../DatePicker';
import { ThreeColumnGrid } from '../../../styles';

interface Props {
  form: UseFormReturnType<
    ProjectReportFormValues,
    (values: ProjectReportFormValues) => ProjectReportFormValues
  >;
}

const FormBody = ({ form }: Props) => {
  return (
    <ThreeColumnGrid>
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

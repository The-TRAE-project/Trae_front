import { UseFormReturnType } from '@mantine/form';

import { SortingState } from '@tanstack/react-table';
import { ProjectReportFormValues } from '../../../../store/apis/reports/types';
import DatePicker from '../../../DatePicker';
import { ThreeColumnGrid } from '../../../styles';
import { SortTypeSelect } from './SortTypeSelect';

interface Props {
  form: UseFormReturnType<
    ProjectReportFormValues,
    (values: ProjectReportFormValues) => ProjectReportFormValues
  >;
  sortType: SortingState;
  setSortType: React.Dispatch<React.SetStateAction<SortingState>>;
  isFormed?: boolean;
}

const FormBody = ({ form, isFormed = false, sortType, setSortType }: Props) => {
  return (
    <ThreeColumnGrid>
      {isFormed && (
        <SortTypeSelect sortType={sortType} setSortType={setSortType} />
      )}

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

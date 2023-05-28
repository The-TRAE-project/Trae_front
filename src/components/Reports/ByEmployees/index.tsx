import { useNavigate } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { Stack } from '@mantine/core';
import dayjs from 'dayjs';

import { Paths } from '../../../constants/paths';
import { useGetEmployeesReportsQuery } from '../../../store/apis/reports';
import { ParamsForEmployees } from '../../../store/apis/reports/types';
import Loader from '../../Loader';
import { FormWrapper } from '../../styles';
import FormHeader from '../FormHeader';
import FormBody from './FormBody';
import TimelineListItem from './TimelineListItem';

const ByEmployees = () => {
  const navigate = useNavigate();

  const form = useForm<ParamsForEmployees>({
    initialValues: {
      startOfPeriod: new Date(),
      endOfPeriod: dayjs(new Date()).add(30, 'days').toDate(),
    },
  });
  const { startOfPeriod, endOfPeriod } = form.values;

  const { data: reportsByEmployees, isLoading: isGetLoading } =
    useGetEmployeesReportsQuery({
      startOfPeriod: `?startOfPeriod=${dayjs(startOfPeriod).format(
        'YYYY-MM-DD'
      )}`,
      endOfPeriod: `&endOfPeriod=${dayjs(endOfPeriod).format('YYYY-MM-DD')}`,
      employeeIds: `&employeeIds=${'1,2,3,4'}`,
    });

  return (
    <FormWrapper>
      {!isGetLoading && !!reportsByEmployees ? (
        <>
          <FormHeader
            onBack={() => navigate(Paths.REPORTS)}
            isReportFormed={!!reportsByEmployees}
            isFormBtnLoading={isGetLoading}
            isFormBtnDisabled={isGetLoading}
          />

          <Stack spacing={40}>
            <FormBody form={form} />
            <TimelineListItem
              defaultTimeStart={startOfPeriod as Date}
              defaultTimeEnd={endOfPeriod as Date}
              employeeGroups={reportsByEmployees.shortEmployeeDtoList}
              employeeItems={reportsByEmployees.workingShiftEmployeeDtoList}
            />
          </Stack>
        </>
      ) : (
        <Loader size={80} isAbsoluteCentered />
      )}
    </FormWrapper>
  );
};

export default ByEmployees;

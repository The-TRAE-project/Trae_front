import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { Stack } from '@mantine/core';

import { useGetProjectsReportsQuery } from '../../../store/apis/reports';
import {
  ProjectReportFormValues,
  ProjectReportSchema,
} from '../../../store/apis/reports/types';
import { useExportToExcel } from '../../../helpers/hooks/useExportToExcel';
import { FormWrapper } from '../../styles';
import Loader from '../../Loader';
import {
  DATE_1_AHEAD,
  formatToQueryParamDate,
} from '../helpers/formatToParamDate';
import FormHeader from '../FormHeader';
import FormBody from './FormBody';
import { ReportTable } from './ReportTable';

const ByProjects = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const {
    data: reportsByProjects,
    isLoading: isGetLoading,
    isFetching,
  } = useGetProjectsReportsQuery(
    {
      startOfPeriod: startDate ? `?startOfPeriod=${startDate}` : '',
      endOfPeriod: endDate ? `&endOfPeriod=${endDate}` : '',
    },
    {
      skip: !startDate && !endDate,
    }
  );

  const form = useForm<ProjectReportFormValues>({
    initialValues: {
      startOfPeriod: new Date(),
      endOfPeriod: DATE_1_AHEAD,
    },
    validate: (values) => {
      const resolver = zodResolver(ProjectReportSchema);
      const errors = resolver(values);
      return errors;
    },
  });
  // const { startOfPeriod, endOfPeriod } = form.values;

  const { isLoading: isExcelExportLoading, exportToExcel } = useExportToExcel();

  const handleSubmit = (values: ProjectReportFormValues) => {
    setStartDate(formatToQueryParamDate(values.startOfPeriod));
    setEndDate(formatToQueryParamDate(values.endOfPeriod));
  };

  const handleExportToExcel = () => {
    if (!reportsByProjects) return;

    exportToExcel(reportsByProjects, 'Отчеты по проектам', 'Projects');
  };

  const isReportExist =
    !!reportsByProjects &&
    reportsByProjects.projectsForReportDtoList.length > 0;

  return (
    <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader
        isReportFormed={!!reportsByProjects}
        isFormBtnLoading={isFetching || isGetLoading}
        isFormBtnDisabled={isFetching || isGetLoading}
        isExportToExcelLoading={isExcelExportLoading}
        isExportToExcelBtnDisabled
        onExportToExcel={handleExportToExcel}
      />

      <Stack spacing={40}>
        <FormBody form={form} />

        {startDate &&
          endDate &&
          (!isGetLoading && !isFetching && !!isReportExist ? (
            <ReportTable
              startPeriod={reportsByProjects.dateOfReportFormation}
              endPeriod={reportsByProjects.endPeriod}
              projectsForReportDtoList={
                reportsByProjects.projectsForReportDtoList
              }
              dateOfReportFormation={reportsByProjects.dateOfReportFormation}
            />
          ) : (
            <Loader size={80} isAbsoluteCentered />
          ))}
      </Stack>
    </FormWrapper>
  );
};

export default ByProjects;

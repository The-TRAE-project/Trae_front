import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { Stack } from '@mantine/core';

import { SortingState } from '@tanstack/react-table';
import { useGetProjectsReportsQuery } from '../../../store/apis/reports';
import {
  ProjectReportFormValues,
  ProjectReportSchema,
} from '../../../store/apis/reports/types';
import { useExportToExcel } from '../../../helpers/hooks/useExportToExcel';
import { FormWrapper } from '../../styles';
import Loader from '../../Loader';
import {
  DATE_30_AHEAD,
  formatToQueryParamDate,
} from '../helpers/formatToParamDate';
import FormHeader from '../FormHeader';
import FormBody from './FormBody';
import { ReportTable } from './ReportTable';
import { prepareToExcel } from './helpers/prepareToExcel';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';
import { convertToString } from '../../../helpers/convertToString';

const ByProjects = () => {
  const [sortType, setSortType] = useState<SortingState>([
    {
      id: 'contractDate',
      desc: false,
    },
  ]);
  const [queryParams, setQueryParams] = useState<
    | {
        startOfPeriod: string;
        endOfPeriod: string;
      }
    | undefined
  >(undefined);

  const form = useForm<ProjectReportFormValues>({
    initialValues: {
      startOfPeriod: new Date(),
      endOfPeriod: DATE_30_AHEAD,
    },
    validate: (values) => {
      const resolver = zodResolver(ProjectReportSchema);
      const errors = resolver(values);
      return errors;
    },
  });

  const {
    data: reportsByProjects,
    isLoading: isGetLoading,
    isFetching,
    error,
    isError,
  } = useGetProjectsReportsQuery(
    {
      startOfPeriod: queryParams?.startOfPeriod
        ? `?startOfPeriod=${queryParams.startOfPeriod}`
        : '',
      endOfPeriod: queryParams?.endOfPeriod
        ? `&endOfPeriod=${queryParams.endOfPeriod}`
        : '',
    },
    {
      skip: !queryParams || !form.isValid(),
    }
  );

  useDisplayError(error, isError);

  const { isLoading: isExcelExportLoading, exportToExcel } = useExportToExcel();

  const handleSubmit = (values: ProjectReportFormValues) => {
    setQueryParams({
      startOfPeriod: formatToQueryParamDate(values.startOfPeriod),
      endOfPeriod: formatToQueryParamDate(values.endOfPeriod),
    });
  };

  const handleExportToExcel = () => {
    if (!reportsByProjects) return;

    exportToExcel(
      prepareToExcel({
        sortType,
        dateStart: reportsByProjects.startPeriod,
        dateEnd: reportsByProjects.endPeriod,
        projects: reportsByProjects.projectsForReportDtoList,
        dateOfReportFormation: reportsByProjects.dateOfReportFormation,
      }),
      `Отчет по проектам ${convertToString(
        reportsByProjects.startPeriod,
        '.'
      )}-${convertToString(reportsByProjects.endPeriod, '.')}`,
      'Projects'
    );
  };

  const isReportExist =
    !!reportsByProjects &&
    reportsByProjects.projectsForReportDtoList.length > 0;

  const showBody = !!queryParams && form.isValid();
  const showTable = !isGetLoading && !isFetching && isReportExist;

  return (
    <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader
        isReportFormed={!!reportsByProjects}
        isFormBtnLoading={isFetching || isGetLoading}
        isFormBtnDisabled={isFetching || isGetLoading}
        isExportToExcelLoading={isExcelExportLoading}
        isExportToExcelBtnDisabled={!isReportExist}
        onExportToExcel={handleExportToExcel}
      />

      <Stack spacing={40}>
        <FormBody
          form={form}
          isFormed={isReportExist}
          sortType={sortType}
          setSortType={setSortType}
        />

        {showBody &&
          (showTable ? (
            <ReportTable
              sortType={sortType}
              dateStart={reportsByProjects.startPeriod}
              dateEnd={reportsByProjects.endPeriod}
              projects={reportsByProjects.projectsForReportDtoList}
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

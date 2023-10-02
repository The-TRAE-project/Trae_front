import { Stack } from '@mantine/core';
import { useState } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import Loader from '../../Loader';
import { FormWrapper } from '../../styles';
import { FormBody } from './FormBody';
import { ReportTable } from './ReportTable';
import FormHeader from '../FormHeader';
import { useGetDeadlinesReportsQuery } from '../../../store/apis/reports';
import { useExportToExcel } from '../../../helpers/hooks/useExportToExcel';
import {
  DeadlineReportSchema,
  DeadlinesReportFormValues,
} from '../../../store/apis/reports/types';
import { prepareToExcel } from './helpers/prepareToExcel';
import { useDisplayError } from '../../../helpers/hooks/useDisplayError';

export function ByDeadlines() {
  const [queryParams, setQueryParams] = useState<DeadlinesReportFormValues>({
    firstParameter: [{ id: '', value: '' }],
    secondParameter: [{ id: '', value: '' }],
    thirdParameter: [{ id: '', value: '' }],
    valueOfFirstParameter: [{ id: 0, value: 0 }],
    valuesOfSecondParameter: [],
    valuesOfThirdParameter: [],
  });

  const form = useForm<DeadlinesReportFormValues>({
    initialValues: {
      startOfPeriod: undefined,
      endOfPeriod: undefined,
      isDatesActive: false,
      firstParameter: [{ id: '', value: '' }],
      secondParameter: [{ id: '', value: '' }],
      thirdParameter: [{ id: '', value: '' }],
      valueOfFirstParameter: [],
      valuesOfSecondParameter: [],
      valuesOfThirdParameter: [],
    },
    validate: (values) => {
      const resolver = zodResolver(DeadlineReportSchema);
      const errors = resolver(values);
      return errors;
    },
  });

  const {
    data: reportsByDeadlines,
    isLoading: isGetLoading,
    isFetching,
    error,
    isError,
  } = useGetDeadlinesReportsQuery(
    {
      firstParameter: queryParams.firstParameter[0].id,
      secondParameter: queryParams.secondParameter[0].id,
      thirdParameter: queryParams.thirdParameter[0].id,
      valueOfFirstParameter: queryParams.valueOfFirstParameter[0].id,
      valuesOfSecondParameter: queryParams.valuesOfSecondParameter.map(
        (item) => item.id
      ),
      valuesOfThirdParameter: queryParams.valuesOfThirdParameter.map(
        (item) => item.id
      ),
    },
    {
      skip: queryParams.firstParameter[0].id === '',
    }
  );

  useDisplayError(error, isError);

  const { isLoading: isExcelExportLoading, exportToExcel } = useExportToExcel();

  const handleSubmit = (values: DeadlinesReportFormValues) => {
    setQueryParams(values);
  };

  const handleExportToExcel = () => {
    if (!reportsByDeadlines) return;

    exportToExcel(
      prepareToExcel({
        reportsByDeadlines,
        firstParameter: form.values.firstParameter[0].value,
        secondParameter: form.values.secondParameter[0].value,
        thirdParameter: form.values.thirdParameter[0].value,
      }),
      'Отчет по срокам',
      'Deadlines'
    );
  };

  const isReportExist = !!reportsByDeadlines;
  const firstParameter = form.values.firstParameter[0];
  const secondParameter = form.values.secondParameter[0];
  const thirdParameter = form.values.thirdParameter[0];

  return (
    <FormWrapper onSubmit={form.onSubmit(handleSubmit)} onReset={form.onReset}>
      <FormHeader
        isReportFormed={!!reportsByDeadlines}
        isFormBtnLoading={isFetching || isGetLoading}
        isFormBtnDisabled={isFetching || isGetLoading}
        isExportToExcelLoading={isExcelExportLoading}
        isExportToExcelBtnDisabled={!isReportExist}
        onExportToExcel={handleExportToExcel}
      />

      <Stack spacing={40}>
        <FormBody form={form} />

        {!!reportsByDeadlines &&
          firstParameter.id !== '' &&
          secondParameter.id !== '' &&
          thirdParameter.id !== '' &&
          form.isValid() &&
          (!isGetLoading && !isFetching && !!reportsByDeadlines ? (
            <ReportTable
              reportsByDeadlines={reportsByDeadlines}
              firstParameter={firstParameter}
              secondParameter={secondParameter}
              thirdParameter={thirdParameter}
            />
          ) : (
            <Loader size={80} isAbsoluteCentered />
          ))}
      </Stack>
    </FormWrapper>
  );
}

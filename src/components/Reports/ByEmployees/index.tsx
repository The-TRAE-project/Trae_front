import { useState, useRef } from 'react';
import { useForm, zodResolver } from '@mantine/form';
import { Stack } from '@mantine/core';

import { useGetEmployeesReportsQuery } from '../../../store/apis/reports';
import { useGetAllEmployeesWithoutPaginationQuery } from '../../../store/apis/employee';
import {
  EmployeeReportFormValues,
  EmployeeReportSchema,
} from '../../../store/apis/reports/types';
import { selectOnlyIds } from '../../../helpers/selectOnlyIds';
import { useExportToExcel } from '../../../helpers/hooks/useExportToExcel';
import { useExportToPDF } from '../../../helpers/hooks/useExportToPDF';
import Loader from '../../Loader';
import FormHeader from '../FormHeader';
import { FormWrapper } from '../../styles';
import {
  DATE_30_AHEAD,
  formatToQueryParamDate,
} from '../helpers/formatToParamDate';
import { useSetDefaultValue } from './helpers/useSetDefaultValue';
import { prepareForExcel } from './helpers/prepareForExcel';
import FormBody from './FormBody';
import TimelineListItem from './TimelineListItem';

const ByEmployees = () => {
  const PDFRef = useRef<HTMLDivElement | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [employeeIds, setEmployeeIds] = useState<number[] | null>([]);

  const { data: employees } = useGetAllEmployeesWithoutPaginationQuery();
  const onlyEmployeesIds = employees ? selectOnlyIds(employees) : [];

  const form = useForm<EmployeeReportFormValues>({
    initialValues: {
      startOfPeriod: new Date(),
      endOfPeriod: DATE_30_AHEAD,
      employeeIds: onlyEmployeesIds,
    },
    validate: (values) => {
      const resolver = zodResolver(EmployeeReportSchema);
      const errors = resolver(values);
      return errors;
    },
  });
  const { startOfPeriod, endOfPeriod } = form.values;

  useSetDefaultValue(form, employees);

  const {
    data: reportsByEmployees,
    isLoading: isGetLoading,
    isFetching,
  } = useGetEmployeesReportsQuery(
    {
      startOfPeriod: startDate ? `?startOfPeriod=${startDate}` : '',
      endOfPeriod: endDate ? `&endOfPeriod=${endDate}` : '',
      employeeIds: employeeIds?.length ? `&employeeIds=${employeeIds}` : '',
    },
    {
      skip: !startDate && !endDate && !employeeIds?.length,
    }
  );

  const { isLoading: isExcelExportLoading, exportToExcel } = useExportToExcel();
  const { isLoading: isExportPDFLoading, exportToPDF } = useExportToPDF();

  const handleSubmit = (values: EmployeeReportFormValues) => {
    setStartDate(formatToQueryParamDate(values.startOfPeriod));
    setEndDate(formatToQueryParamDate(values.endOfPeriod));
    setEmployeeIds(values.employeeIds);
  };

  const handleExportToExcel = () => {
    if (!reportsByEmployees) return;

    exportToExcel(prepareForExcel(reportsByEmployees), 'Отчеты по сотрудникам');
  };

  const isReportExist =
    !!reportsByEmployees &&
    reportsByEmployees.employeeIdTotalPartsDtoList.length > 0;

  return (
    <FormWrapper onSubmit={form.onSubmit(handleSubmit)}>
      <FormHeader
        isReportFormed={!!reportsByEmployees}
        isFormBtnLoading={isFetching || isGetLoading}
        isFormBtnDisabled={isFetching || isGetLoading}
        isExportToExcelLoading={isExcelExportLoading}
        isExportToExcelBtnDisabled={!isReportExist}
        onExportToExcel={handleExportToExcel}
        isExportToPDFLoading={isExportPDFLoading}
        isExportToPDFBtnDisabled={!isReportExist}
        onExportToPDF={() => exportToPDF(PDFRef, 'Отчеты по сотрудникам')}
      />

      <Stack spacing={40}>
        {employees ? (
          <FormBody form={form} employees={employees} />
        ) : (
          <Loader size={80} isAbsoluteCentered />
        )}
        {startDate &&
          endDate &&
          employeeIds?.length &&
          (!isGetLoading && !isFetching && !!reportsByEmployees ? (
            <div ref={PDFRef}>
              <TimelineListItem
                defaultTimeStart={startOfPeriod as Date}
                defaultTimeEnd={endOfPeriod as Date}
                employees={reportsByEmployees.shortEmployeeDtoList}
                employeeWorkingShifts={
                  reportsByEmployees.workingShiftEmployeeDtoList
                }
                employeeTotalShifts={
                  reportsByEmployees.employeeIdTotalPartsDtoList
                }
              />
            </div>
          ) : (
            <Loader size={80} isAbsoluteCentered />
          ))}
      </Stack>
    </FormWrapper>
  );
};

export default ByEmployees;

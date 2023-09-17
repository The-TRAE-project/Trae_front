import {
  ColumnDef,
  SortingState,
  createColumnHelper,
} from '@tanstack/react-table';
import { DeadlinesReportTableData } from '../ReportTable';
import { convertToString } from '../../../../helpers/convertToString';
import { calculateDeviation } from '../../helpers/calculateDeviation';

interface TableData {
  [key: string]: string | number | null;
}

type ConstructTableProps = DeadlinesReportTableData & {
  setSortType: React.Dispatch<React.SetStateAction<SortingState>>;
};

function constructTableData(data: ConstructTableProps): TableData[] {
  const result = data.reportsByDeadlines.secondRespValues
    .map((secondRespValue) => {
      return secondRespValue.thirdRespValues.map((thirdRespValue) => {
        return Object.fromEntries([
          [data.firstParameter, data.reportsByDeadlines.firstRespValue],
          [data.secondParameter, secondRespValue.secondRespValue],
          [data.thirdParameter, thirdRespValue.thirdRespValue],
          [
            'date-plan',
            thirdRespValue.plannedEndDate
              ? convertToString(thirdRespValue.plannedEndDate)
              : '',
          ],
          [
            'date-fact',
            thirdRespValue.realEndDate
              ? convertToString(thirdRespValue.realEndDate)
              : '',
          ],
          [
            'deviation',
            calculateDeviation(
              thirdRespValue.plannedEndDate,
              thirdRespValue.realEndDate
            ),
          ],
        ]);
      });
    })
    .flat();

  return result;
}

function tableColumnHeader(parameterName: string) {
  switch (parameterName) {
    case 'EMPLOYEE':
      return 'Сотрудник';
    case 'PROJECT':
      return 'Проект';
    case 'OPERATION':
      return 'Этапы';
    default:
      return '';
  }
}

function constructTableColumns(data: ConstructTableProps) {
  const columnHelper = createColumnHelper<TableData>();

  const columns = [
    columnHelper.accessor(data.firstParameter, {
      header: tableColumnHeader(data.firstParameter),
      id: data.firstParameter,
    }),
    columnHelper.accessor(data.secondParameter, {
      header: tableColumnHeader(data.secondParameter),
      id: data.secondParameter,
    }),
    columnHelper.accessor(data.thirdParameter, {
      header: tableColumnHeader(data.thirdParameter),
      id: data.thirdParameter,
    }),
    columnHelper.accessor('date-plan', {
      header: 'Дата окончания план',
      id: 'date-plan',
    }),
    columnHelper.accessor('date-fact', {
      header: 'Дата окончания факт',
      id: 'date-fact',
    }),
    columnHelper.accessor('deviation', {
      header: 'Отклонение',
      id: 'deviation',
    }),
  ];

  return columns;
}

export function constructTable(
  props: ConstructTableProps
): [TableData[], ColumnDef<TableData, string | number | null>[]] {
  const data = constructTableData(props);
  const columns = constructTableColumns(props);

  return [data, columns];
}

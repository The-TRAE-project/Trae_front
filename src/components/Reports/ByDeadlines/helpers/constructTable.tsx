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
          [data.firstParameter.id, data.reportsByDeadlines.firstRespValue],
          [data.secondParameter.id, secondRespValue.secondRespValue],
          [data.thirdParameter.id, thirdRespValue.thirdRespValue],
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

function constructTableColumns(data: ConstructTableProps) {
  const columnHelper = createColumnHelper<TableData>();

  const columns = [
    columnHelper.accessor(data.firstParameter.id, {
      header: data.firstParameter.value,
      id: data.firstParameter.id,
    }),
    columnHelper.accessor(data.secondParameter.id, {
      header: data.secondParameter.value,
      id: data.secondParameter.id,
    }),
    columnHelper.accessor(data.thirdParameter.id, {
      header: data.thirdParameter.value,
      id: data.thirdParameter.id,
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

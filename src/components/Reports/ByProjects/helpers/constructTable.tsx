import {
  CellContext,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ProjectsReportTableData } from '../ReportTable';
import { convertMonthToString } from '../../../../helpers/convertMonthToString';
import { convertToString } from '../../../../helpers/convertToString';
import { TableDayHeader, TableMonthHeader } from '../ReportTable/styles';
import { getDatesBetween } from '../../helpers/getDatesBetween';

interface TableData {
  [key: string]: string | number;
}

function constructTableData(data: ProjectsReportTableData) {
  const result = Array.from(data.projects).map((project) => {
    const { name, number, comment, customer } = project;

    const deviation = 1; // TODO: calculate frrm dates?

    const operations = getDatesBetween(data.dateStart, data.dateEnd).map(
      (date) => {
        const currentOperation = project.operations.find(
          (operation) => convertToString(operation.startDate) === date
        );
        const isEndDateInContract =
          convertToString(project.endDateInContract) === date;
        return [
          date,
          {
            id: currentOperation?.id,
            inWork: currentOperation?.inWork,
            isEnded: currentOperation?.isEnded,
            readyToAcceptance: currentOperation?.readyToAcceptance,
            name: currentOperation?.name,
            length:
              project.operationPeriod / 24 + (project.operationPeriod % 24),
            isEndDateInContract,
          },
        ];
      }
    );

    const row: TableData = Object.fromEntries(operations);

    row.name = name;
    row.number = number;
    row.comment = comment;
    row.customer = customer;
    row.deviation = deviation;

    return row;
  });

  return result;
}

function constructTableColumns(dateStart: number[], dateEnd: number[]) {
  function constructDateColumns() {
    let currentDate = dayjs(convertToString(dateStart)).clone();
    const lastDate = dayjs(convertToString(dateEnd)).clone();

    const result: ColumnDef<TableData>[] = [];

    while (!currentDate.isAfter(lastDate, 'day')) {
      const currentMonth = currentDate.month();
      const currentYear = currentDate.year();

      const columnsForDays = new Array(
        currentMonth === lastDate.month() && currentYear === lastDate.year()
          ? lastDate.date()
          : currentDate.daysInMonth() - currentDate.date() + 1
      )
        .fill(0)
        // eslint-disable-next-line @typescript-eslint/no-loop-func
        .map(() => {
          const currentDay = currentDate.date();
          const currentCell = {
            accessorKey: currentDate.format('YYYY-MM-DD'),
            header: () => <TableDayHeader>{currentDay}</TableDayHeader>,
            // TODO: make full implementation of the cell contents
            cell: (info: CellContext<TableData, any>) => (
              <div>{info.getValue()?.name}</div>
            ),
          };

          currentDate = currentDate.add(1, 'day');
          return currentCell;
        });

      result.push({
        id: `${currentYear}-${currentMonth}`,
        header: () => (
          <TableMonthHeader>
            {convertMonthToString(currentMonth)}
          </TableMonthHeader>
        ),
        columns: columnsForDays,
      });
    }

    return result;
  }

  const columnHelper = createColumnHelper<TableData>();

  const columns = [
    columnHelper.accessor('number', {
      header: '№',
      id: 'number',
    }),
    columnHelper.accessor('customer', {
      header: 'Клиент',
      id: 'customer',
    }),
    columnHelper.accessor('name', {
      header: 'Изделие',
      id: 'name',
    }),
    columnHelper.accessor('deviation', {
      header: 'Отклонение',
      id: 'deviation',
    }),
    columnHelper.accessor('comment', {
      header: 'Комментарий',
      id: 'comment',
    }),
    ...constructDateColumns(),
  ];

  return columns;
}

export function constructTable(
  props: ProjectsReportTableData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): [TableData[], ColumnDef<TableData, any>[]] {
  const data = constructTableData(props);
  const columns = constructTableColumns(props.dateStart, props.dateEnd);

  return [data, columns];
}

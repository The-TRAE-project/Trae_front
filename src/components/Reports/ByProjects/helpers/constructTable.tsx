import {
  CellContext,
  ColumnDef,
  createColumnHelper,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ProjectsReportTableData } from '../ReportTable';
import { convertMonthToString } from '../../../../helpers/convertMonthToString';
import { convertToString } from '../../../../helpers/convertToString';
import {
  TableCellContent,
  TableDayHeader,
  TableMonthHeader,
} from '../ReportTable/styles';
import { getDatesBetween } from '../../helpers/getDatesBetween';
import Contract from '../../../svgs/Contract';

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
            // TODO: change length calculation
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
    row.contractDate = convertToString(project.endDateInContract);
    row.shipmentDate = convertToString(project.plannedEndDate);

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
          ? lastDate.date() - currentDate.date() + 1
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cell: (info: CellContext<TableData, any>) => (
              <TableCellContent
                $isEnded={info.getValue()?.isEnded}
                $inWork={info.getValue()?.inWork}
              >
                {info.getValue()?.isEndDateInContract && <Contract />}
                {info.getValue()?.name}
              </TableCellContent>
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

    columnHelper.accessor('contractDate', {
      header: '1',
      id: 'contractDate',
      enableHiding: true,
    }),

    columnHelper.accessor('shipmentDate', {
      header: '2',
      id: 'shipmentDate',
      enableHiding: true,
    }),
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

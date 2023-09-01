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
  OverdueWrapper,
  TableCellContent,
  TableDayHeader,
  TableMonthHeader,
  TableStickyCellContent,
} from '../ReportTable/styles';
import { getDatesBetween } from '../../helpers/getDatesBetween';
import { ContractIcon } from '../ReportTable/ContractIcon';
import { calculateDeviation } from '../../helpers/calculateDeviation';
import { getCeilLength } from './getCeilLength';
import { getOperationStartDate } from './getOperationStartDate';
import { convertToDayjs } from '../../../../helpers/convertToDayjs';

interface OperationCellInfo {
  isEndDateInContract: boolean;
  projectId: number;
  id: number;
  inWork: boolean;
  isEnded: boolean;
  readyToAcceptance: boolean;
  name: string;
  isOverdue: boolean;
  length: number | null;
}

interface NumberCellInfo {
  number: number;
  isOverdueByOperations: boolean;
  isOverdueByProject: boolean;
}

interface TableData {
  [key: string]: string | number | null | OperationCellInfo | NumberCellInfo;
}

function constructTableData(data: ProjectsReportTableData) {
  return data.projects.map((project) => {
    const {
      name,
      number,
      comment,
      customer,
      id: currentId,
      realEndDate,
      endDateInContract,
      operationPeriod,
      operations,
    } = project;

    const deviation = calculateDeviation(endDateInContract, realEndDate);

    const isOverdueByProject = convertToDayjs(endDateInContract).isBefore(
      dayjs()
    );
    let isOverdueByOperations = false;

    const tableOperationsData: (string | Partial<OperationCellInfo>)[][] =
      getDatesBetween(data.dateStart, data.dateEnd).map((date) => {
        const isEndDateInContract = convertToString(endDateInContract) === date;

        return [date, { isEndDateInContract }];
      });

    operations.forEach((currentOperation, operationIndex) => {
      const isOverdue =
        !!currentOperation &&
        !!currentOperation.realEndDate &&
        convertToString(currentOperation.plannedEndDate) <
          convertToString(currentOperation.realEndDate);

      const length =
        operationIndex === operations.length - 1
          ? 1
          : getCeilLength(
              data.dateStart,
              data.dateEnd,
              currentOperation,
              operationPeriod
            );

      isOverdueByOperations = isOverdue ? true : isOverdueByOperations;
      const startDate = getOperationStartDate(data.dateStart, currentOperation);

      const index = tableOperationsData.findIndex(
        (cell) => cell[0] === startDate
      );

      if (index >= 0) {
        const isEndDateInContract =
          convertToString(endDateInContract) === tableOperationsData[index][0];

        tableOperationsData[index][1] = {
          isEndDateInContract,
          projectId: currentId,
          id: currentOperation.id,
          inWork: currentOperation.inWork,
          isEnded: currentOperation.isEnded,
          readyToAcceptance: currentOperation.readyToAcceptance,
          name: currentOperation.name,
          isOverdue,
          length,
        };
      }
    });

    const row: TableData = Object.fromEntries(tableOperationsData);

    row.name = name;
    row.number = { number, isOverdueByOperations, isOverdueByProject };
    row.comment = comment;
    row.customer = customer;
    row.deviation = deviation;
    row.contractDate = convertToString(project.endDateInContract);
    row.shipmentDate = convertToString(project.plannedEndDate);

    return row;
  });
}

function constructTableColumns(dateStart: number[], dateEnd: number[]) {
  function constructDateColumns() {
    let currentDate = dayjs(convertToString(dateStart)).clone();
    const lastDate = dayjs(convertToString(dateEnd)).clone();
    const todayDate = dayjs();

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
          const isToday = currentDate.isSame(todayDate, 'day');
          const currentCell = {
            accessorKey: currentDate.format('YYYY-MM-DD'),
            header: () => (
              <TableDayHeader $isToday={isToday}>{currentDay}</TableDayHeader>
            ),
            cell: (info: CellContext<TableData, OperationCellInfo>) => (
              <TableCellContent
                $isEnded={info.getValue()?.isEnded}
                $inWork={info.getValue()?.inWork}
                $readyToAcceptance={info.getValue()?.readyToAcceptance}
                $length={info.getValue()?.length}
                $isEndDateInContract={info.getValue()?.isEndDateInContract}
              >
                {info.getValue()?.isEndDateInContract && (
                  <ContractIcon projectId={info.getValue()?.projectId} />
                )}
                <OverdueWrapper $isOverdue={info.getValue()?.isOverdue}>
                  {info.getValue()?.name}
                </OverdueWrapper>
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
      header: () => <TableStickyCellContent>№</TableStickyCellContent>,
      id: 'number',
      cell: (info: CellContext<TableData, NumberCellInfo>) => (
        <TableStickyCellContent
          $isOverdueByProject={info.getValue()?.isOverdueByProject}
          $isOverdueByOperations={info.getValue()?.isOverdueByOperations}
        >
          {info.getValue()?.number}
        </TableStickyCellContent>
      ),
    }),
    columnHelper.accessor('customer', {
      header: () => <TableStickyCellContent>Клиент</TableStickyCellContent>,
      id: 'customer',
      cell: (info: CellContext<TableData, string>) => (
        <TableStickyCellContent>{info.getValue()}</TableStickyCellContent>
      ),
    }),
    columnHelper.accessor('name', {
      header: () => <TableStickyCellContent>Изделие</TableStickyCellContent>,
      id: 'name',
      cell: (info: CellContext<TableData, string>) => (
        <TableStickyCellContent>{info.getValue()}</TableStickyCellContent>
      ),
    }),
    columnHelper.accessor('deviation', {
      header: () => <TableStickyCellContent>Отклонение</TableStickyCellContent>,
      id: 'deviation',
      cell: (info: CellContext<TableData, string>) => (
        <TableStickyCellContent>{info.getValue()}</TableStickyCellContent>
      ),
    }),
    columnHelper.accessor('comment', {
      header: () => (
        <TableStickyCellContent>Комментарий</TableStickyCellContent>
      ),
      id: 'comment',
      cell: (info: CellContext<TableData, string>) => (
        <TableStickyCellContent>{info.getValue()}</TableStickyCellContent>
      ),
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

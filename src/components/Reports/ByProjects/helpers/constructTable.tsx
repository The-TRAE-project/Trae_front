import {
  CellContext,
  ColumnDef,
  Row,
  createColumnHelper,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ProjectsReportTableData } from '../ReportTable';
import { convertMonthToString } from '../../../../helpers/convertMonthToString';
import { convertToString } from '../../../../helpers/convertToString';
import { getDatesBetween } from '../../helpers/getDatesBetween';
import { calculateDeviation } from '../../helpers/calculateDeviation';
import { getCeilLength } from './getCeilLength';
import { getOperationStartDate } from './getOperationStartDate';
import { convertToDayjs } from '../../../../helpers/convertToDayjs';
import { DateCell } from '../ReportTable/DateCell/DateCell';
import styles from '../ReportTable/ReportTable.module.scss';
import { TableMonthHeader } from '../ReportTable/styles';

export interface OperationCellInfo {
  projectId: number;
  id: number;
  name: string;
  length: number | null;
  inWork: boolean;
  isEnded: boolean;
  readyToAcceptance: boolean;
  isOverdue: boolean;
  isOverlapping: boolean;
  isEndDateInContract: boolean;
}

export interface NumberCellInfo {
  number: number;
  isOverdueByOperations: boolean;
  isOverdueByProject: boolean;
}

export interface TableData {
  [key: string]:
    | string
    | number
    | null
    | Partial<OperationCellInfo>
    | NumberCellInfo
    | OperationCellInfo;
}

function constructTableData(data: ProjectsReportTableData) {
  const todayDate = dayjs().format('YYYY-MM-DD');
  const datesArray = getDatesBetween(data.dateStart, data.dateEnd);

  return data.projects.map((project) => {
    const {
      name,
      number,
      comment,
      customer,
      id: projectId,
      realEndDate,
      endDateInContract,
      operationPeriod,
      operations,
    } = project;
    const endDateInContractAsString = convertToString(endDateInContract);

    const deviation = calculateDeviation(endDateInContract, realEndDate);

    const isOverdueByProject = convertToDayjs(endDateInContract).isBefore(
      dayjs()
    );
    let isOverdueByOperations = false;

    const row: TableData = {};

    datesArray.forEach((date) => {
      const isEndDateInContract = endDateInContractAsString === date;

      row[date] = { isEndDateInContract, projectId };
    });

    operations.forEach((currentOperation, operationIndex) => {
      const plannedEndDate = convertToString(currentOperation.plannedEndDate);

      const isOverdue =
        (currentOperation.isEnded &&
          plannedEndDate <
            convertToString(currentOperation.realEndDate as number[])) ||
        ((currentOperation.inWork || currentOperation.readyToAcceptance) &&
          plannedEndDate < todayDate);

      isOverdueByOperations = isOverdue ? true : isOverdueByOperations;
      const startDate = getOperationStartDate(data.dateStart, currentOperation);

      const isInReport = row[startDate] !== undefined;

      if (isInReport) {
        const nextOperation = operations.find((op) => {
          return (
            op.priority >= currentOperation.priority &&
            convertToDayjs(op.startDate).isAfter(
              convertToDayjs(currentOperation.startDate)
            )
          );
        });
        const length =
          operationIndex === operations.length - 1
            ? 1
            : getCeilLength(
                data.dateStart,
                data.dateEnd,
                currentOperation,
                operationPeriod,
                nextOperation
              );
        const isEndDateInContract = endDateInContractAsString === startDate;

        const isOverlapping =
          (row[startDate] as Partial<OperationCellInfo>).id !== undefined;

        row[startDate] = {
          isEndDateInContract,
          projectId,
          id: currentOperation.id,
          inWork: currentOperation.inWork,
          isEnded: currentOperation.isEnded,
          readyToAcceptance: currentOperation.readyToAcceptance,
          name: currentOperation.name,
          isOverdue,
          isOverlapping,
          length,
        };
      }
    });

    row.name = name;
    row.number = { number, isOverdueByOperations, isOverdueByProject };
    row.comment = comment;
    row.customer = customer;
    row.deviation = deviation;
    row.contractDate = endDateInContractAsString;
    row.shipmentDate = convertToString(project.plannedEndDate);

    return row;
  });
}

function constructTableColumns(dateStart: number[], dateEnd: number[]) {
  function constructDateColumns() {
    let currentDate = convertToDayjs(dateStart);
    const lastDate = convertToDayjs(dateEnd);
    const todayDate = dayjs();

    const result: ColumnDef<TableData>[] = [];

    while (!currentDate.isAfter(lastDate, 'day')) {
      const currentMonth = currentDate.month();
      const currentYear = currentDate.year();

      const columnsForDays: {
        accessorKey: string;
        header: () => JSX.Element;
        cell: (info: CellContext<TableData, OperationCellInfo>) => JSX.Element;
      }[] = [];

      const length =
        currentMonth === lastDate.month() && currentYear === lastDate.year()
          ? lastDate.date() - currentDate.date() + 1
          : currentDate.daysInMonth() - currentDate.date() + 1;

      for (let i = 0; i < length; i += 1) {
        const currentDay = currentDate.date();
        const isToday = currentDate.isSame(todayDate, 'day');

        columnsForDays.push({
          accessorKey: currentDate.format('YYYY-MM-DD'),
          header: () => (
            <div
              className={`${styles.table__header_day} ${
                isToday ? styles.table__header_day__today : ''
              }`}
            >
              {currentDay}
            </div>
          ),
          cell: (info: CellContext<TableData, OperationCellInfo>) => (
            <DateCell
              isEndDateInContract={info.getValue().isEndDateInContract}
              isEnded={info.getValue().isEnded}
              isOverdue={info.getValue().isOverdue}
              inWork={info.getValue().inWork}
              readyToAcceptance={info.getValue().readyToAcceptance}
              isOverlapping={info.getValue().isOverlapping}
              projectId={info.getValue().projectId}
              length={info.getValue().length}
              name={info.getValue().name}
            />
          ),
        });

        currentDate = currentDate.add(1, 'day');
      }

      result.push({
        id: `${currentYear}-${currentMonth}`,
        header: () => (
          <TableMonthHeader $span={columnsForDays.length}>
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
      header: () => <div className={styles.table__stickyCell}>№</div>,
      id: 'number',
      sortingFn: (
        rowA: Row<TableData>,
        rowB: Row<TableData>,
        columnId: string
      ): number => {
        const aValue = rowA.getValue(columnId) as NumberCellInfo;
        const bValue = rowB.getValue(columnId) as NumberCellInfo;
        // eslint-disable-next-line no-nested-ternary
        return aValue.number < bValue.number
          ? -1
          : aValue.number === bValue.number
          ? 0
          : 1;
      },
      cell: (info: CellContext<TableData, NumberCellInfo>) => (
        <div
          className={`${styles.table__stickyCell} ${
            info.getValue()?.isOverdueByProject
              ? styles.table__stickyCell_overdueProject
              : ''
          } ${
            info.getValue()?.isOverdueByOperations
              ? styles.table__stickyCell_ovedueOperations
              : ''
          }`}
        >
          {info.getValue()?.number}
        </div>
      ),
    }),
    columnHelper.accessor('customer', {
      header: () => <div className={styles.table__stickyCell}>Клиент</div>,
      id: 'customer',
      cell: (info: CellContext<TableData, string>) => (
        <div className={styles.table__stickyCell}>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('name', {
      header: () => <div className={styles.table__stickyCell}>Изделие</div>,
      id: 'name',
      cell: (info: CellContext<TableData, string>) => (
        <div className={styles.table__stickyCell}>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('deviation', {
      header: () => (
        <div
          className={`${styles.table__stickyCell} ${styles.table__stickyCell_deviation}`}
        >
          Отклонение
        </div>
      ),
      id: 'deviation',
      cell: (info: CellContext<TableData, string>) => (
        <div className={styles.table__stickyCell}>{info.getValue()}</div>
      ),
    }),
    columnHelper.accessor('comment', {
      header: () => <div className={styles.table__stickyCell}>Комментарий</div>,
      id: 'comment',
      cell: (info: CellContext<TableData, string>) => (
        <div className={styles.table__stickyCell}>{info.getValue()}</div>
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

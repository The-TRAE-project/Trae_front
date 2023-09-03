import {
  ColumnDef,
  CellContext,
  createColumnHelper,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { convertToString } from '../../../../helpers/convertToString';
import { getDatesBetween } from '../../helpers/getDatesBetween';
import {
  DateTitle,
  EmployeeTitle,
  HorizontalDivider,
  TableCellContent,
  TableDayHeader,
  TableMonthHeader,
  TableRightHeaderContent,
  TableStickyCellContent,
} from '../ReportTable/styles';
import { convertMonthToString } from '../../../../helpers/convertMonthToString';
import { EmployeesReportTableData } from '../ReportTable';

interface TableCell {
  shift: number | string;
  closed: boolean;
}

interface TableData {
  employees: string;
  totalShifts: number;
  [key: string]: string | number | [string, TableCell];
}

function constructTableData(data: EmployeesReportTableData) {
  const result = Array.from(data.employees).map((emp) => {
    const { id: currentId } = emp;
    const name = `${emp.firstName} ${emp.lastName}`;

    const totalShifts =
      data.employeeTotalShifts.find((shifts) => shifts.id === currentId)
        ?.totalPartsOfShift || 0;

    const shifts = getDatesBetween(data.dateStart, data.dateEnd).map((date) => {
      const currentShift = data.employeeWorkingShifts.find(
        (shift) =>
          shift.employeeId === currentId &&
          convertToString(shift.shiftDate) === date
      );
      return [
        date,
        {
          shift: currentShift?.partOfShift || null,
          closed: currentShift?.autoClosed || false,
        },
      ];
    });

    const row: TableData = Object.fromEntries(shifts);

    row.employees = name;
    row.totalShifts = totalShifts ?? 0;

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
            cell: (info: CellContext<TableData, TableCell>) => (
              <TableCellContent
                className={info.getValue()?.closed ? 'autoClosed' : ''}
              >
                {info.getValue()?.shift}
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
    columnHelper.accessor('employees', {
      header: () => (
        <TableStickyCellContent>
          <HorizontalDivider />
          <DateTitle>Дата</DateTitle>
          <EmployeeTitle>Сотрудник</EmployeeTitle>
        </TableStickyCellContent>
      ),
      id: 'employees',
      cell: (info: CellContext<TableData, string>) => (
        <TableStickyCellContent>{info.getValue()}</TableStickyCellContent>
      ),
    }),
    ...constructDateColumns(),
    columnHelper.accessor('totalShifts', {
      header: () => (
        <TableRightHeaderContent>Итого смен</TableRightHeaderContent>
      ),
      id: 'totalShifts',
    }),
  ];

  return columns;
}

export function constructTable(
  props: EmployeesReportTableData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): [TableData[], ColumnDef<TableData, any>[]] {
  const data = constructTableData(props);
  const columns = constructTableColumns(props.dateStart, props.dateEnd);

  return [data, columns];
}

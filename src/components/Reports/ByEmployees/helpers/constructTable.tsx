import {
  ColumnDef,
  CellContext,
  createColumnHelper,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ReportTableData } from '..';
import { convertToString } from './convertToString';
import { getDatesBetween } from './getDatesBetween';
import {
  DateTitle,
  EmployeeTitle,
  HorizontalDivider,
  LeftSideWrapper,
  TableCellContent,
  TableDayHeader,
  TableMonthHeader,
} from '../ReportTable/styles';
import { convertMonthToString } from './convertMonthToString';

interface TableCell {
  shift: number | string;
  closed: boolean;
}

interface TableData {
  employees: string;
  totalShifts: number;
  [key: string]: string | number | [string, TableCell];
}

export function constructTableData(data: ReportTableData) {
  const result = Array.from(data.employees).map((emp) => {
    const { id: currentId } = emp;
    const name = `${emp.firstName} ${emp.lastName}`;

    const totalShifts =
      data.employeeTotalShifts.find((shifts) => shifts.id === currentId)
        ?.totalPartsOfShift || 0;

    const shifts = getDatesBetween(data.dateStart, data.dateEnd).map((d) => {
      const currentShift = data.employeeWorkingShifts.find(
        (shift) =>
          shift.employeeId === currentId &&
          convertToString(shift.shiftDate) === d
      );
      return [
        d,
        {
          shift: currentShift?.partOfShift || '',
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
        <LeftSideWrapper>
          <HorizontalDivider />
          <DateTitle>Дата</DateTitle>
          <EmployeeTitle>Сотрудник</EmployeeTitle>
        </LeftSideWrapper>
      ),
      id: 'employees',
    }),
    columnHelper.group({
      header: '',
      id: 'shifts',
      columns: constructDateColumns(),
    }),
    columnHelper.accessor('totalShifts', {
      header: 'Итого смен',
      id: 'totalShifts',
    }),
  ];

  return columns;
}

export function constructTable(
  props: ReportTableData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): [TableData[], ColumnDef<TableData, any>[]] {
  const data = constructTableData(props);
  const columns = constructTableColumns(props.dateStart, props.dateEnd);

  return [data, columns];
}

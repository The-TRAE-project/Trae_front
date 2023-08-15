import {
  ColumnDef,
  CellContext,
  createColumnHelper,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { ReportTableData } from '.';
import { convertToString } from '../helpers/convertToString';
import { getDatesBetween } from '../helpers/getDatesBetween';
import {
  DateTitle,
  EmployeeTitle,
  HorizontalDivider,
  LeftSideWrapper,
  TableCellContent,
  TableDayHeader,
  TableMonthHeader,
} from './styles';
import { convertMonthToString } from '../helpers/convertMonthToString';

interface TableCell {
  shift: number | string;
  closed: boolean;
}

interface TableData {
  employees: string;
  totalShifts: number;
  [key: string]: string | number | [string, TableCell];
}

function constructTableData(data: ReportTableData) {
  const result = Array.from(data.employees).map((emp) => {
    const { id: currentId } = emp;
    const name = `${emp.firstName} ${emp.lastName}`;

    const totalShifts =
      data.employeeTotalShifts.find((shifts) => shifts.id === currentId)
        ?.totalPartsOfShift || 0;

    const shifts = getDatesBetween(
      data.defaultTimeStart,
      data.defaultTimeEnd
    ).map((d) => {
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

function constructTableColumns(dateStart: Date, dateEnd: Date) {
  function constructDateColumns() {
    let currentDate = dayjs(dateStart).clone();

    const result: ColumnDef<TableData>[] = [];

    while (!currentDate.isAfter(dateEnd, 'day')) {
      const currentMonth = currentDate.month();
      const currentYear = currentDate.year();

      const columnsForDays = new Array(
        currentMonth === dateEnd.getMonth() &&
        currentYear === dateEnd.getFullYear()
          ? dateEnd.getDate()
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

export function useConstructTable(
  props: ReportTableData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): [TableData[], ColumnDef<TableData, any>[]] {
  const data = useMemo(() => constructTableData(props), [props]);
  const columns = useMemo(
    () => constructTableColumns(props.defaultTimeStart, props.defaultTimeEnd),
    [props.defaultTimeStart, props.defaultTimeEnd]
  );

  return [data, columns];
}

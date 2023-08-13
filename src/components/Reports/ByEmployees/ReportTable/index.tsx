/* eslint-disable react/no-unused-prop-types */
import dayjs from 'dayjs';
import {
  CellContext,
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  ShortEmployeeInfo,
  EmployeeWorkingShiftInfo,
  EmployeeTotalShiftInfo,
} from '../../../../store/apis/reports/types';
import {
  DateTitle,
  EmployeeTitle,
  HorizontalDivider,
  LeftSideWrapper,
  ScrollWrapper,
  Table,
  TableCell,
  TableCellContent,
  TableCellHeader,
  TableDayHeader,
  TableMonthHeader,
  TableRow,
  Wrapper,
} from './styles';
import { getDatesBetween } from '../helpers/getDatesBetween';
import { convertMonthToString } from '../helpers/convertMonthToString';
import { convertToDate } from '../../../../helpers/convertToDate';

interface Props {
  defaultTimeStart: Date;
  defaultTimeEnd: Date;
  employees: ShortEmployeeInfo[];
  employeeWorkingShifts: EmployeeWorkingShiftInfo[];
  employeeTotalShifts: EmployeeTotalShiftInfo[];
}

interface TableData {
  employees: string;
  totalShifts: number;
  [key: string]: unknown;
}

export function constructTableData(data: Props) {
  const result = Array.from(data.employees).map((emp) => {
    const { id: currentId } = emp;
    const name = `${emp.firstName} ${emp.lastName}`;
    const totalShifts = data.employeeTotalShifts.find(
      (shifts) => shifts.id === currentId
    )?.totalPartsOfShift;
    const shifts = getDatesBetween(
      data.defaultTimeStart,
      data.defaultTimeEnd
    ).map((d) => {
      const currentShift = data.employeeWorkingShifts.find(
        (shift) =>
          shift.employeeId === currentId && convertToDate(shift.shiftDate) === d
      );
      return [
        d,
        {
          shift: currentShift?.partOfShift ?? '',
          closed: currentShift?.autoClosed,
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

export function constructTableColumns(dateStart: Date, dateEnd: Date) {
  function constructDateColumns() {
    let currentDate = dayjs(dateStart).clone();

    const result: ColumnDef<TableData>[] = [];

    while (!currentDate.isAfter(dateEnd, 'day')) {
      const currentMonth = currentDate.month();
      const currentYear = currentDate.year();
      result.push({
        id: `${currentYear}-${currentMonth}`,
        header: () => (
          <TableMonthHeader>
            {convertMonthToString(currentMonth)}
          </TableMonthHeader>
        ),
        columns: new Array(
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
              header: () => <TableDayHeader>{currentDay} </TableDayHeader>,
              // TODO: make better type
              cell: (
                info: CellContext<TableData, { closed: boolean; shift: number }>
              ) => {
                return (
                  <TableCellContent
                    className={info.getValue().closed ? 'autoClosed' : ''}
                  >
                    {info.getValue().shift}
                  </TableCellContent>
                );
              },
            };

            currentDate = currentDate.add(1, 'day');
            return currentCell;
          }),
      });
    }

    return result;
  }

  const columnHelper = createColumnHelper<TableData>();

  const columns = [
    columnHelper.accessor('employees', {
      header: () => {
        return (
          <LeftSideWrapper>
            <HorizontalDivider />
            <DateTitle>Дата</DateTitle>
            <EmployeeTitle>Сотрудник</EmployeeTitle>
          </LeftSideWrapper>
        );
      },
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

const ReportTable = (props: Props) => {
  const data = useMemo(() => constructTableData(props), [props]);
  const columns = useMemo(
    // eslint-disable-next-line react/destructuring-assignment
    () => constructTableColumns(props.defaultTimeStart, props.defaultTimeEnd),
    [props]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Wrapper>
      <ScrollWrapper>
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCellHeader key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableCellHeader>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().flatRows.map((row) => (
              <TableRow key={row.id}>
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </ScrollWrapper>
    </Wrapper>
  );
};

export default ReportTable;

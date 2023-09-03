import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  ScrollWrapper,
  Table,
  TableCell,
  TableCellHeader,
  TableRow,
  Wrapper,
} from './styles';
import { constructTable } from '../helpers/constructTable';
import {
  EmployeeTotalShiftInfo,
  EmployeeWorkingShiftInfo,
  ShortEmployeeInfo,
} from '../../../../store/apis/reports/types';

export interface EmployeesReportTableData {
  dateStart: number[];
  dateEnd: number[];
  employees: ShortEmployeeInfo[];
  employeeWorkingShifts: EmployeeWorkingShiftInfo[];
  employeeTotalShifts: EmployeeTotalShiftInfo[];
}

export function ReportTable({
  dateStart,
  dateEnd,
  employees,
  employeeWorkingShifts,
  employeeTotalShifts,
}: EmployeesReportTableData) {
  const [tableData, tableColumns] = useMemo(() => {
    return constructTable({
      dateStart,
      dateEnd,
      employees,
      employeeWorkingShifts,
      employeeTotalShifts,
    });
  }, [
    dateStart,
    dateEnd,
    employees,
    employeeWorkingShifts,
    employeeTotalShifts,
  ]);

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
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
}

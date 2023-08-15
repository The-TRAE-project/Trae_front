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
import { ReportTableData } from '..';

const ReportTable = ({
  timeStart,
  timeEnd,
  employees,
  employeeWorkingShifts,
  employeeTotalShifts,
}: ReportTableData) => {
  const [data, columns] = useMemo(() => {
    return constructTable({
      timeStart,
      timeEnd,
      employees,
      employeeWorkingShifts,
      employeeTotalShifts,
    });
  }, [
    timeStart,
    timeEnd,
    employees,
    employeeWorkingShifts,
    employeeTotalShifts,
  ]);

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

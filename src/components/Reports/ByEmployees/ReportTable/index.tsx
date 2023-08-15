import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ShortEmployeeInfo,
  EmployeeWorkingShiftInfo,
  EmployeeTotalShiftInfo,
} from '../../../../store/apis/reports/types';
import {
  ScrollWrapper,
  Table,
  TableCell,
  TableCellHeader,
  TableRow,
  Wrapper,
} from './styles';
import { useConstructTable } from './useConstructTable';

export interface ReportTableData {
  defaultTimeStart: Date;
  defaultTimeEnd: Date;
  employees: ShortEmployeeInfo[];
  employeeWorkingShifts: EmployeeWorkingShiftInfo[];
  employeeTotalShifts: EmployeeTotalShiftInfo[];
}

const ReportTable = ({
  defaultTimeStart,
  defaultTimeEnd,
  employees,
  employeeWorkingShifts,
  employeeTotalShifts,
}: ReportTableData) => {
  const [data, columns] = useConstructTable({
    defaultTimeStart,
    defaultTimeEnd,
    employees,
    employeeWorkingShifts,
    employeeTotalShifts,
  });

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

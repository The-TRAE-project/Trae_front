/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  ScrollWrapper,
  Table,
  TableCell,
  TableCellHeader,
  TableRow,
  Wrapper,
} from './styles';
import { TableData, constructTable } from '../helpers/constructTable';
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

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 97,
    overscan: 20,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  return (
    <Wrapper>
      <ScrollWrapper ref={tableContainerRef}>
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
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<TableData>;
              return (
                <TableRow key={row.id}>
                  {row.getAllCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollWrapper>
    </Wrapper>
  );
}

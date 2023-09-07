import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { DeadlinesReport } from '../../../../store/apis/reports/types';
import {
  ScrollWrapper,
  Table,
  TableCell,
  TableCellHeader,
  TableRow,
  Wrapper,
} from './styles';
import { constructTable } from '../helpers/constructTable';

export type DeadlinesReportTableData = {
  reportsByDeadlines: DeadlinesReport;
  firstParameter: string;
  secondParameter: string;
  thirdParameter: string;
};

export function ReportTable({
  reportsByDeadlines,
  firstParameter,
  secondParameter,
  thirdParameter,
}: DeadlinesReportTableData) {
  const [tableData, tableColumns] = useMemo(
    () =>
      constructTable({
        reportsByDeadlines,
        firstParameter,
        secondParameter,
        thirdParameter,
      }),
    [reportsByDeadlines, firstParameter, secondParameter, thirdParameter]
  );

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

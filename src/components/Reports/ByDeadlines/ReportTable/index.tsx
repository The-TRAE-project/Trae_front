/* eslint-disable jsx-a11y/click-events-have-key-events */
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
  SortArrow,
  SortButton,
  Table,
  TableCell,
  TableCellHeader,
  TableRow,
  Wrapper,
} from './styles';
import { constructTable } from '../helpers/constructTable';

export type DeadlinesReportTableData = {
  reportsByDeadlines: DeadlinesReport;
  firstParameter: { id: string; value: string };
  secondParameter: { id: string; value: string };
  thirdParameter: { id: string; value: string };
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
    getSortedRowModel: getSortedRowModel(),
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
                    {header.isPlaceholder ? null : (
                      <SortButton onClick={() => header.column.toggleSorting()}>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <SortArrow
                          $isActive={header.column.getIsSorted() !== false}
                          $isOpen={header.column.getIsSorted() === 'desc'}
                          size={24}
                        />
                      </SortButton>
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

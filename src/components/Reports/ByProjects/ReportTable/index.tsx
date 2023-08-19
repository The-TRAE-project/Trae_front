import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  Wrapper,
  ScrollWrapper,
  TableCellHeader,
  TableRow,
  TableCell,
  Table,
} from './styles';
import { constructTable } from '../helpers/constructTable';
import { ProjectInfo } from '../../../../store/apis/reports/types';

export interface ProjectsReportTableData {
  dateOfReportFormation: number[];
  dateStart: number[];
  dateEnd: number[];
  projects: ProjectInfo[];
}

export function ReportTable({
  dateOfReportFormation,
  dateStart,
  dateEnd,
  projects,
}: ProjectsReportTableData) {
  const [tableData, tableColumns] = useMemo(() => {
    return constructTable({
      dateOfReportFormation,
      dateStart,
      dateEnd,
      projects,
    });
  }, [dateOfReportFormation, dateStart, dateEnd, projects]);

  // console.log(
  //   'RAW_DATA: ',
  //   dateOfReportFormation,
  //   dateStart,
  //   dateEnd,
  //   projects
  // );
  // console.log('TRANSFORMED_DATA: ', tableData, tableColumns);

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

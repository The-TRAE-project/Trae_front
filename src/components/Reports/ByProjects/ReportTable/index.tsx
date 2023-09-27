import {
  OnChangeFn,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { Wrapper, ScrollWrapper, Table } from './styles';
import { constructTable } from '../helpers/constructTable';
import { ProjectInfo } from '../../../../store/apis/reports/types';
import styles from './ReportTable.module.scss';

export interface ProjectsReportTableData {
  dateOfReportFormation: number[];
  dateStart: number[];
  dateEnd: number[];
  projects: ProjectInfo[];
  sortType?: SortingState;
  setSorting?: OnChangeFn<SortingState>;
}

export function ReportTable({
  dateOfReportFormation,
  dateStart,
  dateEnd,
  projects,
  sortType,
  setSorting,
}: ProjectsReportTableData) {
  const [tableData, tableColumns] = useMemo(() => {
    return constructTable({
      dateOfReportFormation,
      dateStart,
      dateEnd,
      projects,
    });
  }, [dateOfReportFormation, dateStart, dateEnd, projects]);

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    state: {
      sorting: sortType,
    },
    onSortingChange: setSorting,
    initialState: {
      columnVisibility: {
        contractDate: false,
        shipmentDate: false,
      },
    },
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
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className={styles.table__header}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().flatRows.map((row) => (
              <tr key={row.id} className={styles.table__row}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={styles.table__cell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollWrapper>
    </Wrapper>
  );
}

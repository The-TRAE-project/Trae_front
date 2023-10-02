/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  OnChangeFn,
  Row,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef } from 'react';
import { Wrapper, Table } from './styles';
import { TableData, constructTable } from '../helpers/constructTable';
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

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 97,
    overscan: 30,
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
      <div ref={tableContainerRef} className={styles.table__scroll}>
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
            {paddingTop > 0 && (
              <tr>
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index] as Row<TableData>;
              return (
                <tr
                  key={row.id}
                  style={{
                    height: `${virtualRow.size}px`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.table__cell}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
            {paddingBottom > 0 && (
              <tr>
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Wrapper>
  );
}

import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { convertToDate } from '../../../../helpers/convertToDate';
import {
  ShortEmployeeInfo,
  EmployeeWorkingShiftInfo,
  EmployeeTotalShiftInfo,
} from '../../../../store/apis/reports/types';

import { Wrapper } from './styles';

interface Props {
  defaultTimeStart: Date;
  defaultTimeEnd: Date;
  employees: ShortEmployeeInfo[];
  employeeWorkingShifts: EmployeeWorkingShiftInfo[];
  employeeTotalShifts: EmployeeTotalShiftInfo[];
}

interface TimeLineGroup {
  id: string;
  title: string;
  rightTitle: string;
  bgColor: string;
}

interface TimeLineItem {
  id: string;
  group: string;
  title: string;
  start: number;
  end: number;
  className: string;
}

const keys = {
  groupIdKey: 'id',
  groupTitleKey: 'title',
  groupRightTitleKey: 'rightTitle',
  itemIdKey: 'id',
  itemTitleKey: 'title',
  itemDivTitleKey: 'title',
  itemGroupKey: 'group',
  itemTimeStartKey: 'start',
  itemTimeEndKey: 'end',
  groupLabelKey: 'title',
};

const dataTestProps: Props[] = [
  {
    defaultTimeStart: new Date(
      'Sat Jul 29 2023 00:00:00 GMT+0300 (Moscow Standard Time)'
    ),
    defaultTimeEnd: new Date(
      'Wed Aug 04 2023 00:00:00 GMT+0300 (Moscow Standard Time)'
    ),
    employees: [
      { id: 5, firstName: 'Никита', lastName: 'Бондаренко' },
      { id: 7, firstName: 'Петр', lastName: 'Абраменко' },
      { id: 8, firstName: 'ТЕСТОВИЧНЫЙ', lastName: 'ТЕСТОВЧИНКО' },
    ],
    employeeWorkingShifts: [
      {
        autoClosed: true,
        employeeId: 5,
        partOfShift: 0.4,
        shiftDate: [2023, 8, 2],
      },
      {
        autoClosed: true,
        employeeId: 8,
        partOfShift: 0.4,
        shiftDate: [2023, 8, 1],
      },
      {
        autoClosed: false,
        employeeId: 8,
        partOfShift: 1.6,
        shiftDate: [2023, 7, 20],
      },
      {
        autoClosed: false,
        employeeId: 7,
        partOfShift: 0,
        shiftDate: [2023, 7, 20],
      },
    ],
    employeeTotalShifts: [
      { id: 5, totalPartsOfShift: 0.4 },
      { id: 7, totalPartsOfShift: 0 },
      { id: 8, totalPartsOfShift: 2 },
    ],
  },
];

const dataTest: any = [
  {
    name: 'Никита Бондаренко',
    totalShifts: 0.4,
  },
  {
    name: 'Петр Абраменко',
    totalShifts: 0,
  },
  {
    name: 'ТЕСТОВИЧНЫЙ ТЕСТОВЧИНКО',
    totalShifts: 2,
  },
];

const columnsTest: ColumnDef<Props>[] = [
  {
    header: 'Сотрудники',
    cell: (info) => info.getValue(),
  },
  {
    // replace by function
    header: 'Июль',
    columns: new Array(31).fill(0).map<any>((_, index) => {
      return {
        accessorKey: `Июль ${index + 1}`,
        header: index + 1,
        cell: (info: any) => info.getValue(),
      };
    }),
  },
  {
    // replace by function
    header: 'Август',
    columns: new Array(31).fill(0).map<any>((_, index) => {
      return {
        accessorKey: `Август ${index + 1}`,
        header: index + 1,
        cell: (info: any) => info.getValue(),
      };
    }),
  },
  {
    header: 'Итого смен',
    cell: (info) => info.getValue(),
  },
];

const ReportTable = ({
  defaultTimeStart,
  defaultTimeEnd,
  employees,
  employeeWorkingShifts,
  employeeTotalShifts,
}: Props) => {
  useEffect(() => {
    const modifiedGroups = employees.map((item) => ({
      id: String(item.id),
      title: `${item.firstName} ${item.lastName}`,
      rightTitle: `${item.firstName} ${item.lastName}`,
      bgColor: 'var(--white)',
    }));

    //  setGroups(modifiedGroups);

    const modifiedItems = employeeWorkingShifts.map((item) => ({
      id: String(item.employeeId),
      group: String(item.employeeId),
      title: `${item.partOfShift}`,
      start: convertToDate(item.shiftDate).getTime(),
      end: dayjs(convertToDate(item.shiftDate))
        .add(24, 'hours')
        .toDate()
        .getTime(),
      className: item.autoClosed ? 'shift-day auto-closed' : 'shift-day',
    }));
    // setItems(modifiedItems);
  }, [employees, employeeWorkingShifts]);

  const table = useReactTable({
    data: dataTest,
    columns: columnsTest,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                <div
                  {...{
                    onMouseDown: header.getResizeHandler(),
                    onTouchStart: header.getResizeHandler(),
                  }}
                />
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportTable;

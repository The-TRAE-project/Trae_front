import { useState } from 'react';
import * as ExcelJS from 'exceljs';
import { convertNumberToColumn } from '../../components/Reports/helpers/convertNumberToColumn';
import { showErrorNotification } from '../showErrorNotification';

export type ExcelStylesForReports = Partial<ExcelJS.Style> &
  Partial<{ length: number | null }>;

export type ExcelBorderStyle = Partial<ExcelJS.Borders>;
export type ExcelAligmentStyle = Partial<ExcelJS.Alignment>;

export function useExportToExcel() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const exportToExcel = async (
    data: {
      header: string[][] | string[];
      body: (string | number | null)[][];
      styles: {
        [key: string]: ExcelStylesForReports;
      };
    },
    fileName: string,
    type: 'Employees' | 'Projects' | 'Deadlines'
  ) => {
    try {
      setIsLoading(true);
      const workBook = new ExcelJS.Workbook();

      workBook.created = new Date();
      workBook.modified = new Date();

      const workSheet = workBook.addWorksheet(`${fileName}`);

      workSheet.addRows(data.header);
      workSheet.addRows(data.body);
      switch (type) {
        case 'Employees':
          workSheet.eachRow((row) => {
            row.height = 25;
            row.eachCell({ includeEmpty: true }, (cell) => {
              cell.style = data.styles[cell.address];
            });
          });
          workSheet.getColumn(1).width = 25;
          workSheet.getColumn(workSheet.actualColumnCount - 1).width = 15;
          break;
        case 'Projects':
          workSheet.eachRow((row) => {
            row.height = 25;
            row.eachCell({ includeEmpty: true }, (cell) => {
              const style = data.styles[cell.address];
              cell.style = style;
              if (
                style?.length !== undefined &&
                style.length !== null &&
                style.length > 1
              ) {
                for (let i = 1; i < style.length; i += 1) {
                  cell.value = `${
                    row.getCell((cell.col as unknown as number) + i).value
                  } ${cell.value}`;
                }

                workSheet.mergeCells(
                  cell.address,
                  `${convertNumberToColumn(
                    (cell.col as unknown as number) + style.length - 2
                  )}${cell.row}`
                );
              }
            });
          });
          workSheet.getColumn(1).width = 10;
          workSheet.getColumn(2).width = 25;
          workSheet.getColumn(3).width = 25;
          workSheet.getColumn(4).width = 15;
          workSheet.getColumn(5).width = 30;
          break;
        case 'Deadlines':
          workSheet.eachRow((row) => {
            row.height = 25;
            row.eachCell({ includeEmpty: true }, (cell) => {
              cell.style = data.styles[cell.address];
            });
          });
          workSheet.getColumn(1).width = 30;
          workSheet.getColumn(2).width = 30;
          workSheet.getColumn(3).width = 30;
          workSheet.getColumn(4).width = 30;
          workSheet.getColumn(5).width = 30;
          workSheet.getColumn(6).width = 30;
          break;
        default:
          break;
      }
      // TODO add parameters as second argumant
      const buffer = await workBook.xlsx.writeBuffer();

      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}.xlsx`;
      link.click();
      URL.revokeObjectURL(link.href);
      link.remove();
      setIsLoading(false);
    } catch (error) {
      showErrorNotification('Ошибка', 'Не удалось создать Excel таблицу.');
      setIsLoading(false);
    }
  };
  return { exportToExcel, isLoading };
}

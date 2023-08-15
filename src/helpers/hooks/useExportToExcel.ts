import { useState } from 'react';
import * as ExcelJS from 'exceljs';

export function useExportToExcel() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exportToExcel = async (data: any, fileName: string) => {
    setIsLoading(true);
    const workBook = new ExcelJS.Workbook();

    workBook.created = new Date();
    workBook.modified = new Date();

    // TODO add parameters as second argumant
    const workSheet = workBook.addWorksheet(`${fileName}`, {
      headerFooter: {
        firstHeader: 'Hello Exceljs',
        firstFooter: 'Hello World',
      },
    });
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
  };

  return { exportToExcel, isLoading };
}

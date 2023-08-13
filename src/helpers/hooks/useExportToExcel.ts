import { useState } from 'react';

export function useExportToExcel() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exportToExcel = (data: any, fileName: string) => {
    setIsLoading(true);

    const workBook = new ExcelJS.Workbook();

    workBook.created = new Date();
    workBook.modified = new Date();

    // TODO add parameters as second argumant
    const workSheet = workBook.addWorksheet(`${fileName}`);
    // utils.book_append_sheet(workBook, workSheet, `${fileName}`);

    workBook.xlsx.writeFile(`${fileName}.xlsx`);

    setIsLoading(false);
  };

  return { exportToExcel, isLoading };
}

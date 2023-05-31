import { useState } from 'react';
import { utils, writeFile } from 'xlsx';

export function useExportToExcel() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exportToExcel = (data: any, fileName: string) => {
    setIsLoading(true);

    const wb = utils.book_new();
    const ws = utils.json_to_sheet(data);
    utils.book_append_sheet(wb, ws, `${fileName}`);
    writeFile(wb, `${fileName}.xlsx`);

    setIsLoading(false);
  };

  return { exportToExcel, isLoading };
}

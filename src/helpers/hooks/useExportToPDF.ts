import { MutableRefObject, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function useExportToPDF() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const exportToPDF = (
    PDFRef: MutableRefObject<HTMLDivElement | null>,
    fileName: string
  ) => {
    setIsLoading(true);

    const input = PDFRef.current;

    if (!input) return;

    html2canvas(input).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imageData,
        'png',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(fileName);
      setIsLoading(false);
    });
  };

  return { exportToPDF, isLoading };
}

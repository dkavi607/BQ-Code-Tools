import { jsPDF } from 'jspdf';
import { SheetConfig, BatchItem } from '../types';

export function generateA4LabelSheetPdf(
  imgDataUrl: string,
  config: SheetConfig,
  items?: BatchItem[],
  customLabelText?: string
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: config.paperSize || 'a4',
  });

  const pageWidth = config.paperSize === 'letter' ? 215.9 : 210;
  const pageHeight = config.paperSize === 'letter' ? 279.4 : 297;

  const cols = Math.max(1, config.columns || 3);
  const rows = Math.max(1, config.rows || 7);
  const marginTop = config.marginTop || 10;
  const marginLeft = config.marginLeft || 10;
  const colGap = config.colGap || 3;
  const rowGap = config.rowGap || 3;

  const usableWidth = pageWidth - marginLeft * 2 - (cols - 1) * colGap;
  const usableHeight = pageHeight - marginTop * 2 - (rows - 1) * rowGap;

  const labelWidth = usableWidth / cols;
  const labelHeight = usableHeight / rows;

  const totalPositionsPerPage = cols * rows;
  const totalQuantity = items && items.length > 0 ? items.length : (config.quantity || totalPositionsPerPage);

  let currentItemIdx = 0;

  while (currentItemIdx < totalQuantity) {
    if (currentItemIdx > 0 && currentItemIdx % totalPositionsPerPage === 0) {
      doc.addPage();
    }

    const pageIndex = currentItemIdx % totalPositionsPerPage;
    const colIdx = pageIndex % cols;
    const rowIdx = Math.floor(pageIndex / cols);

    const x = marginLeft + colIdx * (labelWidth + colGap);
    const y = marginTop + rowIdx * (labelHeight + rowGap);

    // Draw label border or cut lines if requested
    if (config.showBorder) {
      doc.setDrawColor(229, 231, 235); // subtle gray border
      doc.setLineWidth(0.2);
      doc.roundedRect(x, y, labelWidth, labelHeight, 1.5, 1.5, 'S');
    }

    // Embed barcode/QR image inside the label
    const imgPadding = 2;
    const imgW = labelWidth - imgPadding * 2;
    const imgH = labelHeight - imgPadding * 2;

    try {
      doc.addImage(imgDataUrl, 'PNG', x + imgPadding, y + imgPadding, imgW, imgH, undefined, 'FAST');
    } catch (e) {
      console.warn('PDF addImage error:', e);
    }

    currentItemIdx++;
  }

  doc.save(`BQ_Code_Tools_Labels_${cols}x${rows}.pdf`);
}

export function printA4LabelSheet(
  canvas: HTMLCanvasElement,
  config: SheetConfig,
  quantity: number = 21
) {
  const dataUrl = canvas.toDataURL('image/png');
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to print label sheet directly.');
    return;
  }

  const cols = config.columns || 3;
  const rows = config.rows || 7;
  const totalLabels = quantity || (cols * rows);

  let labelsHtml = '';
  for (let i = 0; i < totalLabels; i++) {
    labelsHtml += `
      <div class="label-box">
        <img src="${dataUrl}" alt="Label ${i + 1}" />
      </div>
    `;
  }

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Label Sheet - BQ Code Tools</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 8mm;
          }
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: system-ui, -apple-system, sans-serif;
            background: white;
            color: black;
          }
          .sheet {
            display: grid;
            grid-template-columns: repeat(${cols}, 1fr);
            grid-gap: 4mm;
            width: 100%;
          }
          .label-box {
            border: ${config.showBorder ? '1px dashed #d1d5db' : 'none'};
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2mm;
            page-break-inside: avoid;
            height: calc((270mm - ${(rows - 1) * 4}mm) / ${rows});
          }
          .label-box img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <div class="sheet">
          ${labelsHtml}
        </div>
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

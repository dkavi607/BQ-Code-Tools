import JsBarcode from 'jsbarcode';
import { jsPDF } from 'jspdf';
import { BarcodeSettings, BarcodeSymbology } from '../types';

export const BARCODE_FORMAT_INFO: Record<BarcodeSymbology, { name: string; description: string; example: string; validationRegex?: RegExp }> = {
  CODE128: {
    name: 'Code 128 (Universal)',
    description: 'Most versatile barcode, supports full ASCII (letters, numbers, symbols). Ideal for logistics, warehousing, and general inventory.',
    example: 'BQ-98234-X',
  },
  CODE128A: {
    name: 'Code 128-A',
    description: 'Supports uppercase letters, numbers, and control characters.',
    example: 'BATCH-4029',
  },
  CODE128B: {
    name: 'Code 128-B',
    description: 'Supports uppercase, lowercase letters, and standard ASCII punctuation.',
    example: 'ProductSku-99',
  },
  CODE128C: {
    name: 'Code 128-C',
    description: 'Optimized numeric-only code for double density (must be even number of digits).',
    example: '12345678',
  },
  EAN13: {
    name: 'EAN-13 (International Retail)',
    description: 'Standard 13-digit European/International retail product barcode with automatic checksum verification.',
    example: '5901234123457',
    validationRegex: /^\d{12,13}$/,
  },
  EAN8: {
    name: 'EAN-8 (Compact Retail)',
    description: 'Compact 8-digit retail code for small packaged products.',
    example: '96385074',
    validationRegex: /^\d{7,8}$/,
  },
  UPC: {
    name: 'UPC-A (North American Retail)',
    description: '12-digit standard barcode used across USA & Canada retail markets.',
    example: '012345678905',
    validationRegex: /^\d{11,12}$/,
  },
  CODE39: {
    name: 'Code 39',
    description: 'Alpha-numeric standard used widely in automotive, defense, and government badges.',
    example: 'CODE39-TEST',
    validationRegex: /^[0-9A-Z\-\.\ \$\/\+\%]+$/,
  },
  ITF14: {
    name: 'ITF-14 (Shipping Containers)',
    description: 'Interleaved 2 of 5 14-digit carton barcode with thick bearer bars.',
    example: '10012345678902',
    validationRegex: /^\d{13,14}$/,
  },
  ITF: {
    name: 'ITF (Interleaved 2 of 5)',
    description: 'Numeric-only high density barcode, requires an even number of digits.',
    example: '123456',
    validationRegex: /^\d+$/,
  },
  MSI: {
    name: 'MSI Plessey',
    description: 'Numeric barcode often used for supermarket shelf management and inventory.',
    example: '1234567',
    validationRegex: /^\d+$/,
  },
  pharmacode: {
    name: 'Pharmacode',
    description: 'Pharmaceutical binary code standard (integer between 3 and 131070).',
    example: '12345',
    validationRegex: /^\d+$/,
  },
  codabar: {
    name: 'Codabar (NW-7)',
    description: 'Used in blood banks, libraries, FedEx airbills, and photo labs.',
    example: 'A1234567B',
    validationRegex: /^[A-Da-d][0-9\-\$\:\/\.\+]+[A-Da-d]$/,
  },
};

export function validateBarcode(value: string, format: BarcodeSymbology): { valid: boolean; error?: string } {
  if (!value || value.trim() === '') {
    return { valid: false, error: 'Barcode value cannot be empty' };
  }

  const cleanVal = value.trim();

  if (format === 'EAN13') {
    if (!/^\d{12,13}$/.test(cleanVal)) {
      return { valid: false, error: 'EAN-13 requires 12 or 13 numeric digits.' };
    }
  } else if (format === 'EAN8') {
    if (!/^\d{7,8}$/.test(cleanVal)) {
      return { valid: false, error: 'EAN-8 requires 7 or 8 numeric digits.' };
    }
  } else if (format === 'UPC') {
    if (!/^\d{11,12}$/.test(cleanVal)) {
      return { valid: false, error: 'UPC-A requires 11 or 12 numeric digits.' };
    }
  } else if (format === 'ITF14') {
    if (!/^\d{13,14}$/.test(cleanVal)) {
      return { valid: false, error: 'ITF-14 requires 13 or 14 numeric digits.' };
    }
  } else if (format === 'ITF') {
    if (!/^\d+$/.test(cleanVal) || cleanVal.length % 2 !== 0) {
      return { valid: false, error: 'ITF requires an EVEN number of digits (e.g. 123456).' };
    }
  } else if (format === 'CODE128C') {
    if (!/^\d+$/.test(cleanVal) || cleanVal.length % 2 !== 0) {
      return { valid: false, error: 'Code 128-C requires an even number of digits.' };
    }
  } else if (format === 'pharmacode') {
    const num = parseInt(cleanVal, 10);
    if (isNaN(num) || num < 3 || num > 131070) {
      return { valid: false, error: 'Pharmacode must be a number between 3 and 131070.' };
    }
  } else if (format === 'codabar') {
    if (!/^[A-Da-d][0-9\-\$\:\/\.\+]+[A-Da-d]$/.test(cleanVal)) {
      return { valid: false, error: 'Codabar must start and end with A, B, C, or D (e.g. A1234B).' };
    }
  } else if (format === 'CODE39') {
    if (!/^[0-9A-Z\-\.\ \$\/\+\%]+$/i.test(cleanVal)) {
      return { valid: false, error: 'Code 39 only allows uppercase A-Z, 0-9, and - . $ / + % space.' };
    }
  }

  return { valid: true };
}

export function renderBarcodeToSvg(
  svgElement: SVGSVGElement,
  settings: BarcodeSettings
): boolean {
  try {
    const validCheck = validateBarcode(settings.value, settings.format);
    if (!validCheck.valid) {
      return false;
    }

    JsBarcode(svgElement, settings.value, {
      format: settings.format,
      width: settings.width,
      height: settings.height,
      displayValue: settings.displayValue,
      textPosition: settings.textPosition,
      textAlign: settings.textAlign,
      fontSize: settings.fontSize,
      font: settings.font || 'monospace',
      lineColor: settings.lineColor,
      background: settings.background,
      margin: settings.margin,
      valid: () => true,
    });
    return true;
  } catch (err) {
    console.warn('JsBarcode render error:', err);
    return false;
  }
}

export function renderBarcodeToCanvas(
  canvas: HTMLCanvasElement,
  settings: BarcodeSettings
): boolean {
  try {
    const validCheck = validateBarcode(settings.value, settings.format);
    if (!validCheck.valid) return false;

    // Temporary canvas for barcode
    const tempCanvas = document.createElement('canvas');
    JsBarcode(tempCanvas, settings.value, {
      format: settings.format,
      width: settings.width,
      height: settings.height,
      displayValue: settings.displayValue,
      textPosition: settings.textPosition,
      textAlign: settings.textAlign,
      fontSize: settings.fontSize,
      font: settings.font || 'monospace',
      lineColor: settings.lineColor,
      background: settings.background,
      margin: settings.margin,
    });

    // If product details should be included in full label image
    if (settings.includeLabelHeader && (settings.productName || settings.price || settings.sku || settings.mfgDate || settings.expDate)) {
      const barcodeWidth = tempCanvas.width;
      const barcodeHeight = tempCanvas.height;
      const extraTop = (settings.productName || settings.sku) ? 44 : 10;
      const extraBottom = (settings.price || settings.mfgDate || settings.expDate) ? 36 : 10;
      const totalWidth = Math.max(barcodeWidth, 260);
      const totalHeight = barcodeHeight + extraTop + extraBottom;

      canvas.width = totalWidth;
      canvas.height = totalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return false;

      // Background
      ctx.fillStyle = settings.background || '#ffffff';
      ctx.fillRect(0, 0, totalWidth, totalHeight);

      // Top text (Product Name / SKU)
      ctx.fillStyle = settings.lineColor || '#000000';
      ctx.textAlign = 'center';
      
      let curY = 20;
      if (settings.productName) {
        ctx.font = 'bold 13px Inter, sans-serif';
        const truncatedName = settings.productName.length > 30 ? settings.productName.substring(0, 28) + '...' : settings.productName;
        ctx.fillText(truncatedName, totalWidth / 2, curY);
        curY += 16;
      }
      if (settings.sku) {
        ctx.font = '500 10px JetBrains Mono, monospace';
        ctx.fillStyle = '#4B5563';
        ctx.fillText(`SKU: ${settings.sku}`, totalWidth / 2, curY);
      }

      // Draw Barcode in center
      const offsetX = (totalWidth - barcodeWidth) / 2;
      ctx.drawImage(tempCanvas, offsetX, extraTop);

      // Bottom text (Price / MFG / EXP)
      let botY = extraTop + barcodeHeight + 16;
      if (settings.price) {
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.fillStyle = '#DC2626'; // Primary red
        ctx.fillText(`${settings.currency || '$'}${settings.price}`, totalWidth / 2, botY);
        botY += 14;
      }

      if (settings.mfgDate || settings.expDate) {
        ctx.font = '400 9px Inter, sans-serif';
        ctx.fillStyle = '#6B7280';
        const dateText = [
          settings.mfgDate ? `MFG: ${settings.mfgDate}` : '',
          settings.expDate ? `EXP: ${settings.expDate}` : '',
        ].filter(Boolean).join(' | ');
        ctx.fillText(dateText, totalWidth / 2, botY);
      }

    } else {
      canvas.width = tempCanvas.width;
      canvas.height = tempCanvas.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(tempCanvas, 0, 0);
      }
    }

    return true;
  } catch (err) {
    console.warn('Canvas render error:', err);
    return false;
  }
}

export function downloadBarcodeSvg(svgElement: SVGSVGElement, filename: string = 'barcode.svg') {
  const svgData = new XMLSerializer().serializeToString(svgElement);
  const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadBarcodePng(canvas: HTMLCanvasElement, filename: string = 'barcode.png') {
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function downloadBarcodePdf(canvas: HTMLCanvasElement, filename: string = 'barcode.pdf', title?: string) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [100, 60], // Standard label format: 100mm x 60mm
  });

  const imgData = canvas.toDataURL('image/png');
  // Fit nicely inside 100x60
  doc.addImage(imgData, 'PNG', 5, 5, 90, 50, undefined, 'FAST');
  doc.save(filename);
}

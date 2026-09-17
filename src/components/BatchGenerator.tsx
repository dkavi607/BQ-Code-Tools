import React, { useState, useRef, useEffect } from 'react';
import { 
  Layers, 
  Upload, 
  FileText, 
  Printer, 
  Download, 
  Sparkles, 
  Check, 
  Trash2, 
  Barcode as BarcodeIcon, 
  QrCode as QrIcon,
  AlertCircle
} from 'lucide-react';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import { BarcodeSymbology, BatchItem } from '../types';

const SAMPLE_BATCH_DATA = `SKU-1001,Wireless Ergonomic Mouse,$29.99
SKU-1002,Mechanical Gaming Keyboard,$79.99
SKU-1003,USB-C Multiport Hub 7-in-1,$45.00
SKU-1004,Noise Cancelling Headset,$119.00
SKU-1005,HD 1080p Streaming Webcam,$59.99
SKU-1006,Ultra-thin Mousepad XL,$14.99`;

export const BatchGenerator: React.FC = () => {
  const [mode, setMode] = useState<'barcode' | 'qrcode'>('barcode');
  const [symbology, setSymbology] = useState<BarcodeSymbology>('CODE128');
  const [rawText, setRawText] = useState(SAMPLE_BATCH_DATA);
  const [items, setItems] = useState<BatchItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});

  // Parse Raw Text into items
  const handleParseData = () => {
    const lines = rawText.split('\n').map(l => l.trim()).filter(Boolean);
    const parsed: BatchItem[] = lines.map((line, idx) => {
      const parts = line.split(',').map(p => p.trim());
      return {
        id: `item-${idx}-${Date.now()}`,
        code: parts[0] || `ITEM-${idx + 1}`,
        name: parts[1] || '',
        price: parts[2] || '',
        status: 'ready',
      };
    });
    setItems(parsed);
  };

  useEffect(() => {
    handleParseData();
  }, [rawText, mode, symbology]);

  // Generate barcodes / QRs for all items
  useEffect(() => {
    if (items.length === 0) return;

    const generateAll = async () => {
      setIsProcessing(true);
      const newImages: Record<string, string> = {};

      for (const item of items) {
        try {
          const canvas = document.createElement('canvas');

          if (mode === 'barcode') {
            const extraTop = item.name ? 32 : 10;
            const extraBottom = item.price ? 28 : 10;
            
            const tempCanvas = document.createElement('canvas');
            JsBarcode(tempCanvas, item.code, {
              format: symbology,
              width: 2,
              height: 70,
              displayValue: true,
              fontSize: 14,
              font: 'monospace',
              margin: 8,
            });

            const totalWidth = Math.max(tempCanvas.width, 220);
            const totalHeight = tempCanvas.height + extraTop + extraBottom;
            canvas.width = totalWidth;
            canvas.height = totalHeight;

            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, totalWidth, totalHeight);

              if (item.name) {
                ctx.fillStyle = '#111827';
                ctx.font = 'bold 12px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(item.name.slice(0, 24), totalWidth / 2, 20);
              }

              const offsetX = (totalWidth - tempCanvas.width) / 2;
              ctx.drawImage(tempCanvas, offsetX, extraTop);

              if (item.price) {
                ctx.fillStyle = '#DC2626';
                ctx.font = 'bold 13px Inter, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(item.price, totalWidth / 2, extraTop + tempCanvas.height + 16);
              }
            }
          } else {
            // QR Code
            await QRCode.toCanvas(canvas, item.code, {
              width: 260,
              margin: 2,
              errorCorrectionLevel: 'M',
            });
          }

          newImages[item.id] = canvas.toDataURL('image/png');
        } catch (err) {
          console.warn(`Failed to generate code for ${item.code}:`, err);
        }
      }

      setGeneratedImages(newImages);
      setIsProcessing(false);
    };

    generateAll();
  }, [items, mode, symbology]);

  // Export as multi-page A4 PDF sheet
  const handleExportA4Pdf = () => {
    if (items.length === 0) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const cols = 3;
    const rows = 7;
    const labelsPerPage = cols * rows;
    const labelWidth = (210 - 20 - (cols - 1) * 3) / cols;
    const labelHeight = (297 - 20 - (rows - 1) * 3) / rows;

    items.forEach((item, idx) => {
      if (idx > 0 && idx % labelsPerPage === 0) {
        doc.addPage();
      }

      const pagePos = idx % labelsPerPage;
      const col = pagePos % cols;
      const row = Math.floor(pagePos / cols);

      const x = 10 + col * (labelWidth + 3);
      const y = 10 + row * (labelHeight + 3);

      // Border outline
      doc.setDrawColor(220, 225, 230);
      doc.setLineWidth(0.2);
      doc.roundedRect(x, y, labelWidth, labelHeight, 1.5, 1.5, 'S');

      const imgData = generatedImages[item.id];
      if (imgData) {
        doc.addImage(imgData, 'PNG', x + 1.5, y + 1.5, labelWidth - 3, labelHeight - 3, undefined, 'FAST');
      }
    });

    doc.save(`BQ_Batch_${mode.toUpperCase()}_Labels_${items.length}_items.pdf`);
  };

  const handlePrintAll = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    let contentHtml = '';
    items.forEach(item => {
      const img = generatedImages[item.id];
      if (img) {
        contentHtml += `
          <div class="label-card">
            <img src="${img}" alt="${item.code}" />
          </div>
        `;
      }
    });

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Batch Print Labels</title>
          <style>
            @page { size: A4; margin: 8mm; }
            body { font-family: sans-serif; }
            .grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-gap: 3mm; }
            .label-card { border: 1px dashed #ccc; padding: 2mm; text-align: center; height: 35mm; display: flex; align-items: center; justify-content: center; page-break-inside: avoid; }
            .label-card img { max-width: 100%; max-height: 100%; object-fit: contain; }
          </style>
        </head>
        <body>
          <div class="grid">${contentHtml}</div>
          <script>window.onload = function(){ window.print(); };</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Title */}
      <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-2">
            <Layers className="w-3.5 h-3.5" />
            Batch Generation Studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Bulk Barcode & QR Code Generator
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Generate dozens or hundreds of product labels from CSV data and print to standard A4 sheets
          </p>
        </div>

        {/* Global Export Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrintAll}
            disabled={items.length === 0 || isProcessing}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 hover:bg-black disabled:bg-gray-400 text-white rounded-xl text-sm font-bold shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            Direct Print
          </button>

          <button
            onClick={handleExportA4Pdf}
            disabled={items.length === 0 || isProcessing}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-xl text-sm font-bold shadow-md shadow-red-600/20 transition-all"
          >
            <FileText className="w-4 h-4" />
            Download PDF Sheet ({items.length} Items)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Input Textarea & Configuration (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
              1. Format & Symbology
            </h3>

            {/* Mode Toggle */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('barcode')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  mode === 'barcode'
                    ? 'border-red-600 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <BarcodeIcon className="w-4 h-4" />
                <span>1D Barcodes</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('qrcode')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  mode === 'qrcode'
                    ? 'border-red-600 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <QrIcon className="w-4 h-4" />
                <span>2D QR Codes</span>
              </button>
            </div>

            {mode === 'barcode' && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Symbology Format
                </label>
                <select
                  value={symbology}
                  onChange={(e) => setSymbology(e.target.value as BarcodeSymbology)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold bg-white"
                >
                  <option value="CODE128">Code 128 (Universal)</option>
                  <option value="EAN13">EAN-13 (13 Digits)</option>
                  <option value="UPC">UPC-A (12 Digits)</option>
                  <option value="CODE39">Code 39 (Alphanumeric)</option>
                  <option value="ITF14">ITF-14 (Shipping)</option>
                </select>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
                2. CSV Data Input
              </h3>
              <button
                type="button"
                onClick={() => setRawText(SAMPLE_BATCH_DATA)}
                className="text-xs text-red-600 hover:underline font-semibold"
              >
                Load Sample CSV
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Format: <code>Code, [Product Name], [Price]</code> (one item per line)
            </p>

            <textarea
              rows={8}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              placeholder="SKU-1001, Organic Coffee, $14.99&#10;SKU-1002, Green Tea Bags, $8.50"
              className="w-full p-3.5 rounded-xl border border-gray-300 text-xs font-mono focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />

            <div className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-200">
              <span>Parsed Items: <strong>{items.length}</strong></span>
              <span className="text-emerald-600 font-semibold">Ready for generation</span>
            </div>
          </div>

        </div>

        {/* Right: Live Grid of Generated Labels (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
                Generated Labels Preview ({items.length})
              </h3>
              <span className="text-xs text-gray-500">
                A4 Sheet Layout (3 x 7 per page)
              </span>
            </div>

            {items.length === 0 ? (
              <div className="py-16 text-center text-gray-400">
                <Layers className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No items entered. Type or paste CSV items on the left.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[560px] overflow-y-auto p-1">
                {items.map((item) => {
                  const img = generatedImages[item.id];
                  return (
                    <div
                      key={item.id}
                      className="bg-gray-50 rounded-xl p-3 border border-gray-200 flex flex-col items-center justify-center text-center group hover:border-red-300 hover:bg-white transition-all shadow-2xs"
                    >
                      {img ? (
                        <img
                          src={img}
                          alt={item.code}
                          className="max-h-24 max-w-full object-contain"
                        />
                      ) : (
                        <div className="h-20 flex items-center justify-center text-xs text-gray-400">
                          Rendering...
                        </div>
                      )}

                      <div className="mt-2 text-center w-full">
                        <p className="text-[11px] font-mono font-bold text-gray-800 truncate">
                          {item.code}
                        </p>
                        {item.name && (
                          <p className="text-[10px] text-gray-500 truncate">{item.name}</p>
                        )}
                      </div>

                      {/* Download single button */}
                      {img && (
                        <a
                          href={img}
                          download={`${item.code}.png`}
                          className="mt-2 text-[10px] text-red-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          Download PNG
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};

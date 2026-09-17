import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  FileDown, 
  LayoutGrid, 
  Sliders, 
  Check, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { SheetConfig } from '../types';
import { generateA4LabelSheetPdf, printA4LabelSheet } from '../utils/pdfExport';

interface PrintLabelModalProps {
  isOpen: boolean;
  onClose: () => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  itemTitle: string;
}

const PRESET_TEMPLATES = [
  { name: 'Avery 7160 (3 x 7 = 21 Labels)', cols: 3, rows: 7, gap: 3 },
  { name: 'Avery 7159 (3 x 8 = 24 Labels)', cols: 3, rows: 8, gap: 2.5 },
  { name: 'Avery L7163 (2 x 7 = 14 Labels)', cols: 2, rows: 7, gap: 4 },
  { name: 'Mini Barcodes (4 x 10 = 40 Labels)', cols: 4, rows: 10, gap: 2 },
  { name: 'Shipping Carton (2 x 4 = 8 Labels)', cols: 2, rows: 4, gap: 5 },
];

export const PrintLabelModal: React.FC<PrintLabelModalProps> = ({
  isOpen,
  onClose,
  canvasRef,
  itemTitle,
}) => {
  const [config, setConfig] = useState<SheetConfig>({
    paperSize: 'a4',
    columns: 3,
    rows: 7,
    marginTop: 10,
    marginLeft: 10,
    colGap: 3,
    rowGap: 3,
    showBorder: true,
    quantity: 21,
    includeProductDetails: true,
  });

  if (!isOpen) return null;

  const totalPerSheet = config.columns * config.rows;
  const numPages = Math.ceil(config.quantity / totalPerSheet);

  const handleApplyPreset = (cols: number, rows: number, gap: number) => {
    setConfig({
      ...config,
      columns: cols,
      rows: rows,
      colGap: gap,
      rowGap: gap,
      quantity: cols * rows,
    });
  };

  const handleDownloadPdf = () => {
    if (!canvasRef.current) return;
    const imgDataUrl = canvasRef.current.toDataURL('image/png');
    generateA4LabelSheetPdf(imgDataUrl, config);
  };

  const handleDirectPrint = () => {
    if (!canvasRef.current) return;
    printA4LabelSheet(canvasRef.current, config, config.quantity);
  };

  const previewDataUrl = canvasRef.current ? canvasRef.current.toDataURL('image/png') : '';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">A4 / Letter Label Sheet Generator</h3>
              <p className="text-xs text-gray-500">Configure multi-label layout and download print-ready PDF</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Controls Panel */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Template Presets */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Standard Label Sheet Presets
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PRESET_TEMPLATES.map((tmpl, idx) => {
                  const isSelected = config.columns === tmpl.cols && config.rows === tmpl.rows;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyPreset(tmpl.cols, tmpl.rows, tmpl.gap)}
                      className={`text-left p-2.5 rounded-lg border text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-red-600 bg-red-50 text-red-900 font-semibold'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="truncate">{tmpl.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-red-600 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Grid Dimensions */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-gray-500" />
                Sheet Layout Grid
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Columns</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={config.columns}
                    onChange={(e) => setConfig({ ...config, columns: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white font-semibold focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Rows</label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={config.rows}
                    onChange={(e) => setConfig({ ...config, rows: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white font-semibold focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Total Labels</label>
                  <input
                    type="number"
                    min="1"
                    max="500"
                    value={config.quantity}
                    onChange={(e) => setConfig({ ...config, quantity: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white font-semibold focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Paper Format</label>
                  <select
                    value={config.paperSize}
                    onChange={(e) => setConfig({ ...config, paperSize: e.target.value as 'a4' | 'letter' })}
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs bg-white focus:ring-2 focus:ring-red-500"
                  >
                    <option value="a4">A4 (210 x 297 mm)</option>
                    <option value="letter">US Letter (8.5 x 11 in)</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={config.showBorder}
                      onChange={(e) => setConfig({ ...config, showBorder: e.target.checked })}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500 h-4 w-4"
                    />
                    <span>Draw Cutting Border Lines</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Page Count Info */}
            <div className="text-xs text-gray-600 flex items-center justify-between bg-blue-50/70 p-3 rounded-lg border border-blue-200/80">
              <span><strong>{config.quantity}</strong> labels will be formatted across <strong>{numPages} page{numPages > 1 ? 's' : ''}</strong> ({totalPerSheet} per sheet).</span>
            </div>

          </div>

          {/* Sheet Visual Live Preview */}
          <div className="lg:col-span-6 flex flex-col">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              Sheet Page Preview (Page 1)
            </label>

            <div className="flex-1 bg-gray-100 rounded-xl p-4 flex items-center justify-center border border-gray-200 min-h-[300px]">
              <div 
                className="bg-white shadow-md rounded border border-gray-300 p-2 relative overflow-hidden transition-all"
                style={{
                  width: '240px',
                  height: '340px',
                  display: 'grid',
                  gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
                  gridTemplateRows: `repeat(${config.rows}, 1fr)`,
                  gap: `${Math.max(1, config.colGap)}px`,
                }}
              >
                {Array.from({ length: Math.min(config.quantity, totalPerSheet) }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center p-0.5 overflow-hidden ${
                      config.showBorder ? 'border border-dashed border-gray-300' : ''
                    }`}
                  >
                    {previewDataUrl ? (
                      <img
                        src={previewDataUrl}
                        alt="Label sample"
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded text-[6px] text-gray-400 flex items-center justify-center">
                        Label
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-gray-400 text-center mt-2">
              Standard laser & thermal printable resolution (300 DPI vector scale)
            </p>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-xl text-sm font-medium transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDirectPrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-xl text-sm font-bold shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              Direct Print
            </button>

            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-md shadow-red-600/20 transition-all"
            >
              <FileDown className="w-4 h-4" />
              Download A4 Label PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

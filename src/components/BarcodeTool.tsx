import React, { useState, useEffect, useRef } from 'react';
import { 
  Barcode, 
  Download, 
  Copy, 
  Check, 
  Printer, 
  FileText, 
  Sparkles, 
  AlertCircle, 
  Sliders, 
  Tag, 
  Calendar, 
  DollarSign, 
  Layers, 
  RotateCcw,
  Palette,
  Eye,
  Info
} from 'lucide-react';
import { BarcodeSettings, BarcodeSymbology } from '../types';
import { 
  BARCODE_FORMAT_INFO, 
  validateBarcode, 
  renderBarcodeToSvg, 
  renderBarcodeToCanvas, 
  downloadBarcodeSvg, 
  downloadBarcodePng, 
  downloadBarcodePdf 
} from '../utils/barcodeGenerator';
import { PrintLabelModal } from './PrintLabelModal';

const DEFAULT_SETTINGS: BarcodeSettings = {
  value: 'BQ-849204-PRO',
  format: 'CODE128',
  width: 2,
  height: 90,
  displayValue: true,
  textPosition: 'bottom',
  textAlign: 'center',
  fontSize: 18,
  fontOptions: '',
  font: 'monospace',
  lineColor: '#000000',
  background: '#ffffff',
  margin: 12,
  // Product details
  productName: '',
  price: '',
  currency: '$',
  mfgDate: '',
  expDate: '',
  sku: '',
  includeLabelHeader: true,
};

const POPULAR_FORMATS: { label: string; format: BarcodeSymbology }[] = [
  { label: 'Code 128 (Universal)', format: 'CODE128' },
  { label: 'EAN-13 (Global Retail)', format: 'EAN13' },
  { label: 'UPC-A (US/CA Retail)', format: 'UPC' },
  { label: 'Code 39 (Logistics)', format: 'CODE39' },
  { label: 'ITF-14 (Cartons)', format: 'ITF14' },
  { label: 'EAN-8 (Small Items)', format: 'EAN8' },
];

export const BarcodeTool: React.FC = () => {
  const [settings, setSettings] = useState<BarcodeSettings>(DEFAULT_SETTINGS);
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Validate and Render Barcode whenever settings change
  useEffect(() => {
    const valid = validateBarcode(settings.value, settings.format);
    if (!valid.valid) {
      setValidationError(valid.error || 'Invalid barcode value for this format');
      return;
    }
    setValidationError(null);

    if (svgRef.current) {
      renderBarcodeToSvg(svgRef.current, settings);
    }
    if (canvasRef.current) {
      renderBarcodeToCanvas(canvasRef.current, settings);
    }
  }, [settings]);

  const handleFormatChange = (newFormat: BarcodeSymbology) => {
    // Set a sensible default value matching the format example
    const example = BARCODE_FORMAT_INFO[newFormat]?.example || '1234567890';
    setSettings(prev => ({
      ...prev,
      format: newFormat,
      value: example,
    }));
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  const handleDownload = (format: 'png' | 'svg' | 'pdf') => {
    const filename = `barcode_${settings.value.replace(/[^a-zA-Z0-9]/g, '_')}`;
    if (format === 'png' && canvasRef.current) {
      downloadBarcodePng(canvasRef.current, `${filename}.png`);
    } else if (format === 'svg' && svgRef.current) {
      downloadBarcodeSvg(svgRef.current, `${filename}.svg`);
    } else if (format === 'pdf' && canvasRef.current) {
      downloadBarcodePdf(canvasRef.current, `${filename}.pdf`, settings.productName || settings.value);
    }
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Top Tool Bar */}
      <div className="bg-gray-50/80 px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
            <Barcode className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Professional Barcode Generator
            </h2>
            <p className="text-xs text-gray-500">
              Compliant with GS1, ISO, and standard 1D linear barcode symbologies
            </p>
          </div>
        </div>

        {/* Quick Format Chips */}
        <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto py-1">
          {POPULAR_FORMATS.slice(0, 4).map((f) => (
            <button
              key={f.format}
              onClick={() => handleFormatChange(f.format)}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                settings.format === f.format
                  ? 'bg-red-600 text-white shadow-xs font-semibold'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {f.label.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Primary Barcode Input */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="barcode-value-input" className="text-sm font-bold text-gray-800 flex items-center gap-1">
                Barcode Value / Data <span className="text-red-500">*</span>
              </label>
              <span className="text-xs text-gray-400">
                Format: <strong className="text-gray-700">{settings.format}</strong>
              </span>
            </div>
            
            <div className="relative">
              <input
                id="barcode-value-input"
                type="text"
                value={settings.value}
                onChange={(e) => setSettings({ ...settings, value: e.target.value })}
                placeholder={`e.g. ${BARCODE_FORMAT_INFO[settings.format]?.example || '123456'}`}
                className={`w-full px-4 py-3 rounded-xl border text-base font-mono transition-colors focus:outline-none focus:ring-2 ${
                  validationError
                    ? 'border-red-400 bg-red-50/50 text-red-900 focus:ring-red-400'
                    : 'border-gray-300 focus:border-red-500 focus:ring-red-500/20'
                }`}
              />
            </div>

            {/* Validation Message / Symbology Hint */}
            {validationError ? (
              <div className="mt-2 flex items-start gap-1.5 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            ) : (
              <div className="mt-1.5 flex items-center gap-1 text-[11px] text-gray-500">
                <Info className="w-3 h-3 text-gray-400" />
                <span>{BARCODE_FORMAT_INFO[settings.format]?.description}</span>
              </div>
            )}
          </div>

          {/* Barcode Type Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="barcode-type-select" className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Barcode Type (Symbology)
              </label>
              <select
                id="barcode-type-select"
                value={settings.format}
                onChange={(e) => handleFormatChange(e.target.value as BarcodeSymbology)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-800 focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <optgroup label="Retail & POS Standards">
                  <option value="CODE128">Code 128 (Universal GS1-128)</option>
                  <option value="EAN13">EAN-13 (International Retail)</option>
                  <option value="UPC">UPC-A (North America Retail)</option>
                  <option value="EAN8">EAN-8 (Compact Grocery)</option>
                </optgroup>
                <optgroup label="Industrial, Logistics & Defense">
                  <option value="CODE39">Code 39 (Alphanumeric)</option>
                  <option value="ITF14">ITF-14 (Shipping Master Carton)</option>
                  <option value="ITF">ITF (Interleaved 2 of 5)</option>
                  <option value="codabar">Codabar (NW-7 / Libraries / Labs)</option>
                  <option value="MSI">MSI Plessey (Inventory/Shelf)</option>
                  <option value="pharmacode">Pharmacode (Pharmaceutical)</option>
                </optgroup>
                <optgroup label="Code 128 Subtypes">
                  <option value="CODE128A">Code 128-A (Uppercase & Controls)</option>
                  <option value="CODE128B">Code 128-B (Standard ASCII)</option>
                  <option value="CODE128C">Code 128-C (Double Density Digits)</option>
                </optgroup>
              </select>
            </div>

            {/* Display Text Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                Human Readable Text
              </label>
              <div className="flex items-center gap-2 h-10">
                <button
                  type="button"
                  onClick={() => setSettings({ ...settings, displayValue: !settings.displayValue })}
                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                    settings.displayValue
                      ? 'bg-red-50 border-red-300 text-red-700'
                      : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {settings.displayValue ? '✓ Text Visible' : 'Hidden'}
                </button>

                {settings.displayValue && (
                  <select
                    value={settings.textPosition}
                    onChange={(e) => setSettings({ ...settings, textPosition: e.target.value as 'bottom' | 'top' })}
                    className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-xs font-medium text-gray-700"
                  >
                    <option value="bottom">Bottom</option>
                    <option value="top">Top</option>
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Sizing Sliders */}
          <div className="bg-gray-50/70 p-4 rounded-xl border border-gray-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-gray-500" />
              Dimensions & Sizing
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Bar Width Scale</span>
                  <span className="font-mono font-bold text-gray-800">{settings.width}px</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="0.5"
                  value={settings.width}
                  onChange={(e) => setSettings({ ...settings, width: parseFloat(e.target.value) })}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Bar Height</span>
                  <span className="font-mono font-bold text-gray-800">{settings.height}px</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="180"
                  step="5"
                  value={settings.height}
                  onChange={(e) => setSettings({ ...settings, height: parseInt(e.target.value) })}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-200/80">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Barcode Line Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.lineColor}
                    onChange={(e) => setSettings({ ...settings, lineColor: e.target.value })}
                    className="w-9 h-9 p-0.5 rounded-lg border border-gray-300 cursor-pointer bg-white"
                  />
                  <input
                    type="text"
                    value={settings.lineColor}
                    onChange={(e) => setSettings({ ...settings, lineColor: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Background Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={settings.background}
                    onChange={(e) => setSettings({ ...settings, background: e.target.value })}
                    className="w-9 h-9 p-0.5 rounded-lg border border-gray-300 cursor-pointer bg-white"
                  />
                  <input
                    type="text"
                    value={settings.background}
                    onChange={(e) => setSettings({ ...settings, background: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Optional Product Label Details (Name, Price, MFG, EXP, SKU) */}
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between text-left hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-red-600" />
                <span className="text-xs sm:text-sm font-bold text-gray-800">
                  Product Label Info (Price, Name, Dates)
                </span>
                <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold">
                  Retail Ready
                </span>
              </div>
              <span className="text-xs text-red-600 font-semibold">
                {showAdvanced ? 'Hide Fields' : 'Add Details'}
              </span>
            </button>

            {showAdvanced && (
              <div className="p-4 space-y-3 bg-white animate-fadeIn">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Product Name / Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Organic Dark Roast Coffee 250g"
                      value={settings.productName}
                      onChange={(e) => setSettings({ ...settings, productName: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">SKU / Item Code</label>
                    <input
                      type="text"
                      placeholder="e.g. SKU-8490-X"
                      value={settings.sku}
                      onChange={(e) => setSettings({ ...settings, sku: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Price</label>
                    <div className="flex gap-1.5">
                      <select
                        value={settings.currency}
                        onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                        className="w-14 px-2 py-1.5 rounded-lg border border-gray-300 text-xs bg-white font-bold"
                      >
                        <option value="$">$</option>
                        <option value="€">€</option>
                        <option value="£">£</option>
                        <option value="¥">¥</option>
                        <option value="₹">₹</option>
                      </select>
                      <input
                        type="text"
                        placeholder="19.99"
                        value={settings.price}
                        onChange={(e) => setSettings({ ...settings, price: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Mfg Date</label>
                    <input
                      type="date"
                      value={settings.mfgDate}
                      onChange={(e) => setSettings({ ...settings, mfgDate: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Expiry Date</label>
                    <input
                      type="date"
                      value={settings.expDate}
                      onChange={(e) => setSettings({ ...settings, expDate: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-gray-500">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.includeLabelHeader}
                      onChange={(e) => setSettings({ ...settings, includeLabelHeader: e.target.checked })}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500 h-4 w-4"
                    />
                    <span>Render product details on exported image / label</span>
                  </label>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Right Live Preview & Export Hub (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200/90 flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-red-600" />
                Live Label Preview
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
                title="Reset to default settings"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* Render Container Box */}
            <div className="w-full bg-white rounded-xl p-4 sm:p-6 border border-gray-200/80 shadow-xs flex flex-col items-center justify-center min-h-[220px] overflow-hidden">
              
              {/* Product Header in preview if typed */}
              {settings.includeLabelHeader && settings.productName && (
                <div className="text-center mb-2 max-w-full">
                  <h4 className="font-bold text-sm text-gray-900 truncate max-w-[280px]">
                    {settings.productName}
                  </h4>
                  {settings.sku && (
                    <span className="text-[10px] font-mono text-gray-500">SKU: {settings.sku}</span>
                  )}
                </div>
              )}

              {/* Barcode SVG representation */}
              <div className="max-w-full overflow-x-auto flex justify-center py-1">
                <svg ref={svgRef} className="max-w-full h-auto"></svg>
              </div>

              {/* Hidden Canvas for High-Resolution rasterization and PDF generation */}
              <canvas ref={canvasRef} className="hidden"></canvas>

              {/* Product Footer in preview if typed */}
              {settings.includeLabelHeader && (settings.price || settings.mfgDate || settings.expDate) && (
                <div className="text-center mt-2 pt-2 border-t border-gray-100 w-full flex flex-col items-center">
                  {settings.price && (
                    <span className="text-sm font-extrabold text-red-600">
                      {settings.currency}{settings.price}
                    </span>
                  )}
                  {(settings.mfgDate || settings.expDate) && (
                    <div className="text-[10px] text-gray-500 space-x-2">
                      {settings.mfgDate && <span>MFG: {settings.mfgDate}</span>}
                      {settings.expDate && <span>EXP: {settings.expDate}</span>}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Quick Actions (Copy / Print single) */}
            <div className="w-full grid grid-cols-2 gap-2 mt-4">
              <button
                type="button"
                onClick={handleCopyImage}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-xs font-semibold text-gray-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied Image!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-500" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsSheetModalOpen(true)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-xs font-bold text-red-700 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-red-600" />
                <span>Print A4 Sheets</span>
              </button>
            </div>

          </div>

          {/* Export Buttons */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Download Format
            </span>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => handleDownload('png')}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-900 hover:bg-black text-white transition-transform active:scale-95 shadow-sm"
              >
                <Download className="w-4 h-4 mb-1" />
                <span className="text-xs font-bold">PNG Image</span>
                <span className="text-[10px] text-gray-400">High Res</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload('svg')}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-transform active:scale-95 shadow-sm shadow-red-600/20"
              >
                <Download className="w-4 h-4 mb-1" />
                <span className="text-xs font-bold">SVG Vector</span>
                <span className="text-[10px] text-red-100">Scalable</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload('pdf')}
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-gray-800 hover:bg-gray-900 text-white transition-transform active:scale-95 shadow-sm"
              >
                <FileText className="w-4 h-4 mb-1" />
                <span className="text-xs font-bold">PDF Label</span>
                <span className="text-[10px] text-gray-400">Print 100x60</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* A4 Sheet Print Modal */}
      <PrintLabelModal
        isOpen={isSheetModalOpen}
        onClose={() => setIsSheetModalOpen(false)}
        canvasRef={canvasRef}
        itemTitle={settings.productName || settings.value}
      />

    </div>
  );
};

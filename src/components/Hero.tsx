import React from 'react';
import { 
  Barcode, 
  QrCode, 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  DownloadCloud,
  FileCheck2
} from 'lucide-react';

interface HeroProps {
  onSelectBarcode: () => void;
  onSelectQRCode: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectBarcode, onSelectQRCode }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-red-50/20 to-gray-50 pt-8 pb-12 sm:pt-12 sm:pb-16 border-b border-gray-200/70">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-red-600" />
          <span>Professional Barcode & QR Code Suite • Commercial Ready</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Free Barcode & <span className="text-red-600">QR Code</span> Generator
        </h1>

        {/* Subheadline */}
        <p className="mt-4 sm:mt-6 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Create professional barcodes and QR codes instantly for your business. Fast, high-resolution vector exports, custom colors, and print-ready label sheets.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
          <button
            id="hero-barcode-cta-btn"
            onClick={onSelectBarcode}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-base shadow-md shadow-red-600/25 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <Barcode className="w-5 h-5 stroke-[2.2]" />
            <span>Generate Barcode</span>
          </button>

          <button
            id="hero-qrcode-cta-btn"
            onClick={onSelectQRCode}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gray-900 hover:bg-black active:bg-gray-800 text-white font-bold text-base shadow-md shadow-gray-900/20 transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            <QrCode className="w-5 h-5 stroke-[2.2]" />
            <span>Generate QR Code</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 pt-8 border-t border-gray-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Free Forever</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
            <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <span>No Registration</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
            <DownloadCloud className="w-4 h-4 text-purple-600 shrink-0" />
            <span>Instant High-Res Export</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-gray-700">
            <FileCheck2 className="w-4 h-4 text-red-600 shrink-0" />
            <span>A4 Print Label Sheets</span>
          </div>
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Sparkles, Info, ExternalLink } from 'lucide-react';

interface AdBannerProps {
  slotType: 'top-banner' | 'in-content' | 'sidebar' | 'bottom-banner';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ slotType, className = '' }) => {
  if (slotType === 'top-banner') {
    return (
      <div className={`w-full max-w-5xl mx-auto px-4 my-4 ${className}`}>
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-3 sm:p-4 text-center">
          <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-gray-700 mb-1.5 px-2">
            <span>Advertisement</span>
            <span className="text-[10px] text-gray-600 font-mono">Leaderboard (728x90 / Responsive)</span>
          </div>
          <div className="h-20 sm:h-24 rounded-lg bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center border border-gray-200/80 px-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-gray-800">
                  Thermal Label Printers & Barcode Scanners for Businesses
                </p>
                <p className="text-[11px] text-gray-700 hidden sm:block">
                  High-speed wireless label printers compatible with Avery & standard A4 sheets.
                </p>
              </div>
              <div className="sm:ml-auto">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded border border-red-200">
                  Learn More <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (slotType === 'sidebar') {
    return (
      <div className={`w-full ${className}`}>
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-3 text-center">
          <div className="flex items-center justify-between text-[10px] font-semibold tracking-wider uppercase text-gray-700 mb-1.5">
            <span>Advertisement</span>
            <span className="text-[9px] text-gray-600 font-mono">300x250 Medium Rect</span>
          </div>
          <div className="h-[250px] rounded-lg bg-gradient-to-b from-gray-100 to-gray-50 border border-gray-200 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">
              Industrial Barcode Scanner & POS Hardware
            </h4>
            <p className="text-xs text-gray-700 mb-4 line-clamp-3">
              Fast 1D/2D QR wireless handheld scanners with Bluetooth & USB connectivity.
            </p>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-gray-900 hover:bg-black px-4 py-2 rounded-lg transition-colors">
              Explore Deals <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (slotType === 'in-content') {
    return (
      <div className={`w-full max-w-4xl mx-auto px-4 my-8 ${className}`}>
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-3 sm:p-4 text-center">
          <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-gray-700 mb-1.5 px-2">
            <span>Sponsored Link</span>
            <span className="text-[10px] text-gray-600 font-mono">Responsive In-Feed Banner</span>
          </div>
          <div className="py-4 px-6 rounded-lg bg-white border border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Sponsored</span>
              <h4 className="text-sm sm:text-base font-bold text-gray-900 mt-0.5">
                Cloud Inventory & Warehouse Barcode Management System
              </h4>
              <p className="text-xs text-gray-700 mt-0.5">
                Track stock in real-time, print SKU labels, and manage shipments on any device.
              </p>
            </div>
            <button className="shrink-0 text-xs font-bold px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-xs">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    );
  }

  // bottom-banner
  return (
    <div className={`w-full max-w-5xl mx-auto px-4 my-8 ${className}`}>
      <div className="bg-gray-50 border border-dashed border-gray-300 rounded-xl p-3 sm:p-4 text-center">
        <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-gray-700 mb-1.5 px-2">
          <span>Advertisement</span>
          <span className="text-[10px] text-gray-600 font-mono">Bottom Responsive Banner</span>
        </div>
        <div className="h-16 sm:h-20 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-between px-6 border border-gray-200">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-gray-700 hidden sm:block" />
            <div className="text-left">
              <p className="text-xs sm:text-sm font-bold text-gray-800">
                Avery Compatible A4 Printable Barcode Sheets (100 Sheets / 2100 Labels)
              </p>
              <p className="text-[11px] text-gray-700 hidden sm:block">
                Matte white self-adhesive shipping and product labels for inkjet & laser printers.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-red-600 border border-red-200 bg-white hover:bg-red-50 px-3 py-1.5 rounded-lg shrink-0">
            View on Amazon
          </span>
        </div>
      </div>
    </div>
  );
};

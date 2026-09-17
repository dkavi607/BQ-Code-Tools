import React from 'react';
import { Barcode, QrCode, ShieldCheck, HeartHandshake, Zap, Target, Users } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-3">
          <Barcode className="w-3.5 h-3.5" />
          About BQ Code Tools
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Empowering Commerce with Open Code Utilities
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          We build fast, free, privacy-first barcode and QR code utilities for merchants, warehouses, developers, and educators worldwide.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xs space-y-8">
        
        {/* Mission */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-red-600" />
            Our Mission
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Standard barcode generation tools on the web are often bloated with forced watermarks, scan limits, aggressive paywalls, or low-resolution outputs. <strong>BQ Code Tools</strong> was built to provide an uncompromised, zero-friction developer & merchant experience: completely free, client-side rendered, commercial-ready, and capable of generating everything from single retail EAN-13 labels to bulk A4 printer sheets in seconds.
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
            <ShieldCheck className="w-6 h-6 text-red-600 mb-2" />
            <h3 className="font-bold text-sm text-gray-900 mb-1">Privacy by Design</h3>
            <p className="text-xs text-gray-600">
              All barcode computations and QR renderings execute entirely inside your local browser. Your data is never saved on remote servers.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
            <Zap className="w-6 h-6 text-red-600 mb-2" />
            <h3 className="font-bold text-sm text-gray-900 mb-1">Instant Performance</h3>
            <p className="text-xs text-gray-600">
              Optimized vector mathematics deliver real-time live preview rendering with zero server lag or latency.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-gray-50 border border-gray-200">
            <HeartHandshake className="w-6 h-6 text-red-600 mb-2" />
            <h3 className="font-bold text-sm text-gray-900 mb-1">100% Free Forever</h3>
            <p className="text-xs text-gray-600">
              No subscriptions, hidden credit card prompts, or trial limits. Designed for everyday business utility.
            </p>
          </div>
        </div>

        {/* Global Standards */}
        <div className="pt-4 border-t border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Standards & Specifications Complied With
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Our generator strictly follows the formal ISO/IEC standards:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 font-mono text-gray-800">
              ISO/IEC 15417 (Code 128)
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 font-mono text-gray-800">
              ISO/IEC 18004 (QR Code)
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 font-mono text-gray-800">
              GS1 General Specifications
            </div>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 font-mono text-gray-800">
              ISO/IEC 16388 (Code 39)
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

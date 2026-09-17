import React from 'react';
import { 
  CheckCircle2, 
  Layers, 
  DownloadCloud, 
  Printer, 
  Lock, 
  Barcode, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

const FEATURES = [
  {
    icon: CheckCircle2,
    title: '100% Free to Use',
    description: 'Create unlimited barcodes and QR codes without any subscription, hidden fees, watermarks, or scan limits.',
    badge: 'No Limits',
  },
  {
    icon: Barcode,
    title: 'Multiple Barcode Types',
    description: 'Full support for Code 128, EAN-13, UPC-A, Code 39, ITF-14, Codabar, MSI, and Pharmacode with GS1 validation.',
    badge: '10+ Standards',
  },
  {
    icon: DownloadCloud,
    title: 'High-Quality Vector & Raster',
    description: 'Download pixel-perfect crisp PNG images or infinitely scalable vector SVG and EPS files suitable for commercial packaging.',
    badge: '300+ DPI',
  },
  {
    icon: Layers,
    title: 'Batch Generation Engine',
    description: 'Bulk create hundreds of SKU codes, asset tags, or customer QR codes simultaneously by pasting CSV data.',
    badge: 'Bulk Ready',
  },
  {
    icon: Printer,
    title: 'Print-Ready A4 Label Sheets',
    description: 'Format labels directly onto standard Avery 21-up, 24-up, or custom laser/thermal sheets with precise cut lines.',
    badge: 'Avery & Thermal',
  },
  {
    icon: Lock,
    title: 'No Registration & Private',
    description: 'No account creation needed. All codes are rendered 100% client-side in your browser for maximum data privacy.',
    badge: 'Client-Side',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-gray-50/60 border-t border-b border-gray-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            Enterprise Grade Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
            Everything You Need for Barcodes & QR Codes
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Engineered for e-commerce store owners, warehouse managers, graphic designers, and event organizers.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-xs hover:shadow-md hover:border-red-200 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-[11px] font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Edit3, SlidersHorizontal, Download, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    icon: Edit3,
    title: 'Enter Your Data',
    description: 'Type your product SKU, retail EAN/UPC code, website URL, Wi-Fi credentials, or contact vCard information.',
  },
  {
    step: '02',
    icon: SlidersHorizontal,
    title: 'Customize Design',
    description: 'Adjust bar widths, error correction levels, color palettes, attach your brand logo, and add "SCAN ME" action frames.',
  },
  {
    step: '03',
    icon: Download,
    title: 'Download & Print',
    description: 'Instantly download high-resolution PNG, vector SVG, PDF labels, or generate multi-label A4 printable sticker sheets.',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Quick 3-Step Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-2">
            How It Works
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Generate and print compliant retail and digital codes in under 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-gray-50/70 rounded-2xl p-8 border border-gray-200/90 text-center flex flex-col items-center hover:border-red-300 hover:bg-red-50/20 transition-all duration-200"
              >
                {/* Step Number Badge */}
                <div className="w-12 h-12 rounded-2xl bg-red-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-red-600/30 mb-6">
                  {item.step}
                </div>

                <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-800 mb-4 shadow-xs">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

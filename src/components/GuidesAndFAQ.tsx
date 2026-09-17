import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronDown, 
  HelpCircle, 
  Check, 
  Layers, 
  QrCode, 
  Barcode as BarcodeIcon,
  Printer,
  Sparkles
} from 'lucide-react';

const FAQS = [
  {
    q: 'Are the barcodes and QR codes generated on BQ Code Tools completely free for commercial use?',
    a: 'Yes! All barcodes and QR codes generated on BQ Code Tools are 100% free with no royalty fees, watermarks, scan limits, or expiration dates. You are free to use them on commercial packaging, Amazon/eBay listings, retail shelves, restaurant menus, business cards, and marketing materials.',
  },
  {
    q: 'Which barcode type should I choose for selling retail products in stores?',
    a: 'For retail Point-of-Sale (POS) products sold globally (outside the US & Canada), choose EAN-13 (13 digits). For retail products sold primarily within the United States and Canada, choose UPC-A (12 digits). For internal inventory, logistics, warehousing, or asset tagging, Code 128 or Code 39 are the industry standards.',
  },
  {
    q: 'What is the best format for downloading codes for print packaging?',
    a: 'For commercial offset, flexographic, or digital printing packaging, download vector SVG or EPS. Vector formats are resolution-independent and can be scaled to any size without pixelation or loss of scanning clarity. For standard office laser/inkjet label sheets or web use, high-resolution PNG is optimal.',
  },
  {
    q: 'How does Error Correction Level work on QR Codes, and when should I use Level H?',
    a: 'QR error correction allows a scanner to read the code even if parts of it are scratched, smudged, or covered by a custom logo: Level L recovers ~7%, Level M ~15% (standard), Level Q ~25%, and Level H ~30%. Whenever you place a company logo or image in the center of your QR code, always use Level H to guarantee instant readability.',
  },
  {
    q: 'How do I print barcodes onto standard Avery A4 or US Letter label sheets?',
    a: 'Click the "Print A4 Sheets" button on any generated barcode or QR code. Choose your desired layout preset (such as Avery 7160 with 3x7 = 21 labels per page), adjust margins or quantity, and click "Download A4 Label PDF" or "Direct Print".',
  },
  {
    q: 'Do generated static QR codes or barcodes expire?',
    a: 'No. The barcodes and static QR codes generated here directly encode the data payload into the pattern itself. As long as your destination link, WiFi password, or SKU remains valid, the physical printed code will work indefinitely.',
  },
];

export const GuidesAndFAQ: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-20 bg-gray-50/70 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            Knowledge Base & Reference
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-3">
            Barcode & QR Code Symbology Guide
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Learn the industry standards, technical specifications, and best practices for printing scannable codes.
          </p>
        </div>

        {/* Informational Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: 1D Barcode Symbologies */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
              <BarcodeIcon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              1D Barcode Formats
            </h3>
            <ul className="text-xs text-gray-600 space-y-2.5">
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 shrink-0">Code 128:</strong>
                <span>Universal high-density alphanumeric code for supply chain, warehousing, and shipping.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 shrink-0">EAN-13 & UPC-A:</strong>
                <span>Standard Global Trade Item Numbers (GTIN) required for supermarket and retail checkout.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 shrink-0">ITF-14:</strong>
                <span>Heavy bearer-bar carton code designed to withstand corrugated cardboard scanning.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 shrink-0">Code 39:</strong>
                <span>Standard symbology used by the US Department of Defense, automotive, and healthcare ID cards.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: QR Code Standards */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <QrCode className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              QR Code Capabilities
            </h3>
            <ul className="text-xs text-gray-600 space-y-2.5">
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 shrink-0">Instant Wi-Fi:</strong>
                <span>Enables guests to connect to WPA/WPA2 networks instantly without typing passwords.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 shrink-0">Digital vCard:</strong>
                <span>Transfers full contact cards (phone, email, company, address) directly to smartphone address books.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 shrink-0">Event iCal:</strong>
                <span>Encodes date, time, and location to automatically add events to Google or Apple Calendar.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 shrink-0">Call & SMS:</strong>
                <span>Triggers immediate pre-filled text messages or direct phone calls for customer service.</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Printing Best Practices */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Printing & Scanning Tips
            </h3>
            <ul className="text-xs text-gray-600 space-y-2.5">
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 shrink-0">High Contrast:</strong>
                <span>Always use dark bars on a light background. Never invert colors (e.g. white bars on black background).</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 shrink-0">Quiet Zones:</strong>
                <span>Ensure a clear blank margin of at least 2.5mm around the entire barcode to allow optical recognition.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 shrink-0">Thermal Print:</strong>
                <span>When using Zebra, Dymo, or Brother thermal printers, export PNG at 300 DPI for sharp edges.</span>
              </li>
              <li className="flex items-start gap-2">
                <strong className="text-gray-900 shrink-0">Test Scans:</strong>
                <span>Always perform test scans using both iOS and Android cameras before running large print batches.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Interactive FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-gray-900">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Common questions regarding barcode standards, QR codes, and sheet printing
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xs transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors focus:outline-none"
                  >
                    <span className="text-sm sm:text-base font-bold text-gray-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-red-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

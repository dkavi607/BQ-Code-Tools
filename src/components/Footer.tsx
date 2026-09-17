import React from 'react';
import { 
  Barcode, 
  QrCode, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  ExternalLink,
  Heart,
  Layers,
  Sparkles
} from 'lucide-react';
import { ActivePage } from '../types';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
  onSelectTool: (tab: 'barcode' | 'qrcode') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onSelectTool }) => {
  const navigateTo = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTool = (tab: 'barcode' | 'qrcode') => {
    onSelectTool(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Description (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md shadow-red-600/30">
                <Barcode className="w-5 h-5 stroke-[2.4]" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                BQ <span className="text-red-500">Code Tools</span>
              </span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              The premier free online barcode and QR code generation suite. Designed for retail merchants, logistics warehouses, packaging designers, and small business owners worldwide.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-gray-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-800 border border-gray-700 text-gray-300 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                100% Client-Side Privacy
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-800 border border-gray-700 text-gray-300 font-medium">
                GS1 / ISO Standards
              </span>
            </div>
          </div>

          {/* Generator Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Generator Tools
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handleTool('barcode')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Barcode Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTool('qrcode')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  QR Code Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('batch')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Batch Label Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('scanner')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Barcode & QR Scanner
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTool('barcode')}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  A4 Label Sheet Printer
                </button>
              </li>
            </ul>
          </div>

          {/* Symbologies & Formats */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Supported Formats
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
              <li>Code 128 (Universal GS1)</li>
              <li>EAN-13 (International Retail)</li>
              <li>UPC-A (North American Retail)</li>
              <li>Code 39 (Industrial/Logistics)</li>
              <li>ITF-14 (Shipping Master Carton)</li>
              <li>vCard & WiFi QR Codes</li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-red-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('guides')}
                  className="hover:text-red-400 transition-colors"
                >
                  Guides & FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('privacy')}
                  className="hover:text-red-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('terms')}
                  className="hover:text-red-400 transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-red-400 transition-colors"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} <strong>BQ Code Tools</strong>. All rights reserved. Free for commercial & personal use.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => navigateTo('privacy')} className="hover:text-gray-300 transition-colors">
              Privacy
            </button>
            <button onClick={() => navigateTo('terms')} className="hover:text-gray-300 transition-colors">
              Terms
            </button>
            <button onClick={() => navigateTo('contact')} className="hover:text-gray-300 transition-colors">
              Contact
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

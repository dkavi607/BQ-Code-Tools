import React, { useState } from 'react';
import { 
  Barcode, 
  QrCode, 
  Layers, 
  ScanLine, 
  BookOpen, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  Printer
} from 'lucide-react';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  activeToolTab: 'barcode' | 'qrcode';
  setActiveToolTab: (tab: 'barcode' | 'qrcode') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  activeToolTab,
  setActiveToolTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateTo = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectTool = (tab: 'barcode' | 'qrcode') => {
    setActivePage('home');
    setActiveToolTab(tab);
    setMobileMenuOpen(false);
    const el = document.getElementById('main-tool-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <button 
            id="header-logo-btn"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-red-500/20 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-red-500 flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
              <div className="relative flex items-center justify-center">
                <Barcode className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>
            <div className="text-left">
              <span className="font-extrabold text-xl tracking-tight text-gray-900 flex items-center gap-1.5">
                BQ <span className="text-red-600">Code Tools</span>
              </span>
              <span className="block text-[11px] font-medium tracking-wide uppercase text-gray-700">
                Barcode & QR Studio
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <button
              id="nav-home-btn"
              onClick={() => navigateTo('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activePage === 'home'
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Home
            </button>

            <button
              id="nav-barcode-btn"
              onClick={() => selectTool('barcode')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activePage === 'home' && activeToolTab === 'barcode'
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Barcode className="w-4 h-4 text-red-600" />
              Barcode Generator
            </button>

            <button
              id="nav-qrcode-btn"
              onClick={() => selectTool('qrcode')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activePage === 'home' && activeToolTab === 'qrcode'
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <QrCode className="w-4 h-4 text-red-600" />
              QR Code Generator
            </button>

            <button
              id="nav-batch-btn"
              onClick={() => navigateTo('batch')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activePage === 'batch'
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              Batch Generator
            </button>

            <button
              id="nav-scanner-btn"
              onClick={() => navigateTo('scanner')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activePage === 'scanner'
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ScanLine className="w-4 h-4" />
              Scanner
            </button>

            <button
              id="nav-guides-btn"
              onClick={() => navigateTo('guides')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activePage === 'guides'
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Guides & FAQ
            </button>
          </nav>

          {/* Quick CTA button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              id="header-quick-create-btn"
              onClick={() => selectTool('barcode')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-bold shadow-sm shadow-red-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4" />
              Create Code
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg animate-fadeIn">
          <button
            onClick={() => navigateTo('home')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold flex items-center justify-between ${
              activePage === 'home' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>Home</span>
          </button>

          <button
            onClick={() => selectTool('barcode')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold flex items-center gap-3 ${
              activePage === 'home' && activeToolTab === 'barcode' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Barcode className="w-5 h-5 text-red-600" />
            <span>Barcode Generator</span>
          </button>

          <button
            onClick={() => selectTool('qrcode')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold flex items-center gap-3 ${
              activePage === 'home' && activeToolTab === 'qrcode' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <QrCode className="w-5 h-5 text-red-600" />
            <span>QR Code Generator</span>
          </button>

          <button
            onClick={() => navigateTo('batch')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold flex items-center gap-3 ${
              activePage === 'batch' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Layers className="w-5 h-5 text-gray-500" />
            <span>Batch & Label Sheets</span>
          </button>

          <button
            onClick={() => navigateTo('scanner')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold flex items-center gap-3 ${
              activePage === 'scanner' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <ScanLine className="w-5 h-5 text-gray-500" />
            <span>Code Scanner</span>
          </button>

          <button
            onClick={() => navigateTo('guides')}
            className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold flex items-center gap-3 ${
              activePage === 'guides' ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BookOpen className="w-5 h-5 text-gray-500" />
            <span>Guides & Articles</span>
          </button>

          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => navigateTo('about')}
              className="text-left px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              About Us
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className="text-left px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              Contact Support
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

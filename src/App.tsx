import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AdBanner } from './components/AdBanner';
import { BarcodeTool } from './components/BarcodeTool';
import { QRCodeTool } from './components/QRCodeTool';
import { BatchGenerator } from './components/BatchGenerator';
import { CodeScanner } from './components/CodeScanner';
import { FeaturesSection } from './components/FeaturesSection';
import { HowItWorks } from './components/HowItWorks';
import { GuidesAndFAQ } from './components/GuidesAndFAQ';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';

// Pages
import { AboutUs } from './components/Pages/AboutUs';
import { PrivacyPolicy } from './components/Pages/PrivacyPolicy';
import { TermsOfService } from './components/Pages/TermsOfService';
import { ContactUs } from './components/Pages/ContactUs';
import { BlogGuide } from './components/Pages/BlogGuide';

import { ActivePage } from './types';
import { Barcode, QrCode, Sparkles, Layers, ScanLine } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [activeToolTab, setActiveToolTab] = useState<'barcode' | 'qrcode'>('barcode');

  const scrollToTool = (tab: 'barcode' | 'qrcode') => {
    setActivePage('home');
    setActiveToolTab(tab);
    setTimeout(() => {
      const el = document.getElementById('main-tool-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 selection:bg-red-500 selection:text-white font-sans antialiased">
      
      {/* Sticky Header */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        activeToolTab={activeToolTab}
        setActiveToolTab={setActiveToolTab}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Top AdSense Banner (Leaderboard 728x90) */}
        <AdBanner slotType="top-banner" />

        {/* HOME VIEW */}
        {activePage === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onSelectBarcode={() => scrollToTool('barcode')}
              onSelectQRCode={() => scrollToTool('qrcode')}
            />

            {/* Main Interactive Tool Section (Tabbed Interface) */}
            <section id="main-tool-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 scroll-mt-20">
              
              {/* Tool Tabs Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Generate Your Code
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Select your preferred code format below to configure data, colors, labels, and sizing
                  </p>
                </div>

                {/* Tab Switcher Pills */}
                <div className="inline-flex p-1.5 rounded-2xl bg-gray-200/80 border border-gray-300/60 shadow-inner">
                  <button
                    id="tab-barcode-toggle"
                    type="button"
                    onClick={() => setActiveToolTab('barcode')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      activeToolTab === 'barcode'
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/60'
                    }`}
                  >
                    <Barcode className="w-4 h-4 stroke-[2.4]" />
                    <span>Barcode Generator</span>
                  </button>

                  <button
                    id="tab-qrcode-toggle"
                    type="button"
                    onClick={() => setActiveToolTab('qrcode')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      activeToolTab === 'qrcode'
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/60'
                    }`}
                  >
                    <QrCode className="w-4 h-4 stroke-[2.4]" />
                    <span>QR Code Generator</span>
                  </button>
                </div>
              </div>

              {/* Tab 1: Barcode Tool */}
              {activeToolTab === 'barcode' && (
                <div className="animate-fadeIn">
                  <BarcodeTool />
                </div>
              )}

              {/* Tab 2: QR Code Tool */}
              {activeToolTab === 'qrcode' && (
                <div className="animate-fadeIn">
                  <QRCodeTool />
                </div>
              )}

            </section>

            {/* In-Content Sponsored Ad */}
            <AdBanner slotType="in-content" />

            {/* 6 Features Section */}
            <FeaturesSection />

            {/* How It Works 3-Step Process */}
            <HowItWorks />

            {/* Comprehensive SEO Guides & FAQ */}
            <GuidesAndFAQ />
          </>
        )}

        {/* BATCH GENERATOR PAGE */}
        {activePage === 'batch' && <BatchGenerator />}

        {/* CODE SCANNER PAGE */}
        {activePage === 'scanner' && <CodeScanner />}

        {/* GUIDES / BLOG ARTICLES PAGE */}
        {activePage === 'guides' && <BlogGuide />}

        {/* ABOUT US PAGE */}
        {activePage === 'about' && <AboutUs />}

        {/* PRIVACY POLICY PAGE (AdSense Requirement) */}
        {activePage === 'privacy' && <PrivacyPolicy />}

        {/* TERMS OF SERVICE PAGE */}
        {activePage === 'terms' && <TermsOfService />}

        {/* CONTACT US PAGE */}
        {activePage === 'contact' && <ContactUs />}

        {/* Bottom AdSense Banner */}
        <AdBanner slotType="bottom-banner" />

      </main>

      {/* Footer */}
      <Footer
        setActivePage={setActivePage}
        onSelectTool={scrollToTool}
      />

      {/* GDPR / AdSense Cookie Consent Banner */}
      <CookieBanner onOpenPrivacy={() => setActivePage('privacy')} />

    </div>
  );
}

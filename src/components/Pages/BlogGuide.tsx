import React, { useState } from 'react';
import { BookOpen, ArrowRight, Clock, Tag, User, Barcode, QrCode, Printer } from 'lucide-react';

const ARTICLES = [
  {
    id: 'retail-barcode-guide',
    title: 'The Complete Guide to Retail Barcodes: EAN-13 vs UPC-A vs Code 128',
    summary: 'Discover the exact barcode symbology your products need for retail stores, Amazon FBA, international exports, and inventory management.',
    category: 'Barcode Standards',
    readTime: '6 min read',
    date: 'Sep 12, 2026',
    author: 'BQ Engineering Team',
    content: `
When launching a physical product into retail, choosing the right barcode is essential to prevent scanning rejections at checkout counters.

### 1. EAN-13 (European / International Article Number)
The EAN-13 barcode is the undisputed international standard for consumer point-of-sale items in over 120 countries outside the United States and Canada. It encodes exactly 13 digits, comprising:
- Country prefix (first 2-3 digits)
- Manufacturer/Company code
- Item reference number
- Checksum check digit (calculated via modulo 10)

### 2. UPC-A (Universal Product Code)
Used predominantly in the United States and Canada, the UPC-A barcode encodes 12 numeric digits. If you are selling goods in North American supermarkets or big-box stores, UPC-A is the standard required format.

### 3. Code 128 for Warehousing and Logistics
Unlike retail GTIN codes, Code 128 can encode all 128 ASCII characters (letters, numbers, symbols). It offers extremely high data density and is universally favored for internal tracking, serial numbers, shipping cartons, and asset management tags.
    `,
  },
  {
    id: 'wifi-qr-code-guide',
    title: 'How to Create High-Converting WiFi and Business Card QR Codes',
    summary: 'Step-by-step instructions on formatting seamless WiFi auto-connect codes, vCards, and styled marketing codes with brand logos.',
    category: 'QR Code Tips',
    readTime: '5 min read',
    date: 'Sep 08, 2026',
    author: 'Digital Experience Team',
    content: `
QR codes have transformed from simple URL pointers into interactive business utilities. Here is how to configure the most popular formats:

### Automatic Wi-Fi Login Codes
By structuring your QR payload using the standard \`WIFI:S:MyNetwork;T:WPA;P:MyPassword;;\` syntax, smartphone cameras can connect guests directly to your wireless network in one tap without requiring manual password typing.

### vCard 3.0 Contact Exchange
Printing a vCard QR code on the back of your physical business card lets prospective clients scan and immediately save your phone number, email address, company title, and LinkedIn URL directly into their mobile contacts.

### Best Practices for Center Logos
When superimposing your company logo over a QR code:
1. Always set Error Correction to **Level H (30%)** to ensure redundancy.
2. Keep the logo size between **15% and 25%** of the total code area.
3. Maintain high contrast between foreground dots and background.
    `,
  },
  {
    id: 'print-label-sheet-best-practices',
    title: 'How to Print Perfect Barcode Labels on Thermal & Laser Printers',
    summary: 'Avoid blurry scans, bar bleed, and quiet zone errors with our comprehensive label sheet printing checklist.',
    category: 'Label Printing',
    readTime: '4 min read',
    date: 'Aug 29, 2026',
    author: 'Print Operations Lab',
    content: `
A barcode that looks crisp on your monitor can fail optical verification if printed improperly. Follow these essential guidelines:

### 1. Maintain the Quiet Zone
Every optical barcode scanner requires a blank white border (called the "Quiet Zone") of at least 10 times the narrowest bar width (typically 2.5mm to 5mm) on both left and right sides. Never let background graphics or text invade this margin.

### 2. Choose Vector Output (SVG / PDF) for Packaging
When sending artwork to a commercial printing press or packaging manufacturer, always provide vector SVG or PDF. Unlike JPEG or PNG images, vectors will never lose sharp mathematical edges at high press speeds.

### 3. Thermal Label Alignment (Avery & Direct Thermal)
When printing on 21-up or 24-up A4 sticker sheets (e.g. Avery 7160), verify that your printer driver is set to **"Actual Size / 100%"** rather than "Fit to Printable Area" to avoid distorting label margins.
    `,
  },
];

export const BlogGuide: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const current = ARTICLES.find((a) => a.id === selectedArticle);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          Guides & Knowledge Base
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Barcode & QR Code Technical Articles
        </h1>
        <p className="mt-2 text-base text-gray-600 max-w-xl mx-auto">
          In-depth tutorials, technical specifications, and expert advice for merchants and designers.
        </p>
      </div>

      {current ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-xs space-y-6">
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 mb-2"
          >
            ← Back to All Guides
          </button>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pb-3 border-b border-gray-100">
            <span className="bg-red-50 text-red-700 px-2.5 py-0.5 rounded-full font-bold">
              {current.category}
            </span>
            <span>{current.readTime}</span>
            <span>•</span>
            <span>{current.date}</span>
            <span>•</span>
            <span>By {current.author}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
            {current.title}
          </h2>

          <div className="prose prose-sm sm:prose max-w-none text-gray-700 space-y-4 leading-relaxed whitespace-pre-line">
            {current.content}
          </div>

          <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={() => setSelectedArticle(null)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50"
            >
              Back to Articles
            </button>
            <span className="text-xs text-gray-400">Published by BQ Code Tools</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art.id)}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs hover:shadow-md hover:border-red-300 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-bold text-[10px]">
                    {art.category}
                  </span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="font-bold text-base text-gray-900 group-hover:text-red-600 transition-colors mb-2 leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-red-600 font-bold">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

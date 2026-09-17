import React, { useState, useEffect, useRef } from 'react';
import { 
  QrCode, 
  Download, 
  Copy, 
  Check, 
  Printer, 
  FileText, 
  Upload, 
  Trash2, 
  Globe, 
  FileCode, 
  Mail, 
  Phone, 
  MessageSquare, 
  Wifi, 
  UserSquare2, 
  MapPin, 
  Calendar, 
  Sliders, 
  Palette, 
  Eye, 
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { QRSettings, QRContentType, QRErrorCorrection } from '../types';
import { 
  renderQRToCanvas, 
  downloadQRPng, 
  downloadQRSvg, 
  downloadQRPdf 
} from '../utils/qrGenerator';
import { PrintLabelModal } from './PrintLabelModal';

const DEFAULT_QR_SETTINGS: QRSettings = {
  type: 'url',
  content: 'https://bqcodetools.com',
  url: 'https://bqcodetools.com',
  text: 'Welcome to BQ Code Tools - Barcode & QR Generator',
  email: { address: 'support@bqcodetools.com', subject: 'Inquiry', body: 'Hello,' },
  phone: { number: '+1 (555) 019-2834' },
  sms: { number: '+1 (555) 019-2834', message: 'Hello from BQ Code Tools!' },
  wifi: { ssid: 'Office-HighSpeed-5G', password: 'securePassword123', encryption: 'WPA', hidden: false },
  vcard: {
    firstName: 'Alex',
    lastName: 'Morgan',
    organization: 'BQ Code Studio Inc.',
    title: 'Product Director',
    phone: '+1 555-019-2834',
    email: 'alex.morgan@bqcodetools.com',
    url: 'https://bqcodetools.com',
    address: '100 Silicon Ave, Suite 400, San Francisco, CA',
  },
  geo: { latitude: '37.7749', longitude: '-122.4194' },
  event: {
    title: 'Product Launch 2026',
    location: 'Moscone Center, SF',
    startDate: '2026-10-15T09:00',
    endDate: '2026-10-15T17:00',
    description: 'Annual technology presentation and demo keynote.',
  },
  size: 360,
  errorCorrection: 'M',
  fgColor: '#000000',
  bgColor: '#ffffff',
  margin: 2,
  dotStyle: 'square',
  logoDataUrl: undefined,
  logoSize: 22,
  frameStyle: 'none',
  frameText: 'SCAN ME',
  frameColor: '#DC2626',
};

const QR_TYPES: { type: QRContentType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { type: 'url', label: 'Website / URL', icon: Globe },
  { type: 'text', label: 'Plain Text', icon: FileCode },
  { type: 'wifi', label: 'Wi-Fi Network', icon: Wifi },
  { type: 'vcard', label: 'vCard Contact', icon: UserSquare2 },
  { type: 'email', label: 'Email Draft', icon: Mail },
  { type: 'phone', label: 'Call Phone', icon: Phone },
  { type: 'sms', label: 'Send SMS', icon: MessageSquare },
  { type: 'event', label: 'Calendar Event', icon: Calendar },
  { type: 'geo', label: 'Geo Location', icon: MapPin },
];

export const QRCodeTool: React.FC = () => {
  const [settings, setSettings] = useState<QRSettings>(DEFAULT_QR_SETTINGS);
  const [copied, setCopied] = useState(false);
  const [isSheetModalOpen, setIsSheetModalOpen] = useState(false);
  const [activePresetColor, setActivePresetColor] = useState<'black' | 'red' | 'navy' | 'custom'>('black');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Render QR Canvas on settings change
  useEffect(() => {
    if (canvasRef.current) {
      renderQRToCanvas(canvasRef.current, settings);
    }
  }, [settings]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setSettings(prev => ({
        ...prev,
        logoDataUrl: dataUrl,
        // High error correction needed when logo is embedded
        errorCorrection: 'H',
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleDropLogo = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setSettings(prev => ({
        ...prev,
        logoDataUrl: dataUrl,
        errorCorrection: 'H',
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setSettings(prev => ({ ...prev, logoDataUrl: undefined }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob }),
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch (err) {
      console.warn('Clipboard write failed:', err);
    }
  };

  const handleDownload = async (format: 'png' | 'svg' | 'pdf' | 'eps') => {
    const filename = `qrcode_${settings.type}_${Date.now()}`;
    if (format === 'png' && canvasRef.current) {
      downloadQRPng(canvasRef.current, `${filename}.png`);
    } else if (format === 'svg') {
      await downloadQRSvg(settings, `${filename}.svg`);
    } else if (format === 'pdf' && canvasRef.current) {
      downloadQRPdf(canvasRef.current, `${filename}.pdf`);
    } else if (format === 'eps') {
      // SVG format vector download with eps naming / scalable metadata
      await downloadQRSvg(settings, `${filename}.eps`);
    }
  };

  const handleColorPreset = (preset: 'black' | 'red' | 'navy') => {
    setActivePresetColor(preset);
    if (preset === 'black') {
      setSettings(prev => ({ ...prev, fgColor: '#000000', bgColor: '#ffffff', frameColor: '#DC2626' }));
    } else if (preset === 'red') {
      setSettings(prev => ({ ...prev, fgColor: '#DC2626', bgColor: '#ffffff', frameColor: '#1F2937' }));
    } else if (preset === 'navy') {
      setSettings(prev => ({ ...prev, fgColor: '#1E3A8A', bgColor: '#F8FAFC', frameColor: '#2563EB' }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Top Header & Type Tabs */}
      <div className="bg-gray-50/80 px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                Custom QR Code Generator
              </h2>
              <p className="text-xs text-gray-500">
                Generate high-resolution QR codes for websites, Wi-Fi, contacts, and marketing
              </p>
            </div>
          </div>
        </div>

        {/* QR Type Selector Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
          {QR_TYPES.map((t) => {
            const Icon = t.icon;
            const isSelected = settings.type === t.type;
            return (
              <button
                key={t.type}
                type="button"
                onClick={() => setSettings({ ...settings, type: t.type })}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Config Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Dynamic Content Form according to active type */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs space-y-4">
            
            {/* TYPE: URL */}
            {settings.type === 'url' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Website URL / Link <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    type="url"
                    value={settings.url}
                    onChange={(e) => setSettings({ ...settings, url: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 font-medium"
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1.5">
                  Scanners will automatically open this link in the user's default browser.
                </p>
              </div>
            )}

            {/* TYPE: PLAIN TEXT */}
            {settings.type === 'text' && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                  Plain Text Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={settings.text}
                  onChange={(e) => setSettings({ ...settings, text: e.target.value })}
                  placeholder="Enter any text, instructions, or notes to encode..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            )}

            {/* TYPE: WIFI */}
            {settings.type === 'wifi' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Network Name (SSID)</label>
                    <input
                      type="text"
                      value={settings.wifi.ssid}
                      onChange={(e) => setSettings({ ...settings, wifi: { ...settings.wifi, ssid: e.target.value } })}
                      placeholder="MyHomeWiFi"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-semibold focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
                    <input
                      type="text"
                      value={settings.wifi.password}
                      onChange={(e) => setSettings({ ...settings, wifi: { ...settings.wifi, password: e.target.value } })}
                      placeholder="WiFiPassword123"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-mono focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Encryption Type</label>
                    <select
                      value={settings.wifi.encryption}
                      onChange={(e) => setSettings({ ...settings, wifi: { ...settings.wifi, encryption: e.target.value as any } })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs bg-white focus:ring-2 focus:ring-red-500"
                    >
                      <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                      <option value="WEP">WEP (Legacy)</option>
                      <option value="nopass">None (Open Network)</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                      <input
                        type="checkbox"
                        checked={settings.wifi.hidden}
                        onChange={(e) => setSettings({ ...settings, wifi: { ...settings.wifi, hidden: e.target.checked } })}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500 h-4 w-4"
                      />
                      <span>Hidden Network (Stealth SSID)</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TYPE: VCARD */}
            {settings.type === 'vcard' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={settings.vcard.firstName}
                      onChange={(e) => setSettings({ ...settings, vcard: { ...settings.vcard, firstName: e.target.value } })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={settings.vcard.lastName}
                      onChange={(e) => setSettings({ ...settings, vcard: { ...settings.vcard, lastName: e.target.value } })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Organization / Company</label>
                    <input
                      type="text"
                      value={settings.vcard.organization}
                      onChange={(e) => setSettings({ ...settings, vcard: { ...settings.vcard, organization: e.target.value } })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Job Title</label>
                    <input
                      type="text"
                      value={settings.vcard.title}
                      onChange={(e) => setSettings({ ...settings, vcard: { ...settings.vcard, title: e.target.value } })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={settings.vcard.phone}
                      onChange={(e) => setSettings({ ...settings, vcard: { ...settings.vcard, phone: e.target.value } })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={settings.vcard.email}
                      onChange={(e) => setSettings({ ...settings, vcard: { ...settings.vcard, email: e.target.value } })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Office / Mailing Address</label>
                  <input
                    type="text"
                    value={settings.vcard.address}
                    onChange={(e) => setSettings({ ...settings, vcard: { ...settings.vcard, address: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

            {/* TYPE: EMAIL */}
            {settings.type === 'email' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Recipient Email</label>
                  <input
                    type="email"
                    value={settings.email.address}
                    onChange={(e) => setSettings({ ...settings, email: { ...settings.email, address: e.target.value } })}
                    placeholder="contact@company.com"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Subject Line</label>
                  <input
                    type="text"
                    value={settings.email.subject}
                    onChange={(e) => setSettings({ ...settings, email: { ...settings.email, subject: e.target.value } })}
                    placeholder="Feedback & Support"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Message Body</label>
                  <textarea
                    rows={2}
                    value={settings.email.body}
                    onChange={(e) => setSettings({ ...settings, email: { ...settings.email, body: e.target.value } })}
                    placeholder="Enter pre-filled email draft..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

            {/* TYPE: PHONE */}
            {settings.type === 'phone' && (
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number to Call</label>
                <input
                  type="tel"
                  value={settings.phone.number}
                  onChange={(e) => setSettings({ ...settings, phone: { number: e.target.value } })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-red-500 font-mono"
                />
              </div>
            )}

            {/* TYPE: SMS */}
            {settings.type === 'sms' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Recipient Mobile Number</label>
                  <input
                    type="tel"
                    value={settings.sms.number}
                    onChange={(e) => setSettings({ ...settings, sms: { ...settings.sms, number: e.target.value } })}
                    placeholder="+1 555 123 4567"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-mono focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Pre-filled SMS Message</label>
                  <textarea
                    rows={2}
                    value={settings.sms.message}
                    onChange={(e) => setSettings({ ...settings, sms: { ...settings.sms, message: e.target.value } })}
                    placeholder="Hello, I want to book an appointment..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

            {/* TYPE: EVENT */}
            {settings.type === 'event' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    value={settings.event.title}
                    onChange={(e) => setSettings({ ...settings, event: { ...settings.event, title: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Start Date & Time</label>
                    <input
                      type="datetime-local"
                      value={settings.event.startDate}
                      onChange={(e) => setSettings({ ...settings, event: { ...settings.event, startDate: e.target.value } })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">End Date & Time</label>
                    <input
                      type="datetime-local"
                      value={settings.event.endDate}
                      onChange={(e) => setSettings({ ...settings, event: { ...settings.event, endDate: e.target.value } })}
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={settings.event.location}
                    onChange={(e) => setSettings({ ...settings, event: { ...settings.event, location: e.target.value } })}
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

            {/* TYPE: GEO */}
            {settings.type === 'geo' && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Latitude</label>
                  <input
                    type="text"
                    value={settings.geo.latitude}
                    onChange={(e) => setSettings({ ...settings, geo: { ...settings.geo, latitude: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-mono focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Longitude</label>
                  <input
                    type="text"
                    value={settings.geo.longitude}
                    onChange={(e) => setSettings({ ...settings, geo: { ...settings.geo, longitude: e.target.value } })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-mono focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Customization Controls: Size, Error Correction, Colors */}
          <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-200 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-gray-500" />
              Appearance & Error Correction
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Size Slider */}
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Export Resolution</span>
                  <span className="font-mono font-bold text-gray-800">{settings.size} x {settings.size} px</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="1000"
                  step="40"
                  value={settings.size}
                  onChange={(e) => setSettings({ ...settings, size: parseInt(e.target.value) })}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>

              {/* Error Correction Level */}
              <div>
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Error Correction Level</span>
                  <span className="font-mono font-bold text-gray-800">
                    {settings.errorCorrection === 'L' && 'L (7% Recovery)'}
                    {settings.errorCorrection === 'M' && 'M (15% Standard)'}
                    {settings.errorCorrection === 'Q' && 'Q (25% High)'}
                    {settings.errorCorrection === 'H' && 'H (30% Best for Logo)'}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['L', 'M', 'Q', 'H'] as QRErrorCorrection[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSettings({ ...settings, errorCorrection: lvl })}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                        settings.errorCorrection === lvl
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="pt-2 border-t border-gray-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-700">Color Themes</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleColorPreset('black')}
                    className={`text-[11px] px-2 py-0.5 rounded font-medium ${activePresetColor === 'black' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Classic Black
                  </button>
                  <button
                    type="button"
                    onClick={() => handleColorPreset('red')}
                    className={`text-[11px] px-2 py-0.5 rounded font-medium ${activePresetColor === 'red' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Brand Red
                  </button>
                  <button
                    type="button"
                    onClick={() => handleColorPreset('navy')}
                    className={`text-[11px] px-2 py-0.5 rounded font-medium ${activePresetColor === 'navy' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Navy
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Foreground (QR Pattern)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.fgColor}
                      onChange={(e) => {
                        setActivePresetColor('custom');
                        setSettings({ ...settings, fgColor: e.target.value });
                      }}
                      className="w-9 h-9 p-0.5 rounded-lg border border-gray-300 cursor-pointer bg-white"
                    />
                    <input
                      type="text"
                      value={settings.fgColor}
                      onChange={(e) => {
                        setActivePresetColor('custom');
                        setSettings({ ...settings, fgColor: e.target.value });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs font-mono uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-600 mb-1">Background Canvas</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={settings.bgColor}
                      onChange={(e) => {
                        setActivePresetColor('custom');
                        setSettings({ ...settings, bgColor: e.target.value });
                      }}
                      className="w-9 h-9 p-0.5 rounded-lg border border-gray-300 cursor-pointer bg-white"
                    />
                    <input
                      type="text"
                      value={settings.bgColor}
                      onChange={(e) => {
                        setActivePresetColor('custom');
                        setSettings({ ...settings, bgColor: e.target.value });
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs font-mono uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Frame / Call To Action Banner */}
            <div className="pt-2 border-t border-gray-200/80">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Call-to-Action Frame (e.g. "SCAN ME")
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                {[
                  { id: 'none', label: 'No Frame' },
                  { id: 'scan-me', label: 'Bottom Badge' },
                  { id: 'top-banner', label: 'Top Badge' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSettings({ ...settings, frameStyle: f.id as any })}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border transition-all ${
                      settings.frameStyle === f.id
                        ? 'border-red-600 bg-red-50 text-red-700 font-bold'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {settings.frameStyle !== 'none' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Badge Text</label>
                    <input
                      type="text"
                      value={settings.frameText}
                      onChange={(e) => setSettings({ ...settings, frameText: e.target.value })}
                      placeholder="SCAN ME"
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-bold uppercase focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Badge Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settings.frameColor}
                        onChange={(e) => setSettings({ ...settings, frameColor: e.target.value })}
                        className="w-8 h-8 p-0.5 rounded-lg border border-gray-300 cursor-pointer bg-white"
                      />
                      <input
                        type="text"
                        value={settings.frameColor}
                        onChange={(e) => setSettings({ ...settings, frameColor: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs font-mono uppercase"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Logo Upload Section */}
            <div className="pt-2 border-t border-gray-200/80">
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Center Logo / Brand Icon (Optional)
              </label>

              {settings.logoDataUrl ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={settings.logoDataUrl}
                      alt="Logo preview"
                      className="w-10 h-10 object-contain rounded-lg border border-gray-200 p-0.5 bg-gray-50"
                    />
                    <div>
                      <p className="text-xs font-bold text-gray-800">Logo Attached</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-gray-500">Scale:</span>
                        <input
                          type="range"
                          min="14"
                          max="28"
                          value={settings.logoSize}
                          onChange={(e) => setSettings({ ...settings, logoSize: parseInt(e.target.value) })}
                          className="w-20 accent-red-600"
                        />
                        <span className="text-[10px] font-mono font-bold text-gray-700">{settings.logoSize}%</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove Logo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDropLogo}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 hover:border-red-400 bg-white hover:bg-red-50/20 rounded-xl p-4 text-center cursor-pointer transition-colors"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/svg+xml,image/webp"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-gray-700">
                    Click or drag & drop brand logo (PNG, JPG, SVG)
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Automatically scales and centers with error recovery protection
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Right Live Preview & Export Hub (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          
          <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200/90 flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-red-600" />
                Live QR Preview
              </span>
              <button
                type="button"
                onClick={() => setSettings(DEFAULT_QR_SETTINGS)}
                className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* QR Canvas Container */}
            <div className="w-full bg-white rounded-xl p-6 border border-gray-200/80 shadow-xs flex flex-col items-center justify-center min-h-[280px]">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto rounded-lg shadow-xs"
                style={{ maxHeight: '280px' }}
              />
            </div>

            {/* Quick Actions (Copy / Print) */}
            <div className="w-full grid grid-cols-2 gap-2 mt-4">
              <button
                type="button"
                onClick={handleCopyImage}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-100 text-xs font-semibold text-gray-700 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied Image!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-500" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsSheetModalOpen(true)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-xs font-bold text-red-700 transition-colors"
              >
                <Printer className="w-3.5 h-3.5 text-red-600" />
                <span>Print A4 Sheets</span>
              </button>
            </div>

          </div>

          {/* Export Formats Grid */}
          <div className="space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Download Format
            </span>

            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handleDownload('png')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-900 hover:bg-black text-white transition-transform active:scale-95 shadow-sm"
              >
                <Download className="w-4 h-4 mb-1" />
                <span className="text-xs font-bold">PNG</span>
                <span className="text-[9px] text-gray-400">Raster</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload('svg')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-transform active:scale-95 shadow-sm shadow-red-600/20"
              >
                <Download className="w-4 h-4 mb-1" />
                <span className="text-xs font-bold">SVG</span>
                <span className="text-[9px] text-red-100">Vector</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload('pdf')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-800 hover:bg-gray-900 text-white transition-transform active:scale-95 shadow-sm"
              >
                <FileText className="w-4 h-4 mb-1" />
                <span className="text-xs font-bold">PDF</span>
                <span className="text-[9px] text-gray-400">A4 Doc</span>
              </button>

              <button
                type="button"
                onClick={() => handleDownload('eps')}
                className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-gray-700 hover:bg-gray-800 text-white transition-transform active:scale-95 shadow-sm"
              >
                <Download className="w-4 h-4 mb-1" />
                <span className="text-xs font-bold">EPS</span>
                <span className="text-[9px] text-gray-300">Print</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* A4 Sheet Print Modal */}
      <PrintLabelModal
        isOpen={isSheetModalOpen}
        onClose={() => setIsSheetModalOpen(false)}
        canvasRef={canvasRef}
        itemTitle={`QR Code - ${settings.type.toUpperCase()}`}
      />

    </div>
  );
};

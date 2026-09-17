export type BarcodeSymbology = 
  | 'CODE128'
  | 'CODE128A'
  | 'CODE128B'
  | 'CODE128C'
  | 'EAN13'
  | 'EAN8'
  | 'UPC'
  | 'CODE39'
  | 'ITF14'
  | 'ITF'
  | 'MSI'
  | 'pharmacode'
  | 'codabar';

export type QRContentType = 
  | 'url'
  | 'text'
  | 'wifi'
  | 'vcard'
  | 'email'
  | 'phone'
  | 'sms'
  | 'geo'
  | 'event';

export type QRErrorCorrection = 'L' | 'M' | 'Q' | 'H';

export interface BarcodeSettings {
  value: string;
  format: BarcodeSymbology;
  width: number;
  height: number;
  displayValue: boolean;
  textPosition: 'bottom' | 'top';
  textAlign: 'center' | 'left' | 'right';
  fontSize: number;
  fontOptions: string;
  font: string;
  lineColor: string;
  background: string;
  margin: number;
  // Product Label Info
  productName: string;
  price: string;
  currency: string;
  mfgDate: string;
  expDate: string;
  sku: string;
  includeLabelHeader: boolean;
}

export interface QRSettings {
  type: QRContentType;
  content: string;
  // Dynamic fields
  url: string;
  text: string;
  email: { address: string; subject: string; body: string };
  phone: { number: string };
  sms: { number: string; message: string };
  wifi: { ssid: string; password: string; encryption: 'WPA' | 'WEP' | 'nopass'; hidden: boolean };
  vcard: {
    firstName: string;
    lastName: string;
    organization: string;
    title: string;
    phone: string;
    email: string;
    url: string;
    address: string;
  };
  geo: { latitude: string; longitude: string };
  event: {
    title: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  };
  // Visual Options
  size: number;
  errorCorrection: QRErrorCorrection;
  fgColor: string;
  bgColor: string;
  margin: number;
  dotStyle: 'square' | 'dots' | 'rounded';
  logoDataUrl?: string;
  logoSize: number; // percentage (10 - 30)
  frameStyle: 'none' | 'scan-me' | 'bottom-banner' | 'top-banner';
  frameText: string;
  frameColor: string;
}

export interface SheetConfig {
  paperSize: 'a4' | 'letter';
  columns: number;
  rows: number;
  marginTop: number;
  marginLeft: number;
  colGap: number;
  rowGap: number;
  showBorder: boolean;
  quantity: number;
  includeProductDetails: boolean;
}

export interface BatchItem {
  id: string;
  code: string;
  name?: string;
  price?: string;
  type?: string;
  status?: 'ready' | 'invalid' | 'generated';
  error?: string;
}

export type ActivePage = 
  | 'home' 
  | 'barcode' 
  | 'qrcode' 
  | 'batch' 
  | 'scanner' 
  | 'guides' 
  | 'about' 
  | 'privacy' 
  | 'terms' 
  | 'contact';

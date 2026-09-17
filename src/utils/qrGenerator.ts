import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import { QRSettings } from '../types';

export function formatQRData(settings: QRSettings): string {
  switch (settings.type) {
    case 'url': {
      let url = settings.url.trim();
      if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      return url || 'https://bqcodetools.com';
    }
    case 'text':
      return settings.text || 'Welcome to BQ Code Tools';
    case 'email': {
      const email = settings.email.address.trim();
      const subject = encodeURIComponent(settings.email.subject || '');
      const body = encodeURIComponent(settings.email.body || '');
      return `mailto:${email}?subject=${subject}&body=${body}`;
    }
    case 'phone':
      return `tel:${settings.phone.number.trim()}`;
    case 'sms': {
      const number = settings.sms.number.trim();
      const msg = encodeURIComponent(settings.sms.message || '');
      return `smsto:${number}:${msg}`;
    }
    case 'wifi': {
      const ssid = settings.wifi.ssid.replace(/([\\;:"])/g, '\\$1');
      const pass = settings.wifi.password.replace(/([\\;:"])/g, '\\$1');
      const auth = settings.wifi.encryption || 'WPA';
      const hidden = settings.wifi.hidden ? 'H:true;' : '';
      return `WIFI:S:${ssid};T:${auth};P:${pass};${hidden};`;
    }
    case 'vcard': {
      const v = settings.vcard;
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${v.lastName};${v.firstName};;;`,
        `FN:${v.firstName} ${v.lastName}`.trim(),
        v.organization ? `ORG:${v.organization}` : '',
        v.title ? `TITLE:${v.title}` : '',
        v.phone ? `TEL;TYPE=CELL:${v.phone}` : '',
        v.email ? `EMAIL:${v.email}` : '',
        v.url ? `URL:${v.url}` : '',
        v.address ? `ADR;TYPE=WORK:;;${v.address};;;;` : '',
        'END:VCARD',
      ].filter(Boolean).join('\n');
    }
    case 'geo':
      return `geo:${settings.geo.latitude || '0'},${settings.geo.longitude || '0'}`;
    case 'event': {
      const ev = settings.event;
      const formatTime = (d: string) => d ? d.replace(/[-:]/g, '') + 'Z' : '';
      return [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${ev.title || 'New Event'}`,
        ev.location ? `LOCATION:${ev.location}` : '',
        ev.description ? `DESCRIPTION:${ev.description}` : '',
        ev.startDate ? `DTSTART:${formatTime(ev.startDate)}` : '',
        ev.endDate ? `DTEND:${formatTime(ev.endDate)}` : '',
        'END:VEVENT',
        'END:VCALENDAR',
      ].filter(Boolean).join('\n');
    }
    default:
      return settings.content || 'https://bqcodetools.com';
  }
}

export async function renderQRToCanvas(
  canvas: HTMLCanvasElement,
  settings: QRSettings
): Promise<boolean> {
  try {
    const rawData = formatQRData(settings);
    const size = settings.size || 320;
    const margin = settings.margin !== undefined ? settings.margin : 2;

    // First generate base QR code on temporary canvas
    const tempCanvas = document.createElement('canvas');
    await QRCode.toCanvas(tempCanvas, rawData, {
      width: size,
      margin: margin,
      errorCorrectionLevel: settings.errorCorrection || 'M',
      color: {
        dark: settings.fgColor || '#000000',
        light: settings.bgColor || '#FFFFFF',
      },
    });

    const hasFrame = settings.frameStyle && settings.frameStyle !== 'none';
    const frameHeight = hasFrame ? 60 : 0;
    
    canvas.width = size;
    canvas.height = size + frameHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;

    // Clear background
    ctx.fillStyle = settings.bgColor || '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let qrOffsetY = 0;
    if (settings.frameStyle === 'top-banner') {
      qrOffsetY = frameHeight;
    }

    // Draw QR code onto main canvas
    ctx.drawImage(tempCanvas, 0, qrOffsetY);

    // Apply Logo Overlay if exists
    if (settings.logoDataUrl) {
      await new Promise<void>((resolve) => {
        const logoImg = new Image();
        logoImg.crossOrigin = 'anonymous';
        logoImg.onload = () => {
          const logoScale = (settings.logoSize || 20) / 100;
          const logoWidth = size * logoScale;
          const logoHeight = (logoImg.height / logoImg.width) * logoWidth;
          const logoX = (size - logoWidth) / 2;
          const logoY = qrOffsetY + (size - logoHeight) / 2;

          // Background badge around logo
          const padding = 6;
          ctx.fillStyle = settings.bgColor || '#FFFFFF';
          ctx.beginPath();
          ctx.roundRect(
            logoX - padding,
            logoY - padding,
            logoWidth + padding * 2,
            logoHeight + padding * 2,
            8
          );
          ctx.fill();

          // Border around logo
          ctx.strokeStyle = settings.fgColor || '#DC2626';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw Logo
          ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
          resolve();
        };
        logoImg.onerror = () => resolve();
        logoImg.src = settings.logoDataUrl!;
      });
    }

    // Draw Frame / Banner if enabled
    if (hasFrame) {
      const bannerColor = settings.frameColor || '#DC2626';
      const bannerText = settings.frameText || 'SCAN ME';

      if (settings.frameStyle === 'scan-me' || settings.frameStyle === 'bottom-banner') {
        const bannerY = size + 8;
        const bannerH = 44;
        const bannerW = size - 32;
        const bannerX = 16;

        ctx.fillStyle = bannerColor;
        ctx.beginPath();
        ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 8);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(bannerText, size / 2, bannerY + bannerH / 2);
      } else if (settings.frameStyle === 'top-banner') {
        const bannerY = 8;
        const bannerH = 44;
        const bannerW = size - 32;
        const bannerX = 16;

        ctx.fillStyle = bannerColor;
        ctx.beginPath();
        ctx.roundRect(bannerX, bannerY, bannerW, bannerH, 8);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(bannerText, size / 2, bannerY + bannerH / 2);
      }
    }

    return true;
  } catch (err) {
    console.error('QR Render Error:', err);
    return false;
  }
}

export async function getQRSvgString(settings: QRSettings): Promise<string> {
  const rawData = formatQRData(settings);
  return await QRCode.toString(rawData, {
    type: 'svg',
    width: settings.size || 320,
    margin: settings.margin !== undefined ? settings.margin : 2,
    errorCorrectionLevel: settings.errorCorrection || 'M',
    color: {
      dark: settings.fgColor || '#000000',
      light: settings.bgColor || '#FFFFFF',
    },
  });
}

export function downloadQRPng(canvas: HTMLCanvasElement, filename: string = 'qrcode.png') {
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function downloadQRSvg(settings: QRSettings, filename: string = 'qrcode.svg') {
  const svgString = await getQRSvgString(settings);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadQRPdf(canvas: HTMLCanvasElement, filename: string = 'qrcode.pdf') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const imgData = canvas.toDataURL('image/png');
  // Center in A4 page with clean title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(220, 38, 38); // #DC2626
  doc.text('BQ Code Tools', 105, 30, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(75, 85, 99);
  doc.text('High-Resolution QR Code', 105, 38, { align: 'center' });

  // Add QR image
  const qrWidth = 120;
  const qrHeight = (canvas.height / canvas.width) * qrWidth;
  doc.addImage(imgData, 'PNG', (210 - qrWidth) / 2, 50, qrWidth, qrHeight);

  // Footer branding
  doc.setFontSize(10);
  doc.setTextColor(156, 163, 175);
  doc.text('Generated for free at bqcodetools.com', 105, 270, { align: 'center' });

  doc.save(filename);
}

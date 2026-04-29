'use client';

import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from 'react';

export default function QRCodeDisplay({ url }: { url: string }) {
  const canvasRef = useRef<HTMLDivElement>(null);

  const downloadQR = () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (canvas) {
      const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'restoran-qr.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div ref={canvasRef} style={{ padding: '1rem', background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}>
        <QRCodeCanvas value={url} size={250} level={"H"} />
      </div>
      <button onClick={downloadQR} className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
        Görseli İndir
      </button>
    </div>
  );
}

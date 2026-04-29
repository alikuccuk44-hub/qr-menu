import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import QRCodeDisplay from '@/components/QRCodeDisplay';

export const dynamic = 'force-dynamic';

export default async function QrCodePage() {
  const restaurant = await prisma.restaurant.findFirst();
  if (!restaurant) return <div>Restoran bulunamadı.</div>;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const menuUrl = `${baseUrl}/qr/${restaurant.qrCodeId}`;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          📱 QR Kodunuz
        </h1>
        <Link href="/admin" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>← Geri Dön</Link>
      </div>

      <div className="glass-panel animate-fade-up" style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', animationDelay: '0.1s' }}>
        
        <div style={{ fontSize: '2rem' }}>🎯</div>
        
        <h3 style={{ textAlign: 'center', fontWeight: 700, fontSize: '1.25rem' }}>Masalarınıza Yerleştirin</h3>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', maxWidth: '380px', lineHeight: 1.7, fontSize: '0.95rem' }}>
          Müşterileriniz bu QR kodu telefonlarıyla okutarak uygulama indirmeden menünüze anında ulaşabilirler.
        </p>

        <QRCodeDisplay url={menuUrl} />

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href={`/qr/${restaurant.qrCodeId}`} className="btn btn-secondary" style={{ padding: '0.7rem 1.3rem', fontSize: '0.9rem' }} target="_blank">
            👁️ Menüyü Önizle
          </Link>
        </div>
      </div>
    </div>
  );
}

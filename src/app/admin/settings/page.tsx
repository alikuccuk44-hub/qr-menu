import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import SettingsForm from '@/components/SettingsForm';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const restaurant = await prisma.restaurant.findFirst();
  if (!restaurant) return <div>Restoran bulunamadı.</div>;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          ⚙️ Genel Ayarlar
        </h1>
        <Link href="/admin" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>← Geri Dön</Link>
      </div>

      <div className="glass-panel animate-fade-up" style={{ padding: '2rem', animationDelay: '0.1s' }}>
        <SettingsForm 
          restaurantId={restaurant.id} 
          currentLogo={restaurant.logoUrl || ''} 
          currentPrimary={restaurant.primaryColor}
          currentBackground={restaurant.backgroundColor}
        />
      </div>
    </div>
  );
}

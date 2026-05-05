import { getRestaurantByQrId } from '@/lib/cached-data';
import { notFound } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import CustomerMenuTabs from '@/components/CustomerMenuTabs';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

const dictionary: Record<string, { title: string, soldOut: string, empty: string }> = {
  tr: { title: 'Dijital Menü', soldOut: 'Tükendi', empty: 'Menü yakında güncellenecektir.' },
  en: { title: 'Digital Menu', soldOut: 'Sold Out', empty: 'Menu will be updated soon.' },
  ru: { title: 'Цифровое меню', soldOut: 'Распродано', empty: 'Меню скоро будет обновлено.' },
  de: { title: 'Digitale Speisekarte', soldOut: 'Ausverkauft', empty: 'Menü wird bald aktualisiert.' }
};

export default async function CustomerMenuPage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ lang?: string }> }) {
  const { id } = await params;
  const { lang } = await searchParams;
  
  const currentLang = lang && dictionary[lang] ? lang : 'tr';
  const t = dictionary[currentLang];

  const restaurant = await getRestaurantByQrId(id);

  if (!restaurant) return notFound();

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: restaurant.backgroundColor || 'var(--background)', 
      paddingBottom: '5rem',
      '--primary': restaurant.primaryColor || '#e8530e',
      '--background': restaurant.backgroundColor || '#ffffff',
      '--gradient-hero': `linear-gradient(135deg, ${restaurant.primaryColor || '#e8530e'} 0%, ${restaurant.primaryColor || '#e8530e'}dd 100%)`,
    } as any}>
      
      <header className="animate-fade-in" style={{ padding: 'var(--space-xl) var(--space-md) var(--space-lg)', textAlign: 'center', background: 'var(--surface)', borderBottom: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-md)' }}>
          {restaurant.logoUrl ? (
            <div className="animate-scale-in" style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'white', padding: '6px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={restaurant.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          ) : (
            <div className="animate-scale-in" style={{ width: '60px', height: '60px', borderRadius: '18px', background: 'var(--gradient-hero)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }}>🍽️</div>
          )}
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', margin: 0 }}>{restaurant.name}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>{t.title}</p>
          </div>
          <div style={{ marginTop: 'var(--space-xs)' }}>
            <Suspense fallback={null}><LanguageSwitcher /></Suspense>
          </div>
        </div>
      </header>

      <main>
        <CustomerMenuTabs categories={restaurant.categories} currentLang={currentLang} t={t} />
      </main>

      <footer style={{ textAlign: 'center', padding: 'var(--space-xl)', opacity: 0.5 }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Powered by QR Menü SaaS</p>
      </footer>
    </div>
  );
}

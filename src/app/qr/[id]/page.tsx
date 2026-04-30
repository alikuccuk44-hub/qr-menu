import { prisma } from '@/lib/prisma';
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

  const restaurant = await prisma.restaurant.findUnique({
    where: { qrCodeId: id },
    include: {
      categories: {
        include: {
          products: {
            orderBy: { createdAt: 'desc' }
          }
        },
        orderBy: { createdAt: 'asc' }
      }
    }
  });

  if (!restaurant) return notFound();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', paddingBottom: '4rem' }}>
      
      {/* Vibrant Header */}
      <header style={{ 
        background: 'var(--gradient-hero)',
        padding: '2rem 1rem 1.75rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: '-30px', right: '-20px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
        
        {/* Logo and Name */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {restaurant.logoUrl && (
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '20px', 
              background: 'white', 
              padding: '8px',
              marginBottom: '1rem',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
            }}>
              <img src={restaurant.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          )}
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: 'white', letterSpacing: '-0.03em', textShadow: '0 2px 8px rgba(0,0,0,0.15)', margin: 0 }}>
            {restaurant.name}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', marginTop: '0.4rem', fontWeight: 500 }}>
            {t.title}
          </p>
        </div>
        
        <div style={{ position: 'relative', zIndex: 1, marginTop: '1rem' }}>
          <Suspense fallback={null}>
            <LanguageSwitcher />
          </Suspense>
        </div>
      </header>

      <main style={{ width: '100%' }}>
        <CustomerMenuTabs categories={restaurant.categories} currentLang={currentLang} t={t} />
      </main>
    </div>
  );
}

import { getRestaurant, getCategories, getProducts } from '@/lib/cached-data';
import Link from 'next/link';
import EditableRestaurantTitle from '@/components/EditableRestaurantTitle';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const restaurant = await getRestaurant();
  
  if (!restaurant) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Restoran bulunamadı.</h2>
        <p>Lütfen veritabanı bağlantınızı kontrol edin.</p>
      </div>
    );
  }

  const [categories, products] = await Promise.all([
    getCategories(restaurant.id),
    getProducts(restaurant.id)
  ]);

  const stats = [
    { icon: '📋', value: categories.length, label: 'Kategori' },
    { icon: '🍕', value: products.length, label: 'Ürün' },
    { icon: '🌍', value: 4, label: 'Dil Seçeneği' },
    { icon: '💱', value: 3, label: 'Para Birimi' },
  ];

  return (
    <div style={{ padding: 'var(--space-2xl) var(--space-xl)', maxWidth: '1000px', margin: '0 auto' }}>
      <div className="animate-fade-up" style={{ marginBottom: 'var(--space-2xl)' }}>
        <EditableRestaurantTitle restaurantId={restaurant.id} initialName={restaurant.name} />
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: 'var(--space-xs)', fontWeight: 500 }}>
          Yönetici Paneline hoş geldiniz.
        </p>
      </div>

      {/* Bento Grid Architecture */}
      <div 
        className="animate-fade-up"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: 'var(--space-md)',
          gridAutoRows: 'minmax(140px, auto)',
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 1024px) {
            .bento-item-large { grid-column: span 12 !important; }
            .bento-item-medium { grid-column: span 6 !important; }
            .bento-item-small { grid-column: span 6 !important; }
          }
          @media (max-width: 640px) {
            .bento-item-medium { grid-column: span 12 !important; }
            .bento-item-small { grid-column: span 12 !important; }
          }
        `}} />

        {/* Highlight Action (QR Code) - Spans 8 columns */}
        <div className="bento-card bento-item-large" style={{ 
          gridColumn: 'span 8', 
          gridRow: 'span 2', 
          background: 'var(--gradient-hero)',
          color: 'var(--text-inverse)',
          padding: 'var(--space-2xl)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: 'none'
        }}>
          <div>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', marginBottom: 'var(--space-xl)' }}>📱</div>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.04em', color: 'white', marginBottom: 'var(--space-sm)' }}>QR Kodunuz Hazır</h2>
            <p style={{ fontSize: '1.05rem', opacity: 0.9, maxWidth: '400px', lineHeight: 1.6 }}>Müşterilerinizin menüye hızlıca ulaşabilmesi için QR kodlarınızı masalara yerleştirin.</p>
          </div>
          <Link href="/admin/qr" style={{ 
            alignSelf: 'flex-start', 
            background: 'white', 
            color: 'var(--primary)', 
            padding: '0.8rem 1.5rem', 
            borderRadius: 'var(--radius-pill)', 
            fontWeight: 700, 
            fontSize: '0.95rem',
            marginTop: 'var(--space-xl)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
            transition: 'transform var(--transition-fast)',
            display: 'inline-block'
          }}>
            QR Kod Oluştur →
          </Link>
        </div>

        {/* Stats Grid - Spans 4 columns */}
        <div className="bento-item-large" style={{ 
          gridColumn: 'span 4', 
          gridRow: 'span 2',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 'var(--space-md)'
        }}>
          {stats.map((stat, i) => (
            <div key={i} className="bento-card" style={{ 
              padding: 'var(--space-lg)', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              textAlign: 'center',
              background: 'var(--surface-secondary)'
            }}>
              <div style={{ fontSize: '1.6rem', marginBottom: 'var(--space-xs)', opacity: 0.8 }}>{stat.icon}</div>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 'var(--space-xs)' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Action: Categories - Spans 4 columns */}
        <Link href="/admin/categories" className="bento-card bento-item-medium" style={{ 
          gridColumn: 'span 4', 
          padding: 'var(--space-xl)', 
          display: 'flex', 
          flexDirection: 'column', 
          textDecoration: 'none'
        }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--surface-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 'var(--space-lg)' }}>📋</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-xs)' }}>Kategoriler</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, flex: 1 }}>Menü kategorilerini ve sıralamasını yönetin.</p>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', marginTop: 'var(--space-md)' }}>Yönet →</div>
        </Link>

        {/* Action: Products - Spans 4 columns */}
        <Link href="/admin/products" className="bento-card bento-item-medium" style={{ 
          gridColumn: 'span 4', 
          padding: 'var(--space-xl)', 
          display: 'flex', 
          flexDirection: 'column', 
          textDecoration: 'none'
        }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--surface-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 'var(--space-lg)' }}>🍕</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-xs)' }}>Ürünler</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, flex: 1 }}>Ürün detaylarını, görsellerini ve fiyatlarını düzenleyin.</p>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', marginTop: 'var(--space-md)' }}>Yönet →</div>
        </Link>

        {/* Action: Settings - Spans 4 columns */}
        <Link href="/admin/settings" className="bento-card bento-item-medium" style={{ 
          gridColumn: 'span 4', 
          padding: 'var(--space-xl)', 
          display: 'flex', 
          flexDirection: 'column', 
          textDecoration: 'none'
        }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--surface-secondary)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 'var(--space-lg)' }}>⚙️</div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 'var(--space-xs)' }}>Ayarlar</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, flex: 1 }}>Restoran ismini ve görünüm renklerini değiştirin.</p>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', marginTop: 'var(--space-md)' }}>Düzenle →</div>
        </Link>

      </div>
    </div>
  );
}

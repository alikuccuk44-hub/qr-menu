import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import EditableRestaurantTitle from '@/components/EditableRestaurantTitle';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let restaurant = await prisma.restaurant.findFirst();
  if (!restaurant) {
    restaurant = await prisma.restaurant.create({
      data: { name: 'Benim Restoranım' }
    });
  }

  const categoryCount = await prisma.category.count({ where: { restaurantId: restaurant.id } });
  const productCount = await prisma.product.count({ where: { category: { restaurantId: restaurant.id } } });

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      
      {/* Header */}
      <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <EditableRestaurantTitle restaurantId={restaurant.id} initialName={restaurant.name} />
          <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem', fontSize: '0.95rem' }}>Yönetici Paneli</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="animate-fade-up" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', animationDelay: '0.1s' }}>
        <div className="glass-panel" style={{ flex: 1, minWidth: '140px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>{categoryCount}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '0.25rem' }}>Kategori</div>
        </div>
        <div className="glass-panel" style={{ flex: 1, minWidth: '140px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>{productCount}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '0.25rem' }}>Ürün</div>
        </div>
        <div className="glass-panel" style={{ flex: 1, minWidth: '140px', padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success)', fontFamily: 'var(--font-heading)' }}>4</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '0.25rem' }}>Dil Desteği</div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>

        <div className="glass-panel admin-card animate-fade-up" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', animationDelay: '0.2s' }}>
          <div style={{ fontSize: '2.5rem' }}>📋</div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Kategoriler</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>Menü kategorilerinizi ekleyin ve düzenleyin. Otomatik çeviri ile tüm dillerde yayınlayın.</p>
          <Link href="/admin/categories" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.7rem 1.5rem', fontSize: '0.95rem' }}>Yönet →</Link>
        </div>

        <div className="glass-panel admin-card animate-fade-up" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', animationDelay: '0.3s' }}>
          <div style={{ fontSize: '2.5rem' }}>🍕</div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Ürünler</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>Ürün ekleyin, fiyatları güncelleyin ve stok durumunu anlık olarak yönetin.</p>
          <Link href="/admin/products" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.7rem 1.5rem', fontSize: '0.95rem' }}>Yönet →</Link>
        </div>

        <div className="glass-panel admin-card animate-fade-up" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', animationDelay: '0.4s' }}>
          <div style={{ fontSize: '2.5rem' }}>📱</div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>QR Kod İşlemleri</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, flex: 1 }}>Masalarınıza yerleştireceğiniz QR kodu oluşturun ve indirin.</p>
          <Link href="/admin/qr" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.7rem 1.5rem', fontSize: '0.95rem' }}>Oluştur →</Link>
        </div>

      </div>
    </div>
  );
}

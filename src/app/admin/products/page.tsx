import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import AddProductForm from '@/components/AddProductForm';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const restaurant = await prisma.restaurant.findFirst();
  if (!restaurant) return <div>Restoran bulunamadı.</div>;

  const categories = await prisma.category.findMany({
    where: { restaurantId: restaurant.id },
    orderBy: { createdAt: 'asc' }
  });

  const products = await prisma.product.findMany({
    where: { category: { restaurantId: restaurant.id } },
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  async function deleteProduct(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    if (!id) return;
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin/products');
  }

  async function toggleAvailability(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const currentStr = formData.get('current') as string;
    if (!id) return;
    await prisma.product.update({
      where: { id },
      data: { isAvailable: currentStr === 'false' }
    });
    revalidatePath('/admin/products');
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          🍕 Ürünler
        </h1>
        <Link href="/admin" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>← Geri Dön</Link>
      </div>

      <div className="glass-panel animate-fade-up" style={{ padding: '2rem', marginBottom: '2rem', animationDelay: '0.1s' }}>
        <h3 style={{ marginBottom: '0.3rem', fontWeight: 700 }}>➕ Yeni Ürün</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Türkçe girin, otomatik çevrilecektir. Görseli bilgisayarınızdan veya telefonunuzdan yükleyin.</p>
        
        {categories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--danger)', background: 'rgba(211, 47, 47, 0.06)', borderRadius: '12px' }}>
            ⚠️ Ürün eklemek için önce kategori oluşturmalısınız.
          </div>
        ) : (
          <AddProductForm categories={categories.map(c => ({ id: c.id, name: c.name }))} />
        )}
      </div>

      <div className="glass-panel animate-fade-up" style={{ padding: '2rem', animationDelay: '0.2s' }}>
        <h3 style={{ marginBottom: '1.25rem', fontWeight: 700 }}>Mevcut Ürünler ({products.length})</h3>
        {products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🍽️</div>
            <p>Henüz ürün eklenmemiş.</p>
          </div>
        ) : (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {products.map(product => (
              <li key={product.id} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'var(--surface-elevated)', borderRadius: '14px', border: '1px solid var(--border)', opacity: product.isAvailable ? 1 : 0.55, transition: 'all 0.2s ease' }}>
                
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1, minWidth: '200px' }}>
                  {/* Thumbnail */}
                  {product.imageUrl ? (
                    <div style={{ width: '56px', height: '56px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border)' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ) : (
                    <div style={{ width: '56px', height: '56px', borderRadius: '10px', background: 'rgba(232,83,14,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                      🍽️
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 700, fontSize: '1rem' }}>{product.name}</span>
                      <span className="price-badge" style={{ fontSize: '0.8rem', padding: '0.15rem 0.5rem' }}>{product.price} ₺</span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      📁 {product.category.name} {product.description && ` · ${product.description}`}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
                      🌐 {[product.nameEn && 'EN', product.nameRu && 'RU', product.nameDe && 'DE'].filter(Boolean).join(' · ') || 'Çeviri bekleniyor'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <form action={toggleAvailability}>
                    <input type="hidden" name="id" value={product.id} />
                    <input type="hidden" name="current" value={product.isAvailable ? 'true' : 'false'} />
                    <button type="submit" className="btn" style={{ background: product.isAvailable ? 'var(--surface)' : 'rgba(46, 125, 50, 0.1)', border: `1.5px solid ${product.isAvailable ? 'var(--border)' : 'var(--success)'}`, color: product.isAvailable ? 'var(--text-muted)' : 'var(--success)', padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: 600, borderRadius: '10px' }}>
                      {product.isAvailable ? '❌ Tükendi' : '✅ Mevcut'}
                    </button>
                  </form>
                  <form action={deleteProduct}>
                    <input type="hidden" name="id" value={product.id} />
                    <button type="submit" className="btn" style={{ background: 'rgba(211, 47, 47, 0.08)', color: 'var(--danger)', padding: '0.5rem 1rem', fontSize: '0.8rem', fontWeight: 600, borderRadius: '10px' }}>
                      🗑️ Sil
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

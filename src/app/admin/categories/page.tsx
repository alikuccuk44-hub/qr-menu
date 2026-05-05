import { prisma } from '@/lib/prisma';
import { withTimeout } from '@/lib/db-utils';
import { revalidatePath } from 'next/cache';
import { translateText } from '@/lib/translate';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  let restaurant;
  let categories: any[] = [];

  try {
    restaurant = await withTimeout(prisma.restaurant.findFirst(), 800);
    if (restaurant) {
      categories = await withTimeout(prisma.category.findMany({
        where: { restaurantId: restaurant.id },
        include: { _count: { select: { products: true } } },
        orderBy: { createdAt: 'asc' }
      }), 800);
    }
  } catch (dbError) {
    console.warn('⚠️ Kategoriler sayfası veritabanına ulaşamıyor, demo modu aktif.');
    restaurant = { id: 'demo' };
    categories = [
      { id: '1', name: 'Ana Yemekler', nameEn: 'Main Courses', nameRu: 'Основные блюда', nameDe: 'Hauptgerichte', _count: { products: 12 } },
      { id: '2', name: 'İçecekler', nameEn: 'Drinks', nameRu: 'Напитки', nameDe: 'Getränke', _count: { products: 8 } },
      { id: '3', name: 'Tatlılar', nameEn: 'Desserts', nameRu: 'Десерты', nameDe: 'Desserts', _count: { products: 5 } },
    ];
  }

  if (!restaurant) return <div>Restoran bulunamadı. Lütfen ana panele dönün.</div>;

  async function addCategory(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;

    if (!name) return;
    
    const [nameEn, nameRu, nameDe] = await Promise.all([
      translateText(name, 'en'),
      translateText(name, 'ru'),
      translateText(name, 'de')
    ]);
    
    const rest = await prisma.restaurant.findFirst();
    if (rest) {
      await prisma.category.create({ 
        data: { name, nameEn, nameRu, nameDe, restaurantId: rest.id } 
      });
      revalidatePath('/admin/categories');
    }
  }

  async function deleteCategory(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    if (!id) return;
    await prisma.product.deleteMany({ where: { categoryId: id } });
    await prisma.category.delete({ where: { id } });
    revalidatePath('/admin/categories');
  }

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          📋 Kategoriler
        </h1>
        <Link href="/admin" className="btn btn-secondary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>← Geri Dön</Link>
      </div>

      <div className="glass-panel animate-fade-up" style={{ padding: '2rem', marginBottom: '2rem', animationDelay: '0.1s' }}>
        <h3 style={{ marginBottom: '0.3rem', fontWeight: 700 }}>➕ Yeni Kategori</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Türkçe adını yazın, diğer dillere otomatik çevrilecektir.</p>
        <form action={addCategory} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <input type="text" name="name" placeholder="Kategori adı (Örn: Tatlılar)" required className="form-input" style={{ flex: 1, minWidth: '220px' }} />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.85rem 1.75rem' }}>🚀 Ekle</button>
        </form>
      </div>

      <div className="glass-panel animate-fade-up" style={{ padding: '2rem', animationDelay: '0.2s' }}>
        <h3 style={{ marginBottom: '1.25rem', fontWeight: 700 }}>Mevcut Kategoriler</h3>
        {categories.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📂</div>
            <p>Henüz kategori eklenmemiş.</p>
          </div>
        ) : (
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {categories.map(cat => (
              <li key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: 'var(--surface-elevated)', borderRadius: '14px', border: '1px solid var(--border)', transition: 'all 0.2s ease' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{cat.name}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {[cat.nameEn && `EN: ${cat.nameEn}`, cat.nameRu && `RU: ${cat.nameRu}`, cat.nameDe && `DE: ${cat.nameDe}`].filter(Boolean).join(' · ')}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, marginTop: '0.15rem' }}>
                    {cat._count.products} ürün
                  </span>
                </div>
                <form action={deleteCategory}>
                  <input type="hidden" name="id" value={cat.id} />
                  <button type="submit" className="btn" style={{ background: 'rgba(211, 47, 47, 0.08)', color: 'var(--danger)', padding: '0.5rem 1rem', fontSize: '0.85rem', fontWeight: 600, borderRadius: '10px' }}>
                    🗑️ Sil
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

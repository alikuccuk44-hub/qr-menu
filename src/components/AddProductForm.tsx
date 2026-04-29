'use client';

import { useState } from 'react';
import ImageUploader from './ImageUploader';

type Category = {
  id: string;
  name: string;
};

export default function AddProductForm({ categories }: { categories: Category[] }) {
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('imageUrl', imageUrl);

    try {
      await fetch('/api/products', { method: 'POST', body: formData });
      // Reload page to show new product
      window.location.reload();
    } catch {
      alert('Ürün eklenirken bir hata oluştu.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 2, minWidth: '200px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>Ürün Adı *</label>
          <input type="text" name="name" required className="form-input" />
        </div>
        <div style={{ flex: 1, minWidth: '120px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>Fiyat (₺) *</label>
          <input type="number" step="0.01" name="price" required className="form-input" />
        </div>
        <div style={{ flex: 1, minWidth: '150px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>Kategori *</label>
          <select name="categoryId" required className="form-input">
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>Açıklama</label>
        <input type="text" name="description" placeholder="Örn: Bol soslu, kaşarlı..." className="form-input" />
      </div>

      <div>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>Ürün Görseli</label>
        <ImageUploader onUpload={setImageUrl} />
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting} style={{ alignSelf: 'flex-start' }}>
        {submitting ? '⏳ Ekleniyor...' : '🚀 Çevir & Ekle'}
      </button>
    </form>
  );
}

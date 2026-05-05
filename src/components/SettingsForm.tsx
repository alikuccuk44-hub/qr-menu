'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';

export default function SettingsForm({ restaurantId, currentLogo, currentPrimary, currentBackground, currentSurface }: { 
  restaurantId: string, 
  currentLogo: string,
  currentPrimary: string,
  currentBackground: string,
  currentSurface: string
}) {
  const [logoUrl, setLogoUrl] = useState(currentLogo || '');
  const [primaryColor, setPrimaryColor] = useState(currentPrimary || '#e8530e');
  const [backgroundColor, setBackgroundColor] = useState(currentBackground || '#ffffff');
  const [surfaceColor, setSurfaceColor] = useState(currentSurface || '#1a1a1a');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const res = await fetch('/api/restaurant', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: restaurantId, 
          logoUrl,
          primaryColor,
          backgroundColor,
          surfaceColor,
          adminPassword: data.adminPassword || undefined
        })
      });

      if (res.ok) {
        setMessage('✅ Ayarlar başarıyla kaydedildi.');
        router.refresh();
      } else {
        setMessage('❌ Bir hata oluştu.');
      }
    } catch {
      setMessage('❌ Sunucu hatası.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Logo Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>🎨 Tasarım ve Logo</h3>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>Ana Renk</label>
              <input type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} style={{ width: '100%', height: '40px', padding: '2px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>Arka Plan</label>
              <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} style={{ width: '100%', height: '40px', padding: '2px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>Admin Panel / Menü Kartı Rengi</label>
              <input type="color" value={surfaceColor} onChange={(e) => setSurfaceColor(e.target.value)} style={{ width: '100%', height: '40px', padding: '2px', borderRadius: '8px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer' }} />
            </div>
          </div>

          <div style={{ marginTop: '0.5rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>Restoran Logosu</label>
            {logoUrl && (
              <div style={{ width: '100px', height: '100px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '0.5rem' }}>
                <img src={logoUrl} alt="Logo Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#f8f8f8' }} />
              </div>
            )}
            <ImageUploader onUpload={setLogoUrl} />
          </div>
        </div>

        {/* Password Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Güvenlik</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Admin panel giriş şifresini değiştirin.</p>
          
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.3rem', fontWeight: 600 }}>Yeni Şifre</label>
            <input type="password" name="adminPassword" placeholder="Aynı kalsın istiyorsanız boş bırakın" className="form-input" />
          </div>
        </div>

      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? '⏳ Kaydediliyor...' : '💾 Ayarları Kaydet'}
        </button>
        {message && <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{message}</span>}
      </div>

    </form>
  );
}

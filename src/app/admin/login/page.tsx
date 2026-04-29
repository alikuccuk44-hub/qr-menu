'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Giriş başarısız');
      }
    } catch {
      setError('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <form onSubmit={handleLogin} className="glass-panel animate-fade-up" style={{ padding: '3rem 2.5rem', maxWidth: '420px', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Icon */}
        <div style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '0.5rem' }}>🔐</div>
        
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', fontWeight: 800, background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          Yönetici Girişi
        </h2>

        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '-0.5rem' }}>
          Menünüzü yönetmek için giriş yapın
        </p>
        
        {error && (
          <div style={{ padding: '1rem', backgroundColor: 'rgba(211, 47, 47, 0.08)', color: 'var(--danger)', borderRadius: '12px', border: '1px solid rgba(211, 47, 47, 0.2)', fontSize: '0.9rem', fontWeight: 500, textAlign: 'center' }}>
            ⚠️ {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label htmlFor="password" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-muted)' }}>Şifre</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            placeholder="Şifrenizi girin..."
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginTop: '0.5rem', padding: '1rem', fontSize: '1.05rem' }}>
          {loading ? '⏳ Giriş yapılıyor...' : '🚀 Giriş Yap'}
        </button>
      </form>
    </div>
  );
}

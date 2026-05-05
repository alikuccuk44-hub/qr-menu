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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--background)',
      padding: 'var(--space-lg)',
    }}>
      <div 
        className="surface-card animate-fade-up"
        style={{
          width: '100%',
          maxWidth: '420px',
          padding: 'var(--space-2xl) var(--space-xl)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 'var(--shadow-xl)',
          borderRadius: 'var(--radius-2xl)',
          background: 'var(--surface)',
        }}
      >
        {/* Logo Mark */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'var(--gradient-hero)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          boxShadow: '0 8px 16px var(--primary-subtle)',
          marginBottom: 'var(--space-lg)',
        }}>
          🔐
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: '1.8rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.03em',
          marginBottom: 'var(--space-xs)',
          textAlign: 'center',
        }}>
          Yönetim Paneli
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          marginBottom: 'var(--space-xl)',
          textAlign: 'center',
        }}>
          Menünüzü yönetmek için giriş yapın
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {error && (
            <div className="animate-scale-in" style={{
              padding: '0.75rem 1rem',
              backgroundColor: 'var(--danger-subtle)',
              color: 'var(--danger)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              fontSize: '0.85rem',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-sm)',
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            <label htmlFor="password" className="form-label" style={{ display: 'none' }}>Şifre</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Şifrenizi girin..."
              required
              style={{
                padding: '0.85rem 1.1rem',
                fontSize: '1rem',
                textAlign: 'center',
                letterSpacing: '0.1em',
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              padding: '0.85rem',
              fontSize: '1rem',
              borderRadius: 'var(--radius-md)',
              marginTop: 'var(--space-sm)',
              width: '100%',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-sm)' }}>
                <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
                Giriş yapılıyor...
              </span>
            ) : 'Giriş Yap'}
          </button>
        </form>

        {/* Footer */}
        <div style={{
          marginTop: 'var(--space-2xl)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-xs)',
        }}>
          Powered by <strong>QR Menü SaaS</strong>
        </div>
      </div>
    </div>
  );
}

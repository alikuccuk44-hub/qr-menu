'use client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [theme, setTheme] = useState({ primary: '#e8530e', background: '#120c08' });

  useEffect(() => {
    fetch('/api/restaurant')
      .then(res => res.json())
      .then(data => {
        if (data.primaryColor) {
          setTheme({ primary: data.primaryColor, background: data.backgroundColor });
        }
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: theme.background
    }}>
      {/* Dinamik Stil Enjeksiyonu - Tüm sayfalarda ve durumlarda geçerli */}
      <style jsx global>{`
        :root {
          --primary: ${theme.primary} !important;
          --primary-hover: ${theme.primary}dd !important;
          --background: ${theme.background} !important;
          --foreground: ${theme.background === '#ffffff' || theme.background === 'white' ? '#120c08' : '#ffffff'} !important;
          --gradient-warm: ${theme.background} !important;
          --gradient-hero: linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary}dd 100%) !important;
          --surface: ${theme.background === '#ffffff' || theme.background === 'white' ? '#f8f9fa' : '#1a120d'} !important;
        }
        body, html {
          background: ${theme.background} !important;
          background-image: none !important;
          color: var(--foreground) !important;
        }
        .btn-primary {
          background: var(--gradient-hero) !important;
          color: white !important;
        }
      `}</style>

      {pathname !== '/admin/login' && (
        <header style={{ 
          borderBottom: '1px solid var(--border)', 
          background: 'var(--surface)', 
          padding: '1rem 0',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(10px)'
        }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/admin" style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--primary)', letterSpacing: '-0.02em' }}>QR Menü Admin</a>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <Link href="/admin/settings" className="btn" style={{ background: 'transparent', border: '1.5px solid var(--border)', padding: '0.5rem 1.2rem', fontSize: '0.85rem', fontWeight: 700 }}>⚙️ Ayarlar</Link>
              <button 
                onClick={handleLogout} 
                className="btn" 
                style={{ 
                  background: 'var(--primary)', 
                  color: 'white', 
                  padding: '0.5rem 1.2rem', 
                  fontSize: '0.85rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                🚪 Çıkış Yap
              </button>
            </div>
          </div>
        </header>
      )}
      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        {children}
      </main>
    </div>
  );
}

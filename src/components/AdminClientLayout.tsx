'use client';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { href: '/admin', icon: '📊', label: 'Dashboard' },
  { href: '/admin/categories', icon: '📋', label: 'Kategoriler' },
  { href: '/admin/products', icon: '🍕', label: 'Ürünler' },
  { href: '/admin/qr', icon: '📱', label: 'QR Kod' },
  { href: '/admin/settings', icon: '⚙️', label: 'Ayarlar' },
];

type Props = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialRestaurant: any;
};

export default function AdminClientLayout({ children, initialRestaurant }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  
  const theme = { 
    primary: initialRestaurant?.primaryColor || '#e8530e', 
    background: initialRestaurant?.backgroundColor || '#ffffff',
    surfaceColor: initialRestaurant?.surfaceColor || '#1a1a1a'
  };

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const isLoginPage = pathname === '/admin/login';

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  const getLuminance = (hex: string) => {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    if (hex.length !== 6) return 0;
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  const bgIsLight = getLuminance(theme.background) > 0.5;
  const surfaceIsLight = getLuminance(theme.surfaceColor) > 0.5;
  
  // Text for the main background
  const fgColor = bgIsLight ? '#111111' : '#ffffff';
  
  // Text for the surface/sidebar
  const surfaceFgColor = surfaceIsLight ? '#111111' : '#ffffff';
  const surfaceTextSecondary = surfaceIsLight ? '#5f6368' : '#a8a29e';
  const surfaceTextMuted = surfaceIsLight ? '#8c9097' : '#78716c';
  const surfaceBorder = surfaceIsLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)';
  const surfaceBorderStrong = surfaceIsLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.15)';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: theme.background,
    }}>
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --primary: ${theme.primary} !important;
          --primary-hover: ${theme.primary}dd !important;
          --primary-light: ${theme.primary}cc !important;
          --primary-subtle: ${theme.primary}14 !important;
          --primary-muted: ${theme.primary}2a !important;
          --background: ${theme.background} !important;
          --foreground: ${fgColor} !important;
          --text-primary: ${surfaceFgColor} !important;
          --text-secondary: ${surfaceTextSecondary} !important;
          --text-muted: ${surfaceTextMuted} !important;
          --surface: ${theme.surfaceColor} !important;
          --surface-secondary: ${theme.surfaceColor} !important;
          --surface-elevated: ${surfaceIsLight ? '#ffffff' : '#2a2a2a'} !important;
          --gradient-hero: linear-gradient(135deg, ${theme.primary} 0%, ${theme.primary}cc 100%) !important;
          --border: ${surfaceBorder} !important;
          --border-strong: ${surfaceBorderStrong} !important;
        }
        body {
          background: ${theme.background} !important;
          background-image: none !important;
          color: ${fgColor} !important;
        }
      `}} />

      {!isLoginPage && (
        <>
          <aside className="admin-sidebar" style={{
            width: '260px', 
            minHeight: '100vh', 
            background: 'var(--surface)',
            borderRight: '1px solid var(--border)', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'fixed', 
            top: 0, left: 0, zIndex: 40, 
            padding: 'var(--space-xl) var(--space-md)',
          }}>
            <Link href="/admin" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 'var(--space-sm)', 
              padding: '0 var(--space-sm)', 
              marginBottom: 'var(--space-2xl)', 
              textDecoration: 'none' 
            }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '8px', 
                background: 'var(--gradient-hero)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '1rem', 
                boxShadow: '0 2px 8px var(--primary-subtle)', 
                flexShrink: 0 
              }}>🍽️</div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>QR Menü</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, marginTop: '2px' }}>Workspace</div>
              </div>
            </Link>

            <div style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: 'var(--space-sm)',
              paddingLeft: 'var(--space-sm)'
            }}>
              Menu
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
              {navItems.map(item => (
                <Link key={item.href} href={item.href} className={`nav-link ${isActive(item.href) ? 'nav-link-active' : ''}`}>
                  <span style={{ fontSize: '1.1rem', opacity: isActive(item.href) ? 1 : 0.7, width: '20px', display: 'flex', justifyContent: 'center' }}>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            <div style={{ 
              marginTop: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-xs)'
            }}>
              <div style={{
                padding: 'var(--space-md)',
                background: 'var(--surface-secondary)',
                borderRadius: 'var(--radius-md)',
                marginBottom: 'var(--space-md)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-sm)'
              }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem',
                  overflow: 'hidden'
                }}>
                  {initialRestaurant?.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={initialRestaurant.logoUrl} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    initialRestaurant?.name?.charAt(0) || 'A'
                  )}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                    {initialRestaurant?.name || 'Admin'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Pro Plan</div>
                </div>
              </div>

              <button onClick={handleLogout} className="nav-link" style={{ color: 'var(--text-secondary)' }}>
                <span style={{ fontSize: '1.1rem', opacity: 0.7, width: '20px', display: 'flex', justifyContent: 'center' }}>🚪</span>
                Çıkış Yap
              </button>
            </div>
          </aside>

          {/* Mobile Nav */}
          <nav className="admin-mobile-nav" style={{ 
            position: 'fixed', 
            bottom: 0, left: 0, right: 0, 
            background: 'var(--surface-glass)', 
            borderTop: '1px solid var(--border-glass)', 
            display: 'none', 
            justifyContent: 'space-around', 
            padding: 'var(--space-xs) 0', 
            paddingBottom: 'calc(var(--space-xs) + env(safe-area-inset-bottom))', 
            zIndex: 50, 
            backdropFilter: 'blur(24px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.8)'
          }}>
            {navItems.slice(0, 4).map(item => (
              <Link key={item.href} href={item.href} style={{ 
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', 
                padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-lg)', 
                fontSize: '0.7rem', fontWeight: isActive(item.href) ? 600 : 500, 
                color: isActive(item.href) ? 'var(--primary)' : 'var(--text-muted)', 
                textDecoration: 'none', transition: 'all var(--transition-fast)',
                background: isActive(item.href) ? 'var(--primary-subtle)' : 'transparent'
              }}>
                <span style={{ fontSize: '1.2rem', opacity: isActive(item.href) ? 1 : 0.8 }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <button onClick={handleLogout} style={{ 
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', 
              padding: '0.4rem 0.8rem', fontSize: '0.7rem', fontWeight: 500, 
              color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' 
            }}>
              <span style={{ fontSize: '1.2rem', opacity: 0.8 }}>🚪</span>
              Çıkış
            </button>
          </nav>
        </>
      )}

      <main style={{ 
        flex: 1, 
        minHeight: '100vh', 
        marginLeft: isLoginPage ? 0 : '260px', 
        paddingBottom: '6rem', 
        transition: 'margin-left var(--transition-base)' 
      }} className={isLoginPage ? '' : 'admin-main-content'}>
        {children}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 768px) {
          .admin-sidebar { display: none !important; }
          .admin-mobile-nav { display: flex !important; }
          .admin-main-content { margin-left: 0 !important; }
        }
      `}} />
    </div>
  );
}

'use client';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)', padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/admin" style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--primary)' }}>QR Menü Admin</a>
          <button onClick={handleLogout} className="btn" style={{ background: 'transparent', border: '1px solid var(--border)', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Çıkış Yap</button>
        </div>
      </header>
      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        {children}
      </main>
    </div>
  );
}

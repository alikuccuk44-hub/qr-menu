export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <main className="glass-panel animate-fade-up" style={{ padding: '3.5rem 2.5rem', textAlign: 'center', maxWidth: '480px', width: '100%' }}>
        
        {/* Logo / Emoji Icon */}
        <div className="animate-float" style={{ fontSize: '4rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>
          🍽️
        </div>

        <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '0.75rem', background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          QR Menü
        </h1>

        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.05rem', lineHeight: 1.7, maxWidth: '340px', margin: '0 auto 2.5rem' }}>
          Dijital menü yönetim sisteminize hoş geldiniz. Menünüzü kolayca yönetin, müşterilerinize en iyi deneyimi sunun.
        </p>

        <a href="/admin" className="btn btn-primary" style={{ textDecoration: 'none', width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
          🔑 Yönetici Girişi
        </a>
      </main>
    </div>
  );
}

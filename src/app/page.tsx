export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-lg)',
      background: 'var(--background)',
      backgroundImage: 'var(--gradient-mesh)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated background blobs */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,83,14,0.08) 0%, transparent 70%)',
        animation: 'blobMove 20s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-15%',
        right: '-5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,167,38,0.06) 0%, transparent 70%)',
        animation: 'blobMove 15s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />

      <main className="animate-fade-up" style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '520px',
        width: '100%',
      }}>
        {/* Glowing icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: 'var(--radius-xl)',
          background: 'var(--gradient-hero)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.2rem',
          margin: '0 auto var(--space-xl)',
          boxShadow: '0 8px 30px rgba(232, 83, 14, 0.3)',
          animation: 'float 4s ease-in-out infinite',
        }}>
          🍽️
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 900,
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          marginBottom: 'var(--space-md)',
          background: 'var(--gradient-hero-vivid)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>
          QR Menü
        </h1>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.1rem',
          lineHeight: 1.7,
          marginBottom: 'var(--space-2xl)',
          maxWidth: '380px',
          margin: '0 auto',
          paddingBottom: 'var(--space-2xl)',
        }}>
          Dijital menü yönetim sisteminize hoş geldiniz.
          Menünüzü kolayca yönetin, müşterilerinize en iyi deneyimi sunun.
        </p>



        {/* CTA */}
        <a
          href="/admin"
          className="btn btn-primary animate-fade-up"
          style={{
            animationDelay: '0.5s',
            width: '100%',
            maxWidth: '320px',
            padding: '1rem',
            fontSize: '1rem',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          Yönetici Paneli →
        </a>

        {/* Subtle footer */}
        <p className="animate-fade-up" style={{
          animationDelay: '0.7s',
          marginTop: 'var(--space-xl)',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
        }}>
          Powered by QR Menü SaaS
        </p>
      </main>
    </div>
  );
}

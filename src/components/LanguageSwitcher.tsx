'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLang = searchParams.get('lang') || 'tr';

  const changeLanguage = (lang: string) => {
    const params = new URLSearchParams(searchParams);
    if (lang === 'tr') {
      params.delete('lang');
    } else {
      params.set('lang', lang);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const languages = [
    { code: 'tr', label: 'TR' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'de', label: 'DE' },
  ];

  return (
    <div style={{ 
      display: 'inline-flex', 
      gap: '0.25rem', 
      background: 'rgba(255,255,255,0.15)', 
      padding: '0.3rem', 
      borderRadius: '12px',
      backdropFilter: 'blur(8px)'
    }}>
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          style={{
            background: currentLang === lang.code ? 'rgba(255,255,255,0.95)' : 'transparent',
            border: 'none',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            color: currentLang === lang.code ? 'var(--primary)' : 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            padding: '0.4rem 0.75rem',
            transition: 'all 0.25s ease',
            letterSpacing: '0.03em'
          }}
          title={lang.code.toUpperCase()}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

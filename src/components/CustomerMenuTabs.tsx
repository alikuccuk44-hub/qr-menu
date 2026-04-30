'use client';

import { useState, useCallback } from 'react';

type Product = {
  id: string;
  name: string;
  nameEn: string | null;
  nameRu: string | null;
  nameDe: string | null;
  description: string | null;
  descriptionEn: string | null;
  descriptionRu: string | null;
  descriptionDe: string | null;
  price: number;
  imageUrl: string | null;
  isAvailable: boolean;
};

type Category = {
  id: string;
  name: string;
  nameEn: string | null;
  nameRu: string | null;
  nameDe: string | null;
  products: Product[];
};

type Props = {
  categories: Category[];
  currentLang: string;
  t: { soldOut: string; empty: string };
};

// Food emojis to use as placeholders when no image is provided
const foodEmojis = ['🍔', '🍕', '🌮', '🍜', '🥗', '🍰', '☕', '🧁', '🍣', '🥩', '🍝', '🥘', '🫕', '🍗', '🧆', '🥙', '🍲', '🍱', '🥤', '🍹'];

function getRandomEmoji(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return foodEmojis[Math.abs(hash) % foodEmojis.length];
}

export default function CustomerMenuTabs({ categories, currentLang, t }: Props) {
  const activeCategories = categories.filter(c => c.products.length > 0);
  
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    activeCategories.length > 0 ? activeCategories[0].id : ''
  );

  const [animKey, setAnimKey] = useState(0);

  const switchCategory = useCallback((id: string) => {
    setActiveCategoryId(id);
    setAnimKey(prev => prev + 1);
  }, []);

  if (activeCategories.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1.5rem', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🍽️</div>
        <p style={{ fontSize: '1.1rem' }}>{t.empty}</p>
      </div>
    );
  }

  const activeCategory = activeCategories.find(c => c.id === activeCategoryId);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLocalizedName = (item: any) => {
    if (currentLang === 'en' && item.nameEn) return item.nameEn;
    if (currentLang === 'ru' && item.nameRu) return item.nameRu;
    if (currentLang === 'de' && item.nameDe) return item.nameDe;
    return item.name;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLocalizedDescription = (item: any) => {
    if (currentLang === 'en' && item.descriptionEn) return item.descriptionEn;
    if (currentLang === 'ru' && item.descriptionRu) return item.descriptionRu;
    if (currentLang === 'de' && item.descriptionDe) return item.descriptionDe;
    return item.description;
  };

  return (
    <>
      {/* Category Tabs */}
      <div className="hide-scrollbar" style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        gap: '0.5rem', 
        padding: '0.75rem 1rem',
        position: 'sticky', 
        top: 0, 
        zIndex: 10,
        background: 'var(--surface-glass)',
        backdropFilter: 'blur(20px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.8)',
        borderBottom: '1px solid var(--border)',
      }}>
        {activeCategories.map(category => {
          const isActive = activeCategoryId === category.id;
          return (
            <button
              key={category.id}
              onClick={() => switchCategory(category.id)}
              style={{
                padding: '0.6rem 1.3rem',
                borderRadius: '100px',
                border: isActive ? 'none' : '1.5px solid var(--border-glass)',
                background: isActive ? 'var(--gradient-hero)' : 'var(--surface)',
                color: isActive ? 'white' : 'var(--text-muted)',
                fontWeight: isActive ? 700 : 500,
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                boxShadow: isActive ? '0 4px 16px rgba(232, 83, 14, 0.35)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                outline: 'none',
                flexShrink: 0,
              }}
            >
              {getLocalizedName(category)}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div key={animKey} style={{ maxWidth: '640px', margin: '0 auto', padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {activeCategory?.products.map((product, index) => {
          const desc = getLocalizedDescription(product);
          const emoji = getRandomEmoji(product.id);
          
          return (
            <div 
              key={product.id} 
              className="glass-panel animate-fade-up"
              style={{ 
                overflow: 'hidden',
                animationDelay: `${index * 0.07}s`,
                opacity: product.isAvailable ? 1 : 0.5,
              }}
            >
              {/* Image Area */}
              <div style={{ position: 'relative' }}>
                {product.imageUrl ? (
                  <div style={{ 
                    width: '100%', 
                    height: '180px', 
                    overflow: 'hidden',
                    backgroundColor: 'var(--border)',
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease',
                      }} 
                    />
                  </div>
                ) : (
                  /* Placeholder with emoji and gradient */
                  <div style={{ 
                    width: '100%', 
                    height: '140px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, rgba(232,83,14,0.06) 0%, rgba(255,167,38,0.08) 100%)',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <span style={{ fontSize: '4rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.08))' }}>{emoji}</span>
                  </div>
                )}

                {/* Price Badge - floating on image */}
                <div style={{ 
                   position: 'absolute', 
                   bottom: '-14px', 
                   right: '16px',
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'flex-end',
                   gap: '4px'
                }}>
                  {/* Multi-currency prices */}
                  <div style={{
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '0.3rem 0.75rem',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    gap: '0.75rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}>
                    <span>{product.price} ₺</span>
                    <span style={{ opacity: 0.8 }}>$ {(product.price / 34).toFixed(1)}</span>
                    <span style={{ opacity: 0.8 }}>€ {(product.price / 36).toFixed(1)}</span>
                  </div>
                </div>

                {/* Sold out overlay */}
                {!product.isAvailable && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{
                      background: 'rgba(211, 47, 47, 0.9)',
                      color: 'white',
                      padding: '0.5rem 1.5rem',
                      borderRadius: '100px',
                      fontWeight: 800,
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}>
                      {t.soldOut}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div style={{ padding: '1.25rem 1.25rem 1.25rem', marginTop: '0.25rem' }}>
                <h3 style={{ 
                  fontSize: '1.15rem', 
                  fontWeight: 700, 
                  margin: 0, 
                  color: 'var(--foreground)', 
                  lineHeight: 1.3,
                }}>
                  {getLocalizedName(product)}
                </h3>
                
                {desc && (
                  <p style={{ 
                    color: 'var(--text-muted)', 
                    fontSize: '0.9rem', 
                    marginTop: '0.5rem', 
                    lineHeight: 1.6,
                  }}>
                    {desc}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

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
    if (id !== activeCategoryId) {
      setActiveCategoryId(id);
      setAnimKey(prev => prev + 1);
    }
  }, [activeCategoryId]);

  if (activeCategories.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-3xl) var(--space-lg)', color: 'var(--text-muted)' }}>
        <div className="animate-float" style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }}>🍽️</div>
        <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>{t.empty}</p>
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
      {/* Category Navigation — Sticky & Glassy */}
      <div className="hide-scrollbar" style={{ 
        display: 'flex', 
        overflowX: 'auto', 
        gap: 'var(--space-sm)', 
        padding: '1rem var(--space-md)',
        position: 'sticky', 
        top: 0, 
        zIndex: 100,
        background: 'var(--surface-glass)',
        backdropFilter: 'blur(32px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
        borderBottom: '1px solid var(--border-glass)',
        boxShadow: 'var(--shadow-xs)'
      }}>
        {activeCategories.map(category => {
          const isActive = activeCategoryId === category.id;
          return (
            <button
              key={category.id}
              onClick={() => switchCategory(category.id)}
              className={isActive ? 'chip chip-active' : 'chip'}
              style={{ flexShrink: 0 }}
            >
              {getLocalizedName(category)}
            </button>
          );
        })}
      </div>

      {/* Product List */}
      <div 
        key={animKey} 
        style={{ 
          maxWidth: '680px', 
          margin: '0 auto', 
          padding: 'var(--space-xl) var(--space-md)', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'var(--space-md)' 
        }}
      >
        {activeCategory?.products.map((product, index) => {
          const desc = getLocalizedDescription(product);
          const emoji = getRandomEmoji(product.id);
          
          return (
            <div 
              key={product.id} 
              className="glass-panel animate-fade-up"
              style={{ 
                display: 'flex',
                overflow: 'hidden',
                animationDelay: `${index * 0.06}s`,
                opacity: product.isAvailable ? 1 : 0.65,
                position: 'relative',
              }}
            >
              {/* Product Image Side */}
              <div style={{ 
                width: '120px', 
                flexShrink: 0,
                position: 'relative',
                background: 'var(--surface-elevated)'
              }}>
                {product.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{ 
                    width: '100%', height: '100%', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'var(--surface-secondary)',
                    fontSize: '2.5rem'
                  }}>
                    {emoji}
                  </div>
                )}

                {/* Sold Out Overlay */}
                {!product.isAvailable && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(4px)'
                  }}>
                    <span className="badge badge-danger" style={{ 
                      fontSize: '0.65rem', 
                      background: 'rgba(239, 68, 68, 0.9)', 
                      color: 'white',
                      border: 'none'
                    }}>
                      {t.soldOut}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info Side */}
              <div style={{ 
                flex: 1, 
                padding: 'var(--space-md)', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'space-between',
                minWidth: 0,
                gap: 'var(--space-sm)'
              }}>
                <div>
                  <h3 style={{ 
                    fontSize: '1.05rem', 
                    fontWeight: 700, 
                    margin: 0, 
                    color: 'var(--text-primary)',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    letterSpacing: '-0.01em'
                  }}>
                    {getLocalizedName(product)}
                  </h3>
                  
                  {desc && (
                    <p style={{ 
                      color: 'var(--text-secondary)', 
                      fontSize: '0.85rem', 
                      marginTop: '6px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.5
                    }}>
                      {desc}
                    </p>
                  )}
                </div>

                {/* Multi-Currency Price Badge */}
                <div style={{ alignSelf: 'flex-end', marginTop: 'var(--space-xs)' }}>
                  <div className="price-badge">
                    <span>{product.price.toLocaleString('tr-TR')} ₺</span>
                    <span className="sub-price">
                      ${(product.price / 34).toFixed(1)} <span style={{ opacity: 0.5, margin: '0 2px' }}>•</span> €{(product.price / 36).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

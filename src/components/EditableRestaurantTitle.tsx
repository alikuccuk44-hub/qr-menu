'use client';

import { useState, useRef, useEffect } from 'react';

type Props = {
  restaurantId: string;
  initialName: string;
};

export default function EditableRestaurantTitle({ restaurantId, initialName }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const res = await fetch('/api/restaurant', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: restaurantId, name: name.trim() })
      });
      if (res.ok) {
        setIsEditing(false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setName(initialName);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          className="form-input"
          style={{ fontSize: '1.5rem', fontWeight: 800, padding: '0.5rem', width: '300px' }}
          disabled={saving}
        />
        <button onClick={handleSave} className="btn btn-primary" style={{ padding: '0.5rem 1rem' }} disabled={saving}>
          {saving ? '⏳' : '✅ Kaydet'}
        </button>
        <button onClick={() => { setName(initialName); setIsEditing(false); }} className="btn btn-secondary" style={{ padding: '0.5rem 1rem' }} disabled={saving}>
          İptal
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0 }}>
        {name}
      </h1>
      <button 
        onClick={() => setIsEditing(true)} 
        style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '0.2rem', opacity: 0.6, transition: 'opacity 0.2s' }}
        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '0.6'}
        title="İsmi Düzenle"
      >
        ✏️
      </button>
    </div>
  );
}

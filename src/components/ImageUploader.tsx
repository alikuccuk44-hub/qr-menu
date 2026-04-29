'use client';

import { useState, useRef } from 'react';

type Props = {
  onUpload: (url: string) => void;
  currentUrl?: string;
};

export default function ImageUploader({ onUpload, currentUrl }: Props) {
  const [preview, setPreview] = useState<string | null>(currentUrl || null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    // Validate
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('Sadece JPEG, PNG, WebP veya GIF.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Dosya boyutu en fazla 5MB.');
      return;
    }

    setError('');
    setUploading(true);

    // Show local preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    // Upload
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok) {
        setPreview(data.imageUrl);
        onUpload(data.imageUrl);
      } else {
        setError(data.error || 'Yükleme hatası');
        setPreview(null);
      }
    } catch {
      setError('Yükleme başarısız');
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const removeImage = () => {
    setPreview(null);
    onUpload('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleChange}
        style={{ display: 'none' }}
        id="image-upload"
      />

      {preview ? (
        /* Preview */
        <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', border: '2px solid var(--border)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Ürün görseli" style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
          {uploading && (
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
              ⏳ Yükleniyor...
            </div>
          )}
          {!uploading && (
            <button
              type="button"
              onClick={removeImage}
              style={{
                position: 'absolute', top: '8px', right: '8px',
                background: 'rgba(211,47,47,0.9)', color: 'white',
                border: 'none', borderRadius: '50%',
                width: '28px', height: '28px',
                cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}
            >
              ✕
            </button>
          )}
        </div>
      ) : (
        /* Upload Zone */
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragOver ? 'var(--primary)' : 'var(--border)'}`,
            borderRadius: '14px',
            padding: '1.5rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s ease',
            background: dragOver ? 'rgba(232,83,14,0.04)' : 'transparent',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500 }}>
            Tıklayın veya sürükleyin
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.25rem' }}>
            JPEG, PNG, WebP · Max 5MB
          </p>
        </div>
      )}

      {error && (
        <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 500 }}>⚠️ {error}</p>
      )}
    </div>
  );
}

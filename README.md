# Dinamik QR Menü & Yönetim Sistemi

Bu proje, restoran ve kafeler için geliştirilmiş, tam otomatik çoklu dil destekli ve modern PWA (Progressive Web App) standartlarına uygun bir Dijital QR Menü uygulamasıdır.

## 🌟 Öne Çıkan Özellikler

- **AI Destekli Otomatik Çeviri:** Yönetici paneline Türkçe eklenen her kategori ve ürün; anında İngilizce, Rusça ve Almanca dillerine otomatik olarak çevrilir. (Google Translate API entegrasyonu).
- **Gelişmiş Yönetici Paneli:** 
  - Kategori ve Ürün yönetimi (CRUD işlemleri).
  - Anlık stok/tükendi durumu güncelleme.
  - Sürükle-bırak destekli, anında önizlemeli görsel yükleme modülü.
  - Masalara özel QR Kod oluşturma ve indirme ekranı.
- **Modern Müşteri Arayüzü:** 
  - Uygulama hissi veren (app-like) yatay kaydırılabilir kategori sekmeleri.
  - Ürün görselleri odaklı, animasyonlu şık tasarım.
  - Cihaz diline göre otomatik veya manuel dil seçimi.
- **Güvenlik:** Yönetici paneli izinsiz girişleri engelleyen "Session Cookie" mimarisiyle korunmaktadır (Her tarayıcı kapanışında oturum sonlanır).

## 🛠️ Kullanılan Teknolojiler

- **Frontend:** Next.js 15 (App Router), React, Vanilla CSS (Glassmorphism & Modern UI)
- **Backend:** Next.js Server Actions & API Routes
- **Veritabanı:** Prisma ORM, SQLite
- **Dosya Yönetimi:** Node.js `fs` modülü ile yerel görsel yükleme

## 🚀 Kurulum ve Çalıştırma (Lokal Ortam)

Projeyi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyebilirsiniz:

1. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

2. **Veritabanını Hazırlayın:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

3. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```

4. **Tarayıcıda Açın:**
   - Müşteri Arayüzü: `http://localhost:3000`
   - Yönetici Paneli: `http://localhost:3000/admin`
   - **Varsayılan Admin Şifresi:** `admin`

## 📱 Ekran Görüntüleri ve Tasarım
Uygulama baştan aşağı "Appetizing Colors" (İştah açıcı renkler - Turuncu/Coral) paletiyle, modern mikro animasyonlar ve bulanık cam (glassmorphism) efektleriyle tasarlanmıştır. Müşteri menüsü tamamen fotoğraf odaklıdır. Görseli olmayan ürünler için sistem otomatik olarak şık emoji placeholder'ları (🍔, 🍕 vb.) atar.

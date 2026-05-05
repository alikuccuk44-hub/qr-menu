# 🍽️ Dinamik QR Menü & Yönetim Paneli

Modern restoranlar, kafeler ve oteller için tasarlanmış, **"World-Class SaaS"** standartlarında, yeni nesil dijital QR Menü ve Yönetim platformu. 

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Prisma](https://img.shields.io/badge/Prisma-ORM-1B222D?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=for-the-badge&logo=postgresql)

## 🌟 Öne Çıkan Özellikler

- **Dinamik Tasarım Sistemi:** Restoranlar, yönetici paneli üzerinden kendi kurumsal renklerini (Ana Renk, Arka Plan, Yüzey Rengi) saniyeler içinde belirleyebilir. Uygulamanın tüm arayüzü anında bu renklere bürünür.
- **Glassmorphism Arayüz:** Müşteri menüsü, derinlik hissi veren buzlu cam (glass) efektleri ve akıcı animasyonlarla "app-like" (uygulama gibi) bir premium deneyim sunar.
- **Çoklu Dil Desteği:** Tek tıkla Türkçe, İngilizce, Almanca ve Rusça dillerine çeviri imkanı.
- **Akıllı Para Birimi (Multi-Currency):** Ürün fiyatları TL, USD ve EUR formatında güncel kurlarla (simüle) aynı anda, şık bir rozet (badge) tasarımıyla sunulur.
- **Bento Grid Admin Dashboard:** İstatistikler ve hızlı işlemler, modern ve derli toplu bir görünüm sunan "Bento Grid" mimarisiyle listelenir.
- **Gerçek Zamanlı QR Üretimi:** Masalar için tek tıkla yüksek çözünürlüklü QR kodları oluşturma ve indirme.
- **Resim Yükleme Entegrasyonu:** IMGBB API ile sunucu maliyeti olmadan ürün görsellerini ve restoran logolarını bulutta saklama.

## 🚀 Teknolojik Altyapı

Bu proje, yüksek performans ve SEO uyumluluğu için **Next.js (App Router)** kullanılarak geliştirilmiştir.

- **Frontend:** React, Next.js, CSS Modules & Variables (Tailwind kullanılmadan saf, özelleştirilebilir CSS mimarisi).
- **Backend (API):** Next.js Route Handlers.
- **Veritabanı:** PostgreSQL (Neon Tech Serverless).
- **ORM:** Prisma.
- **Görsel Depolama:** ImgBB API.

## 🛠️ Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/alikuccuk44-hub/qr-menu.git
cd qr-menu
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Ortam Değişkenlerini (Environment Variables) Ayarlayın
Ana dizinde `.env` adında bir dosya oluşturun ve veritabanı ile API anahtarlarınızı girin:
```env
DATABASE_URL="postgresql://kullanici_adi:sifre@neon_adresi.aws.neon.tech/neondb?sslmode=require"
IMGBB_API_KEY="sizin_imgbb_api_anahtariniz"
ADMIN_PASSWORD="admin"
```

### 4. Veritabanını Hazırlayın
```bash
npx prisma generate
npx prisma db push
```

### 5. Uygulamayı Başlatın
```bash
npm run dev
```
Uygulama `http://localhost:3000` adresinde çalışmaya başlayacaktır.

## 💼 KOBİ'ler (Restoranlar) İçin SaaS Modeline Geçiş

Mevcut proje yapısı **"Dijital Ajans" (Single-Tenant)** modeliyle çalışmaya hazır durumdadır. Her yeni restoran müşteriniz için bu Vercel projesini kopyalayıp (fork) onlara özel bir alan adı (`menu.restoranadi.com`) bağlayabilirsiniz.

Gelecekte sistemi **"Gerçek SaaS" (Multi-Tenant)** modeline taşımak isterseniz; `NextAuth.js` eklenerek ve veritabanı sorguları `restaurantId` filtreleriyle güncellenerek, binlerce restoranın tek bir veritabanı üzerinden yönetilebileceği yapıya kolayca evrilebilir.

---
*Bu proje modern web standartlarında, performans ve estetik odaklı olarak geliştirilmiştir.*

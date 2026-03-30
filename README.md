# Bantas Admin Panel Backend

Node.js + Express + Prisma backend API for Bantas content management system.

## 🚀 Kurulum

### 1. Bağımlılıkları Yükle
```bash
cd backend
npm install
```

### 2. Veritabanını Oluştur
```bash
npm run prisma:generate
npm run prisma:migrate
```

### 3. Upload Klasörlerini Oluştur
```bash
mkdir -p uploads/products uploads/before-after uploads/about
```

### 4. Sunucuyu Başlat
```bash
# Development
npm run dev

# Production
npm start
```

Sunucu `http://localhost:5000` adresinde çalışacak.

## 📁 Klasör Yapısı

```
backend/
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── routes/            # API routes
│   │   ├── products.js
│   │   ├── beforeAfter.js
│   │   ├── advantages.js
│   │   ├── announcements.js
│   │   ├── about.js
│   │   └── footer.js
│   └── server.js          # Main server file
├── uploads/               # Uploaded files
├── .env                   # Environment variables
└── package.json
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Tüm ürünleri listele
- `GET /api/products/:id` - Tek ürün detayı
- `POST /api/products` - Yeni ürün ekle (multipart/form-data)
- `PUT /api/products/:id` - Ürün güncelle (multipart/form-data)
- `DELETE /api/products/:id` - Ürün sil

### Before/After
- `GET /api/before-after` - Tüm before/after'ları listele
- `POST /api/before-after` - Yeni ekle (multipart/form-data)
- `PUT /api/before-after/:id` - Güncelle (multipart/form-data)
- `DELETE /api/before-after/:id` - Sil

### Advantages
- `GET /api/advantages` - Tüm avantajları listele
- `POST /api/advantages` - Yeni avantaj ekle
- `PUT /api/advantages/:id` - Avantaj güncelle
- `DELETE /api/advantages/:id` - Avantaj sil

### Announcements
- `GET /api/announcements` - Tüm duyuruları listele
- `GET /api/announcements/active` - Aktif duyuru
- `POST /api/announcements` - Yeni duyuru ekle
- `PUT /api/announcements/:id` - Duyuru güncelle
- `DELETE /api/announcements/:id` - Duyuru sil

### About
- `GET /api/about` - Hakkımızda bilgisi
- `POST /api/about` - Yeni ekle (multipart/form-data)
- `PUT /api/about/:id` - Güncelle (multipart/form-data)

### Footer
- `GET /api/footer/info` - Footer bilgileri
- `PUT /api/footer/info/:id` - Footer bilgileri güncelle
- `GET /api/footer/links` - Footer linkleri
- `POST /api/footer/links` - Yeni link ekle
- `PUT /api/footer/links/:id` - Link güncelle
- `DELETE /api/footer/links/:id` - Link sil

## 🗄️ Database Schema

SQLite veritabanı kullanılıyor. Schema detayları `prisma/schema.prisma` dosyasında.

### Models:
- ProductCategory
- BeforeAfter
- Advantage
- AnnouncementBar
- AboutSection
- FooterInfo
- FooterLink

## 🔧 Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# Open Prisma Studio (GUI)
npm run prisma:studio
```

## 📝 Environment Variables

`.env` dosyası:
```
DATABASE_URL="file:./dev.db"
PORT=5000
NODE_ENV=development
```

## 🔒 CORS

CORS tüm origin'lere açık. Production'da güvenlik için kısıtlama ekleyin.

## 📤 File Upload

Multer kullanılıyor. Dosyalar `uploads/` klasörüne kaydediliyor.

**Maksimum dosya boyutu:** Varsayılan (sınırsız)
**İzin verilen formatlar:** Tüm görseller (image/*)

# Railway PostgreSQL - PSQL ile Veritabanı Kurulumu

## 🔗 Bağlantı Bilgilerin

```bash
PGPASSWORD=WyzVGFTAvzETjfkWwpSQxlVTSUTOvHEE psql -h gondola.proxy.rlwy.net -U postgres -p 25356 -d railway
```

## 📋 Adım Adım Kurulum

### 1. Schema'yı PostgreSQL'e Çevir

**prisma/schema.prisma** dosyasını aç ve değiştir:

```prisma
datasource db {
  provider = "postgresql"  // sqlite yerine postgresql
  url      = env("DATABASE_URL")
}
```

### 2. .env Dosyasını Güncelle

**backend/.env** dosyasına Railway connection string'i ekle:

```env
DATABASE_URL="postgresql://postgres:WyzVGFTAvzETjfkWwpSQxlVTSUTOvHEE@gondola.proxy.rlwy.net:25356/railway"
```

### 3. Migration Oluştur (Local)

Visual Studio terminalinde:

```bash
# Backend klasöründe
cd C:\Users\Mercan Danışmanl\Desktop\Bantas\backend

# Migration oluştur
npx prisma migrate dev --name init
```

Bu komut:
- `prisma/migrations/` klasörü oluşturur
- Migration SQL dosyası oluşturur
- **Otomatik olarak Railway database'ine uygular** (DATABASE_URL kullanarak)

### 4. Seed Data Ekle

```bash
npm run db:seed
```

## ✅ Hepsi Bu Kadar!

Artık senin 2 komutun:

```bash
# 1. Migration oluştur ve uygula
npx prisma migrate dev --name init

# 2. Seed data ekle
npm run db:seed
```

## 🔄 Sonraki Değişiklikler

Schema değişikliği yaptığında:

```bash
# Migration oluştur ve otomatik uygula
npx prisma migrate dev --name your_change_name
```

## 📝 Manuel PSQL Kullanımı (Opsiyonel)

Eğer manuel SQL çalıştırmak istersen:

```bash
# Railway PostgreSQL'e bağlan
PGPASSWORD=WyzVGFTAvzETjfkWwpSQxlVTSUTOvHEE psql -h gondola.proxy.rlwy.net -U postgres -p 25356 -d railway

# Tabloları listele
\dt

# SQL çalıştır
SELECT * FROM "MenuCategory";

# Çıkış
\q
```

## 🎯 Özet

1. **Schema'yı PostgreSQL'e çevir** (provider = "postgresql")
2. **.env'e Railway connection string ekle**
3. **Visual Studio terminalinde:**
   ```bash
   npx prisma migrate dev --name init
   npm run db:seed
   ```
4. **Bitti!** Migration otomatik Railway'e uygulandı

Prisma migration komutu DATABASE_URL'i kullanarak otomatik olarak Railway database'ine bağlanır ve migration'ı uygular. PSQL'e manuel bağlanmana gerek yok! 🚀

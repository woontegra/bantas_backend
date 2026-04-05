# Railway Deployment Guide - Terminal Only

## 🚂 Railway CLI Kurulum

```bash
# Railway CLI'yi global olarak yükle
npm install -g @railway/cli

# Railway'e login ol
railway login
```

## 📦 Deployment Adımları

### 1. Railway Projesi Oluştur

```bash
# Backend klasöründe
cd C:\Users\Mercan Danışmanl\Desktop\Bantas\backend

# Yeni Railway projesi oluştur
railway init

# Veya mevcut projeye bağlan
railway link
```

### 2. PostgreSQL Database Ekle

```bash
# Railway dashboard'dan PostgreSQL ekle (CLI'den ekleme)
railway add

# Veya direkt PostgreSQL ekle
railway add --database postgresql
```

### 3. Environment Variables Ayarla

```bash
# DATABASE_URL otomatik eklenir, diğerlerini manuel ekle
railway variables set NODE_ENV=production
railway variables set PORT=3000

# Tüm değişkenleri görmek için
railway variables
```

### 4. Schema'yı PostgreSQL'e Güncelle

**prisma/schema.prisma** dosyasını düzenle:

```prisma
datasource db {
  provider = "postgresql"  // sqlite yerine postgresql
  url      = env("DATABASE_URL")
}
```

### 5. Prisma Client'ı Yeniden Oluştur

```bash
npm run db:generate
```

### 6. Build Script Ekle

**package.json**'a ekle:

```json
"scripts": {
  "build": "prisma generate",
  "deploy": "prisma migrate deploy && npm run db:seed"
}
```

### 7. Railway'e Deploy Et

```bash
# İlk deployment
railway up

# Veya git push ile otomatik deploy
git add .
git commit -m "Initial deployment"
railway up
```

### 8. Database Migration Çalıştır

```bash
# Railway ortamında migration çalıştır
railway run npm run db:migrate

# Veya seed data ekle
railway run npm run db:seed
```

### 9. Logs İzle

```bash
# Canlı log izle
railway logs

# Son 100 log satırı
railway logs --tail 100
```

## 🔧 Önemli Komutlar

```bash
# Proje durumunu kontrol et
railway status

# Environment variables listele
railway variables

# Shell aç (database'e bağlan)
railway shell

# Service'i yeniden başlat
railway restart

# Domain ekle
railway domain

# Deployment geçmişi
railway deployments
```

## 📝 package.json Güncellemesi

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "build": "prisma generate",
    "deploy": "prisma migrate deploy && node prisma/seed.js",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate deploy",
    "db:studio": "prisma studio",
    "db:seed": "node prisma/seed.js"
  }
}
```

## 🗄️ Migration Oluşturma (Local)

Railway için migration dosyaları gerekli. Senin alışık olduğun komut:

```bash
# Backend klasöründe
cd C:\Users\Mercan Danışmanl\Desktop\Bantas\backend

# Migration oluştur (ilk kez)
npx prisma migrate dev --name init

# Veya sonraki değişiklikler için
npx prisma migrate dev --name your_change_name

# Migration dosyaları prisma/migrations/ klasörüne oluşur
# Bu dosyaları git'e commit et
```

**Veya batch dosyası ile:**
```bash
# CREATE_MIGRATION.bat dosyasını çalıştır
CREATE_MIGRATION.bat
```

## 🚀 Production Deployment Workflow

```bash
# 1. Local'de değişiklik yap
# 2. Migration oluştur
npx prisma migrate dev --name your_change_name

# 3. Git'e commit et
git add .
git commit -m "Add new feature"

# 4. Railway'e deploy et
railway up

# 5. Migration'ı production'da çalıştır
railway run npm run db:migrate

# 6. Seed data gerekiyorsa
railway run npm run db:seed
```

## 🔗 Frontend'i Railway Backend'e Bağlama

Railway deployment'tan sonra URL alacaksın (örn: `https://bantas-backend-production.up.railway.app`)

Frontend'te API URL'ini güncelle:

```bash
# Frontend .env
NEXT_PUBLIC_API_URL=https://bantas-backend-production.up.railway.app
```

## ⚠️ Önemli Notlar

1. **SQLite → PostgreSQL**: Railway'de SQLite çalışmaz, PostgreSQL kullan
2. **Migrations**: Migration dosyaları git'e commit edilmeli
3. **Environment Variables**: Railway dashboard'dan veya CLI ile ekle
4. **Seed Data**: İlk deployment'tan sonra `railway run npm run db:seed`
5. **Logs**: Hata durumunda `railway logs` ile kontrol et

## 🎯 Hızlı Deploy (Özet)

```bash
# 1. Railway CLI kur
npm install -g @railway/cli

# 2. Login
railway login

# 3. Proje oluştur
railway init

# 4. PostgreSQL ekle
railway add

# 5. Schema'yı güncelle (postgresql)
# prisma/schema.prisma dosyasını düzenle

# 6. Deploy
railway up

# 7. Migration çalıştır
railway run npx prisma migrate deploy

# 8. Seed data
railway run npm run db:seed

# 9. URL'i al
railway domain
```

## 📊 Database Yönetimi (Terminal)

```bash
# Railway PostgreSQL'e bağlan
railway connect postgres

# Veya connection string al
railway variables get DATABASE_URL

# psql ile bağlan
psql "railway-connection-string-buraya"
```

## 🔄 Güncelleme Workflow

```bash
# Kod değişikliği yap
git add .
git commit -m "Update"

# Deploy
railway up

# Migration varsa çalıştır
railway run npm run db:migrate
```

Tamamen terminal bazlı, GUI yok! 🚀

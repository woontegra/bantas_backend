# Railway Deployment - Senin Alışık Olduğun Şekilde (Git Bazlı)

## 🎯 Railway CLI Kullanmadan Deployment

Railway'e CLI olmadan, sadece GitHub/GitLab ile deploy edebilirsin.

## 📋 Adım Adım (Web Interface)

### 1. Railway Hesabı Aç
- https://railway.app adresine git
- GitHub ile login ol

### 2. Yeni Proje Oluştur
- "New Project" butonuna tıkla
- "Deploy from GitHub repo" seç
- Backend repository'ni seç

### 3. PostgreSQL Ekle
- Proje içinde "New" butonuna tıkla
- "Database" → "Add PostgreSQL" seç
- Otomatik `DATABASE_URL` environment variable oluşur

### 4. Environment Variables Ayarla
- Settings → Variables
- Gerekli değişkenleri ekle:
  ```
  NODE_ENV=production
  PORT=3000
  ```

### 5. Build & Deploy Settings
- Settings → Deploy
- Build Command: `npm install && npm run build`
- Start Command: `npm start`

### 6. İlk Deployment
- Railway otomatik deploy edecek
- Veya "Deploy" butonuna tıkla

### 7. Database Migration (İlk Kez)
Railway dashboard'dan terminal aç:
- "..." menüsü → "Terminal"
- Şu komutları çalıştır:
  ```bash
  npm run db:migrate
  npm run db:seed
  ```

## 🔄 Sonraki Deploymentlar

Artık sadece git push yeterli:

```bash
git add .
git commit -m "Update"
git push
```

Railway otomatik deploy eder!

## 🗄️ Senin Alışık Olduğun 2 Komut Workflow

### Local Development (SQLite)

```bash
# 1. Migration oluştur
npx prisma migrate dev --name init

# 2. Seed data
npm run db:seed
```

### Railway Production (PostgreSQL)

Railway'de ilk kez:
1. Web interface'den PostgreSQL ekle
2. Terminal aç (dashboard'dan)
3. Şu 2 komutu çalıştır:

```bash
npm run db:migrate
npm run db:seed
```

Sonraki güncellemeler:
```bash
# Sadece git push
git push
```

## 📝 Prisma Schema Değişikliği

Local'de SQLite, Railway'de PostgreSQL kullanmak için:

**prisma/schema.prisma** dosyasını şu şekilde güncelle:

```prisma
datasource db {
  provider = "postgresql"  // Production için
  // provider = "sqlite"   // Local development için
  url      = env("DATABASE_URL")
}
```

**Veya environment variable ile:**

```prisma
datasource db {
  provider = env("DATABASE_PROVIDER")
  url      = env("DATABASE_URL")
}
```

**.env (local):**
```
DATABASE_PROVIDER="sqlite"
DATABASE_URL="file:./dev.db"
```

**Railway (production):**
```
DATABASE_PROVIDER="postgresql"
DATABASE_URL="postgresql://..." (otomatik oluşur)
```

## 🎯 Özet - Senin İçin En Basit Yol

### İlk Kurulum (Bir Kez)
1. Railway.app'e git → GitHub ile login
2. "New Project" → Backend repo'yu seç
3. "Add PostgreSQL" ekle
4. Dashboard'dan terminal aç
5. `npm run db:migrate` çalıştır
6. `npm run db:seed` çalıştır

### Her Güncelleme
```bash
git add .
git commit -m "Update"
git push
```

Railway otomatik deploy eder!

## ⚡ Hızlı Başlangıç

1. **Railway.app'e git** → GitHub login
2. **New Project** → Backend repo seç
3. **Add PostgreSQL**
4. **Terminal aç** (dashboard'dan)
5. **2 komut çalıştır:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```
6. **Bitti!** Artık sadece `git push` yeterli

CLI yok, sadece web interface ve git! 🚀

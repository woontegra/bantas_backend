# .env Dosyası Kurulumu

## 📝 .env Dosyasını Oluştur

Backend klasöründe `.env` dosyası oluştur ve şu satırı ekle:

```env
DATABASE_URL="postgresql://postgres:WyzVGFTAvzETjfkWwpSQxlVTSUTOvHEE@gondola.proxy.rlwy.net:25356/railway"
```

## 🎯 Tam .env İçeriği

```env
# Railway PostgreSQL
DATABASE_URL="postgresql://postgres:WyzVGFTAvzETjfkWwpSQxlVTSUTOvHEE@gondola.proxy.rlwy.net:25356/railway"

# Server
PORT=3000
NODE_ENV=development
```

## ✅ Kontrol Et

`.env` dosyası şu şekilde olmalı:
- Dosya yolu: `C:\Users\Mercan Danışmanl\Desktop\Bantas\backend\.env`
- İçerik: Railway PostgreSQL connection string

Artık migration komutlarını çalıştırabilirsin! 🚀

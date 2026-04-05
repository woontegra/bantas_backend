@echo off
echo ========================================
echo Railway PostgreSQL Setup
echo ========================================
echo.

echo Adim 1: Schema PostgreSQL'e cevriliyor...
echo prisma/schema.prisma dosyasinda provider = "postgresql" oldugundan emin ol!
echo.
pause

echo.
echo Adim 2: .env dosyasini kontrol et...
echo DATABASE_URL Railway connection string'i icermeli!
echo.
pause

echo.
echo Adim 3: Migration olusturuluyor ve Railway'e uygulaniyor...
npx prisma migrate dev --name init
echo.

echo.
echo Adim 4: Seed data ekleniyor...
npm run db:seed
echo.

echo.
echo ========================================
echo Railway Database Kurulumu Tamamlandi!
echo ========================================
pause

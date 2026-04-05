@echo off
echo ========================================
echo SQLite'tan PostgreSQL'e Gecis
echo ========================================
echo.

echo Eski migration dosyalarini siliyorum...
if exist "prisma\migrations" (
    rmdir /s /q "prisma\migrations"
    echo Migrations klasoru silindi.
) else (
    echo Migrations klasoru zaten yok.
)

if exist "prisma\dev.db" (
    del /f "prisma\dev.db"
    echo SQLite database silindi.
)

if exist "prisma\dev.db-journal" (
    del /f "prisma\dev.db-journal"
    echo SQLite journal silindi.
)

echo.
echo Yeni PostgreSQL migration olusturuluyor...
npx prisma migrate dev --name init

echo.
echo ========================================
echo Migration Tamamlandi!
echo ========================================
echo.
echo Simdi seed data eklemek icin:
echo npm run db:seed
echo.
pause

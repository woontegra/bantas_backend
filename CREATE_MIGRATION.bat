@echo off
echo Creating Prisma migration...
cd /d "%~dp0"
npx prisma migrate dev --name init
pause

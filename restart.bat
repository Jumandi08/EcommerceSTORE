@echo off
echo Limpiando procesos Node.js...
taskkill /F /IM node.exe /T 2>nul

echo Esperando 3 segundos...
timeout /t 3 /nobreak >nul

echo Limpiando directorio .next del frontend...
cd frontend-ecommerce
if exist .next rmdir /s /q .next
cd ..

echo.
echo ===========================================
echo INSTRUCCIONES:
echo ===========================================
echo.
echo 1. BACKEND - Abre una terminal y ejecuta:
echo    cd backend-ecommerce
echo    npm run develop
echo.
echo 2. Espera a que Strapi inicie completamente
echo.
echo 3. FRONTEND - Abre OTRA terminal y ejecuta:
echo    cd frontend-ecommerce
echo    npm run dev
echo.
echo ===========================================
pause

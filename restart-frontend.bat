@echo off
echo ========================================
echo REINICIANDO FRONTEND
echo ========================================
echo.

echo [1/3] Matando procesos Node.js...
taskkill /F /IM node.exe /T >nul 2>&1

echo [2/3] Esperando 3 segundos...
timeout /t 3 /nobreak >nul

echo [3/3] Limpiando directorio .next...
cd frontend-ecommerce
if exist .next (
    rmdir /s /q .next 2>nul
    if exist .next (
        echo ADVERTENCIA: No se pudo eliminar .next completamente
        echo Intenta cerrar VS Code y otras aplicaciones que puedan estar usando archivos
    ) else (
        echo OK: Directorio .next eliminado
    )
) else (
    echo OK: No existe directorio .next
)

echo.
echo ========================================
echo AHORA EJECUTA:
echo ========================================
echo.
echo cd frontend-ecommerce
echo npm run dev
echo.
echo ========================================
cd ..
pause

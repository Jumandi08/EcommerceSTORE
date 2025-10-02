# 🔧 Problemas Detectados y Soluciones

## 📊 Estado Actual

### Backend (Strapi) ✅ FUNCIONANDO
- **Puerto**: 1337
- **URL**: http://localhost:1337
- **Estado**: Corriendo correctamente

### Frontend (Next.js) ❌ TIENE PROBLEMAS
- **Error**: Archivo bloqueado en `.next/trace`
- **Causa**: Proceso Node.js anterior no se cerró correctamente

---

## 🚨 Problema Principal: Error 403 en API

### Síntomas
```
GET /api/products?filters[isFeatured][$eq]=true&populate=* (16 ms) 403
GET /api/products?populate=*&filters[category][slug][$eq]=open-box (14 ms) 403
```

### Causa
**Los permisos de la API no están configurados en Strapi**

### ✅ Solución CRÍTICA

1. **Ve a http://localhost:1337/admin**
2. **Inicia sesión** con tu cuenta de administrador
3. **Settings** (⚙️ en la barra lateral) → **Users & Permissions Plugin** → **Roles**
4. **Click en "Public"**
5. **Marca las siguientes casillas:**

   **Product:**
   - ☑️ find
   - ☑️ findOne

   **Category:**
   - ☑️ find
   - ☑️ findOne

   **Order:**
   - ☑️ find (opcional, para ver pedidos)
   - ☑️ create (necesario para crear pedidos)

   **Auth (Users-permissions):**
   - ☑️ login
   - ☑️ register
   - ☑️ callback

6. **Click en "Save"** en la esquina superior derecha

---

## 🔄 Cómo Reiniciar Correctamente

### Opción 1: Usar el Script (RECOMENDADO)

1. **Cierra todas las terminales** que estén corriendo Node.js
2. **Doble click** en `restart.bat` (en la carpeta MeEcommerse)
3. **Sigue las instrucciones** que aparecen en pantalla

### Opción 2: Manual

**Paso 1: Cerrar todo**
```bash
# En una terminal CMD:
taskkill /F /IM node.exe /T
```

**Paso 2: Limpiar frontend**
```bash
cd C:\Users\Jumandi\Pictures\MeEcommerse\frontend-ecommerce
rmdir /s /q .next
```

**Paso 3: Iniciar Backend**
```bash
cd C:\Users\Jumandi\Pictures\MeEcommerse\backend-ecommerce
npm run develop
```

**Paso 4: Esperar a que Strapi diga:**
```
✔ Strapi started successfully
```

**Paso 5: En OTRA terminal, iniciar Frontend**
```bash
cd C:\Users\Jumandi\Pictures\MeEcommerse\frontend-ecommerce
npm run dev
```

---

## ⚙️ Agregar Stock a Productos

**IMPORTANTE**: Después de configurar los permisos, debes agregar stock a tus productos:

1. Ve a http://localhost:1337/admin
2. **Content Manager** → **Product** (Collection Types)
3. Para CADA producto:
   - Click en el nombre del producto
   - Busca el campo **"Stock"**
   - Ingresa un número (ej: 10, 20, 50, 100)
   - Click en **"Save"**
   - Click en **"Publish"** (si está en borrador)

---

## 🐛 Otros Errores Comunes

### Error: "Port 3000 is in use"
**Solución**: Next.js usa automáticamente el puerto 3001. Esto es normal.

### Error: "Cannot connect to backend"
**Verificar**:
- ✅ Strapi está corriendo en http://localhost:1337
- ✅ El archivo `.env.local` en frontend tiene:
  ```
  NEXT_PUBLIC_BACKEND_URL=http://localhost:1337
  ```

### Error: "Products not loading"
**Solución**:
1. Verifica que los permisos estén configurados (ver arriba)
2. Verifica que tus productos tengan stock > 0
3. Abre la consola del navegador (F12) y busca errores

### Error: "Login/Register not working"
**Verificar**:
1. Permisos de auth configurados en Strapi
2. Backend corriendo
3. Consola del navegador para ver el error exacto

---

## 📝 Checklist Final

Antes de decir que todo funciona, verifica:

- [ ] Backend corriendo en http://localhost:1337
- [ ] Frontend corriendo en http://localhost:3000 o 3001
- [ ] Permisos configurados en Strapi (Public role)
- [ ] Stock agregado a al menos 1 producto
- [ ] Puedes ver productos en la página principal
- [ ] Puedes hacer click en un producto y ver sus detalles
- [ ] Puedes agregar un producto al carrito
- [ ] Puedes registrarte como usuario
- [ ] Puedes iniciar sesión

---

## 🆘 Si Nada Funciona

1. **Ejecuta `restart.bat`**
2. **Espera a que Strapi cargue completamente** (verás "Strapi started successfully")
3. **Configura los permisos** siguiendo la sección "Solución CRÍTICA"
4. **Agrega stock** a al menos un producto
5. **Inicia el frontend** en otra terminal
6. **Abre http://localhost:3000** (o el puerto que te indique)

Si después de esto sigue sin funcionar, necesitarás:
- Revisar la consola del navegador (F12 → Console)
- Revisar los logs de las terminales de backend y frontend
- Verificar que no haya un firewall bloqueando los puertos 1337 y 3000/3001

---

## 📞 Logs Útiles

**Backend funcionando correctamente:**
```
✔ Strapi started successfully
[info]: Strapi started successfully
```

**Frontend funcionando correctamente:**
```
✓ Ready in 2.3s
○ Compiling / ...
✓ Compiled / in 1234ms
```

**API funcionando (código 200):**
```
[http]: GET /api/products?populate=* (10 ms) 200
```

**API con error de permisos (código 403):**
```
[http]: GET /api/products?populate=* (10 ms) 403  ← ESTO ES MALO
```

---

¡Todo configurado! 🎉

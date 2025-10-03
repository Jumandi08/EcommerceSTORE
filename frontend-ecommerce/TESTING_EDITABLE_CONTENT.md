# 🧪 Guía de Testing - Sistema de Edición de Contenido

## ⚠️ Problemas y Soluciones

### Problema: "No está funcional"

Si el sistema de edición no funciona, sigue estos pasos:

---

## 🔧 Método 1: Activar Modo Testing (Recomendado)

Para probar el sistema sin necesidad de estar logueado como admin:

### Paso 1: Editar el archivo de Sobre Nosotros

Abre: `app/(routes)/sobre-nosotros/page.tsx`

Busca estas líneas (alrededor de la línea 51-53):

```typescript
// Para testing: puedes forzar el modo admin descomentando la siguiente línea
// const isAdmin = true;
const isAdmin = isAdminAuth;
```

Cambia a:

```typescript
// Para testing: puedes forzar el modo admin descomentando la siguiente línea
const isAdmin = true;  // ← DESCOMENTA ESTA LÍNEA
// const isAdmin = isAdminAuth;  // ← COMENTA ESTA LÍNEA
```

### Paso 2: Guardar y reiniciar el servidor

```bash
# Si el servidor está corriendo, detenlo (Ctrl+C)
npm run dev
```

### Paso 3: Probar la funcionalidad

1. Abre el navegador en `http://localhost:3000/sobre-nosotros`
2. Deberías ver un botón flotante en la esquina inferior derecha: **"Modo Administrador Activo"**
3. Pasa el mouse sobre cualquier texto editable
4. Aparecerá un botón **✏️** en la esquina superior derecha
5. Haz clic para editar

---

## 🔐 Método 2: Usar Cuenta de Administrador Real

Si quieres probar con autenticación real:

### Paso 1: Crear usuario administrador en el backend

En tu backend Strapi:

1. Ve a `Content Manager` → `User`
2. Edita tu usuario
3. Activa el campo `isAdmin` a `true`
4. Guarda

### Paso 2: Login en el frontend

1. Ve a `/auth/login`
2. Ingresa con las credenciales del usuario admin
3. Una vez logueado, ve a `/sobre-nosotros`
4. Deberías ver el modo administrador activo

---

## 🐛 Debugging

### Verificar si el componente se está renderizando

Abre la consola del navegador (F12) y ejecuta:

```javascript
// Verificar si React está renderizando el componente
document.querySelector('[class*="AdminToolbar"]')
```

Si retorna `null`, el componente no se está renderizando.

### Verificar el estado de isAdmin

Agrega este console.log en `sobre-nosotros/page.tsx` (después de la línea 53):

```typescript
const isAdmin = isAdminAuth;

// Debug: ver valor de isAdmin
console.log('🔍 isAdmin value:', isAdmin);
console.log('🔍 isAdminAuth value:', isAdminAuth);
```

Recarga la página y revisa la consola.

### Verificar el localStorage

En la consola del navegador:

```javascript
// Ver el estado de autenticación guardado
JSON.parse(localStorage.getItem('auth-storage'))
```

Deberías ver algo como:

```json
{
  "state": {
    "user": {...},
    "isAuthenticated": true,
    "isAdmin": true  // ← Este debe ser true
  }
}
```

---

## 📝 Checklist de Verificación

- [ ] El servidor de desarrollo está corriendo (`npm run dev`)
- [ ] No hay errores de compilación en la terminal
- [ ] La página `/sobre-nosotros` se carga correctamente
- [ ] El componente `EditableText` está importado
- [ ] El hook `useAuth` está importado
- [ ] El componente `AdminToolbar` está en el JSX
- [ ] La variable `isAdmin` tiene el valor correcto
- [ ] El API endpoint está creado en `/api/content/sobre-nosotros/route.ts`

---

## 🔍 Verificar que los archivos existen

Ejecuta estos comandos para verificar:

```bash
# Verificar componente editable
dir components\editable-content.tsx

# Verificar API endpoint
dir app\api\content\sobre-nosotros\route.ts

# Verificar hook de toast
dir hooks\use-toast.ts

# Verificar componente textarea
dir components\ui\textarea.tsx
```

---

## ⚡ Solución Rápida: Compilar Todo

Si nada funciona, intenta recompilar:

```bash
# Detener el servidor (Ctrl+C)

# Limpiar caché y node_modules (opcional pero recomendado)
if exist .next rmdir /s /q .next

# Reinstalar dependencias (solo si hay problemas)
# npm install

# Iniciar servidor
npm run dev
```

---

## 🎯 Testing del API Endpoint

Puedes probar el endpoint directamente con curl o Postman:

### GET - Obtener contenido

```bash
curl http://localhost:3000/api/content/sobre-nosotros
```

Deberías recibir:

```json
{
  "success": true,
  "data": {
    "hero": {
      "title": "Innovatech Solutions",
      "description": "..."
    },
    ...
  }
}
```

### PATCH - Actualizar contenido

```bash
curl -X PATCH http://localhost:3000/api/content/sobre-nosotros \
  -H "Content-Type: application/json" \
  -d "{\"field\": \"hero.title\", \"value\": \"Nuevo Título\"}"
```

---

## 📊 Estados del Sistema

| Estado | Descripción | Solución |
|--------|-------------|----------|
| ✅ Modo Admin Visible | Todo funciona | - |
| ❌ No hay botón de edición | `isAdmin` es `false` | Activar modo testing |
| ❌ Error al guardar | API no responde | Verificar endpoint |
| ❌ No compila | Falta dependencia | `npm install` |
| ❌ Botones no aparecen | CSS no carga | Limpiar `.next` |

---

## 🚀 Pasos para Producción

Cuando todo funcione en desarrollo:

1. **Desactivar modo testing**:
   ```typescript
   // const isAdmin = true;  // ← COMENTAR
   const isAdmin = isAdminAuth;  // ← DESCOMENTAR
   ```

2. **Implementar verificación real en API**:
   Editar `app/api/content/sobre-nosotros/route.ts`:
   ```typescript
   async function isAdmin(request: NextRequest): Promise<boolean> {
     // Cambiar return true por verificación real
     const cookieStore = await cookies();
     const authData = cookieStore.get('auth-storage')?.value;
     if (!authData) return false;
     const parsedAuth = JSON.parse(authData);
     return parsedAuth?.state?.isAdmin === true;
   }
   ```

3. **Conectar con base de datos**:
   - Guardar contenido en MongoDB/PostgreSQL/MySQL
   - Implementar versionado de cambios
   - Agregar log de auditoría

---

## 💡 Tips

- **Modo Testing**: Usa `const isAdmin = true;` solo en desarrollo
- **Console.log**: Agrega logs para debugging
- **React DevTools**: Instala la extensión para ver el estado de componentes
- **Network Tab**: Revisa las llamadas al API en las DevTools

---

## ❓ Preguntas Frecuentes

### ¿Por qué no veo el botón de edición?

- Verifica que `isAdmin` sea `true`
- Verifica que el mouse esté sobre el elemento
- Verifica que no haya errores en consola

### ¿Por qué dice "Error al guardar"?

- El API endpoint no está respondiendo
- Verifica que el archivo `route.ts` exista
- Revisa la consola del servidor (terminal)

### ¿Los cambios se guardan permanentemente?

- En desarrollo: NO (se guardan en memoria)
- En producción: Debes implementar persistencia en BD

---

**Última actualización**: ${new Date().toLocaleDateString('es-ES')}

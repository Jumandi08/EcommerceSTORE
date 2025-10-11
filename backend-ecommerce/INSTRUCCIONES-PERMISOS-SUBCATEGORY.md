# 🔧 Configurar Permisos para Subcategorías

## ❌ Error Detectado

```
GET /api/subcategories ... 403 Forbidden
```

El endpoint de subcategorías no tiene permisos públicos configurados en Strapi.

## ✅ Solución: Habilitar Permisos Públicos

Sigue estos pasos en el panel de Strapi:

### 1. Accede al Panel de Strapi
Ve a: `http://localhost:1337/admin`

### 2. Navega a Settings → Roles
1. Click en el menú lateral: **Settings** (⚙️)
2. Click en: **Users & Permissions Plugin**
3. Click en: **Roles**

### 3. Editar Rol "Public"
1. Click en el rol **"Public"**
2. Busca la sección: **Subcategory**

### 4. Habilitar Permisos
Marca las siguientes casillas:

✅ **find** - Permite obtener lista de subcategorías
✅ **findOne** - Permite obtener una subcategoría por ID

**NO MARQUES:**
❌ create
❌ update
❌ delete

### 5. Guardar
1. Scroll hasta arriba
2. Click en **"Save"** (botón verde arriba a la derecha)

---

## 🎯 Resultado Esperado

Después de guardar, el endpoint debería responder:
```
GET /api/subcategories ... 200 OK
```

Y el menú de "Accesorios" mostrará las subcategorías correctamente.

---

## 📝 Alternativa: Archivo de Configuración

Si prefieres configurar por código, crea este archivo:

**Archivo**: `config/plugins.js`

```javascript
module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      register: {
        allowedFields: ['username', 'email', 'password'],
      },
    },
  },
});
```

Pero la forma más sencilla es hacerlo desde el panel de administración.

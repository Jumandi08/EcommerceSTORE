# 🛠️ Guía de Configuración del Proyecto E-commerce

## ✅ Cambios Implementados

### 1. **Seguridad - Variables de Entorno**
- ✅ Archivo `.env` creado con secretos seguros generados automáticamente
- ✅ Credenciales de base de datos protegidas
- ✅ Base de datos cambiada a SQLite para desarrollo (más simple)
- ✅ Archivos `.env.example` creados como plantilla

### 2. **Sistema de Autenticación**
- ✅ Hook `useAuth` para manejo de login/registro/logout
- ✅ Páginas de Login (`/auth/login`) y Registro (`/auth/register`)
- ✅ Integración con Strapi Users-Permissions
- ✅ Navbar actualizado con menú de usuario autenticado

### 3. **Gestión de Inventario/Stock**
- ✅ Campo `stock` agregado al modelo de productos
- ✅ Validación de stock al agregar al carrito
- ✅ Controles de cantidad (+/-) en el carrito
- ✅ Prevención de comprar más del stock disponible
- ✅ Cálculo correcto del total con cantidades

### 4. **Modelo de Pedidos (Orders)**
- ✅ Schema completo de Order creado en Strapi
- ✅ Relación con usuarios
- ✅ Estados de pedido (pending, processing, shipped, delivered, cancelled)

---

## 🚀 Instrucciones de Inicio

### **Backend (Strapi)**

El backend ya está corriendo en http://localhost:1337

Si necesitas reiniciarlo:

```bash
cd C:\Users\Jumandi\Pictures\MeEcommerse\backend-ecommerce
npm run develop
```

**Primera vez:**
1. Ve a http://localhost:1337/admin
2. Crea tu cuenta de administrador
3. Configura los permisos de API:
   - Settings → Users & Permissions → Roles → Public
   - Marca las casillas necesarias para `product`, `category`, `order` (find, findOne)
   - Marca `auth` (login, register, callback)

### **Frontend (Next.js)**

```bash
cd C:\Users\Jumandi\Pictures\MeEcommerse\frontend-ecommerce
npm run dev
```

El frontend estará disponible en http://localhost:3000

---

## 📝 Configurar Productos con Stock

1. Ve al panel de administración de Strapi: http://localhost:1337/admin
2. Content Manager → Products
3. Para cada producto existente:
   - Haz clic en editar
   - Agrega un valor en el campo **Stock** (ej: 10, 20, 50)
   - Guarda los cambios
4. Los nuevos productos ya tendrán el campo stock disponible

---

## 🔐 Variables de Entorno

### Backend (`.env`)
- ✅ Ya configurado con secretos seguros
- Base de datos: SQLite (desarrollo)
- Puerto: 1337

### Frontend (`.env.local`)
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your_strapi_api_token_here
```

---

## 🎯 Funcionalidades Nuevas

### **Autenticación**
- **Login**: `/auth/login` - Email/usuario + contraseña
- **Registro**: `/auth/register` - Username, email, contraseña
- **Menú de usuario**: Click en ícono de usuario en navbar

### **Carrito Mejorado**
- Botones +/- para cambiar cantidades
- Validación de stock en tiempo real
- Muestra stock disponible
- Cálculo automático de subtotales y total

### **Gestión de Stock**
- No se puede agregar más productos del stock disponible
- Mensajes de error cuando stock es insuficiente
- Botón + deshabilitado cuando se alcanza el máximo

---

## ⚠️ Notas Importantes

1. **Archivo .env**: NO subas el archivo `.env` a Git (ya está en .gitignore)
2. **Base de datos SQLite**: Los datos se guardan en `backend-ecommerce/.tmp/data.db`
3. **Permisos de Strapi**: Asegúrate de configurar los permisos públicos para que el frontend pueda acceder a la API
4. **Stock en productos**: Recuerda agregar stock a los productos existentes desde el panel de admin

---

## 🔄 Si quieres volver a PostgreSQL

Edita `backend-ecommerce/.env`:

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=Ecomerce-store
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=tu_password_aqui
DATABASE_SSL=false
```

Luego reinicia Strapi.

---

## 📂 Estructura de Archivos Nuevos

```
backend-ecommerce/
├── .env                          # ✨ Variables de entorno seguras
├── .env.example                  # 📄 Plantilla de variables
└── src/api/order/                # ✨ Modelo de pedidos
    ├── content-types/order/schema.json
    ├── controllers/order.js
    ├── services/order.js
    └── routes/order.js

frontend-ecommerce/
├── .env.local                    # ✨ Variables del frontend
├── .env.example                  # 📄 Plantilla
├── hooks/
│   └── use-auth.tsx             # ✨ Hook de autenticación
└── app/(routes)/auth/           # ✨ Páginas de auth
    ├── login/page.tsx
    └── register/page.tsx
```

---

## 🐛 Troubleshooting

**Error al iniciar Strapi:**
- Verifica que el archivo `.env` exista
- Asegúrate de que no haya otro proceso usando el puerto 1337

**Error de autenticación en frontend:**
- Verifica que `NEXT_PUBLIC_BACKEND_URL` esté correctamente configurado
- Confirma que Strapi esté corriendo en http://localhost:1337

**Carrito no muestra stock:**
- Agrega el campo stock a tus productos desde el admin panel
- Refresca la página del producto

---

¡Todo listo! 🎉

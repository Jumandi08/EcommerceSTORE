# E-commerce Full Stack con Modelos 3D

E-commerce completo con Next.js 15 (frontend) y Strapi 5 (backend) con visualización 3D interactiva de productos.

## Stack Tecnológico

### Frontend
- **Next.js 15** con React 19 y TypeScript
- **Tailwind CSS** + shadcn/ui (Radix UI)
- **Three.js** (React Three Fiber + Drei) para modelos 3D
- **Framer Motion** para animaciones
- **Zustand** para manejo de estado
- **next-themes** para modo oscuro/claro

### Backend
- **Strapi 5** (CMS Headless)
- **PostgreSQL** (producción) / SQLite (desarrollo)
- **RESTful API** auto-generada

### DevOps
- **Docker** + Docker Compose
- **Nginx** con SSL (Let's Encrypt)
- **Dokploy** ready

## Características Principales

### E-commerce
- ✅ Catálogo de productos con stock
- ✅ Sistema de categorías
- ✅ Carrito de compras
- ✅ Sistema de pedidos con estados
- ✅ Sistema de reviews con calificaciones
- ✅ Autenticación de usuarios (login/registro)
- ✅ Perfil de usuario y historial de pedidos
- ✅ Favoritos/Wishlist

### Visualización 3D
- ✅ 5 modelos 3D procedurales premium (smartphone, laptop, airpods, tablet, smartwatch)
- ✅ Soporte para modelos GLB/GLTF personalizados
- ✅ Colores personalizables
- ✅ Hero dinámico con carrusel 3D
- ✅ Vista 3D en páginas de producto
- ✅ Interactividad completa (rotar, zoom)

### UI/UX
- ✅ Diseño responsive moderno
- ✅ Modo oscuro/claro
- ✅ Animaciones fluidas
- ✅ Componentes accesibles

## Inicio Rápido

### Desarrollo Local con Docker Compose

```bash
# 1. Clonar el repositorio
git clone <tu-repo>
cd MeEcommerse

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores

# 3. Iniciar servicios
docker-compose up -d

# 4. Esperar a que los servicios estén listos
docker-compose logs -f
```

**URLs:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:1337
- Panel Admin: http://localhost:1337/admin

### Desarrollo Manual

**Backend:**
```bash
cd backend-ecommerce
npm install
npm run develop
```

**Frontend:**
```bash
cd frontend-ecommerce
npm install
npm run dev
```

## Configuración Inicial

### 1. Generar Secretos para Strapi

```bash
# Ejecutar 4 veces para generar diferentes secretos
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Usar los valores generados para:
- `JWT_SECRET`
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`

Para `APP_KEYS`, generar 4 valores y separarlos con comas.

### 2. Configurar Permisos en Strapi

1. Ir a http://localhost:1337/admin
2. Crear cuenta de administrador
3. Ir a **Settings → Users & Permissions → Roles → Public**
4. Marcar permisos de lectura para:
   - Product: `find`, `findOne`
   - Category: `find`, `findOne`
   - Hero-slide: `find`, `findOne`
   - Review: `find`, `findOne`
5. Guardar

## Despliegue en Dokploy

### 1. Preparar el Backend (Strapi)

1. Crear aplicación en Dokploy
2. Conectar con este repositorio
3. Configurar:
   - **Build Path**: `backend-ecommerce`
   - **Dockerfile**: `Dockerfile`
   - **Port**: 1337

4. Variables de entorno:
```
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_HOST=<tu_postgres_host>
DATABASE_PORT=5432
DATABASE_NAME=<tu_db_name>
DATABASE_USERNAME=<tu_db_user>
DATABASE_PASSWORD=<tu_db_password>
DATABASE_SSL=false
JWT_SECRET=<generar>
API_TOKEN_SALT=<generar>
ADMIN_JWT_SECRET=<generar>
TRANSFER_TOKEN_SALT=<generar>
APP_KEYS=<generar>
```

### 2. Preparar el Frontend (Next.js)

1. Crear aplicación en Dokploy
2. Conectar con este repositorio
3. Configurar:
   - **Build Path**: `frontend-ecommerce`
   - **Dockerfile**: `Dockerfile`
   - **Port**: 3000

4. Variables de entorno:
```
NODE_ENV=production
NEXT_PUBLIC_BACKEND_URL=https://tu-backend.dominio.com
```

### 3. Configurar PostgreSQL en Dokploy

1. Crear base de datos PostgreSQL en Dokploy
2. Anotar las credenciales
3. Usarlas en las variables de entorno del backend

## Gestión de Contenido

### Administrar desde Strapi

Acceder al panel en http://localhost:1337/admin

**Content Types disponibles:**
- **Products** - Productos con stock, precios, imágenes, modelos 3D
- **Categories** - Categorías de productos
- **Hero Slides** - Slides del carrusel principal con modelos 3D
- **Orders** - Pedidos de clientes
- **Reviews** - Reseñas y calificaciones

### Hero Slides con Modelos 3D

Los slides del carrusel principal son 100% configurables desde Strapi:

1. Ir a **Content Manager → Hero Slides**
2. Crear nuevo slide
3. Configurar:
   - Textos (título, descripción, precio)
   - Modelo 3D (elegir tipo: smartphone, laptop, etc.)
   - Color del modelo (código hex)
   - Orden de aparición
   - Estado activo/inactivo

**Modelos 3D disponibles:**
- `smartphone` - iPhone Pro style
- `laptop` - MacBook style
- `airpods` - AirPods con estuche
- `tablet` - iPad Pro style
- `smartwatch` - Apple Watch style
- `custom-glb` - Tu propio modelo GLB/GLTF

## Comandos Útiles

### Backend
```bash
cd backend-ecommerce
npm run develop     # Desarrollo con auto-reload
npm run start       # Producción
npm run build       # Build para producción
```

### Frontend
```bash
cd frontend-ecommerce
npm run dev         # Desarrollo
npm run build       # Build para producción
npm run start       # Servidor de producción
npm run lint        # Linting
```

### Docker
```bash
# Ver logs
docker-compose logs -f [servicio]

# Reiniciar servicio
docker-compose restart [servicio]

# Detener todos los servicios
docker-compose down

# Limpiar volúmenes
docker-compose down -v

# Reconstruir después de cambios
docker-compose up -d --build
```

## Troubleshooting

### Backend no conecta a PostgreSQL
- Verificar que PostgreSQL esté corriendo
- Verificar credenciales en `.env`
- Verificar que el puerto 5432 esté disponible

### Frontend no muestra imágenes
- Verificar `NEXT_PUBLIC_BACKEND_URL` en `.env.local`
- Verificar que el backend esté corriendo
- Agregar el dominio en `next.config.js` → `remotePatterns`

### Modelos 3D no se ven
- Verificar que Three.js se cargó correctamente
- Abrir consola del navegador y verificar errores
- Verificar que el campo `model3dType` en Strapi no sea `none`

### Permisos de API
- Ir a Strapi Admin → Settings → Roles → Public
- Marcar permisos de lectura para los content types necesarios

## Documentación Adicional

Ver `GUIA_COMPLETA.md` para documentación detallada sobre:
- Configuración avanzada de modelos 3D
- Gestión completa de Hero Slides
- Despliegue en producción con Docker
- Troubleshooting completo

## Recursos

- [Documentación Next.js](https://nextjs.org/docs)
- [Documentación Strapi](https://docs.strapi.io)
- [Three.js](https://threejs.org/docs/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

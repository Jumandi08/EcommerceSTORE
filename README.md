# E-commerce Full Stack

E-commerce completo con Next.js (frontend) y Strapi (backend).

## Stack Tecnológico

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Strapi 5, Node.js
- **Base de datos**: PostgreSQL (producción), SQLite (desarrollo)
- **Deployment**: Docker, Dokploy

## Estructura del Proyecto

```
MeEcommerse/
├── backend-ecommerce/     # API Strapi
├── frontend-ecommerce/    # Aplicación Next.js
├── docker-compose.yml     # Configuración Docker
└── .env.example          # Variables de entorno ejemplo
```

## Desarrollo Local

### Opción 1: Con Docker Compose

```bash
# Copiar variables de entorno
cp .env.example .env

# Editar .env con tus valores
# Iniciar todos los servicios
docker-compose up -d
```

### Opción 2: Manual

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

## Generar Secretos para Strapi

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Ejecutar 4 veces para generar:
- JWT_SECRET
- API_TOKEN_SALT
- ADMIN_JWT_SECRET
- TRANSFER_TOKEN_SALT

Para APP_KEYS, generar 4 valores y separarlos con comas.

## Características

- ✅ Autenticación de usuarios (login/registro)
- ✅ Gestión de productos con stock
- ✅ Carrito de compras
- ✅ Sistema de pedidos
- ✅ Panel de administración (Strapi)
- ✅ Diseño responsive
- ✅ Optimización de imágenes

## URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:1337
- **Admin Panel**: http://localhost:1337/admin

## Documentación Adicional

Ver:
- `SETUP.md` - Guía de configuración detallada
- `PROBLEMAS_Y_SOLUCIONES.md` - Troubleshooting

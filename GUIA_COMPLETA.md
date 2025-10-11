# Guía Completa - E-commerce con Modelos 3D

Documentación completa del proyecto e-commerce Full Stack con visualización 3D.

## Tabla de Contenidos

1. [Sistema de Modelos 3D](#sistema-de-modelos-3d)
2. [Gestión de Hero Slides](#gestión-de-hero-slides)
3. [Despliegue en Producción](#despliegue-en-producción)
4. [Troubleshooting Avanzado](#troubleshooting-avanzado)

---

## Sistema de Modelos 3D

### Modelos Procedurales Disponibles

El proyecto incluye 5 modelos 3D procedurales premium creados con Three.js:

#### 1. Smartphone (`procedural-smartphone`)
- Diseño moderno tipo iPhone Pro
- 3 cámaras traseras con efecto de lente realista
- Dynamic Island
- Botones laterales y puerto USB-C
- **Ideal para**: iPhones, Samsung Galaxy, Google Pixel

#### 2. Laptop (`procedural-laptop`)
- Diseño tipo MacBook Pro
- 60 teclas individuales con efecto 3D
- Touchpad y trackpad
- Cámara web y puerto USB-C
- **Ideal para**: MacBooks, ultrabooks, laptops gaming

#### 3. AirPods (`procedural-airpods`)
- Estuche con tapa abierta animada
- 2 auriculares con detalles
- LED de carga verde
- Sensores ópticos
- **Ideal para**: AirPods, earbuds inalámbricos

#### 4. Tablet (`procedural-tablet`)
- Diseño tipo iPad Pro
- Sistema de cámaras traseras + LiDAR
- Altavoces estéreo
- Conectores magnéticos para accesorios
- **Ideal para**: iPads, tablets Android

#### 5. Smartwatch (`procedural-smartwatch`)
- Corona digital giratoria
- Sensores de salud en la parte trasera
- Pantalla OLED simulada
- Correas con hebilla
- **Ideal para**: Apple Watch, Samsung Galaxy Watch

### Configuración de Modelos 3D en Productos

En Strapi, cada producto tiene estos campos para configurar su modelo 3D:

| Campo | Tipo | Descripción | Ejemplo |
|-------|------|-------------|---------|
| `model3dType` | Enum | Tipo de modelo | `procedural-smartphone`, `procedural-laptop`, `custom-glb`, `none` |
| `model3dColor` | String | Color en hex | `#1d4ed8` (azul) |
| `model3dScale` | Decimal | Escala del modelo | `1.0` (normal), `1.5` (grande) |
| `model3dAnimate` | Boolean | Activar animación | `true` / `false` |
| `model3dUrl` | String | URL del archivo GLB | `/models/producto.glb` |

### Usar Modelos GLB/GLTF Personalizados

#### 1. Conseguir Modelos

**Sitios recomendados:**
- [Sketchfab](https://sketchfab.com/) - Millones de modelos (muchos gratuitos)
- [Free3D](https://free3d.com/) - Modelos 3D gratis
- [CGTrader](https://www.cgtrader.com/free-3d-models) - Marketplace con modelos free

#### 2. Optimizar el Modelo

```bash
# Instalar herramienta de optimización
npm install -g gltf-transform

# Optimizar y comprimir
gltf-transform optimize input.glb output.glb --compress
```

**Recomendaciones:**
- Tamaño: < 5MB
- Polígonos: < 100k triángulos
- Texturas: 1024x1024 o 2048x2048

#### 3. Subir a Strapi

1. Colocar archivo en `backend-ecommerce/public/uploads` o usar Media Library de Strapi
2. En el producto, configurar:
   - `model3dType`: `custom-glb`
   - `model3dUrl`: URL del archivo
   - `model3dScale`: Ajustar tamaño (1.0 - 2.0)

### Paleta de Colores Hex

```css
/* Apple Colors */
#1a1a1a  /* Negro espacial / Medianoche */
#f5f5f7  /* Blanco estelar */
#c0c0c0  /* Plata */
#b8860b  /* Oro */
#1d4ed8  /* Azul titanio */
#7c3aed  /* Púrpura profundo */
#dc2626  /* (PRODUCT)RED */

/* Samsung Colors */
#000000  /* Phantom Black */
#7c3aed  /* Phantom Violet */
#10b981  /* Mystic Green */

/* Otros populares */
#0ea5e9  /* Azul cielo */
#f59e0b  /* Naranja */
#ec4899  /* Rosa */
#14b8a6  /* Turquesa */
```

---

## Gestión de Hero Slides

### Crear Hero Slide desde Strapi

Los slides del carrusel principal con modelos 3D se gestionan 100% desde Strapi.

#### Acceso

1. Ir a http://localhost:1337/admin
2. **Content Manager** → **Hero Slides**
3. Click en **+ Create new entry**

#### Campos del Hero Slide

**Marketing:**
- **Badge**: Etiqueta superior (ej: "OFERTAS ESPECIALES")
- **Title**: Título principal
- **Highlight**: Texto con gradiente
- **Discount**: Porcentaje de descuento (ej: "25%")
- **Discount Badge**: Badge flotante (ej: "🔥 -25% OFF")

**Producto:**
- **Product Name**: Nombre del producto (ej: "iPhone 15")
- **Product Variant**: Subtítulo (ej: "Pro Max")
- **Price**: Precio (ej: "$1,299")

**Especificaciones:**
- **Spec 1 Label** / **Spec 1 Value**: Ej: "Cámara" / "48MP"
- **Spec 2 Label** / **Spec 2 Value**: Ej: "Chip" / "A17 Pro"

**Modelo 3D:**
- **Model 3D Type**: `smartphone`, `laptop`, `airpods`, `tablet`, `smartwatch`, `custom-glb`
- **Model 3D Color**: Color en hex (ej: `#1d4ed8`)
- **Model 3D File**: Archivo GLB (solo si type = custom-glb)

**Call to Action:**
- **CTA Text**: Texto del botón (ej: "Comprar Ahora")
- **CTA Link**: Enlace (ej: "/category/smartphones")

**Configuración:**
- **Order**: Orden de aparición (0 = primero)
- **Active**: true/false para mostrar/ocultar

#### Ejemplo Completo: iPhone 15 Pro

```
Badge: OFERTAS ESPECIALES
Title: Descubre la última tecnología
Highlight: a precios increíbles
Discount: 25%
Product Name: iPhone 15
Product Variant: Pro Max
Price: $1,299
Spec 1 Label: Cámara
Spec 1 Value: 48MP
Spec 2 Label: Chip
Spec 2 Value: A17 Pro
Model 3D Type: smartphone
Model 3D Color: #1d4ed8
Discount Badge: 🔥 -25% OFF
CTA Text: Comprar Ahora
CTA Link: /category/smartphones
Order: 0
Active: true
```

#### Configuración Avanzada de Modelos 3D

Los Hero Slides también soportan configuración avanzada de cámara y posición:

- **cameraPosition**: Posición de la cámara `{x, y, z}`
- **modelPosition**: Posición del modelo `{x, y, z}`
- **modelRotation**: Rotación del modelo `{x, y, z}`
- **modelScale**: Escala del modelo

---

## Despliegue en Producción

### Opción 1: Docker Compose en VPS

#### Pre-requisitos

- VPS con Ubuntu 20.04+
- Docker y Docker Compose instalados
- Dominio apuntando a la IP del VPS
- Puertos 80 y 443 abiertos

#### Instalación de Docker

```bash
# Actualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Agregar usuario al grupo docker
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verificar
docker --version
docker-compose --version
```

#### Configurar Firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

#### Desplegar Aplicación

```bash
# 1. Clonar repositorio
cd /var/www
git clone <tu-repo> ecommerce
cd ecommerce

# 2. Configurar variables de entorno
cp .env.example .env
nano .env
# Editar con valores de producción

# 3. Configurar SSL (Let's Encrypt)
mkdir -p nginx/certbot/conf nginx/certbot/www
docker run --rm -v $(pwd)/nginx/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/nginx/certbot/www:/var/www/certbot \
  -p 80:80 \
  certbot/certbot certonly --standalone \
  --email tu-email@ejemplo.com \
  --agree-tos --no-eff-email \
  -d tu-dominio.com

# 4. Construir y levantar servicios
docker-compose build --no-cache
docker-compose up -d

# 5. Verificar estado
docker-compose ps
docker-compose logs -f
```

#### Variables de Entorno de Producción

```bash
# Database
DATABASE_NAME=ecommerce_db
DATABASE_USERNAME=ecommerce_user
DATABASE_PASSWORD=<contraseña-segura>

# Strapi Secrets
JWT_SECRET=<secret-generado>
API_TOKEN_SALT=<secret-generado>
ADMIN_JWT_SECRET=<secret-generado>
TRANSFER_TOKEN_SALT=<secret-generado>
APP_KEYS=<key1>,<key2>,<key3>,<key4>

# Domain
DOMAIN=tu-dominio.com

# Frontend
NEXT_PUBLIC_BACKEND_URL=https://tu-dominio.com
```

### Opción 2: Dokploy

#### Backend (Strapi)

1. Crear aplicación en Dokploy
2. Conectar repositorio
3. Configurar:
   - Build Path: `backend-ecommerce`
   - Dockerfile: `Dockerfile`
   - Port: 1337
4. Agregar variables de entorno (ver arriba)
5. Desplegar

#### Frontend (Next.js)

1. Crear aplicación en Dokploy
2. Conectar repositorio
3. Configurar:
   - Build Path: `frontend-ecommerce`
   - Dockerfile: `Dockerfile`
   - Port: 3000
4. Variables de entorno:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_BACKEND_URL=https://tu-backend-url.com
   ```
5. Desplegar

#### Base de Datos

1. Crear PostgreSQL en Dokploy
2. Anotar credenciales
3. Usarlas en el backend

### Backups Automáticos

#### Script de Backup

```bash
#!/bin/bash
# scripts/backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

docker-compose exec -T postgres pg_dump -U $DATABASE_USERNAME $DATABASE_NAME | gzip > $BACKUP_DIR/backup_${DATABASE_NAME}_${DATE}.sql.gz

# Eliminar backups antiguos (más de 7 días)
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete

echo "Backup completado: backup_${DATABASE_NAME}_${DATE}.sql.gz"
```

#### Configurar Cron Job

```bash
chmod +x scripts/backup-db.sh

# Editar crontab
crontab -e

# Agregar backup diario a las 2 AM
0 2 * * * cd /var/www/ecommerce && ./scripts/backup-db.sh >> /var/log/backup-ecommerce.log 2>&1
```

### Actualización de la Aplicación

```bash
# Detener servicios
docker-compose down

# Actualizar código
git pull origin main

# Reconstruir y reiniciar
docker-compose build --no-cache
docker-compose up -d

# Verificar
docker-compose logs -f
```

---

## Troubleshooting Avanzado

### Backend no inicia

**Síntomas**: Container de backend se reinicia constantemente

**Causas comunes:**
1. PostgreSQL no está listo
2. Credenciales de DB incorrectas
3. Secrets mal configurados

**Solución:**
```bash
# Ver logs detallados
docker-compose logs backend

# Verificar conexión a PostgreSQL
docker-compose exec backend sh
wget --spider http://postgres:5432

# Verificar variables de entorno
docker-compose exec backend env | grep DATABASE
```

### Frontend no muestra datos

**Síntomas**: Página carga pero sin productos/categorías

**Causas comunes:**
1. Backend no está corriendo
2. URL del backend incorrecta
3. Permisos de API no configurados

**Solución:**
```bash
# Verificar que backend responde
curl http://localhost:1337/api/products

# Verificar URL en frontend
docker-compose logs frontend | grep NEXT_PUBLIC_BACKEND_URL

# Configurar permisos en Strapi
# Settings → Roles → Public → Marcar find/findOne
```

### Modelos 3D no se renderizan

**Síntomas**: Espacio en blanco donde debería estar el modelo 3D

**Causas comunes:**
1. Three.js no se cargó correctamente
2. Modelo GLB corrupto
3. Color hex mal formateado

**Solución:**
```bash
# Abrir DevTools en navegador
# Console → Ver errores de Three.js

# Verificar formato de color en Strapi
# Debe ser: #1a1a1a (con #)

# Probar modelo GLB en viewer online
# https://gltf-viewer.donmccurdy.com/
```

### Performance Lenta

**Síntomas**: Página carga lento, animaciones cortadas

**Causas comunes:**
1. Modelos GLB muy pesados
2. Imágenes sin optimizar
3. Recursos no cacheados

**Solución:**
```bash
# Optimizar modelos GLB
gltf-transform optimize input.glb output.glb --compress

# Verificar tamaño de assets
du -sh frontend-ecommerce/public/*

# Habilitar cache en Nginx
# Ver nginx/nginx.conf
```

### SSL/HTTPS no funciona

**Síntomas**: Certificado inválido o no se puede acceder por HTTPS

**Causas comunes:**
1. Certificados no generados correctamente
2. Dominio no apunta a la IP
3. Puerto 443 bloqueado

**Solución:**
```bash
# Verificar certificados
sudo ls -la nginx/certbot/conf/live/tu-dominio.com/

# Renovar certificados
docker-compose run --rm certbot renew

# Recargar nginx
docker-compose exec nginx nginx -s reload

# Verificar puertos
sudo netstat -tulpn | grep :443
```

### Limpiar y Reiniciar (Reset Completo)

**⚠️ ADVERTENCIA**: Esto eliminará TODOS los datos

```bash
# Detener y eliminar todo
docker-compose down -v

# Eliminar imágenes
docker system prune -a

# Limpiar caché de build
rm -rf .next
rm -rf node_modules

# Reinstalar y reiniciar
npm install
docker-compose up -d --build
```

---

## Checklist de Seguridad

- [ ] Firewall configurado (solo puertos 22, 80, 443)
- [ ] SSH con autenticación por llave
- [ ] Variables de entorno seguras (secretos únicos)
- [ ] SSL/HTTPS funcionando
- [ ] Backups automáticos configurados
- [ ] Rate limiting en Nginx
- [ ] Security headers configurados
- [ ] Base de datos NO expuesta públicamente
- [ ] Logs monitoreados

---

## Mantenimiento Regular

### Semanal
- Revisar logs de errores
- Verificar espacio en disco
- Comprobar que los backups se generan

### Mensual
- Actualizar dependencias de seguridad
- Revisar certificados SSL
- Limpiar backups antiguos

### Trimestral
- Actualizar Docker y Docker Compose
- Revisar configuraciones de seguridad
- Probar restauración desde backup

---

## URLs Importantes

**Desarrollo:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:1337
- Admin Panel: http://localhost:1337/admin

**Producción:**
- Frontend: https://tu-dominio.com
- Backend API: https://tu-dominio.com/api
- Admin Panel: https://tu-dominio.com/admin
- Uploads: https://tu-dominio.com/uploads

---

## Recursos Útiles

### Modelos 3D
- [Sketchfab](https://sketchfab.com/)
- [glTF Viewer](https://gltf-viewer.donmccurdy.com/)
- [gltf-transform](https://gltf-transform.dev/)

### Documentación
- [Next.js](https://nextjs.org/docs)
- [Strapi](https://docs.strapi.io)
- [Three.js](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

### Herramientas
- [Color Picker Hex](https://htmlcolorcodes.com/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance testing
- [Docker Docs](https://docs.docker.com/)

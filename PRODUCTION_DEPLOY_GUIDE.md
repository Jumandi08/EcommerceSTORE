# 🚀 Guía de Deploy a Producción en VPS

Esta guía te ayudará a desplegar tu aplicación e-commerce en un VPS usando Docker.

## 📋 Pre-requisitos

- VPS con Ubuntu 20.04+ o similar
- Docker y Docker Compose instalados
- Dominio apuntando a la IP de tu VPS
- Acceso SSH al VPS
- Puertos 80 y 443 abiertos en el firewall

## 🔧 Preparación del VPS

### 1. Instalar Docker y Docker Compose

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

# Verificar instalación
docker --version
docker-compose --version
```

### 2. Configurar Firewall

```bash
# Permitir SSH, HTTP y HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

## 📦 Configuración del Proyecto

### 1. Clonar el proyecto en el VPS

```bash
cd /var/www  # o la ubicación que prefieras
git clone <tu-repositorio> ecommerce
cd ecommerce
```

### 2. Generar secretos de producción

```bash
# En tu máquina local, genera los secretos
node generate-secrets.js

# Copia la salida y guárdala de forma segura
```

### 3. Configurar variables de entorno

```bash
# Copiar archivo de ejemplo
cp .env.production .env

# Editar el archivo .env
nano .env
```

Reemplaza los siguientes valores en el archivo `.env`:

```bash
# Database
DATABASE_NAME=ecommerce_db
DATABASE_USERNAME=ecommerce_user
DATABASE_PASSWORD=<password-generado>

# Strapi Secrets (copiar del output de generate-secrets.js)
JWT_SECRET=<secret-generado>
API_TOKEN_SALT=<secret-generado>
ADMIN_JWT_SECRET=<secret-generado>
TRANSFER_TOKEN_SALT=<secret-generado>
APP_KEYS=<keys-generadas>

# Domain
DOMAIN=tu-dominio.com

# Frontend
NEXT_PUBLIC_BACKEND_URL=https://tu-dominio.com
```

### 4. Actualizar configuración de dominio en next.config.js

Edita `frontend-ecommerce/next.config.js` y descomenta/actualiza:

```javascript
{
  protocol: 'https',
  hostname: 'tu-dominio.com',
  pathname: '/**',
}
```

## 🔐 Configurar SSL/HTTPS

### Opción A: Inicialización automática con script

```bash
cd scripts
chmod +x init-ssl.sh
./init-ssl.sh tu-dominio.com tu-email@ejemplo.com
```

### Opción B: Inicialización manual

```bash
# Crear directorios
mkdir -p nginx/certbot/conf nginx/certbot/www

# Obtener certificados (asegúrate de que el dominio apunte a tu VPS)
docker run --rm -v $(pwd)/nginx/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/nginx/certbot/www:/var/www/certbot \
  -p 80:80 \
  certbot/certbot certonly --standalone \
  --email tu-email@ejemplo.com \
  --agree-tos --no-eff-email \
  -d tu-dominio.com
```

## 🐳 Desplegar la Aplicación

### 1. Construir y levantar los contenedores

```bash
# Construir imágenes (primera vez o después de cambios)
docker-compose build --no-cache

# Levantar servicios
docker-compose up -d

# Verificar estado
docker-compose ps
docker-compose logs -f
```

### 2. Verificar healthchecks

```bash
# Ver estado de los servicios
docker ps

# Verificar logs de cada servicio
docker-compose logs postgres
docker-compose logs backend
docker-compose logs frontend
docker-compose logs nginx
```

### 3. Configurar Strapi (primera vez)

1. Accede a `https://tu-dominio.com/admin`
2. Crea la cuenta de administrador
3. Configura los permisos de la API en Settings > Users & Permissions Plugin > Roles > Public

## 🔄 Backups Automáticos

### Configurar cron job para backups diarios

```bash
# Dar permisos de ejecución
chmod +x scripts/backup-db.sh
chmod +x scripts/restore-db.sh

# Editar crontab
crontab -e

# Agregar línea para backup diario a las 2 AM
0 2 * * * cd /var/www/ecommerce && ./scripts/backup-db.sh >> /var/log/backup-ecommerce.log 2>&1
```

### Restaurar desde backup

```bash
cd scripts
./restore-db.sh backup_ecommerce_db_20250104_020000.sql.gz
```

## 📊 Monitoreo

### Ver logs en tiempo real

```bash
# Todos los servicios
docker-compose logs -f

# Servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx
```

### Verificar uso de recursos

```bash
docker stats
```

### Verificar estado de healthchecks

```bash
docker inspect ecommerce-backend | grep -A 10 Health
docker inspect ecommerce-frontend | grep -A 10 Health
```

## 🔄 Actualización de la Aplicación

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

## 🛠️ Troubleshooting

### Problemas de Conexión a la Base de Datos

```bash
# Verificar que PostgreSQL esté corriendo
docker-compose ps postgres

# Ver logs de PostgreSQL
docker-compose logs postgres

# Probar conexión desde backend
docker exec -it ecommerce-backend sh
wget --spider http://postgres:5432
```

### Problemas con SSL

```bash
# Verificar certificados
sudo ls -la nginx/certbot/conf/live/tu-dominio.com/

# Renovar certificados manualmente
docker-compose run --rm certbot renew

# Recargar nginx
docker-compose exec nginx nginx -s reload
```

### Problemas de Permisos

```bash
# Verificar permisos de volúmenes
ls -la backend-ecommerce/public/uploads
ls -la backups

# Corregir permisos si es necesario
sudo chown -R 1000:1000 backend-ecommerce/public/uploads
```

### Limpiar todo y empezar de nuevo

```bash
# ⚠️ ADVERTENCIA: Esto eliminará TODOS los datos
docker-compose down -v
docker system prune -a
# Luego volver a ejecutar docker-compose up -d
```

## 📝 Checklist de Seguridad

- [ ] Firewall configurado (solo puertos 22, 80, 443)
- [ ] SSH con autenticación por llave (deshabilitar password)
- [ ] Variables de entorno seguras (secretos únicos y complejos)
- [ ] SSL/HTTPS funcionando correctamente
- [ ] Backups automáticos configurados
- [ ] Logs monitoreados regularmente
- [ ] Rate limiting configurado en Nginx
- [ ] Security headers configurados
- [ ] Base de datos NO expuesta públicamente
- [ ] Usuario de base de datos con permisos mínimos necesarios

## 🎯 URLs Importantes

Después del deploy, tendrás acceso a:

- **Frontend**: `https://tu-dominio.com`
- **Backend API**: `https://tu-dominio.com/api`
- **Admin Panel**: `https://tu-dominio.com/admin`
- **Uploads**: `https://tu-dominio.com/uploads`

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs: `docker-compose logs -f`
2. Verifica el estado: `docker-compose ps`
3. Consulta la documentación de Strapi: https://docs.strapi.io
4. Consulta la documentación de Next.js: https://nextjs.org/docs

## 🔄 Mantenimiento Regular

### Semanal
- Revisar logs de errores
- Verificar espacio en disco
- Comprobar que los backups se están generando

### Mensual
- Actualizar dependencias de seguridad
- Revisar certificados SSL (aunque se renuevan automáticamente)
- Limpiar backups antiguos manualmente si es necesario

### Trimestral
- Actualizar versiones de Docker y Docker Compose
- Revisar y actualizar configuraciones de seguridad
- Probar proceso de restauración desde backup

---

**¡Tu aplicación e-commerce está lista para producción!** 🎉

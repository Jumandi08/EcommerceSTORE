#!/bin/bash

# =================================================================
# Script de Backup Automático para PostgreSQL
# =================================================================
# Uso: ./backup-db.sh
# Cron: 0 2 * * * /ruta/a/backup-db.sh (todos los días a las 2 AM)
# =================================================================

set -e

# Cargar variables de entorno
if [ -f ../.env ]; then
    export $(cat ../.env | grep -v '^#' | xargs)
fi

# Configuración
BACKUP_DIR="../backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${DATABASE_NAME}_${DATE}.sql"
CONTAINER_NAME="ecommerce-postgres"
RETENTION_DAYS=7

# Crear directorio de backups si no existe
mkdir -p $BACKUP_DIR

echo "=============================================="
echo "Iniciando backup de PostgreSQL"
echo "Fecha: $(date)"
echo "Base de datos: $DATABASE_NAME"
echo "=============================================="

# Realizar backup
docker exec $CONTAINER_NAME pg_dump -U $DATABASE_USERNAME $DATABASE_NAME > $BACKUP_DIR/$BACKUP_FILE

# Comprimir backup
gzip $BACKUP_DIR/$BACKUP_FILE
echo "✓ Backup creado: $BACKUP_FILE.gz"

# Eliminar backups antiguos
echo "Limpiando backups antiguos (más de $RETENTION_DAYS días)..."
find $BACKUP_DIR -name "backup_*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete

# Mostrar espacio usado
BACKUP_SIZE=$(du -sh $BACKUP_DIR | cut -f1)
echo "Espacio total usado por backups: $BACKUP_SIZE"

echo "=============================================="
echo "Backup completado exitosamente"
echo "=============================================="

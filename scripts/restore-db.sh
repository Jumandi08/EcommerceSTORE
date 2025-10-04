#!/bin/bash

# =================================================================
# Script de Restauración de PostgreSQL desde Backup
# =================================================================
# Uso: ./restore-db.sh <archivo_backup.sql.gz>
# Ejemplo: ./restore-db.sh backup_ecommerce_db_20250104_020000.sql.gz
# =================================================================

set -e

if [ "$#" -ne 1 ]; then
    echo "Uso: $0 <archivo_backup.sql.gz>"
    echo "Ejemplo: $0 backup_ecommerce_db_20250104_020000.sql.gz"
    exit 1
fi

# Cargar variables de entorno
if [ -f ../.env ]; then
    export $(cat ../.env | grep -v '^#' | xargs)
fi

BACKUP_DIR="../backups"
BACKUP_FILE=$1
CONTAINER_NAME="ecommerce-postgres"

if [ ! -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
    echo "Error: El archivo $BACKUP_DIR/$BACKUP_FILE no existe"
    exit 1
fi

echo "=============================================="
echo "ADVERTENCIA: Esta operación eliminará todos"
echo "los datos actuales de la base de datos"
echo "$DATABASE_NAME"
echo "=============================================="
read -p "¿Estás seguro de continuar? (escribir 'SI' para confirmar): " confirm

if [ "$confirm" != "SI" ]; then
    echo "Restauración cancelada"
    exit 0
fi

echo "Descomprimiendo backup..."
gunzip -c $BACKUP_DIR/$BACKUP_FILE > /tmp/restore_temp.sql

echo "Restaurando base de datos..."
docker exec -i $CONTAINER_NAME psql -U $DATABASE_USERNAME -d $DATABASE_NAME < /tmp/restore_temp.sql

echo "Limpiando archivos temporales..."
rm /tmp/restore_temp.sql

echo "=============================================="
echo "Restauración completada exitosamente"
echo "=============================================="

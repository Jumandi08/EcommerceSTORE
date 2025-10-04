#!/bin/bash

# =================================================================
# Script de Inicialización de Certificados SSL con Let's Encrypt
# =================================================================
# Uso: ./init-ssl.sh tu-dominio.com tu-email@ejemplo.com
# =================================================================

if [ "$#" -ne 2 ]; then
    echo "Uso: $0 <dominio> <email>"
    echo "Ejemplo: $0 ejemplo.com admin@ejemplo.com"
    exit 1
fi

DOMAIN=$1
EMAIL=$2
STAGING=0 # Cambiar a 1 para testing con staging server

echo "=============================================="
echo "Inicializando certificados SSL"
echo "Dominio: $DOMAIN"
echo "Email: $EMAIL"
echo "=============================================="

# Crear directorios necesarios
mkdir -p ./nginx/certbot/conf
mkdir -p ./nginx/certbot/www

# Descargar configuración TLS recomendada
if [ ! -f "./nginx/certbot/conf/options-ssl-nginx.conf" ]; then
    echo "Descargando configuración SSL recomendada..."
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot-nginx/certbot_nginx/_internal/tls_configs/options-ssl-nginx.conf > "./nginx/certbot/conf/options-ssl-nginx.conf"
fi

if [ ! -f "./nginx/certbot/conf/ssl-dhparams.pem" ]; then
    echo "Descargando parámetros DH..."
    curl -s https://raw.githubusercontent.com/certbot/certbot/master/certbot/certbot/ssl-dhparams.pem > "./nginx/certbot/conf/ssl-dhparams.pem"
fi

# Crear certificado dummy temporal
echo "Creando certificado temporal..."
CERT_PATH="/etc/letsencrypt/live/$DOMAIN"
mkdir -p "./nginx/certbot/conf/live/$DOMAIN"

docker run --rm -v $(pwd)/nginx/certbot/conf:/etc/letsencrypt \
    certbot/certbot certonly --standalone --preferred-challenges http \
    --email $EMAIL --agree-tos --no-eff-email \
    $([ $STAGING -eq 1 ] && echo "--staging") \
    -d $DOMAIN

echo "=============================================="
echo "Certificados SSL inicializados"
echo "Ahora puedes ejecutar: docker-compose up -d"
echo "=============================================="

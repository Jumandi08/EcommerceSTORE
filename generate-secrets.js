#!/usr/bin/env node

/**
 * Script para generar secretos seguros para Strapi
 * Ejecutar: node generate-secrets.js
 */

const crypto = require('crypto');

function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('base64');
}

function generateAppKeys(count = 4) {
  const keys = [];
  for (let i = 0; i < count; i++) {
    keys.push(generateSecret(16));
  }
  return keys.join(',');
}

console.log('='.repeat(60));
console.log('  SECRETOS GENERADOS PARA PRODUCCIÓN');
console.log('='.repeat(60));
console.log('\nCopia estos valores en tu archivo .env:\n');

console.log('# Database');
console.log('DATABASE_NAME=ecommerce_db');
console.log('DATABASE_USERNAME=ecommerce_user');
console.log(`DATABASE_PASSWORD=${generateSecret(24)}`);
console.log('');

console.log('# Strapi Secrets');
console.log(`JWT_SECRET=${generateSecret()}`);
console.log(`API_TOKEN_SALT=${generateSecret()}`);
console.log(`ADMIN_JWT_SECRET=${generateSecret()}`);
console.log(`TRANSFER_TOKEN_SALT=${generateSecret()}`);
console.log(`APP_KEYS=${generateAppKeys()}`);
console.log('');

console.log('# Frontend (reemplaza con tu dominio)');
console.log('NEXT_PUBLIC_BACKEND_URL=https://tu-dominio.com');
console.log('');

console.log('# Domain');
console.log('DOMAIN=tu-dominio.com');
console.log('');

console.log('='.repeat(60));
console.log('  IMPORTANTE: Guarda estos secretos de forma segura');
console.log('  NO los compartas ni los subas a repositorios públicos');
console.log('='.repeat(60));

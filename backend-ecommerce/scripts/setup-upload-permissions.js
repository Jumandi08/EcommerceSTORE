/**
 * Script para configurar permisos de Upload automáticamente
 * Ejecutar: node scripts/setup-upload-permissions.js
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function setupUploadPermissions() {
  console.log('\n🔧 Configurador de Permisos de Upload\n');
  console.log('Este script configurará los permisos necesarios para subir archivos GLB.\n');

  rl.question('Ingresa el JWT de tu usuario admin: ', async (jwt) => {
    try {
      console.log('\n📡 Obteniendo roles...');

      // Obtener roles
      const rolesRes = await fetch('http://localhost:1337/api/users-permissions/roles', {
        headers: {
          'Authorization': `Bearer ${jwt.trim()}`
        }
      });

      if (!rolesRes.ok) {
        throw new Error('No se pudieron obtener los roles. ¿El JWT es válido?');
      }

      const rolesData = await rolesRes.json();
      console.log('✅ Roles obtenidos');

      // Buscar rol "Authenticated"
      const authenticatedRole = rolesData.roles.find(role => role.type === 'authenticated');

      if (!authenticatedRole) {
        throw new Error('No se encontró el rol "Authenticated"');
      }

      console.log(`\n📝 Rol "Authenticated" encontrado (ID: ${authenticatedRole.id})`);

      // Actualizar permisos
      console.log('\n📤 Configurando permisos de Upload...');

      // Preparar permisos actualizados
      const updatedPermissions = {
        ...authenticatedRole.permissions,
        'plugin::upload.content-api': {
          upload: {
            enabled: true
          }
        }
      };

      // Actualizar rol
      const updateRes = await fetch(`http://localhost:1337/api/users-permissions/roles/${authenticatedRole.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt.trim()}`
        },
        body: JSON.stringify({
          name: authenticatedRole.name,
          description: authenticatedRole.description,
          permissions: updatedPermissions
        })
      });

      if (!updateRes.ok) {
        const errorData = await updateRes.json();
        console.log('\n⚠️  No se pudo actualizar automáticamente.');
        console.log('Error:', errorData);
        console.log('\nPor favor, configura manualmente:');
        console.log('1. Ve a Settings → Roles → Authenticated');
        console.log('2. Busca la sección "Upload"');
        console.log('3. Marca el checkbox "upload"');
        console.log('4. Guarda los cambios');
      } else {
        console.log('✅ Permisos de Upload configurados correctamente');
        console.log('\n🎉 ¡Listo! Ahora puedes subir archivos GLB desde el panel de admin.');
      }

    } catch (error) {
      console.log('\n❌ Error:', error.message);
      console.log('\nConfigura manualmente los permisos:');
      console.log('1. Ve a http://localhost:1337/admin');
      console.log('2. Settings → Roles → Authenticated');
      console.log('3. Busca "Upload" y marca "upload"');
      console.log('4. Guarda');
    }

    rl.close();
  });
}

setupUploadPermissions();

/**
 * Script para verificar permisos de Hero Slides
 * Ejecutar: node scripts/check-permissions.js
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function checkPermissions() {
  console.log('\n🔍 Verificador de Permisos de Hero Slides\n');
  console.log('Este script te ayudará a verificar que los permisos estén correctos.\n');

  rl.question('Ingresa el JWT de tu usuario admin (lo encuentras en localStorage): ', async (jwt) => {
    console.log('\n✅ JWT recibido\n');

    try {
      // Test 1: Verificar conexión al backend
      console.log('📡 Test 1: Verificando conexión al backend...');
      const healthCheck = await fetch('http://localhost:1337/_health');

      if (!healthCheck.ok) {
        console.log('❌ El backend no está respondiendo. Asegúrate de que Strapi esté corriendo.');
        rl.close();
        return;
      }
      console.log('✅ Backend activo\n');

      // Test 2: Listar hero-slides sin token (public)
      console.log('📡 Test 2: Intentando listar slides (sin token - PUBLIC)...');
      const publicRes = await fetch('http://localhost:1337/api/hero-slides?populate=*');

      if (publicRes.ok) {
        const publicData = await publicRes.json();
        console.log('✅ Permisos PUBLIC: OK');
        console.log(`   Slides encontrados: ${publicData.data?.length || 0}\n`);
      } else {
        console.log('❌ Permisos PUBLIC: FALTAN');
        console.log('   Ve a Settings → Roles → Public → Hero-slide');
        console.log('   Marca: find, findOne\n');
      }

      // Test 3: Listar hero-slides con token (authenticated)
      console.log('📡 Test 3: Intentando listar slides (con token - AUTHENTICATED)...');
      const authRes = await fetch('http://localhost:1337/api/hero-slides?populate=*', {
        headers: {
          'Authorization': `Bearer ${jwt.trim()}`
        }
      });

      if (authRes.ok) {
        const authData = await authRes.json();
        console.log('✅ Permisos AUTHENTICATED - find: OK');
        console.log(`   Slides encontrados: ${authData.data?.length || 0}\n`);

        // Mostrar estructura de un slide
        if (authData.data && authData.data.length > 0) {
          console.log('📦 Estructura del primer slide:');
          console.log(JSON.stringify(authData.data[0], null, 2));
          console.log('\n');
        }
      } else {
        const errorData = await authRes.json();
        console.log('❌ Permisos AUTHENTICATED - find: FALTAN');
        console.log('   Error:', errorData);
        console.log('   Ve a Settings → Roles → Authenticated → Hero-slide');
        console.log('   Marca: find, findOne, create, update, delete\n');
      }

      // Test 4: Intentar crear un slide
      console.log('📡 Test 4: Intentando crear un slide de prueba...');
      const createRes = await fetch('http://localhost:1337/api/hero-slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt.trim()}`
        },
        body: JSON.stringify({
          data: {
            badge: 'TEST',
            title: 'Test Slide',
            highlight: 'Test',
            productName: 'Test Product',
            price: '$0',
            model3dType: 'smartphone',
            model3dColor: '#000000',
            order: 999,
            active: false
          }
        })
      });

      if (createRes.ok) {
        const created = await createRes.json();
        console.log('✅ Permisos AUTHENTICATED - create: OK');
        console.log(`   Slide de prueba creado con ID: ${created.data.id}`);

        // Intentar eliminar el slide de prueba
        console.log('\n📡 Test 5: Intentando eliminar el slide de prueba...');
        const deleteRes = await fetch(`http://localhost:1337/api/hero-slides/${created.data.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${jwt.trim()}`
          }
        });

        if (deleteRes.ok) {
          console.log('✅ Permisos AUTHENTICATED - delete: OK');
          console.log('   Slide de prueba eliminado correctamente\n');
        } else {
          console.log('⚠️  Permisos AUTHENTICATED - delete: FALTAN');
          console.log('   El slide de prueba quedó en la BD con ID:', created.data.id);
          console.log('   Elimínalo manualmente desde Strapi admin\n');
        }
      } else {
        const errorData = await createRes.json();
        console.log('❌ Permisos AUTHENTICATED - create: FALTAN');
        console.log('   Error:', errorData);
        console.log('   Ve a Settings → Roles → Authenticated → Hero-slide');
        console.log('   Marca: create\n');
      }

      console.log('\n📊 RESUMEN:');
      console.log('='.repeat(50));
      console.log('Si todos los tests pasaron, los permisos están correctos.');
      console.log('Si alguno falló, sigue las instrucciones arriba.');
      console.log('='.repeat(50));

    } catch (error) {
      console.log('\n❌ Error:', error.message);
      console.log('\nAsegúrate de que:');
      console.log('1. Strapi esté corriendo (npm run develop)');
      console.log('2. El JWT sea válido');
      console.log('3. La URL sea http://localhost:1337');
    }

    rl.close();
  });
}

checkPermissions();

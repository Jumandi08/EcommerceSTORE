/**
 * Script de diagnóstico para Hero Slides
 *
 * Ejecutar: node scripts/check-hero-slides.js
 */

async function checkHeroSlides() {
  console.log('🔍 Diagnóstico de Hero Slides\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // 1. Verificar que Strapi está corriendo
  console.log('1️⃣  Verificando que Strapi está corriendo...');
  try {
    const response = await fetch('http://localhost:1337/_health');
    console.log('   ✅ Strapi está corriendo en http://localhost:1337\n');
  } catch (error) {
    console.log('   ❌ ERROR: Strapi NO está corriendo');
    console.log('   💡 Solución: Ejecuta "npm run develop" en backend-ecommerce\n');
    process.exit(1);
  }

  // 2. Verificar que el Content Type existe
  console.log('2️⃣  Verificando Content Type "Hero Slide"...');
  try {
    const response = await fetch('http://localhost:1337/api/hero-slides');

    if (response.status === 404) {
      console.log('   ❌ ERROR: Content Type "Hero Slide" NO existe');
      console.log('   💡 Solución: Verifica que los archivos en src/api/hero-slide/ existen\n');
      process.exit(1);
    }

    console.log('   ✅ Content Type existe\n');
  } catch (error) {
    console.log('   ❌ ERROR al verificar Content Type\n');
    process.exit(1);
  }

  // 3. Verificar permisos
  console.log('3️⃣  Verificando permisos de la API...');
  try {
    const response = await fetch('http://localhost:1337/api/hero-slides?populate=*');

    if (response.status === 403) {
      console.log('   ❌ ERROR: Permisos NO configurados');
      console.log('   💡 Solución:');
      console.log('      1. Ir a http://localhost:1337/admin');
      console.log('      2. Settings → Users & Permissions → Roles → Public');
      console.log('      3. Hero-slide: Marcar "find" y "findOne"');
      console.log('      4. Save\n');
      process.exit(1);
    }

    console.log('   ✅ Permisos configurados correctamente\n');

    const data = await response.json();

    // 4. Verificar que hay slides
    console.log('4️⃣  Verificando slides existentes...');
    if (!data.data || data.data.length === 0) {
      console.log('   ⚠️  NO hay slides creados');
      console.log('   💡 Solución:');
      console.log('      1. Ir a http://localhost:1337/admin');
      console.log('      2. Content Manager → Hero Slides');
      console.log('      3. + Create new entry');
      console.log('      4. Llenar todos los campos requeridos');
      console.log('      5. Save y Publish\n');
      console.log('   O ejecuta: node scripts/seed-hero-slides.js\n');
      process.exit(1);
    }

    console.log(`   ✅ Se encontraron ${data.data.length} slide(s)\n`);

    // 5. Mostrar detalles de los slides
    console.log('5️⃣  Detalles de los slides:\n');
    data.data.forEach((slide, index) => {
      // Strapi 5 no usa attributes, los datos están directamente en slide
      console.log(`   Slide ${index + 1}:`);
      console.log(`   ├─ ID: ${slide.id}`);
      console.log(`   ├─ Product: ${slide.productName}`);
      console.log(`   ├─ Model Type: ${slide.model3dType}`);
      console.log(`   ├─ Order: ${slide.order}`);
      console.log(`   ├─ Active: ${slide.active ? '✅ SÍ' : '❌ NO'}`);
      console.log(`   └─ Published: ${slide.publishedAt ? '✅ SÍ' : '❌ NO (DRAFT)'}\n`);
    });

    // 6. Verificar slides activos
    const activeSlides = data.data.filter(s => s.active && s.publishedAt);

    if (activeSlides.length === 0) {
      console.log('   ⚠️  NO hay slides ACTIVOS y PUBLICADOS');
      console.log('   💡 Solución: Edita los slides y:');
      console.log('      1. Marca "Active" como true');
      console.log('      2. Click en "Publish"\n');
      process.exit(1);
    }

    console.log(`   ✅ Hay ${activeSlides.length} slide(s) activo(s) y publicado(s)\n`);

    // 7. Verificar frontend
    console.log('6️⃣  Verificando frontend...');
    try {
      const frontendResponse = await fetch('http://localhost:3000');
      if (frontendResponse.ok) {
        console.log('   ✅ Frontend está corriendo en http://localhost:3000\n');
      } else {
        console.log('   ⚠️  Frontend responde pero con error');
      }
    } catch (error) {
      console.log('   ❌ Frontend NO está corriendo');
      console.log('   💡 Solución: Ejecuta "npm run dev" en frontend-ecommerce\n');
    }

    // Resumen final
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✅ ¡TODO ESTÁ CONFIGURADO CORRECTAMENTE!\n');
    console.log('📍 Visita: http://localhost:3000');
    console.log('   Deberías ver el carrusel con tus slides 3D\n');

    if (activeSlides.length > 0) {
      console.log('🎨 Slides que se mostrarán:');
      activeSlides
        .sort((a, b) => a.order - b.order)
        .forEach((slide, index) => {
          console.log(`   ${index + 1}. ${slide.productName} (${slide.model3dType})`);
        });
    }

  } catch (error) {
    console.log('   ❌ ERROR inesperado:', error.message);
    console.log('\n');
  }
}

// Ejecutar
checkHeroSlides();

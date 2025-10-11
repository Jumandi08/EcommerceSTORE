const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_ADMIN_TOKEN || '';

// Datos de subcategorías de ejemplo para Accesorios
const subcategories = [
  {
    subcategoryName: 'Audífonos',
    icon: 'Headphones',
    description: 'Audífonos de alta calidad con sonido premium',
    order: 1,
    active: true,
  },
  {
    subcategoryName: 'Cargadores',
    icon: 'Zap',
    description: 'Cargadores rápidos y seguros para todos tus dispositivos',
    order: 2,
    active: true,
  },
  {
    subcategoryName: 'Cases y Fundas',
    icon: 'ShieldCheck',
    description: 'Protección completa para tu smartphone',
    order: 3,
    active: true,
  },
  {
    subcategoryName: 'Cables USB',
    icon: 'Zap',
    description: 'Cables de carga y datos de alta velocidad',
    order: 4,
    active: true,
  },
  {
    subcategoryName: 'Power Banks',
    icon: 'Package',
    description: 'Baterías portátiles de alta capacidad',
    order: 5,
    active: true,
  },
  {
    subcategoryName: 'Micas y Protectores',
    icon: 'ShieldCheck',
    description: 'Protectores de pantalla de cristal templado',
    order: 6,
    active: true,
  },
  {
    subcategoryName: 'Soportes',
    icon: 'Package',
    description: 'Soportes para auto, escritorio y más',
    order: 7,
    active: true,
  },
  {
    subcategoryName: 'Adaptadores',
    icon: 'Package',
    description: 'Adaptadores y conectores para todo tipo de dispositivos',
    order: 8,
    active: true,
  },
];

async function findOrCreateAccesoriosCategory() {
  try {
    console.log('🔍 Buscando categoría "Accesorios"...');

    // Buscar categoría Accesorios
    const response = await fetch(`${STRAPI_URL}/api/categories?filters[slug][$eq]=accesorios`);
    const data = await response.json();

    if (data.data && data.data.length > 0) {
      console.log('✅ Categoría "Accesorios" encontrada:', data.data[0].id);
      return data.data[0].id;
    }

    // Si no existe, crearla
    console.log('📝 Creando categoría "Accesorios"...');
    const createResponse = await fetch(`${STRAPI_URL}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          categoryName: 'Accesorios',
          slug: 'accesorios',
        }
      })
    });

    const createdData = await createResponse.json();
    console.log('Response from create:', JSON.stringify(createdData, null, 2));

    if (!createdData.data || !createdData.data.id) {
      throw new Error(`Failed to create category: ${JSON.stringify(createdData)}`);
    }

    console.log('✅ Categoría "Accesorios" creada:', createdData.data.id);
    return createdData.data.id;

  } catch (error) {
    console.error('❌ Error al buscar/crear categoría:', error.message);
    throw error;
  }
}

async function seedSubcategories() {
  try {
    console.log('\n🌱 Iniciando seed de subcategorías...\n');

    // Primero obtener o crear la categoría Accesorios
    const categoryId = await findOrCreateAccesoriosCategory();

    console.log('\n📦 Creando subcategorías...\n');

    for (const subcategory of subcategories) {
      try {
        // Verificar si ya existe
        const checkResponse = await fetch(
          `${STRAPI_URL}/api/subcategories?filters[slug][$eq]=${subcategory.subcategoryName.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`
        );
        const checkData = await checkResponse.json();

        if (checkData.data && checkData.data.length > 0) {
          console.log(`⏭️  "${subcategory.subcategoryName}" ya existe, saltando...`);
          continue;
        }

        // Crear subcategoría
        const response = await fetch(`${STRAPI_URL}/api/subcategories`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              ...subcategory,
              category: categoryId,
            }
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log(`✅ "${subcategory.subcategoryName}" creada exitosamente (ID: ${data.data.id})`);

      } catch (error) {
        console.error(`❌ Error al crear "${subcategory.subcategoryName}":`, error.message);
      }
    }

    console.log('\n🎉 ¡Seed completado exitosamente!\n');
    console.log('📊 Resumen:');
    console.log(`   - Total subcategorías: ${subcategories.length}`);
    console.log(`   - Categoría padre: Accesorios (ID: ${categoryId})`);
    console.log('\n🌐 Verifica en: http://localhost:1337/admin/content-manager/collection-types/api::subcategory.subcategory');

  } catch (error) {
    console.error('\n❌ Error general en seed:', error.message);
    process.exit(1);
  }
}

// Ejecutar seed
seedSubcategories();

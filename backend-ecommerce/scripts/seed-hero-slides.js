/**
 * Script para poblar Hero Slides de ejemplo
 *
 * Ejecutar: node scripts/seed-hero-slides.js
 */

const slides = [
  {
    badge: "OFERTAS ESPECIALES",
    title: "Descubre la última tecnología",
    highlight: "a precios increíbles",
    discount: "25%",
    productName: "iPhone 15",
    productVariant: "Pro Max",
    price: "$1,299",
    spec1Label: "Cámara",
    spec1Value: "48MP",
    spec2Label: "Chip",
    spec2Value: "A17 Pro",
    model3dType: "smartphone",
    model3dColor: "#1d4ed8",
    discountBadge: "🔥 -25% OFF",
    ctaText: "Comprar Ahora",
    ctaLink: "/category/smartphones",
    order: 0,
    active: true,
    publishedAt: new Date(),
  },
  {
    badge: "NUEVO LANZAMIENTO",
    title: "Sonido premium",
    highlight: "sin cables",
    discount: "20%",
    productName: "AirPods Pro",
    productVariant: "2da Generación",
    price: "$249",
    spec1Label: "Audio",
    spec1Value: "ANC",
    spec2Label: "Chip",
    spec2Value: "H2",
    model3dType: "airpods",
    model3dColor: "#f5f5f7",
    discountBadge: "🎧 -20% OFF",
    ctaText: "Comprar Ahora",
    ctaLink: "/category/audio",
    order: 1,
    active: true,
    publishedAt: new Date(),
  },
  {
    badge: "EDICIÓN LIMITADA",
    title: "Potencia y elegancia",
    highlight: "en tus manos",
    discount: "30%",
    productName: "MacBook Pro",
    productVariant: "M3 Max",
    price: "$2,499",
    spec1Label: "Pantalla",
    spec1Value: "16.2\"",
    spec2Label: "Chip",
    spec2Value: "M3 Max",
    model3dType: "laptop",
    model3dColor: "#c0c0c0",
    discountBadge: "💻 -30% OFF",
    ctaText: "Ver Detalles",
    ctaLink: "/category/laptops",
    order: 2,
    active: true,
    publishedAt: new Date(),
  },
  {
    badge: "BESTSELLER",
    title: "Creatividad sin límites",
    highlight: "donde sea",
    discount: "15%",
    productName: "iPad Pro",
    productVariant: "12.9\" M2",
    price: "$1,099",
    spec1Label: "Pantalla",
    spec1Value: "12.9\"",
    spec2Label: "Chip",
    spec2Value: "M2",
    model3dType: "tablet",
    model3dColor: "#2c2c2e",
    discountBadge: "📱 -15% OFF",
    ctaText: "Comprar Ahora",
    ctaLink: "/category/tablets",
    order: 3,
    active: true,
    publishedAt: new Date(),
  },
  {
    badge: "TECNOLOGÍA WEARABLE",
    title: "Tu salud en",
    highlight: "tu muñeca",
    discount: "18%",
    productName: "Apple Watch",
    productVariant: "Series 9",
    price: "$399",
    spec1Label: "Seguimiento",
    spec1Value: "GPS",
    spec2Label: "Chip",
    spec2Value: "S9 SiP",
    model3dType: "smartwatch",
    model3dColor: "#1a1a1a",
    discountBadge: "⌚ -18% OFF",
    ctaText: "Ver Más",
    ctaLink: "/category/wearables",
    order: 4,
    active: true,
    publishedAt: new Date(),
  },
];

async function seedHeroSlides() {
  console.log('🌱 Iniciando seed de Hero Slides...\n');

  try {
    // Verificar que Strapi esté corriendo
    const response = await fetch('http://localhost:1337/api/hero-slides');

    if (!response.ok) {
      console.error('❌ Error: Strapi no está corriendo o la API no está disponible');
      console.log('💡 Asegúrate de que Strapi esté corriendo: npm run develop');
      process.exit(1);
    }

    console.log('✅ Strapi está corriendo\n');

    // Crear cada slide
    for (const slide of slides) {
      console.log(`📝 Creando slide: ${slide.productName}...`);

      const createResponse = await fetch('http://localhost:1337/api/hero-slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: slide }),
      });

      if (createResponse.ok) {
        console.log(`✅ Slide "${slide.productName}" creado exitosamente`);
      } else {
        const error = await createResponse.text();
        console.error(`❌ Error creando "${slide.productName}":`, error);
      }
    }

    console.log('\n🎉 Seed completado exitosamente!');
    console.log('📍 Visita http://localhost:3000 para ver los slides en acción');

  } catch (error) {
    console.error('❌ Error durante el seed:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Asegúrate de que Strapi esté corriendo: cd backend-ecommerce && npm run develop');
    console.log('2. Verifica que el Content Type "Hero Slide" exista en Strapi');
    console.log('3. Asegúrate de que los permisos de la API estén configurados (Public role → hero-slide → find, create)');
    process.exit(1);
  }
}

// Ejecutar seed
seedHeroSlides();

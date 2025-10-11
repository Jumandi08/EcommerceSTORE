# ✅ Verificación de Integración con Backend

## 📋 Checklist de Funcionalidad

### 1. **Configuración de Environment Variables**
- ✅ `NEXT_PUBLIC_BACKEND_URL=http://localhost:1337`
- ⚠️ Verificar que el backend de Strapi esté corriendo en el puerto 1337

### 2. **APIs Implementadas**

#### ✅ **useGetProductBySlug** (Existente)
```typescript
URL: /api/products?filters[slug][$eq]={slug}&populate=*
```
**Usado en:** Página de producto principal
**Estado:** Funcional ✅

#### ✅ **useGetRelatedProducts** (Nuevo)
```typescript
URL: /api/products?populate=*&filters[category][slug][$eq]={categorySlug}&pagination[limit]={limit}
```
**Usado en:** Sección de productos relacionados
**Estado:** Implementado ✅

**Características:**
- Filtra por categoría
- Excluye el producto actual
- Límite configurable (default: 4)
- Manejo de errores robusto

### 3. **Estructura de Datos Requerida en Strapi**

#### **Modelo Product** (Debe incluir):
```typescript
{
  id: number
  productName: string
  slug: string
  description: string
  price: number
  stock: number
  active: boolean
  isFeatured: boolean
  taste: string
  origin: string
  images: Image[]
  category: {
    slug: string
    categoryName: string
  }
}
```

#### **Modelo Category** (Debe incluir):
```typescript
{
  slug: string
  categoryName: string
}
```

### 4. **Sistema de Reseñas**

#### **Estado Actual:**
- ⚠️ **Simulado con datos locales** (product-reviews.tsx líneas 13-27)
- Las reseñas se almacenan en el estado local del componente
- No persisten al recargar la página

#### **Para Conectar al Backend:**

##### **Paso 1: Crear Content-Type en Strapi**
Nombre: `Review`

Campos:
- `product` (Relation - Many to One → Product)
- `userName` (Text)
- `rating` (Number - Min: 1, Max: 5)
- `comment` (Rich Text o Long Text)
- `helpful` (Number - Default: 0)
- `verified` (Boolean - Default: false)

##### **Paso 2: Crear Hook de API**
Archivo: `api/getReviews.tsx`

```typescript
'use client';

import { useEffect, useState } from "react"

interface Review {
  id: number
  userName: string
  rating: number
  comment: string
  date: string
  helpful: number
}

export function useGetReviews(productId: number) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reviews?filters[product][id][$eq]=${productId}&sort=createdAt:desc&populate=*`

  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

        const json = await res.json()
        const transformedReviews = json.data.map((item: any) => ({
          id: item.id,
          userName: item.userName,
          rating: item.rating,
          comment: item.comment,
          date: item.createdAt,
          helpful: item.helpful || 0,
        }))

        setReviews(transformedReviews)
        setLoading(false)
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : 'Error fetching reviews')
        setLoading(false)
      }
    })()
  }, [url])

  return { reviews, loading, error }
}
```

##### **Paso 3: Actualizar ProductReviews Component**
Reemplazar línea 13-27 con:
```typescript
const { reviews: fetchedReviews, loading } = useGetReviews(productId);
const [reviews, setReviews] = useState<Review[]>([]);

useEffect(() => {
  if (fetchedReviews) {
    setReviews(fetchedReviews);
  }
}, [fetchedReviews]);
```

### 5. **Endpoints del Backend Requeridos**

#### **GET Productos**
```
GET /api/products?populate=*
GET /api/products?filters[slug][$eq]={slug}&populate=*
GET /api/products?filters[category][slug][$eq]={categorySlug}&populate=*
```

#### **GET Reseñas** (Pendiente implementar)
```
GET /api/reviews?filters[product][id][$eq]={productId}&sort=createdAt:desc
POST /api/reviews (para crear nueva reseña)
PUT /api/reviews/{id} (para marcar como útil)
```

### 6. **Permisos en Strapi**

Asegúrate de que los siguientes permisos estén habilitados en **Settings → Roles → Public**:

#### **Product:**
- ✅ find
- ✅ findOne

#### **Category:**
- ✅ find
- ✅ findOne

#### **Review** (cuando se implemente):
- ✅ find
- ✅ create (si permites reseñas sin autenticación)

### 7. **Testing Manual**

#### **Verificar Productos Relacionados:**
1. Ir a una página de producto
2. Scroll hasta el final
3. Verificar que aparezcan productos de la misma categoría
4. Verificar que NO aparezca el producto actual

#### **Verificar Reseñas:**
1. Ver rating promedio en la parte superior
2. Ver distribución de estrellas
3. Escribir una nueva reseña
4. Verificar que aparezca en la lista

### 8. **Solución de Problemas**

#### **Productos relacionados no aparecen:**
- ✅ Verificar que el producto tenga una categoría asignada
- ✅ Verificar que existan otros productos en esa categoría
- ✅ Revisar consola del navegador para errores de CORS

#### **Error de CORS:**
Agregar en backend Strapi `config/middlewares.js`:
```javascript
module.exports = [
  // ...
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:3000', 'http://localhost:3001'],
    },
  },
];
```

#### **Imágenes no cargan:**
- ✅ Verificar `NEXT_PUBLIC_BACKEND_URL` en `.env.local`
- ✅ Verificar que las imágenes estén en `/uploads` de Strapi
- ✅ Verificar permisos de la carpeta `public/uploads` en Strapi

### 9. **Estado de Implementación**

| Característica | Estado | Backend Requerido |
|----------------|--------|-------------------|
| Breadcrumbs | ✅ Completo | Categoría en producto |
| Rating Visual | ✅ Completo | Simulado (conectar a reviews) |
| Badge Categoría | ✅ Completo | Categoría en producto |
| Compartir | ✅ Completo | Solo frontend |
| Stock Visual | ✅ Completo | Campo stock en producto |
| Productos Relacionados | ✅ Completo | Categoría en productos |
| Reseñas - Visualización | ⚠️ Simulado | Crear content-type Review |
| Reseñas - Crear | ⚠️ Local | POST /api/reviews |
| Reseñas - Útil | ⚠️ Local | PUT /api/reviews/{id} |

### 10. **Próximos Pasos**

1. **Iniciar Backend Strapi:**
   ```bash
   cd backend-ecommerce
   npm run develop
   ```

2. **Verificar que el backend responda:**
   ```
   http://localhost:1337/api/products?populate=*
   ```

3. **Iniciar Frontend:**
   ```bash
   cd frontend-ecommerce
   npm run dev
   ```

4. **Navegar a un producto:**
   ```
   http://localhost:3001/product/{slug}
   ```

5. **Implementar sistema de reseñas real** (opcional):
   - Crear content-type Review en Strapi
   - Crear hook useGetReviews
   - Actualizar ProductReviews component
   - Agregar endpoint POST para crear reseñas

---

## ✅ Resumen

**Funcionando con Backend:**
- ✅ Página de producto
- ✅ Galería de imágenes
- ✅ Información del producto
- ✅ Stock visual
- ✅ Breadcrumbs
- ✅ Productos relacionados

**Funcionando Solo Frontend (Simulado):**
- ⚠️ Sistema de reseñas (datos de ejemplo)

**Todo está listo para funcionar con tu backend de Strapi!** 🚀

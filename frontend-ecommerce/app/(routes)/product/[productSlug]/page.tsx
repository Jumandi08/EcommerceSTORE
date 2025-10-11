"use client"
import { useGetProductBySlug } from "@/api/getProductBySlug";
import { useGetRelatedProducts } from "@/api/getRelatedProducts";
import { ResponseType } from "@/types/response";
import { useParams } from "next/navigation";
import SkeletonProduct from "./components/skeleton-product";
import CarouselProduct from "./components/carousel-product";
import InfoProduct from "./components/info-product";
import ProductReviews from "./components/product-reviews";
import RelatedProducts from "./components/related-products";
import Breadcrumbs from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
// import {ProductType} from "@/types/product";



export default function Page() {
  const params = useParams();
  const productSlug = params.productSlug as string;

  // Asegúrate de que useGetProductBySlug sea un hook válido
  const response = useGetProductBySlug(productSlug);

  // Preparar datos para productos relacionados (antes de los returns condicionales)
  const result = response ? (response as ResponseType).result : null;
  const product = result?.[0];
  const categorySlug = product?.attributes?.category?.data?.attributes?.slug || "";
  const productId = product?.id || 0;

  // IMPORTANTE: Todos los hooks deben llamarse antes de cualquier return condicional
  const { result: relatedProducts } = useGetRelatedProducts(categorySlug, productId, 4);

  // Verifica si response existe antes de intentar desestructurarlo
  if (!response) {
    return <p>Cargando ...</p>;
  }

  // Ahora sí podemos hacer los returns condicionales
  if (result === null) {
    return <SkeletonProduct/>
  }

  if (!result || result.length === 0 || !product?.attributes) {
    return <p className="text-center py-8">Producto no encontrado</p>
  }

  const categoryName = product.attributes.category?.data?.attributes?.categoryName || "Productos";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl py-8 mx-auto px-4 sm:py-12 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            {
              label: categoryName,
              href: categorySlug ? `/category/${categorySlug}` : undefined,
            },
            {
              label: product.attributes.productName,
            },
          ]}
        />

        {/* Sección principal del producto */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galería de imágenes */}
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <CarouselProduct images={product.attributes.images} />
          </div>

          {/* Información del producto */}
          <div className="animate-in fade-in slide-in-from-right duration-700">
            <InfoProduct product={product} />
          </div>
        </div>

        <Separator className="my-12" />

        {/* Sección de reseñas */}
        <div className="animate-in fade-in slide-in-from-bottom duration-700">
          <ProductReviews productId={product.id} />
        </div>

        {/* Productos relacionados */}
        {relatedProducts && relatedProducts.length > 0 && (
          <>
            <Separator className="my-12" />
            <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-200">
              <RelatedProducts products={relatedProducts} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
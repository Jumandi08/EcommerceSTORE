"use client"
import { ProductType } from "@/types/product";
import { formatPrice } from "@/lib/formatPrice";
import { Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/use-loved-products";

interface RelatedProductsProps {
  products: ProductType[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const { addLoveItem, lovedItems } = UseLovedProducts();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Productos Relacionados
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            También te podría interesar
          </p>
        </div>
      </div>

      {/* Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => {
          const isLoved = lovedItems.some((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Imagen del producto */}
              <div
                className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer"
                onClick={() => router.push(`/product/${product.attributes.slug}`)}
              >
                {product.attributes.images?.data?.[0] && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.attributes.images.data[0].attributes.url}`}
                    alt={product.attributes.productName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}

                {/* Overlay con botones */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addLoveItem(product);
                    }}
                    className="p-3 bg-white dark:bg-gray-800 rounded-full hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all transform hover:scale-110"
                    aria-label="Agregar a favoritos"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isLoved
                          ? "fill-rose-500 stroke-rose-500"
                          : "stroke-gray-700 dark:stroke-gray-300"
                      }`}
                    />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(product);
                    }}
                    className="p-3 bg-rose-600 hover:bg-rose-700 rounded-full transition-all transform hover:scale-110"
                    aria-label="Agregar al carrito"
                  >
                    <ShoppingCart className="w-5 h-5 stroke-white" />
                  </button>
                </div>

                {/* Badge de destacado */}
                {product.attributes.isFeatured && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-rose-600 text-white text-xs font-bold rounded-full">
                    Destacado
                  </div>
                )}
              </div>

              {/* Información del producto */}
              <div className="p-4 space-y-2">
                <h3
                  className="font-semibold text-gray-900 dark:text-white line-clamp-2 cursor-pointer hover:text-rose-600 dark:hover:text-rose-400 transition-colors min-h-[48px]"
                  onClick={() => router.push(`/product/${product.attributes.slug}`)}
                >
                  {product.attributes.productName}
                </h3>

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                    {formatPrice(product.attributes.price)}
                  </p>

                  {product.attributes.stock !== undefined && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        product.attributes.stock > 10
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : product.attributes.stock > 0
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                      }`}
                    >
                      {product.attributes.stock > 10
                        ? "Stock"
                        : product.attributes.stock > 0
                        ? `${product.attributes.stock} left`
                        : "Agotado"}
                    </span>
                  )}
                </div>

                {/* Tags de origen y sabor */}
                <div className="flex items-center gap-2 flex-wrap">
                  {product.attributes.taste && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                      {product.attributes.taste}
                    </span>
                  )}
                  {product.attributes.origin && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                      {product.attributes.origin}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

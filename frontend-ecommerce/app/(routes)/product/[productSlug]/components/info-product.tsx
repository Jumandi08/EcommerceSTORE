"use client"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/formatPrice'
import { ProductType } from '@/types/product'
import { Heart, ShoppingCart, Package, Shield, Truck, Star, Share2, Tag } from 'lucide-react'
import React, { useState } from 'react'
import { useCart } from '@/hooks/use-cart'
import { UseLovedProducts } from '@/hooks/use-loved-products'
import { useGetProductReviews } from '@/api/reviews'
import ProductTasteOrigin from '@/components/shared/product-taste-origin'
import Link from 'next/link'

export type InfoProductProps = {
    product: ProductType
}
const InfoProduct = ( props: InfoProductProps ) => {
    const { product } = props;
    const { addItem } = useCart()
    const { addLoveItem, lovedItems } = UseLovedProducts()
    const [quantity, setQuantity] = useState(1);
    const [showShareTooltip, setShowShareTooltip] = useState(false);
    const isLoved = lovedItems.some(item => item.id === product.id);

    const categoryName = product.attributes.category?.data?.attributes?.categoryName;
    const categorySlug = product.attributes.category?.data?.attributes?.slug;
    const stock = product.attributes.stock || 0;

    // Obtener reseñas reales del backend
    const { result: reviewsData } = useGetProductReviews(product.id);
    const rating = reviewsData?.meta?.averageRating || 0;
    const reviewCount = reviewsData?.meta?.totalReviews || 0;

    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: product.attributes.productName,
            text: product.attributes.description,
            url: window.location.href,
          });
        } catch (err) {
          console.log('Error sharing:', err);
        }
      } else {
        // Copiar URL al clipboard
        navigator.clipboard.writeText(window.location.href);
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
      }
    };

  return (
    <div className="space-y-6">
      {/* Header con título y acciones */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-3">
              {product.attributes.productName}
            </h1>

            {/* Rating y categoría */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rating)
                          ? 'fill-yellow-400 stroke-yellow-400'
                          : 'stroke-gray-300 dark:stroke-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {rating} ({reviewCount} reseñas)
                </span>
              </div>

              {/* Categoría */}
              {categoryName && (
                <>
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                  <Link
                    href={categorySlug ? `/category/${categorySlug}` : '#'}
                    className="flex items-center gap-1 text-sm text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    <Tag className="w-4 h-4" />
                    {categoryName}
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Acciones (Favorito y Compartir) */}
          <div className="flex gap-2">
            <button
              onClick={() => addLoveItem(product)}
              className="group relative p-3 rounded-full hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-300"
              aria-label="Agregar a favoritos"
            >
              <Heart
                className={`w-6 h-6 transition-all duration-300 ${
                  isLoved
                    ? 'fill-rose-500 stroke-rose-500'
                    : 'stroke-gray-400 group-hover:stroke-rose-500 group-hover:scale-110'
                }`}
              />
            </button>

            <div className="relative">
              <button
                onClick={handleShare}
                className="group p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                aria-label="Compartir producto"
              >
                <Share2 className="w-6 h-6 stroke-gray-400 group-hover:stroke-rose-500 transition-all duration-300 group-hover:scale-110" />
              </button>
              {showShareTooltip && (
                <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-black text-white text-xs rounded-lg whitespace-nowrap">
                  ¡Enlace copiado!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tags de origen y sabor */}
        <ProductTasteOrigin origin={product.attributes.origin} taste={product.attributes.taste} />
      </div>

      <Separator />

      {/* Precio destacado */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 p-6 rounded-2xl border border-rose-200 dark:border-rose-800">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Precio</p>
        <p className="text-4xl font-bold text-rose-600 dark:text-rose-400">
          {formatPrice(product.attributes.price)}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Incluye impuestos</p>
      </div>

      {/* Descripción */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Descripción</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {product.attributes.description}
        </p>
      </div>

      <Separator />

      {/* Indicador de Stock */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Disponibilidad
            </span>
            <span className={`text-sm font-semibold ${
              stock > 10
                ? 'text-green-600 dark:text-green-400'
                : stock > 0
                ? 'text-yellow-600 dark:text-yellow-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {stock > 10 ? 'En stock' : stock > 0 ? `Solo ${stock} disponibles` : 'Agotado'}
            </span>
          </div>
          {/* Barra de stock */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                stock > 10
                  ? 'bg-green-500'
                  : stock > 0
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${Math.min((stock / 20) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Selector de cantidad */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-gray-900 dark:text-white">Cantidad</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span className="px-6 py-2 font-semibold min-w-[60px] text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(quantity + 1, stock))}
              disabled={quantity >= stock}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Máximo {stock} unidades
          </span>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={() => {
            for (let i = 0; i < quantity; i++) {
              addItem(product);
            }
          }}
          disabled={stock === 0}
          className="flex-1 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {stock === 0 ? 'Agotado' : 'Agregar al Carrito'}
        </Button>
      </div>

      {/* Mensaje de urgencia si stock bajo */}
      {stock > 0 && stock <= 5 && (
        <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg animate-pulse">
          <Package className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
            ¡Últimas unidades disponibles! Solo quedan {stock}
          </p>
        </div>
      )}

      {/* Características adicionales */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
          <Truck className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm text-gray-900 dark:text-white">Envío Rápido</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">2-3 días hábiles</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
          <Shield className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm text-gray-900 dark:text-white">Compra Segura</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">100% protegido</p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
          <Package className="w-5 h-5 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm text-gray-900 dark:text-white">Garantía</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">30 días devolución</p>
          </div>
        </div>
      </div>
   </div>
  )
}
export default InfoProduct;
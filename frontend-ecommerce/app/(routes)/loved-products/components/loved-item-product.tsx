"use client";

import { motion } from "framer-motion";
import ProductImageMiniature from "@/components/shared/product-image-miniature";
import ProductTasteOrigin from "@/components/shared/product-taste-origin";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { UseLovedProducts } from "@/hooks/use-loved-products";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X, ShoppingCart, Package, AlertCircle } from "lucide-react";
import React from "react";

interface LovedItemProductProps {
  product: ProductType;
}

const LovedItemProduct = (props: LovedItemProductProps) => {
  const { product } = props;
  const { removeLovedItem } = UseLovedProducts();
  const { addItem } = useCart();

  const addToCheckout = () => {
    addItem(product);
    removeLovedItem(product.id);
  };

  if (!product?.attributes) {
    return null;
  }

  const isOutOfStock = product.attributes.stock === 0;
  const isLowStock = product.attributes.stock < 10 && product.attributes.stock > 0;

  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      className="group relative"
    >
      <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
        {/* Product Image and Info Container for Mobile */}
        <div className="flex gap-4 flex-1">
          {/* Product Image */}
          <div className="relative shrink-0">
            <ProductImageMiniature
              slug={product.attributes.slug}
              url={product.attributes.images.data[0].attributes.url}
            />
            {/* Stock Badge */}
            {isOutOfStock && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 text-xs"
              >
                Agotado
              </Badge>
            )}
            {isLowStock && (
              <Badge
                variant="outline"
                className="absolute -top-2 -right-2 text-xs border-orange-500 text-orange-600 bg-white dark:bg-gray-800"
              >
                ¡Últimos!
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Product Name */}
                <h2 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {product.attributes.productName}
                </h2>

                {/* Taste and Origin */}
                <ProductTasteOrigin
                  origin={product.attributes.origin}
                  taste={product.attributes.taste}
                />

                {/* Price */}
                <div className="mt-2 flex items-baseline gap-2">
                  <p className="text-xl sm:text-2xl font-bold text-rose-600">
                    {formatPrice(product.attributes.price)}
                  </p>
                  {product.attributes.isFeatured && (
                    <Badge
                      variant="secondary"
                      className="bg-rose-100 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400"
                    >
                      Destacado
                    </Badge>
                  )}
                </div>

                {/* Stock Info */}
                <div className="mt-2 flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span
                    className={cn(
                      "font-medium",
                      isOutOfStock
                        ? "text-red-600 dark:text-red-400"
                        : isLowStock
                          ? "text-orange-600 dark:text-orange-400"
                          : "text-gray-600 dark:text-gray-400"
                    )}
                  >
                    {isOutOfStock
                      ? "Sin stock"
                      : isLowStock
                        ? `Solo quedan ${product.attributes.stock}`
                        : `${product.attributes.stock} disponibles`}
                  </span>
                </div>
              </div>

              {/* Remove Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeLovedItem(product.id)}
                className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600 transition-colors shrink-0"
                aria-label="Eliminar de favoritos"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              {isOutOfStock ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span>Producto agotado temporalmente</span>
                </div>
              ) : (
                <motion.div whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={addToCheckout}
                    className="bg-rose-600 hover:bg-rose-700 text-white group w-full sm:w-auto"
                  >
                    <ShoppingCart className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Añadir al Carrito</span>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default LovedItemProduct;

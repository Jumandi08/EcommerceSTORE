"use client";

import { motion } from "framer-motion";
import ProductImageMiniature from "@/components/shared/product-image-miniature";
import ProductTasteOrigin from "@/components/shared/product-taste-origin";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/product";
import { X, Plus, Minus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CartItemProps {
  product: ProductType & { quantity: number };
}

const CartItem = (props: CartItemProps) => {
  const { product } = props;
  const { removeItem, incrementQuantity, decrementQuantity } = useCart();

  if (!product?.attributes) {
    return null;
  }

  const stockPercentage = (product.attributes.stock / 100) * 100;
  const isLowStock = product.attributes.stock < 10;

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
            {isLowStock && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 text-xs"
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
                <h3 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-1 line-clamp-2">
                  {product.attributes.productName}
                </h3>

                {/* Taste and Origin */}
                <ProductTasteOrigin
                  taste={product.attributes.taste}
                  origin={product.attributes.origin}
                />

                {/* Price */}
                <div className="mt-2 flex items-baseline gap-2">
                  <p className="text-xl sm:text-2xl font-bold text-rose-600">
                    {formatPrice(product.attributes.price)}
                  </p>
                  <span className="text-sm text-gray-500">c/u</span>
                </div>

                {/* Subtotal */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Subtotal:{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatPrice(product.attributes.price * product.quantity)}
                  </span>
                </p>
              </div>

              {/* Remove Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeItem(product.id)}
                className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600 transition-colors shrink-0"
                aria-label="Eliminar producto"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Quantity Controls */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cantidad:
                </span>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-white dark:hover:bg-gray-600"
                    onClick={() => decrementQuantity(product.id)}
                    disabled={product.quantity <= 1}
                  >
                    <Minus size={16} />
                  </Button>

                  <span className="font-bold text-lg w-10 text-center text-gray-900 dark:text-white">
                    {product.quantity}
                  </span>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-white dark:hover:bg-gray-600"
                    onClick={() => incrementQuantity(product.id)}
                    disabled={product.quantity >= product.attributes.stock}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              {/* Stock Info */}
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-4 h-4 text-gray-400 shrink-0" />
                <span
                  className={cn(
                    "font-medium",
                    isLowStock
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-600 dark:text-gray-400"
                  )}
                >
                  {isLowStock
                    ? `Solo quedan ${product.attributes.stock}`
                    : `${product.attributes.stock} disponibles`}
                </span>
              </div>
            </div>

            {/* Stock Progress Bar */}
            {isLowStock && (
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Disponibilidad</span>
                  <span>{product.attributes.stock} unidades</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                  <motion.div
                    className={cn(
                      "h-1.5 rounded-full",
                      product.attributes.stock < 5
                        ? "bg-red-600"
                        : "bg-orange-500"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${stockPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default CartItem;

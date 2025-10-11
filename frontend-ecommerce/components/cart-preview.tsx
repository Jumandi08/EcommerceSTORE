"use client";

import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import Image from "next/image";
import { X, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

const CartPreview = () => {
  const router = useRouter();
  const { items, removeItem } = useCart();

  const totalPrice = items.reduce((total, item) => {
    return total + (item.attributes.price * item.quantity);
  }, 0);

  if (items.length === 0) {
    return (
      <div className="w-80 p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <ShoppingCart className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-2 font-medium">
          Tu carrito está vacío
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
          Agrega productos para comenzar
        </p>
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          className="w-full hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 transition-colors"
        >
          Explorar productos
        </Button>
      </div>
    );
  }

  return (
    <div className="w-80 max-w-[90vw] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg">Carrito ({items.length})</h3>
      </div>

      {/* Items List */}
      <ScrollArea className="h-80 max-h-[60vh]">
        <div className="p-4 space-y-3">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="flex gap-3 group relative p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image */}
              <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 ring-1 ring-gray-200 dark:ring-gray-700">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${item.attributes.images.data[0].attributes.url}`}
                  alt={item.attributes.productName}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <h4 className="text-sm font-medium line-clamp-2 break-words mb-1 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                  {item.attributes.productName}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Cantidad: <span className="font-semibold text-gray-700 dark:text-gray-300">{item.quantity}</span>
                </p>
                <p className="text-sm font-bold text-rose-600 dark:text-rose-400">
                  {formatPrice(item.attributes.price * item.quantity)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-md flex-shrink-0 h-fit"
                aria-label="Eliminar producto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>

      <Separator />

      {/* Footer */}
      <div className="p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700 dark:text-gray-300">Subtotal:</span>
          <span className="font-bold text-lg text-rose-600 dark:text-rose-400">{formatPrice(totalPrice)}</span>
        </div>

        <Button
          onClick={() => router.push("/cart")}
          className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
        >
          Ver Carrito Completo
        </Button>
      </div>
    </div>
  );
};

export default CartPreview;

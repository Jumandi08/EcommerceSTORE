"use client";

import { UseLovedProducts } from "@/hooks/use-loved-products";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/formatPrice";
import Image from "next/image";
import { X, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

const FavoritesPreview = () => {
  const router = useRouter();
  const { lovedItems, removeLovedItem } = UseLovedProducts();

  if (lovedItems.length === 0) {
    return (
      <div className="w-80 p-6 text-center">
        <div className="mb-4 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <Heart className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-2 font-medium">
          No tienes favoritos
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
          Guarda productos que te gusten aquí
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
        <h3 className="font-semibold text-lg">Favoritos ({lovedItems.length})</h3>
      </div>

      {/* Items List */}
      <ScrollArea className="h-80 max-h-[60vh]">
        <div className="p-4 space-y-3">
          {lovedItems.map((item, index) => (
            <div
              key={item.id}
              className="flex gap-3 group relative p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => router.push(`/product/${item.attributes.slug}`)}
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
                <p className="text-sm font-bold text-rose-600 dark:text-rose-400">
                  {formatPrice(item.attributes.price)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeLovedItem(item.id);
                }}
                className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600 dark:hover:text-rose-400 rounded-md flex-shrink-0 h-fit"
                aria-label="Quitar de favoritos"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t bg-gray-50 dark:bg-gray-900/50">
        <Button
          onClick={() => router.push("/loved-products")}
          className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
        >
          Ver Todos los Favoritos
        </Button>
      </div>
    </div>
  );
};

export default FavoritesPreview;

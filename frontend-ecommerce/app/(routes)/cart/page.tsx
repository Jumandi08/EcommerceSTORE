"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/formatPrice";
import CartItem from "./components/cart-item";
import Link from "next/link";
import {
  ShoppingCart,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck,
  Shield,
  CreditCard,
  Trash2,
} from "lucide-react";

export default function Page() {
  const { items, selectAllItems, deselectAllItems, getSelectedItems, removeSelectedItems } = useCart();

  const selectedItems = getSelectedItems();
  const allSelected = items.length > 0 && selectedItems.length === items.length;
  const someSelected = selectedItems.length > 0 && selectedItems.length < items.length;

  // Calculate totals only for selected items
  const subtotal = selectedItems.reduce((total, item) => {
    return total + (item?.attributes?.price || 0) * (item?.quantity || 1);
  }, 0);
  const totalItems = selectedItems.reduce(
    (total, item) => total + (item?.quantity || 1),
    0
  );

  // Simulated shipping and tax
  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 5.99) : 0;
  const tax = subtotal * 0.12; // 12% IVA
  const total = subtotal + shipping + tax;

  const handleSelectAll = () => {
    if (allSelected) {
      deselectAllItems();
    } else {
      selectAllItems();
    }
  };

  const benefits = [
    { Icon: Truck, text: "Envío gratis en compras mayores a $100" },
    { Icon: Shield, text: "Garantía de 1 año en todos los productos" },
    { Icon: CreditCard, text: "Pago seguro con encriptación SSL" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-rose-100 dark:bg-rose-900/20 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Carrito de Compras
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {totalItems > 0
                  ? `${totalItems} ${totalItems === 1 ? "producto" : "productos"} en tu carrito`
                  : "Tu carrito está vacío"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {items.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center"
                >
                  <div className="inline-flex p-6 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
                    <ShoppingBag className="w-16 h-16 text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Tu carrito está vacío
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    Parece que aún no has agregado ningún producto. ¡Explora
                    nuestro catálogo y encuentra lo que buscas!
                  </p>
                  <Link href="/">
                    <Button className="bg-rose-600 hover:bg-rose-700 text-white group">
                      <span>Explorar Productos</span>
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="items"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={handleSelectAll}
                          className={someSelected ? "data-[state=checked]:bg-gray-400" : ""}
                        />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                          Seleccionar todo
                        </h2>
                      </div>
                      <div className="flex items-center gap-3">
                        {selectedItems.length > 0 && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={removeSelectedItems}
                            className="gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar ({selectedItems.length})
                          </Button>
                        )}
                        <Badge variant="secondary" className="text-sm">
                          {items.length} {items.length === 1 ? "item" : "items"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CartItem product={item} />
                      </motion.div>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Benefits Section */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 grid md:grid-cols-3 gap-4"
              >
                {benefits.map(({ Icon, text }, index) => (
                  <motion.div
                    key={text}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-2 bg-rose-100 dark:bg-rose-900/20 rounded-lg shrink-0">
                      <Icon className="w-5 h-5 text-rose-600" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {text}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-r from-rose-600 to-rose-700 p-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Resumen del Pedido
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  {/* Selected items info */}
                  {selectedItems.length === 0 && items.length > 0 && (
                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
                      <p className="text-sm text-amber-700 dark:text-amber-400">
                        Selecciona productos para ver el resumen
                      </p>
                    </div>
                  )}

                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal ({totalItems}{" "}
                      {totalItems === 1 ? "producto seleccionado" : "productos seleccionados"})
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      Envío
                    </span>
                    <div className="text-right">
                      {shipping === 0 && subtotal > 0 ? (
                        <div>
                          <span className="font-semibold text-green-600">
                            ¡GRATIS!
                          </span>
                          <p className="text-xs text-gray-500">
                            Ahorras {formatPrice(5.99)}
                          </p>
                        </div>
                      ) : (
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatPrice(shipping)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Free shipping progress */}
                  {subtotal > 0 && subtotal < 100 && (
                    <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-200 dark:border-rose-800 rounded-lg p-3">
                      <p className="text-sm text-rose-700 dark:text-rose-400 mb-2">
                        ¡Agrega {formatPrice(100 - subtotal)} más para envío
                        gratis!
                      </p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-rose-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(subtotal / 100) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Tax */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">
                      IVA (12%)
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatPrice(tax)}
                    </span>
                  </div>

                  <Separator />

                  {/* Total */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-rose-600">
                      {formatPrice(total)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <motion.div whileTap={{ scale: 0.98 }}>
                    <Button
                      className="w-full h-12 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-base group relative overflow-hidden disabled:opacity-50"
                      onClick={() => {
                        /* TODO: Implement checkout */
                      }}
                      disabled={selectedItems.length === 0}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Proceder al Pago
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-rose-700"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Button>
                  </motion.div>

                  {/* Continue Shopping */}
                  <Link href="/">
                    <Button
                      variant="outline"
                      className="w-full border-2 hover:border-rose-600 hover:text-rose-600"
                    >
                      Continuar Comprando
                    </Button>
                  </Link>

                  {/* Security Note */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 pt-2">
                    <Shield className="w-4 h-4" />
                    <span>Pago 100% seguro y protegido</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

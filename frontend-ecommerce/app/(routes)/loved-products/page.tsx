"use client";

import { motion, AnimatePresence } from "framer-motion";
import { UseLovedProducts } from "@/hooks/use-loved-products";
import LovedItemProduct from "./components/loved-item-product";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";

export default function Page() {
  const { lovedItems } = UseLovedProducts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-100 dark:bg-rose-900/20 rounded-xl relative">
                <Heart className="w-6 h-6 text-rose-600 fill-rose-600" />
                {lovedItems.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Badge className="bg-rose-600 hover:bg-rose-700 h-5 min-w-5 flex items-center justify-center p-1">
                      {lovedItems.length}
                    </Badge>
                  </motion.div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Mis Favoritos
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {lovedItems.length > 0
                    ? `${lovedItems.length} ${lovedItems.length === 1 ? "producto guardado" : "productos guardados"}`
                    : "No tienes productos favoritos"}
                </p>
              </div>
            </div>

            {lovedItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 bg-rose-50 dark:bg-rose-900/10 px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-800"
              >
                <Sparkles className="w-5 h-5 text-rose-600" />
                <p className="text-sm text-rose-700 dark:text-rose-400 font-medium">
                  ¡Productos que te encantan!
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {lovedItems.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="inline-flex p-6 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full mb-6"
                >
                  <Heart className="w-16 h-16 text-rose-600" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Aún no tienes favoritos
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Explora nuestro catálogo y guarda los productos que más te
                  gusten. ¡Haz clic en el corazón para agregarlos aquí!
                </p>
                <Link href="/">
                  <Button className="bg-rose-600 hover:bg-rose-700 text-white group">
                    <ShoppingBag className="mr-2 w-5 h-5" />
                    <span>Explorar Productos</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="items"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-6"
            >
              {/* Stats Cards */}
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-rose-100 dark:bg-rose-900/20 rounded-lg">
                      <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Total Favoritos
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {lovedItems.length}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                      <ShoppingBag className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Disponibles
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {
                          lovedItems.filter(
                            (item) => item.attributes.stock > 0
                          ).length
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Destacados
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {
                          lovedItems.filter(
                            (item) => item.attributes.isFeatured
                          ).length
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Products List */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Tus Productos Favoritos
                    </h2>
                    <Badge variant="secondary" className="text-sm">
                      {lovedItems.length}{" "}
                      {lovedItems.length === 1 ? "producto" : "productos"}
                    </Badge>
                  </div>
                </div>

                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {lovedItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <LovedItemProduct product={item} />
                    </motion.div>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto border-2 hover:border-rose-600 hover:text-rose-600"
                  >
                    Seguir Explorando
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HeroModern() {
  const router = useRouter()

  return (
    <section className="mx-auto mt-10 max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6 md:p-12">
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* Contenido */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <Badge className="mb-4 bg-white/90 text-indigo-900 hover:bg-white">
            <Sparkles className="w-3 h-3 mr-1" />
            OFERTAS ESPECIALES
          </Badge>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Descubre la última tecnología
          </h1>

          <p className="mt-4 text-lg text-white/90">
            Obtén increíbles descuentos de hasta <span className="font-bold">25%</span> en productos seleccionados
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              className="rounded-full bg-white text-indigo-900 hover:bg-white/90 dark:bg-zinc-900 dark:text-white"
              onClick={() => router.push('/category/all')}
            >
              Comprar Ahora →
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-2 border-white bg-transparent text-white hover:bg-white/10"
              onClick={() => router.push('/category/ofertas')}
            >
              Ver Ofertas
            </Button>
          </div>

          {/* Controles del carrusel */}
          <div className="mt-8 flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-12 w-12 rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-white text-indigo-900 hover:bg-white/90"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
            <div className="ml-3 flex gap-2">
              <div className="h-2 w-8 rounded-full bg-white" />
              <div className="h-2 w-2 rounded-full bg-white/40" />
              <div className="h-2 w-2 rounded-full bg-white/40" />
            </div>
          </div>
        </motion.div>

        {/* Imagen/Mockup del Producto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          {/* Círculos decorativos */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute h-64 w-64 rounded-full bg-white/10 blur-3xl md:h-96 md:w-96"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            className="absolute h-48 w-48 rounded-full bg-pink-400/20 blur-2xl md:h-72 md:w-72"
          />

          {/* Mockup de Smartphone */}
          <div className="relative z-10 flex items-center justify-center">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative h-[450px] w-[220px] rounded-[34px] border-[12px] border-zinc-900 bg-gradient-to-br from-zinc-900 to-zinc-800 shadow-2xl md:h-[550px] md:w-[270px]"
            >
              {/* Pantalla del teléfono */}
              <div className="absolute inset-[8px] rounded-[24px] bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-4">
                <div className="flex h-full flex-col items-center justify-center text-white">
                  <div className="text-xs opacity-70">Nuevo</div>
                  <div className="mt-2 text-center text-3xl font-bold">iPhone 15</div>
                  <div className="mt-1 text-sm opacity-90">Pro Max</div>
                  <div className="mt-6 rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-sm">
                    Desde $1,299
                  </div>
                </div>
              </div>

              {/* Notch */}
              <div className="absolute left-1/2 top-[8px] h-6 w-24 -translate-x-1/2 rounded-b-2xl bg-zinc-900" />
            </motion.div>
          </div>

          {/* Badges flotantes */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="absolute right-0 top-10 rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-900 shadow-lg md:right-10"
          >
            🔥 Hot Deal
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="absolute bottom-20 left-0 rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-900 shadow-lg md:left-10"
          >
            -25% OFF
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

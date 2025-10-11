"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import { useGetHeroSlides, HeroSlideType } from "@/api/getHeroSlides"

const Canvas = dynamic(() => import("@react-three/fiber").then((mod) => mod.Canvas), {
  ssr: false,
})
const OrbitControls = dynamic(() => import("@react-three/drei").then((mod) => mod.OrbitControls), {
  ssr: false,
})
const Environment = dynamic(() => import("@react-three/drei").then((mod) => mod.Environment), {
  ssr: false,
})
const PerspectiveCamera = dynamic(() => import("@react-three/drei").then((mod) => mod.PerspectiveCamera), {
  ssr: false,
})
const CustomModel3D = dynamic(() => import("./3d-models/custom-model-3d"), {
  ssr: false,
})

const heroSlides = [
  {
    id: 1,
    badge: "OFERTAS ESPECIALES",
    title: "Descubre la última tecnología",
    highlight: "a precios increíbles",
    discount: "25%",
    productName: "iPhone 15",
    productVariant: "Pro Max",
    price: "$1,299",
    camera: "48MP",
    chip: "A17 Pro",
    model3D: "smartphone",
    modelColor: "#1d4ed8",
    discountBadge: "🔥 -25% OFF",
  },
  {
    id: 2,
    badge: "NUEVO LANZAMIENTO",
    title: "Sonido premium",
    highlight: "sin cables",
    discount: "20%",
    productName: "AirPods Pro",
    productVariant: "2da Generación",
    price: "$249",
    camera: "ANC",
    chip: "H2 Chip",
    model3D: "airpods",
    modelColor: "#f5f5f7",
    discountBadge: "🎧 -20% OFF",
  },
  {
    id: 3,
    badge: "EDICIÓN LIMITADA",
    title: "Potencia y elegancia",
    highlight: "en tus manos",
    discount: "30%",
    productName: "MacBook Pro",
    productVariant: "M3 Max",
    price: "$2,499",
    camera: "1080p HD",
    chip: "M3 Max",
    model3D: "laptop",
    modelColor: "#c0c0c0",
    discountBadge: "💎 -30% OFF",
  },
  {
    id: 4,
    badge: "BESTSELLER",
    title: "Creatividad sin límites",
    highlight: "donde sea",
    discount: "15%",
    productName: "iPad Pro",
    productVariant: "12.9\" M2",
    price: "$1,099",
    camera: "12MP",
    chip: "M2",
    model3D: "tablet",
    modelColor: "#2c2c2e",
    discountBadge: "📱 -15% OFF",
  },
  {
    id: 5,
    badge: "TECNOLOGÍA WEARABLE",
    title: "Tu salud en",
    highlight: "tu muñeca",
    discount: "18%",
    productName: "Apple Watch",
    productVariant: "Series 9",
    price: "$399",
    camera: "GPS",
    chip: "S9 SiP",
    model3D: "smartwatch",
    modelColor: "#1a1a1a",
    discountBadge: "⌚ -18% OFF",
  },
]

export default function HeroModernFull() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const { result: heroSlides, loading } = useGetHeroSlides()

  // Auto-play slides
  useEffect(() => {
    if (!heroSlides || heroSlides.length === 0) return

    const timer = setInterval(() => {
      nextSlide()
    }, 5000) // Auto-play cada 5 segundos

    return () => clearInterval(timer)
  }, [currentSlide, heroSlides])

  const nextSlide = () => {
    if (!heroSlides || heroSlides.length === 0) return
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    if (!heroSlides || heroSlides.length === 0) return
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
  }

  // Loading state
  if (loading) {
    return (
      <section className="relative mx-auto mt-10 max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-br from-slate-400 via-slate-300 to-slate-200 p-6 shadow-lg dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 md:p-12">
        <div className="flex items-center justify-center h-96">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-rose-600"></div>
        </div>
      </section>
    )
  }

  // No slides available - show default
  if (!heroSlides || heroSlides.length === 0) {
    return (
      <section className="relative mx-auto mt-10 max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-br from-slate-400 via-slate-300 to-slate-200 p-6 shadow-lg dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 md:p-12">
        <div className="text-center py-12">
          <p className="text-xl text-gray-700 dark:text-gray-300">
            No hay slides configurados. Por favor, agrega slides desde el panel de administración de Strapi.
          </p>
        </div>
      </section>
    )
  }

  const slide = heroSlides[currentSlide]

  return (
    <section className="relative mx-auto mt-10 max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-br from-slate-400 via-slate-300 to-slate-200 p-6 shadow-lg dark:from-slate-800 dark:via-slate-700 dark:to-slate-600 md:p-12">
      {/* Círculos decorativos de fondo */}
      <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

      <div className="relative grid items-center gap-8 md:grid-cols-2">
        {/* Contenido */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 bg-white text-zinc-900 shadow-md hover:bg-white">
                <Sparkles className="mr-1 h-3 w-3" />
                {slide.badge}
              </Badge>
            </motion.div>

            <h1 className="text-4xl font-bold leading-tight text-zinc-900 dark:text-white md:text-5xl">
              {slide.title}{" "}
              <span className="bg-gradient-to-r from-rose-600 to-orange-500 bg-clip-text text-transparent">
                {slide.highlight}
              </span>
            </h1>

            <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-200">
              Obtén descuentos de hasta{" "}
              <span className="rounded-md bg-rose-600 px-2 py-0.5 font-bold text-white">
                {slide.discount}
              </span>{" "}
              en productos seleccionados
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="group rounded-full bg-white text-zinc-900 shadow-lg transition-all hover:bg-white/90 hover:shadow-xl dark:bg-zinc-900 dark:text-white"
                onClick={() => router.push(slide.ctaLink)}
              >
                {slide.ctaText}
                <motion.span
                  className="ml-2 inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-zinc-900 bg-transparent text-zinc-900 hover:bg-zinc-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-zinc-900"
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
                className="h-10 w-10 rounded-full bg-white/90 text-zinc-900 shadow-md transition-all hover:bg-white hover:shadow-lg dark:bg-zinc-900 dark:text-white"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                className="h-10 w-10 rounded-full bg-rose-600 shadow-md transition-all hover:bg-rose-600/90 hover:shadow-lg"
                onClick={nextSlide}
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </Button>
              <div className="ml-2 flex gap-2">
                {heroSlides.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 cursor-pointer rounded-full transition-all ${
                      index === currentSlide
                        ? "w-8 bg-rose-600"
                        : "w-2 bg-zinc-900/30 dark:bg-white/30 hover:bg-zinc-900/50 dark:hover:bg-white/50"
                    }`}
                    onClick={() => goToSlide(index)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Modelo 3D */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`product-${currentSlide}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] md:h-[600px]"
          >
            <Suspense fallback={
              <div className="flex h-full items-center justify-center">
                <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-rose-600"></div>
              </div>
            }>
              <Canvas
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
              >
                <PerspectiveCamera
                  makeDefault
                  position={[
                    slide.cameraPosition?.x || 0,
                    slide.cameraPosition?.y || 0,
                    slide.cameraPosition?.z || 10
                  ]}
                  fov={45}
                />
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <directionalLight position={[-5, -5, -5]} intensity={0.6} />
                <pointLight position={[0, 5, 5]} intensity={1} color="#ffffff" />

                <Suspense fallback={null}>
                  <CustomModel3D
                    modelUrl={slide.model3dFileUrl || ''}
                    animate={true}
                    animationType={slide.animationType || 'float'}
                    animationSpeed={slide.animationSpeed || 'normal'}
                    animationIntensity={slide.animationIntensity || 'medium'}
                    position={[
                      slide.modelPosition?.x || 0,
                      slide.modelPosition?.y || 0,
                      slide.modelPosition?.z || 0
                    ]}
                    rotation={[
                      slide.modelRotation?.x || 0,
                      slide.modelRotation?.y || 0,
                      slide.modelRotation?.z || 0
                    ]}
                    scale={slide.modelScale || 1.0}
                  />
                  <Environment preset="city" />
                </Suspense>

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 1.5}
                />
              </Canvas>
            </Suspense>

            {/* Badge flotante */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="absolute right-0 top-10 z-20 rounded-full bg-gradient-to-r from-rose-600 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg md:right-10"
            >
              {slide.discountBadge}
            </motion.div>

            {/* Info del producto */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm p-4 shadow-xl"
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {slide.productName}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {slide.productVariant}
                </p>
                <p className="mt-2 text-xl font-bold text-rose-600">
                  Desde {slide.price}
                </p>
                <div className="mt-3 flex justify-center gap-4 text-xs">
                  <div>
                    <p className="text-zinc-500">{slide.spec1Label}</p>
                    <p className="font-semibold text-zinc-900 dark:text-white">{slide.spec1Value}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500">{slide.spec2Label}</p>
                    <p className="font-semibold text-zinc-900 dark:text-white">{slide.spec2Value}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

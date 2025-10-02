"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ShoppingCart, Heart, Star, Eye, TrendingUp } from "lucide-react"
import { useGetFeaturedProducts } from "@/api/useGetFeaturedProducts"
import { useCart } from "@/hooks/use-cart"
import { UseLovedProducts } from "@/hooks/use-loved-products"
import { ProductType } from "@/types/product"
import { useRouter } from "next/navigation"
import Image from "next/image"

const Stars = ({ count }: { count: number }) => {
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-yellow-500" />
      ))}
    </div>
  )
}

interface ProductCardProps {
  product: ProductType
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter()
  const { addItem } = useCart()
  const { addLoveItem, lovedItems } = UseLovedProducts()

  const isLoved = lovedItems.some(item => item.id === product.id)
  const mainImage = product.attributes.images?.data?.[0]?.attributes?.url

  // Skip products without images
  if (!mainImage) {
    return null
  }

  const imageUrl = mainImage.startsWith('http') ? mainImage : `${process.env.NEXT_PUBLIC_BACKEND_URL}${mainImage}`

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, 1)
  }

  const handleToggleLove = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLoved) {
      addLoveItem(product)
    }
  }

  // Validate required fields exist
  if (!product.attributes.price || !product.attributes.productName || product.attributes.stock === null || product.attributes.stock === undefined) {
    return null
  }

  const discount = Math.floor(Math.random() * 30 + 10) // Random discount 10-40%
  const originalPrice = Math.floor(product.attributes.price * (1 + discount / 100))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <Card className="group relative overflow-hidden rounded-xl border-zinc-200 shadow-sm transition-all hover:shadow-xl dark:border-zinc-800">
        {product.attributes.isFeatured && (
          <Badge className="absolute left-3 top-3 z-10 animate-pulse bg-gradient-to-r from-rose-600 to-orange-500 text-white hover:from-rose-600 hover:to-orange-500">
            🔥 Hot Deal
          </Badge>
        )}

        {/* Quick Actions */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <Button
            variant="secondary"
            size="icon"
            className={`h-9 w-9 rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:scale-110 dark:bg-zinc-800/90 ${
              isLoved ? "text-rose-600" : "text-zinc-600"
            }`}
            onClick={handleToggleLove}
          >
            <Heart className={`h-4 w-4 ${isLoved ? "fill-rose-600" : ""}`} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 rounded-full bg-white/90 text-zinc-600 shadow-md backdrop-blur-sm transition hover:scale-110 dark:bg-zinc-800/90"
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/product/${product.attributes.slug}`)
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        <CardContent className="cursor-pointer p-5" onClick={() => router.push(`/product/${product.attributes.slug}`)}>
          <div className="relative mb-4 flex h-[180px] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
            <Image
              src={imageUrl}
              alt={product.attributes.productName}
              width={180}
              height={180}
              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
            {/* Discount badge */}
            {product.attributes.isFeatured && (
              <div className="absolute bottom-2 right-2 rounded-full bg-rose-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
                -{discount}%
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <span>{product.attributes.category?.data?.categoryName || "Producto"}</span>
            {product.attributes.isFeatured && (
              <TrendingUp className="h-3 w-3 text-rose-600" />
            )}
          </div>

          <div className="mt-1 line-clamp-2 min-h-[40px] text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {product.attributes.productName}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <Stars count={5} />
            <span className="text-xs text-zinc-600 dark:text-zinc-400">
              ({Math.floor(Math.random() * 500 + 100)})
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              Stock:{" "}
              <span className={product.attributes.stock < 10 ? "text-rose-600 font-semibold" : "text-green-600 font-semibold"}>
                {product.attributes.stock}
              </span>
            </div>
            {product.attributes.stock < 10 && (
              <Badge variant="outline" className="border-rose-600 text-rose-600">
                ¡Últimas unidades!
              </Badge>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xl font-bold text-rose-600">
              ${product.attributes.price.toLocaleString()}
            </span>
            {product.attributes.isFeatured && (
              <span className="text-sm text-zinc-500 line-through dark:text-zinc-400">
                ${originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="px-5 pb-5">
          <Button
            className="w-full rounded-lg bg-gradient-to-r from-rose-600 to-orange-500 font-semibold shadow-md transition-all hover:from-rose-700 hover:to-orange-600 hover:shadow-lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Agregar al Carrito
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default function ProductsModern() {
  const { result: products, loading } = useGetFeaturedProducts()

  if (loading) {
    return (
      <section className="mx-auto my-12 max-w-7xl px-4">
        <div className="mb-6 flex items-end justify-between">
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="mb-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="hot">Hot Deals</TabsTrigger>
              <TabsTrigger value="featured">Destacados</TabsTrigger>
              <TabsTrigger value="new">Nuevos</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="overflow-hidden rounded-xl">
              <CardContent className="p-5">
                <Skeleton className="mb-4 h-[180px] w-full rounded-xl" />
                <Skeleton className="mb-2 h-3 w-20" />
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-2 h-4 w-3/4" />
                <div className="mt-2 flex items-center gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="mt-2 h-3 w-20" />
                <Skeleton className="mt-3 h-6 w-28" />
              </CardContent>
              <CardFooter className="px-5 pb-5">
                <Skeleton className="h-10 w-full rounded-lg" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  if (!products || products.length === 0) {
    return (
      <section className="mx-auto my-12 max-w-7xl px-4">
        <div className="rounded-xl bg-zinc-100 p-12 text-center dark:bg-zinc-900">
          <p className="text-zinc-600 dark:text-zinc-400">No hay productos disponibles</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto my-12 max-w-7xl px-4">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Productos en Oferta
        </h2>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="hot">Hot Deals</TabsTrigger>
          <TabsTrigger value="featured">Destacados</TabsTrigger>
          <TabsTrigger value="new">Nuevos</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hot" className="mt-0">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.filter(p => p.attributes.isFeatured).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured" className="mt-0">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.filter(p => p.attributes.isFeatured).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new" className="mt-0">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

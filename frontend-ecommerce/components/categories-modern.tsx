"use client"

import { motion } from "framer-motion"
import { useGetCategories } from "@/api/getProducts"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight } from "lucide-react"

export default function CategoriesModern() {
  const { result: categories, loading } = useGetCategories()
  const router = useRouter()

  if (loading) {
    return (
      <section className="mx-auto my-12 max-w-7xl px-4">
        <div className="mb-6 flex items-end justify-between">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl">
              <Skeleton className="h-[120px] w-full" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (!categories || categories.length === 0) {
    return null
  }

  return (
    <section className="mx-auto my-12 max-w-7xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        className="mb-6 flex items-end justify-between"
      >
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Explora por Categorías
        </h2>
        <button className="group flex items-center gap-1 text-sm text-zinc-600 transition-colors hover:text-rose-600 dark:text-zinc-400 dark:hover:text-rose-400">
          Ver todas
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {categories.slice(0, 4).map((category, index) => {
          const imageUrl = category.mainImage?.url?.startsWith('http')
            ? category.mainImage.url
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}${category.mainImage?.url || ''}`

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group cursor-pointer overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-md transition-shadow hover:shadow-xl"
              onClick={() => router.push(`/category/${category.slug}`)}
            >
              <div className="relative h-[120px] overflow-hidden">
                {category.mainImage?.url ? (
                  <Image
                    src={imageUrl}
                    alt={category.categoryName}
                    width={300}
                    height={120}
                    className="h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:scale-110 group-hover:opacity-80"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-5xl font-bold text-white/30 transition-all group-hover:scale-110">
                      {category.categoryName.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all group-hover:from-black/70" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-white transition-all group-hover:translate-x-1">
                      {category.categoryName}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-white opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

'use client';

import { useEffect, useState } from "react"

export interface CategoryType {
  id: number
  documentId?: string
  categoryName: string
  slug: string
  mainImage?: {
    url: string
  }
}

interface StrapiCategoryType {
  id: number
  documentId?: string
  categoryName: string
  slug: string
  mainImage?: {
    url: string
  }
}

function transformStrapiCategory(strapiCategory: StrapiCategoryType): CategoryType {
  return {
    id: strapiCategory.id,
    documentId: strapiCategory.documentId,
    categoryName: strapiCategory.categoryName,
    slug: strapiCategory.slug,
    mainImage: strapiCategory.mainImage
  }
}

export function useGetCategories() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*&sort=categoryName:asc`

  const [result, setResult] = useState<CategoryType[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url)

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const contentType = res.headers.get("content-type")
        if (!contentType?.includes("application/json")) {
          throw new Error("Response is not JSON")
        }

        const json = await res.json()

        // Transform Strapi 5 data to internal format
        const transformedCategories = (json.data || []).map((category: StrapiCategoryType) =>
          transformStrapiCategory(category)
        )

        setResult(transformedCategories)
        setLoading(false)
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching categories'
        setError(errorMessage)
        setLoading(false)
        setResult(null)
      }
    })()
  }, [url])

  return { loading, result, error }
}

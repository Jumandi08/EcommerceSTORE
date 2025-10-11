'use client';

import { useEffect, useState } from "react"

export interface SubcategoryType {
  id: number
  documentId?: string
  subcategoryName: string
  slug: string
  icon?: string
  description?: string
  order: number
  active: boolean
  category?: {
    id: number
    categoryName: string
    slug: string
  }
}

interface StrapiSubcategoryType {
  id: number
  documentId?: string
  subcategoryName: string
  slug: string
  icon?: string
  description?: string
  order: number
  active: boolean
  category?: {
    id: number
    categoryName: string
    slug: string
  }
}

function transformStrapiSubcategory(strapiSubcategory: StrapiSubcategoryType): SubcategoryType {
  return {
    id: strapiSubcategory.id,
    documentId: strapiSubcategory.documentId,
    subcategoryName: strapiSubcategory.subcategoryName,
    slug: strapiSubcategory.slug,
    icon: strapiSubcategory.icon || 'Package',
    description: strapiSubcategory.description,
    order: strapiSubcategory.order || 0,
    active: strapiSubcategory.active !== undefined ? strapiSubcategory.active : true,
    category: strapiSubcategory.category
  }
}

export function useGetSubcategories(categorySlug?: string) {
  // Si se proporciona un slug de categoría, filtrar por esa categoría
  const filterQuery = categorySlug
    ? `&filters[category][slug][$eq]=${categorySlug}&filters[active][$eq]=true`
    : '&filters[active][$eq]=true'

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subcategories?populate=category&sort=order:asc${filterQuery}`

  const [result, setResult] = useState<SubcategoryType[] | null>(null)
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
        const transformedSubcategories = (json.data || []).map((subcategory: StrapiSubcategoryType) =>
          transformStrapiSubcategory(subcategory)
        )

        setResult(transformedSubcategories)
        setLoading(false)
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching subcategories'
        setError(errorMessage)
        setLoading(false)
        setResult(null)
      }
    })()
  }, [url])

  return { loading, result, error }
}

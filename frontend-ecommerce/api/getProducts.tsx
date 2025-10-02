import { useEffect, useState } from "react"
import { CategoryType, StrapiCategoryType, transformStrapiCategory } from "@/types/category"

export function useGetCategories(){
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`

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
        );

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

  return {loading, result, error}
}

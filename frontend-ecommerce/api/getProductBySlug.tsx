import { ProductType, StrapiProductType, transformStrapiProduct } from '@/types/product'
import {useEffect, useState} from 'react'

export function useGetProductBySlug(Slug:  string |  string[]){

  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${Slug}&populate=*`
    const [result, setResult] = useState<ProductType[] | null>(null)
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
          const transformedProducts = (json.data || []).map((product: StrapiProductType) =>
            transformStrapiProduct(product)
          );

          setResult(transformedProducts)
          setLoading(false)
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Error fetching product'
          setError(errorMessage)
          setLoading(false)
          setResult(null)
        }
      })()
    }, [url])

    return {loading, result, error}


}
  


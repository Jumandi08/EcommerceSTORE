import { useState } from "react"
import { useEffect } from "react"
import { ResultFilterTypes } from "@/types/filters"
export function useGetProductField() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/content-type-builder/content-types/api::product.product`

    const [result, setResult] = useState<ResultFilterTypes | null>(null)
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
          setResult(json.data)
          setLoading(false)
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Error fetching product fields'
          setError(errorMessage)
          setLoading(false)
        }
      })()
    }, [url])
    
    return {loading, result, error}

}

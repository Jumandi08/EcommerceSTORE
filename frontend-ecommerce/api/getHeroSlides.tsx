import { useEffect, useState } from "react"

export type AnimationType = 'none' | 'float' | 'rotate' | 'pulse' | 'swing' | 'bounce' | 'orbit' | 'wave' | 'magnetic'
export type AnimationSpeed = 'slow' | 'normal' | 'fast'
export type AnimationIntensity = 'subtle' | 'medium' | 'strong'

export interface Position3D {
  x: number
  y: number
  z: number
}

export interface HeroSlideType {
  id: number
  documentId?: string // UUID para Strapi 5
  badge: string
  title: string
  highlight: string
  discount: string
  productName: string
  productVariant: string
  price: string
  spec1Label: string
  spec1Value: string
  spec2Label: string
  spec2Value: string
  model3dType: "smartphone" | "laptop" | "airpods" | "tablet" | "smartwatch" | "custom-glb"
  model3dColor: string
  model3dFileUrl?: string
  discountBadge: string
  ctaText: string
  ctaLink: string
  order: number
  active: boolean
  cameraPosition?: Position3D
  modelPosition?: Position3D
  modelRotation?: Position3D
  modelScale?: number
  animationType?: AnimationType
  animationSpeed?: AnimationSpeed
  animationIntensity?: AnimationIntensity
}

interface StrapiHeroSlide {
  id: number
  badge: string
  title: string
  highlight: string
  discount: string
  productName: string
  productVariant: string
  price: string
  spec1Label: string
  spec1Value: string
  spec2Label: string
  spec2Value: string
  model3dType: string
  model3dColor: string
  model3dFileUrl?: string
  discountBadge: string
  ctaText: string
  ctaLink: string
  order: number
  active: boolean
  cameraPosition?: Position3D
  modelPosition?: Position3D
  modelRotation?: Position3D
  modelScale?: number
  animationType?: AnimationType
  animationSpeed?: AnimationSpeed
  animationIntensity?: AnimationIntensity
}

function transformStrapiHeroSlide(strapiSlide: StrapiHeroSlide): HeroSlideType {
  // Strapi 5 ya no usa attributes, los datos están directamente en el objeto
  return {
    id: strapiSlide.id,
    badge: strapiSlide.badge,
    title: strapiSlide.title,
    highlight: strapiSlide.highlight,
    discount: strapiSlide.discount,
    productName: strapiSlide.productName,
    productVariant: strapiSlide.productVariant,
    price: strapiSlide.price,
    spec1Label: strapiSlide.spec1Label,
    spec1Value: strapiSlide.spec1Value,
    spec2Label: strapiSlide.spec2Label,
    spec2Value: strapiSlide.spec2Value,
    model3dType: strapiSlide.model3dType as any,
    model3dColor: strapiSlide.model3dColor,
    model3dFileUrl: strapiSlide.model3dFileUrl,
    discountBadge: strapiSlide.discountBadge,
    ctaText: strapiSlide.ctaText,
    ctaLink: strapiSlide.ctaLink,
    order: strapiSlide.order,
    active: strapiSlide.active,
    cameraPosition: strapiSlide.cameraPosition || { x: 0, y: 0, z: 10 },
    modelPosition: strapiSlide.modelPosition || { x: 0, y: 0, z: 0 },
    modelRotation: strapiSlide.modelRotation || { x: 0, y: 0, z: 0 },
    modelScale: strapiSlide.modelScale || 1.0,
    animationType: strapiSlide.animationType || 'float',
    animationSpeed: strapiSlide.animationSpeed || 'normal',
    animationIntensity: strapiSlide.animationIntensity || 'medium',
  }
}

export function useGetHeroSlides() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hero-slides?populate=*&filters[active][$eq]=true&sort=order:asc`

  const [result, setResult] = useState<HeroSlideType[] | null>(null)
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
        const transformedSlides = (json.data || []).map((slide: StrapiHeroSlide) =>
          transformStrapiHeroSlide(slide)
        )

        setResult(transformedSlides)
        setLoading(false)
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching hero slides'
        setError(errorMessage)
        setLoading(false)
        setResult(null)
      }
    })()
  }, [url])

  return { loading, result, error }
}

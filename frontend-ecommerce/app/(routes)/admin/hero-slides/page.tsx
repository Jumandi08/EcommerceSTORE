"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import {
  Plus,
  Edit,
  Trash2,
  ChevronUp,
  ChevronDown,
  Eye,
  EyeOff,
  Sparkles,
  Save,
  X,
  Upload,
  FileText,
  Palette
} from 'lucide-react'
import { HeroSlideType, Position3D } from '@/api/getHeroSlides'
import Slide3DPreview from '@/components/admin/slide-3d-preview'
import AnimationSelector from '@/components/admin/animation-selector'
import type { AnimationType, AnimationSpeed, AnimationIntensity } from '@/components/3d-models/custom-model-3d'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

const MODEL_TYPES = [
  { value: 'smartphone', label: 'Smartphone' },
  { value: 'laptop', label: 'Laptop' },
  { value: 'airpods', label: 'AirPods' },
  { value: 'tablet', label: 'Tablet' },
  { value: 'smartwatch', label: 'Smartwatch' },
  { value: 'custom-glb', label: 'Modelo GLB Personalizado' },
]

const COLOR_PRESETS = [
  { value: '#1a1a1a', label: 'Negro Espacial' },
  { value: '#f5f5f7', label: 'Blanco' },
  { value: '#c0c0c0', label: 'Plata' },
  { value: '#b8860b', label: 'Oro' },
  { value: '#1d4ed8', label: 'Azul Titanio' },
  { value: '#7c3aed', label: 'Púrpura' },
  { value: '#dc2626', label: 'Rojo' },
]

interface SlideFormData {
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
  model3dFileUrl: string
  discountBadge: string
  ctaText: string
  ctaLink: string
  order: number
  active: boolean
  cameraPosition: Position3D
  modelPosition: Position3D
  modelRotation: Position3D
  modelScale: number
  animationType: AnimationType
  animationSpeed: AnimationSpeed
  animationIntensity: AnimationIntensity
}

const emptyFormData: SlideFormData = {
  badge: 'NUEVO',
  title: '',
  highlight: '',
  discount: '0%',
  productName: '',
  productVariant: '',
  price: '',
  spec1Label: 'Cámara',
  spec1Value: '48MP',
  spec2Label: 'Chip',
  spec2Value: 'A17 Pro',
  model3dType: 'smartphone',
  model3dColor: '#1a1a1a',
  model3dFileUrl: '',
  discountBadge: '🔥 OFERTA',
  ctaText: 'Comprar Ahora',
  ctaLink: '/category/all',
  order: 0,
  active: true,
  cameraPosition: { x: 0, y: 0, z: 10 },
  modelPosition: { x: 0, y: 0, z: 0 },
  modelRotation: { x: 0, y: 0, z: 0 },
  modelScale: 1.0,
  animationType: 'float',
  animationSpeed: 'normal',
  animationIntensity: 'medium',
}

export default function HeroSlidesAdmin() {
  const router = useRouter()
  const { user, isAuthenticated, isAdmin } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [slides, setSlides] = useState<HeroSlideType[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSlide, setEditingSlide] = useState<HeroSlideType | null>(null)
  const [formData, setFormData] = useState<SlideFormData>(emptyFormData)
  const [isSaving, setIsSaving] = useState(false)
  const [glbFile, setGlbFile] = useState<File | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    if (isAuthenticated && !isAdmin) {
      router.push('/')
      return
    }

    fetchSlides()
  }, [isAuthenticated, isAdmin, router])

  const fetchSlides = async () => {
    try {
      setIsLoading(true)
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hero-slides?populate=*&sort=order:asc`
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${user?.jwt}`,
        },
      })

      if (!res.ok) throw new Error('Error al cargar los slides')

      const json = await res.json()

      // Strapi 5 usa documentId (UUID) en lugar de id numérico
      interface StrapiSlideData {
        id: number
        documentId: string
        badge: string
        title: string
        highlight: string
        discount: string
        productName: string
        productVariant: string
        price: string
        spec1Label?: string
        spec1Value?: string
        spec2Label?: string
        spec2Value?: string
        model3dType?: string
        model3dColor?: string
        model3dFileUrl?: string
        discountBadge?: string
        ctaText?: string
        ctaLink?: string
        order?: number
        active?: boolean
        cameraPosition?: Position3D
        modelPosition?: Position3D
        modelRotation?: Position3D
        modelScale?: number
        animationType?: AnimationType
        animationSpeed?: AnimationSpeed
        animationIntensity?: AnimationIntensity
      }

      const transformedSlides = (json.data || []).map((slide: StrapiSlideData) => ({
        id: slide.id, // ID numérico (legacy)
        documentId: slide.documentId, // UUID para operaciones (Strapi 5)
        badge: slide.badge || '',
        title: slide.title || '',
        highlight: slide.highlight || '',
        discount: slide.discount || '0%',
        productName: slide.productName || '',
        productVariant: slide.productVariant || '',
        price: slide.price || '',
        spec1Label: slide.spec1Label || 'Cámara',
        spec1Value: slide.spec1Value || '48MP',
        spec2Label: slide.spec2Label || 'Chip',
        spec2Value: slide.spec2Value || 'A17 Pro',
        model3dType: slide.model3dType || 'smartphone',
        model3dColor: slide.model3dColor || '#1a1a1a',
        model3dFileUrl: slide.model3dFileUrl || '',
        discountBadge: slide.discountBadge || '🔥 OFERTA',
        ctaText: slide.ctaText || 'Comprar Ahora',
        ctaLink: slide.ctaLink || '/category/all',
        order: slide.order || 0,
        active: slide.active !== undefined ? slide.active : true,
        cameraPosition: slide.cameraPosition || { x: 0, y: 0, z: 10 },
        modelPosition: slide.modelPosition || { x: 0, y: 0, z: 0 },
        modelRotation: slide.modelRotation || { x: 0, y: 0, z: 0 },
        modelScale: slide.modelScale || 1.0,
        animationType: (slide.animationType as AnimationType) || 'float',
        animationSpeed: (slide.animationSpeed as AnimationSpeed) || 'normal',
        animationIntensity: (slide.animationIntensity as AnimationIntensity) || 'medium',
      }))

      console.log('✅ Slides cargados:', transformedSlides)
      setSlides(transformedSlides)
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error desconocido',
        variant: 'destructive',
      })
      console.error('Error fetching slides:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenDialog = (slide?: HeroSlideType) => {
    if (slide) {
      setEditingSlide(slide)
      setFormData({
        badge: slide.badge,
        title: slide.title,
        highlight: slide.highlight,
        discount: slide.discount,
        productName: slide.productName,
        productVariant: slide.productVariant,
        price: slide.price,
        spec1Label: slide.spec1Label,
        spec1Value: slide.spec1Value,
        spec2Label: slide.spec2Label,
        spec2Value: slide.spec2Value,
        model3dType: slide.model3dType,
        model3dColor: slide.model3dColor,
        model3dFileUrl: slide.model3dFileUrl || '',
        discountBadge: slide.discountBadge,
        ctaText: slide.ctaText,
        ctaLink: slide.ctaLink,
        order: slide.order,
        active: slide.active,
        cameraPosition: slide.cameraPosition || { x: 0, y: 0, z: 10 },
        modelPosition: slide.modelPosition || { x: 0, y: 0, z: 0 },
        modelRotation: slide.modelRotation || { x: 0, y: 0, z: 0 },
        modelScale: slide.modelScale || 1.0,
        animationType: (slide.animationType as AnimationType) || 'float',
        animationSpeed: (slide.animationSpeed as AnimationSpeed) || 'normal',
        animationIntensity: (slide.animationIntensity as AnimationIntensity) || 'medium',
      })
    } else {
      setEditingSlide(null)
      const maxOrder = slides.length > 0 ? Math.max(...slides.map(s => s.order)) : -1
      setFormData({ ...emptyFormData, order: maxOrder + 1 })
    }
    setGlbFile(null)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingSlide(null)
    setFormData(emptyFormData)
    setGlbFile(null)
  }

  const handleSaveSlide = async () => {
    try {
      setIsSaving(true)

      // Validaciones
      if (!formData.title || !formData.productName || !formData.price) {
        toast({
          title: 'Error',
          description: 'Por favor completa los campos requeridos: título, nombre del producto y precio.',
          variant: 'destructive',
        })
        setIsSaving(false)
        return
      }

      // Validación: Si es custom-glb, debe haber un archivo o una URL existente
      if (formData.model3dType === 'custom-glb' && !glbFile && !formData.model3dFileUrl) {
        toast({
          title: 'Error',
          description: 'Debes subir un archivo GLB para modelos personalizados.',
          variant: 'destructive',
        })
        setIsSaving(false)
        return
      }

      let glbUrl = formData.model3dFileUrl

      // Si hay un archivo GLB nuevo, subirlo primero
      if (glbFile) {
        console.log('📤 Subiendo archivo GLB:', glbFile.name)

        const uploadFormData = new FormData()
        uploadFormData.append('files', glbFile)

        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${user?.jwt}`,
            },
            body: uploadFormData,
          }
        )

        if (!uploadRes.ok) {
          const errorText = await uploadRes.text()
          console.error('❌ Error en upload:', errorText)
          throw new Error(`Error al subir el archivo GLB: ${uploadRes.status} ${uploadRes.statusText}`)
        }

        const uploadData = await uploadRes.json()
        console.log('✅ Archivo subido:', uploadData)

        if (!uploadData[0]?.url) {
          throw new Error('El servidor no devolvió una URL válida para el archivo')
        }

        glbUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${uploadData[0].url}`
        console.log('🔗 URL del archivo GLB:', glbUrl)
      }

      // Preparar datos para Strapi
      const slideData = {
        data: {
          badge: formData.badge,
          title: formData.title,
          highlight: formData.highlight,
          discount: formData.discount,
          productName: formData.productName,
          productVariant: formData.productVariant,
          price: formData.price,
          spec1Label: formData.spec1Label,
          spec1Value: formData.spec1Value,
          spec2Label: formData.spec2Label,
          spec2Value: formData.spec2Value,
          model3dType: formData.model3dType,
          model3dColor: formData.model3dColor,
          model3dFileUrl: glbUrl,
          discountBadge: formData.discountBadge,
          ctaText: formData.ctaText,
          ctaLink: formData.ctaLink,
          order: formData.order,
          active: formData.active,
          cameraPosition: formData.cameraPosition,
          modelPosition: formData.modelPosition,
          modelRotation: formData.modelRotation,
          modelScale: formData.modelScale,
          animationType: formData.animationType,
          animationSpeed: formData.animationSpeed,
          animationIntensity: formData.animationIntensity,
        }
      }

      console.log('📝 Datos a enviar:', slideData)

      // Validar documentId si es edición (Strapi 5 usa documentId)
      if (editingSlide) {
        const identifier = editingSlide.documentId || editingSlide.id
        console.log('📌 Editando slide con ID:', editingSlide.id, 'documentId:', editingSlide.documentId)
        if (!identifier) {
          throw new Error('ID del slide inválido')
        }
      }

      // Crear o actualizar (usar documentId si existe, sino id)
      const slideIdentifier = editingSlide?.documentId || editingSlide?.id
      const url = editingSlide
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hero-slides/${slideIdentifier}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hero-slides`

      const method = editingSlide ? 'PUT' : 'POST'

      console.log(`🔄 ${method} ${url}`)

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.jwt}`,
        },
        body: JSON.stringify(slideData),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => null)
        console.error('❌ Error de respuesta:', errorData)
        throw new Error(errorData?.error?.message || `Error al ${editingSlide ? 'actualizar' : 'crear'} el slide`)
      }

      const responseData = await res.json()
      console.log('✅ Respuesta exitosa:', responseData)

      toast({
        title: 'Éxito',
        description: `Slide ${editingSlide ? 'actualizado' : 'creado'} correctamente`,
      })

      handleCloseDialog()
      fetchSlides()
    } catch (error: unknown) {
      console.error('❌ Error completo:', error)
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error desconocido',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteSlide = async (slide: HeroSlideType) => {
    if (!confirm('¿Estás seguro de eliminar este slide?')) return

    try {
      const identifier = slide.documentId || slide.id
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hero-slides/${identifier}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user?.jwt}`,
          },
        }
      )

      if (!res.ok) throw new Error('Error al eliminar el slide')

      toast({
        title: 'Éxito',
        description: 'Slide eliminado correctamente',
      })

      fetchSlides()
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error desconocido',
        variant: 'destructive',
      })
    }
  }

  const handleToggleActive = async (slide: HeroSlideType) => {
    try {
      const identifier = slide.documentId || slide.id
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hero-slides/${identifier}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.jwt}`,
          },
          body: JSON.stringify({
            data: { active: !slide.active }
          }),
        }
      )

      if (!res.ok) throw new Error('Error al cambiar estado del slide')

      toast({
        title: 'Éxito',
        description: `Slide ${!slide.active ? 'activado' : 'desactivado'}`,
      })

      fetchSlides()
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Error desconocido',
        variant: 'destructive',
      })
    }
  }

  const handleChangeOrder = async (slide: HeroSlideType, direction: 'up' | 'down') => {
    const currentIndex = slides.findIndex(s => s.id === slide.id)
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === slides.length - 1)
    ) {
      return
    }

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    const targetSlide = slides[targetIndex]

    try {
      // Intercambiar órdenes (usar documentId si existe)
      const slideIdentifier = slide.documentId || slide.id
      const targetIdentifier = targetSlide.documentId || targetSlide.id

      await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hero-slides/${slideIdentifier}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.jwt}`,
          },
          body: JSON.stringify({
            data: { order: targetSlide.order }
          }),
        }),
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hero-slides/${targetIdentifier}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.jwt}`,
          },
          body: JSON.stringify({
            data: { order: slide.order }
          }),
        }),
      ])

      fetchSlides()
    } catch (error: unknown) {
      toast({
        title: 'Error',
        description: 'Error al cambiar el orden',
        variant: 'destructive',
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.name.endsWith('.glb') && !file.name.endsWith('.gltf')) {
        toast({
          title: 'Error',
          description: 'Solo se permiten archivos .glb o .gltf',
          variant: 'destructive',
        })
        return
      }
      if (file.size > 256 * 1024 * 1024) { // 256MB
        toast({
          title: 'Error',
          description: 'El archivo no debe superar los 256MB',
          variant: 'destructive',
        })
        return
      }
      setGlbFile(file)
      // Automáticamente cambiar a modelo personalizado cuando se selecciona un archivo
      setFormData({ ...formData, model3dType: 'custom-glb' })
    }
  }

  if (!isAuthenticated || !user || !isAdmin) {
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-400 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-400">Cargando slides...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl px-4 py-8 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Hero Slides 3D</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Gestiona los banners animados de la página principal
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Slide
          </Button>
        </div>
      </div>

      {/* Slides List */}
      <div className="space-y-4">
        {slides.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No hay slides configurados
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Crea tu primer slide para comenzar
              </p>
              <Button onClick={() => handleOpenDialog()} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Crear Slide
              </Button>
            </CardContent>
          </Card>
        ) : (
          slides.map((slide, index) => (
            <Card key={slide.id} className={!slide.active ? 'opacity-60' : ''}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  {/* Slide Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant="secondary">Orden {slide.order}</Badge>
                      <Badge className="bg-gradient-to-r from-rose-600 to-orange-500">
                        {slide.badge}
                      </Badge>
                      <Badge variant={slide.active ? 'default' : 'outline'}>
                        {slide.active ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                        {slide.active ? 'Activo' : 'Inactivo'}
                      </Badge>
                      <Badge variant="outline">{MODEL_TYPES.find(t => t.value === slide.model3dType)?.label}</Badge>
                    </div>

                    <h3 className="text-xl font-bold mb-1">
                      {slide.title} <span className="text-rose-600">{slide.highlight}</span>
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {slide.productName} {slide.productVariant} · {slide.price}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{slide.spec1Label}: {slide.spec1Value}</span>
                      <span>·</span>
                      <span>{slide.spec2Label}: {slide.spec2Value}</span>
                      <span>·</span>
                      <span>Descuento: {slide.discount}</span>
                      <span>·</span>
                      <span>
                        <div
                          className="inline-block w-4 h-4 rounded border align-middle"
                          style={{ backgroundColor: slide.model3dColor }}
                        />
                        <span className="ml-1">{slide.model3dColor}</span>
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-gray-500">
                      CTA: {slide.ctaText} → {slide.ctaLink}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleChangeOrder(slide, 'up')}
                        disabled={index === 0}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleChangeOrder(slide, 'down')}
                        disabled={index === slides.length - 1}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleActive(slide)}
                      >
                        {slide.active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenDialog(slide)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteSlide(slide)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Dialog Form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSlide ? 'Editar Slide' : 'Nuevo Slide'}
            </DialogTitle>
            <DialogDescription>
              {editingSlide ? 'Modifica los campos del slide' : 'Completa los campos para crear un nuevo slide'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Información de Marketing */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Información de Marketing
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="badge">Badge *</Label>
                  <Input
                    id="badge"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="OFERTAS ESPECIALES"
                  />
                </div>
                <div>
                  <Label htmlFor="discountBadge">Badge de Descuento</Label>
                  <Input
                    id="discountBadge"
                    value={formData.discountBadge}
                    onChange={(e) => setFormData({ ...formData, discountBadge: e.target.value })}
                    placeholder="🔥 -25% OFF"
                  />
                </div>
                <div>
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Descubre la última tecnología"
                  />
                </div>
                <div>
                  <Label htmlFor="highlight">Highlight *</Label>
                  <Input
                    id="highlight"
                    value={formData.highlight}
                    onChange={(e) => setFormData({ ...formData, highlight: e.target.value })}
                    placeholder="a precios increíbles"
                  />
                </div>
                <div>
                  <Label htmlFor="discount">Descuento</Label>
                  <Input
                    id="discount"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    placeholder="25%"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Información del Producto */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Información del Producto</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productName">Nombre del Producto *</Label>
                  <Input
                    id="productName"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    placeholder="iPhone 15"
                  />
                </div>
                <div>
                  <Label htmlFor="productVariant">Variante</Label>
                  <Input
                    id="productVariant"
                    value={formData.productVariant}
                    onChange={(e) => setFormData({ ...formData, productVariant: e.target.value })}
                    placeholder="Pro Max"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Precio *</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="$1,299"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Especificaciones */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Especificaciones</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="spec1Label">Especificación 1 - Label</Label>
                  <Input
                    id="spec1Label"
                    value={formData.spec1Label}
                    onChange={(e) => setFormData({ ...formData, spec1Label: e.target.value })}
                    placeholder="Cámara"
                  />
                </div>
                <div>
                  <Label htmlFor="spec1Value">Especificación 1 - Valor</Label>
                  <Input
                    id="spec1Value"
                    value={formData.spec1Value}
                    onChange={(e) => setFormData({ ...formData, spec1Value: e.target.value })}
                    placeholder="48MP"
                  />
                </div>
                <div>
                  <Label htmlFor="spec2Label">Especificación 2 - Label</Label>
                  <Input
                    id="spec2Label"
                    value={formData.spec2Label}
                    onChange={(e) => setFormData({ ...formData, spec2Label: e.target.value })}
                    placeholder="Chip"
                  />
                </div>
                <div>
                  <Label htmlFor="spec2Value">Especificación 2 - Valor</Label>
                  <Input
                    id="spec2Value"
                    value={formData.spec2Value}
                    onChange={(e) => setFormData({ ...formData, spec2Value: e.target.value })}
                    placeholder="A17 Pro"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Modelo 3D */}
            <div>
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Modelo 3D
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="model3dType">Tipo de Modelo *</Label>
                  <Select
                    value={formData.model3dType}
                    onValueChange={(value) => setFormData({ ...formData, model3dType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MODEL_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="model3dColor">Color (Hex) *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="model3dColor"
                      value={formData.model3dColor}
                      onChange={(e) => setFormData({ ...formData, model3dColor: e.target.value })}
                      placeholder="#1a1a1a"
                      className="flex-1"
                    />
                    <div
                      className="w-10 h-10 rounded border"
                      style={{ backgroundColor: formData.model3dColor }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {COLOR_PRESETS.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, model3dColor: color.value })}
                        className="w-6 h-6 rounded border hover:scale-110 transition-transform"
                        style={{ backgroundColor: color.value }}
                        title={color.label}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {formData.model3dType === 'custom-glb' && (
                <div className="mt-4">
                  <Label htmlFor="glbFile">Archivo GLB/GLTF</Label>
                  <div className="mt-2">
                    <Input
                      id="glbFile"
                      type="file"
                      accept=".glb,.gltf"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    {glbFile && (
                      <p className="mt-2 text-sm text-green-600">
                        ✓ {glbFile.name} ({(glbFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    )}
                    {formData.model3dFileUrl && !glbFile && (
                      <p className="mt-2 text-sm text-gray-600">
                        Archivo actual: {formData.model3dFileUrl.split('/').pop()}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Call to Action */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Call to Action</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ctaText">Texto del Botón</Label>
                  <Input
                    id="ctaText"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                    placeholder="Comprar Ahora"
                  />
                </div>
                <div>
                  <Label htmlFor="ctaLink">Enlace del Botón</Label>
                  <Input
                    id="ctaLink"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    placeholder="/category/smartphones"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Configuración */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Configuración</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="order">Orden *</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    placeholder="0"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                  <Label htmlFor="active">Activo</Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Configuración de Animación */}
            <div>
              <AnimationSelector
                animationType={formData.animationType}
                animationSpeed={formData.animationSpeed}
                animationIntensity={formData.animationIntensity}
                onAnimationTypeChange={(type) => setFormData({ ...formData, animationType: type })}
                onAnimationSpeedChange={(speed) => setFormData({ ...formData, animationSpeed: speed })}
                onAnimationIntensityChange={(intensity) => setFormData({ ...formData, animationIntensity: intensity })}
              />
            </div>

            <Separator />

            {/* Vista Previa 3D */}
            <div>
              <Slide3DPreview
                modelUrl={formData.model3dFileUrl}
                localFile={glbFile}
                cameraPosition={formData.cameraPosition}
                modelPosition={formData.modelPosition}
                modelRotation={formData.modelRotation}
                modelScale={formData.modelScale}
                animationType={formData.animationType}
                animationSpeed={formData.animationSpeed}
                animationIntensity={formData.animationIntensity}
                onCameraChange={(pos) => setFormData({ ...formData, cameraPosition: pos })}
                onModelPositionChange={(pos) => setFormData({ ...formData, modelPosition: pos })}
                onModelRotationChange={(rot) => setFormData({ ...formData, modelRotation: rot })}
                onModelScaleChange={(scale) => setFormData({ ...formData, modelScale: scale })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleSaveSlide} disabled={isSaving}>
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Guardando...' : 'Guardar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

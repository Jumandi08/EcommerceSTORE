"use client"

import { Suspense, useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RotateCcw, Move, RotateCw, ZoomIn } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

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
const CustomModel3D = dynamic(() => import("../3d-models/custom-model-3d"), {
  ssr: false,
})

import type { AnimationType, AnimationSpeed, AnimationIntensity } from '../3d-models/custom-model-3d'

interface Position3D {
  x: number
  y: number
  z: number
}

interface SlidePreviewProps {
  modelUrl: string
  localFile?: File | null
  cameraPosition: Position3D
  modelPosition: Position3D
  modelRotation: Position3D
  modelScale: number
  animationType?: AnimationType
  animationSpeed?: AnimationSpeed
  animationIntensity?: AnimationIntensity
  onCameraChange: (position: Position3D) => void
  onModelPositionChange: (position: Position3D) => void
  onModelRotationChange: (rotation: Position3D) => void
  onModelScaleChange: (scale: number) => void
}

export default function Slide3DPreview({
  modelUrl,
  localFile,
  cameraPosition,
  modelPosition,
  modelRotation,
  modelScale,
  animationType = 'float',
  animationSpeed = 'normal',
  animationIntensity = 'medium',
  onCameraChange,
  onModelPositionChange,
  onModelRotationChange,
  onModelScaleChange,
}: SlidePreviewProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [localModelUrl, setLocalModelUrl] = useState<string | null>(null)

  // Crear URL temporal para archivo local
  useEffect(() => {
    if (localFile) {
      const url = URL.createObjectURL(localFile)
      setLocalModelUrl(url)

      // Limpiar URL al desmontar o cuando cambie el archivo
      return () => {
        URL.revokeObjectURL(url)
        setLocalModelUrl(null)
      }
    } else {
      setLocalModelUrl(null)
    }
  }, [localFile])

  // Sincronizar posición de cámara desde OrbitControls
  useEffect(() => {
    if (!controlsRef.current) return

    const handleChange = () => {
      if (controlsRef.current?.object) {
        const cam = controlsRef.current.object
        onCameraChange({
          x: parseFloat(cam.position.x.toFixed(2)),
          y: parseFloat(cam.position.y.toFixed(2)),
          z: parseFloat(cam.position.z.toFixed(2)),
        })
      }
    }

    const controls = controlsRef.current
    controls.addEventListener?.('change', handleChange)
    return () => controls.removeEventListener?.('change', handleChange)
  }, [onCameraChange])

  const resetCamera = () => {
    onCameraChange({ x: 0, y: 0, z: 10 })
  }

  const resetModel = () => {
    onModelPositionChange({ x: 0, y: 0, z: 0 })
    onModelRotationChange({ x: 0, y: 0, z: 0 })
    onModelScaleChange(1.0)
  }

  const finalModelUrl = localModelUrl || modelUrl

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Vista Previa 3D</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'Ocultar' : 'Mostrar'} Controles
            </Button>
            <Button size="sm" variant="outline" onClick={resetCamera}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset Cámara
            </Button>
            <Button size="sm" variant="outline" onClick={resetModel}>
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset Modelo
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Canvas 3D */}
        <div className="relative w-full h-[400px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
          {finalModelUrl ? (
            <Suspense fallback={
              <div className="flex h-full items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-rose-600"></div>
              </div>
            }>
              <Canvas
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
              >
                <PerspectiveCamera
                  makeDefault
                  position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
                  fov={45}
                />
                <ambientLight intensity={0.8} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />
                <directionalLight position={[-5, -5, -5]} intensity={0.6} />
                <pointLight position={[0, 5, 5]} intensity={1} color="#ffffff" />

                <Suspense fallback={null}>
                  <CustomModel3D
                    modelUrl={finalModelUrl}
                    animate={true}
                    animationType={animationType}
                    animationSpeed={animationSpeed}
                    animationIntensity={animationIntensity}
                    position={[modelPosition.x, modelPosition.y, modelPosition.z]}
                    rotation={[modelRotation.x, modelRotation.y, modelRotation.z]}
                    scale={modelScale}
                  />
                  <Environment preset="city" />
                </Suspense>

                <OrbitControls
                  ref={controlsRef}
                  enableZoom={true}
                  enablePan={false}
                  minPolarAngle={Math.PI / 6}
                  maxPolarAngle={Math.PI / 1.5}
                />
              </Canvas>
            </Suspense>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">Sube un archivo GLB para visualizar</p>
            </div>
          )}

          {/* Info Overlay */}
          {finalModelUrl && (
            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs p-2 rounded">
              <p>🎮 Arrastra para rotar | 🔍 Scroll para zoom</p>
            </div>
          )}
        </div>

        {/* Controles Avanzados */}
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            {/* Cámara */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Move className="w-4 h-4" />
                Posición de Cámara
              </h4>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">X: {cameraPosition.x}</Label>
                  <Slider
                    value={[cameraPosition.x]}
                    min={-20}
                    max={20}
                    step={0.1}
                    onValueChange={([x]) => onCameraChange({ ...cameraPosition, x })}
                  />
                </div>
                <div>
                  <Label className="text-xs">Y: {cameraPosition.y}</Label>
                  <Slider
                    value={[cameraPosition.y]}
                    min={-20}
                    max={20}
                    step={0.1}
                    onValueChange={([y]) => onCameraChange({ ...cameraPosition, y })}
                  />
                </div>
                <div>
                  <Label className="text-xs">Z (Distancia): {cameraPosition.z}</Label>
                  <Slider
                    value={[cameraPosition.z]}
                    min={1}
                    max={30}
                    step={0.1}
                    onValueChange={([z]) => onCameraChange({ ...cameraPosition, z })}
                  />
                </div>
              </div>
            </div>

            {/* Posición del Modelo */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Move className="w-4 h-4" />
                Posición del Modelo
              </h4>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">X: {modelPosition.x}</Label>
                  <Slider
                    value={[modelPosition.x]}
                    min={-10}
                    max={10}
                    step={0.1}
                    onValueChange={([x]) => onModelPositionChange({ ...modelPosition, x })}
                  />
                </div>
                <div>
                  <Label className="text-xs">Y: {modelPosition.y}</Label>
                  <Slider
                    value={[modelPosition.y]}
                    min={-10}
                    max={10}
                    step={0.1}
                    onValueChange={([y]) => onModelPositionChange({ ...modelPosition, y })}
                  />
                </div>
                <div>
                  <Label className="text-xs">Z: {modelPosition.z}</Label>
                  <Slider
                    value={[modelPosition.z]}
                    min={-10}
                    max={10}
                    step={0.1}
                    onValueChange={([z]) => onModelPositionChange({ ...modelPosition, z })}
                  />
                </div>
              </div>
            </div>

            {/* Rotación del Modelo */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <RotateCw className="w-4 h-4" />
                Rotación del Modelo
              </h4>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">X: {(modelRotation.x * 180 / Math.PI).toFixed(0)}°</Label>
                  <Slider
                    value={[modelRotation.x]}
                    min={-Math.PI}
                    max={Math.PI}
                    step={0.01}
                    onValueChange={([x]) => onModelRotationChange({ ...modelRotation, x })}
                  />
                </div>
                <div>
                  <Label className="text-xs">Y: {(modelRotation.y * 180 / Math.PI).toFixed(0)}°</Label>
                  <Slider
                    value={[modelRotation.y]}
                    min={-Math.PI}
                    max={Math.PI}
                    step={0.01}
                    onValueChange={([y]) => onModelRotationChange({ ...modelRotation, y })}
                  />
                </div>
                <div>
                  <Label className="text-xs">Z: {(modelRotation.z * 180 / Math.PI).toFixed(0)}°</Label>
                  <Slider
                    value={[modelRotation.z]}
                    min={-Math.PI}
                    max={Math.PI}
                    step={0.01}
                    onValueChange={([z]) => onModelRotationChange({ ...modelRotation, z })}
                  />
                </div>
              </div>
            </div>

            {/* Escala del Modelo */}
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <ZoomIn className="w-4 h-4" />
                Escala del Modelo
              </h4>
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Escala: {modelScale.toFixed(2)}x</Label>
                  <Slider
                    value={[modelScale]}
                    min={0.1}
                    max={5}
                    step={0.1}
                    onValueChange={([scale]) => onModelScaleChange(scale)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
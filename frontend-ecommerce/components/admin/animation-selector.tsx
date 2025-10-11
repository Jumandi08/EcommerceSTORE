"use client"

import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, Zap, Gauge } from 'lucide-react'
import type { AnimationType, AnimationSpeed, AnimationIntensity } from '@/components/3d-models/custom-model-3d'

export const ANIMATION_TYPES = [
  {
    value: 'none' as AnimationType,
    label: 'Sin Animación',
    description: 'Modelo estático sin movimiento'
  },
  {
    value: 'float' as AnimationType,
    label: 'Flotación',
    description: 'Movimiento suave arriba y abajo'
  },
  {
    value: 'rotate' as AnimationType,
    label: 'Rotación',
    description: 'Giro continuo en el eje Y'
  },
  {
    value: 'pulse' as AnimationType,
    label: 'Pulso',
    description: 'Escala pulsante como un latido'
  },
  {
    value: 'swing' as AnimationType,
    label: 'Balanceo',
    description: 'Movimiento pendular suave'
  },
  {
    value: 'bounce' as AnimationType,
    label: 'Rebote',
    description: 'Efecto de rebote con squash/stretch'
  },
  {
    value: 'orbit' as AnimationType,
    label: 'Órbita',
    description: 'Movimiento circular orbital'
  },
  {
    value: 'wave' as AnimationType,
    label: 'Onda',
    description: 'Movimiento fluido en múltiples ejes'
  },
  {
    value: 'magnetic' as AnimationType,
    label: 'Magnético',
    description: 'Sigue el movimiento del mouse'
  },
]

const ANIMATION_SPEEDS = [
  { value: 'slow' as AnimationSpeed, label: 'Lenta', emoji: '🐢' },
  { value: 'normal' as AnimationSpeed, label: 'Normal', emoji: '🚶' },
  { value: 'fast' as AnimationSpeed, label: 'Rápida', emoji: '🚀' },
]

const ANIMATION_INTENSITIES = [
  { value: 'subtle' as AnimationIntensity, label: 'Sutil', emoji: '💨' },
  { value: 'medium' as AnimationIntensity, label: 'Media', emoji: '⚡' },
  { value: 'strong' as AnimationIntensity, label: 'Fuerte', emoji: '💥' },
]

interface AnimationSelectorProps {
  animationType: AnimationType
  animationSpeed: AnimationSpeed
  animationIntensity: AnimationIntensity
  onAnimationTypeChange: (type: AnimationType) => void
  onAnimationSpeedChange: (speed: AnimationSpeed) => void
  onAnimationIntensityChange: (intensity: AnimationIntensity) => void
}

export default function AnimationSelector({
  animationType,
  animationSpeed,
  animationIntensity,
  onAnimationTypeChange,
  onAnimationSpeedChange,
  onAnimationIntensityChange,
}: AnimationSelectorProps) {
  const selectedAnimation = ANIMATION_TYPES.find(a => a.value === animationType)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-600" />
          Configuración de Animación
        </CardTitle>
        <CardDescription>
          Elige cómo se moverá el modelo 3D en el slide
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Tipo de Animación */}
        <div className="space-y-2">
          <Label htmlFor="animationType" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Tipo de Animación
          </Label>
          <Select value={animationType} onValueChange={onAnimationTypeChange}>
            <SelectTrigger id="animationType">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ANIMATION_TYPES.map((anim) => (
                <SelectItem key={anim.value} value={anim.value}>
                  <div className="flex flex-col">
                    <span className="font-medium">{anim.label}</span>
                    <span className="text-xs text-gray-500">{anim.description}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedAnimation && (
            <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
              <span className="text-rose-600">→</span>
              {selectedAnimation.description}
            </p>
          )}
        </div>

        {/* Velocidad */}
        {animationType !== 'none' && (
          <div className="space-y-2">
            <Label htmlFor="animationSpeed" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Velocidad de Animación
            </Label>
            <Select value={animationSpeed} onValueChange={onAnimationSpeedChange}>
              <SelectTrigger id="animationSpeed">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ANIMATION_SPEEDS.map((speed) => (
                  <SelectItem key={speed.value} value={speed.value}>
                    <span className="flex items-center gap-2">
                      <span>{speed.emoji}</span>
                      <span>{speed.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Intensidad */}
        {animationType !== 'none' && (
          <div className="space-y-2">
            <Label htmlFor="animationIntensity" className="flex items-center gap-2">
              <Gauge className="w-4 h-4" />
              Intensidad de Animación
            </Label>
            <Select value={animationIntensity} onValueChange={onAnimationIntensityChange}>
              <SelectTrigger id="animationIntensity">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ANIMATION_INTENSITIES.map((intensity) => (
                  <SelectItem key={intensity.value} value={intensity.value}>
                    <span className="flex items-center gap-2">
                      <span>{intensity.emoji}</span>
                      <span>{intensity.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Preview Info */}
        {animationType !== 'none' && (
          <div className="p-3 bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/20 dark:to-orange-950/20 rounded-lg border border-rose-200 dark:border-rose-800">
            <p className="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-rose-600" />
              La animación <strong>{selectedAnimation?.label}</strong> se reproducirá constantemente en el Hero
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

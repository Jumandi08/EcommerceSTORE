"use client"

import { useRef, Suspense } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useGLTF, Center } from "@react-three/drei"
import * as THREE from "three"

export type AnimationType = 'none' | 'float' | 'rotate' | 'pulse' | 'swing' | 'bounce' | 'orbit' | 'wave' | 'magnetic'
export type AnimationSpeed = 'slow' | 'normal' | 'fast'
export type AnimationIntensity = 'subtle' | 'medium' | 'strong'

interface CustomModel3DProps {
  modelUrl: string
  color?: string
  animate?: boolean
  animationType?: AnimationType
  animationSpeed?: AnimationSpeed
  animationIntensity?: AnimationIntensity
  scale?: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}

// Configuración de velocidades
const SPEED_MULTIPLIERS = {
  slow: 0.5,
  normal: 1.0,
  fast: 1.8,
}

// Configuración de intensidades
const INTENSITY_MULTIPLIERS = {
  subtle: 0.5,
  medium: 1.0,
  strong: 1.8,
}

function Model({
  modelUrl,
  animate,
  animationType = 'float',
  animationSpeed = 'normal',
  animationIntensity = 'medium',
  scale,
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}: {
  modelUrl: string
  animate: boolean
  animationType?: AnimationType
  animationSpeed?: AnimationSpeed
  animationIntensity?: AnimationIntensity
  scale: number
  position?: [number, number, number]
  rotation?: [number, number, number]
}) {
  const meshRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()

  // Cargar el modelo GLTF/GLB
  const { scene } = useGLTF(modelUrl)

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    const speedMult = SPEED_MULTIPLIERS[animationSpeed]
    const intensityMult = INTENSITY_MULTIPLIERS[animationIntensity]

    if (animate && animationType !== 'none') {
      let newPosX = position[0]
      let newPosY = position[1]
      let newPosZ = position[2]
      let newRotX = rotation[0]
      let newRotY = rotation[1]
      let newRotZ = rotation[2]
      let newScale = scale

      switch (animationType) {
        case 'float':
          // Flotación suave arriba/abajo
          newPosY = position[1] + Math.sin(time * speedMult) * 0.3 * intensityMult
          newRotY = rotation[1] + Math.sin(time * speedMult * 0.5) * 0.1 * intensityMult
          break

        case 'rotate':
          // Rotación continua en Y
          newRotY = rotation[1] + time * speedMult * 0.5
          break

        case 'pulse':
          // Escala pulsante
          const pulseScale = 1 + Math.sin(time * speedMult * 2) * 0.1 * intensityMult
          newScale = scale * pulseScale
          break

        case 'swing':
          // Balanceo pendular
          newRotZ = rotation[2] + Math.sin(time * speedMult) * 0.2 * intensityMult
          newRotX = rotation[0] + Math.cos(time * speedMult * 0.7) * 0.15 * intensityMult
          break

        case 'bounce':
          // Rebote
          const bounceHeight = Math.abs(Math.sin(time * speedMult * 2)) * 0.4 * intensityMult
          newPosY = position[1] + bounceHeight
          // Squash and stretch effect
          const squash = 1 - (bounceHeight * 0.2)
          newScale = scale * (1 + (1 - squash) * 0.3)
          break

        case 'orbit':
          // Órbita circular
          const orbitRadius = 0.3 * intensityMult
          newPosX = position[0] + Math.cos(time * speedMult) * orbitRadius
          newPosZ = position[2] + Math.sin(time * speedMult) * orbitRadius
          newRotY = rotation[1] + time * speedMult * 0.5
          break

        case 'wave':
          // Onda combinada (movimiento suave en múltiples ejes)
          newPosX = position[0] + Math.sin(time * speedMult) * 0.2 * intensityMult
          newPosY = position[1] + Math.cos(time * speedMult * 1.3) * 0.25 * intensityMult
          newRotY = rotation[1] + Math.sin(time * speedMult * 0.7) * 0.3 * intensityMult
          newRotZ = rotation[2] + Math.cos(time * speedMult * 0.5) * 0.1 * intensityMult
          break

        case 'magnetic':
          // Sigue el mouse suavemente
          const magnetStrength = 0.5 * intensityMult
          newPosX = position[0] + mouse.x * magnetStrength
          newPosY = position[1] + mouse.y * magnetStrength
          newRotY = rotation[1] + mouse.x * 0.3 * intensityMult
          newRotX = rotation[0] + mouse.y * 0.2 * intensityMult
          break

        default:
          // 'none' - sin animación
          break
      }

      meshRef.current.position.set(newPosX, newPosY, newPosZ)
      meshRef.current.rotation.set(newRotX, newRotY, newRotZ)
      meshRef.current.scale.set(newScale, newScale, newScale)
    } else {
      // Sin animación, mantener valores fijos
      meshRef.current.position.set(position[0], position[1], position[2])
      meshRef.current.rotation.set(rotation[0], rotation[1], rotation[2])
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Center>
      <primitive ref={meshRef} object={scene} />
    </Center>
  )
}

export default function CustomModel3D({
  modelUrl,
  animate = true,
  animationType = 'float',
  animationSpeed = 'normal',
  animationIntensity = 'medium',
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}: CustomModel3DProps) {
  return (
    <Suspense fallback={<LoadingPlaceholder />}>
      <Model
        modelUrl={modelUrl}
        animate={animate}
        animationType={animationType}
        animationSpeed={animationSpeed}
        animationIntensity={animationIntensity}
        scale={scale}
        position={position}
        rotation={rotation}
      />
    </Suspense>
  )
}

// Placeholder mientras carga el modelo
function LoadingPlaceholder() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#cccccc" wireframe />
    </mesh>
  )
}

// Precargar modelos
export function preloadModel(modelUrl: string) {
  useGLTF.preload(modelUrl)
}
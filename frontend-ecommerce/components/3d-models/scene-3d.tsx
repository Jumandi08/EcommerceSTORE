"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { Suspense } from "react"
import CustomModel3D from "./custom-model-3d"

interface Scene3DProps {
  model3dUrl?: string
  model3dScale?: number
  model3dAnimate?: boolean
  className?: string
}

export default function Scene3D({
  model3dUrl = "",
  model3dScale = 1,
  model3dAnimate = true,
  className = "w-full h-[400px]"
}: Scene3DProps) {
  // Si no hay modelo 3D configurado, no renderizar nada
  if (!model3dUrl) {
    return null
  }

  return (
    <div className={className}>
      <Canvas shadows>
        {/* Cámara */}
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

        {/* Luces */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} />
        <pointLight position={[0, 5, 5]} intensity={0.8} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />

        {/* Controles de órbita para interacción del usuario */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={15}
          autoRotate={false}
        />

        {/* Entorno de iluminación */}
        <Environment preset="studio" />

        {/* Suspense para carga progresiva */}
        <Suspense fallback={<LoadingBox />}>
          <CustomModel3D
            modelUrl={model3dUrl}
            animate={model3dAnimate}
            scale={model3dScale}
          />
        </Suspense>

        {/* Plano de fondo con sombras */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
          <planeGeometry args={[50, 50]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
      </Canvas>
    </div>
  )
}

// Componente de carga
function LoadingBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#cccccc" wireframe />
    </mesh>
  )
}

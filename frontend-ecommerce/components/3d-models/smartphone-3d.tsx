"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface Smartphone3DProps {
  color: string
}

export default function Smartphone3D({ color }: Smartphone3DProps) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={meshRef} scale={1.2} position={[0, 0, 0]}>
      {/* Cuerpo del teléfono */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 4, 0.3]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Pantalla */}
      <mesh position={[0, 0, 0.16]} castShadow>
        <boxGeometry args={[1.8, 3.8, 0.02]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#1a4d8f"
          emissiveIntensity={0.5}
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>

      {/* Cámara principal */}
      <mesh position={[-0.7, 1.5, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Cámara secundaria */}
      <mesh position={[-0.3, 1.5, -0.16]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.15, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Notch */}
      <mesh position={[0, 1.7, 0.17]}>
        <boxGeometry args={[0.6, 0.15, 0.05]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Botones laterales */}
      <mesh position={[1.05, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.8, 0.2]} />
        <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}

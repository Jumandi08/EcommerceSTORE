"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface Laptop3DProps {
  color: string
}

export default function Laptop3D({ color }: Laptop3DProps) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15
    }
  })

  return (
    <group ref={meshRef} rotation={[-0.3, 0, 0]} scale={1} position={[0, -0.5, 0]}>
      {/* Base del laptop */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 0.2, 3.5]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Teclado */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[4.5, 0.05, 3]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Touchpad */}
      <mesh position={[0, 0.12, 1]} castShadow>
        <boxGeometry args={[2, 0.05, 1.2]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Pantalla */}
      <group position={[0, 2, -1.7]} rotation={[-0.2, 0, 0]}>
        {/* Marco */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[5, 3.2, 0.15]} />
          <meshStandardMaterial
            color={color}
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={1}
          />
        </mesh>

        {/* Display */}
        <mesh position={[0, 0, 0.1]} castShadow>
          <boxGeometry args={[4.7, 3, 0.05]} />
          <meshStandardMaterial
            color="#000000"
            emissive="#1a3a5c"
            emissiveIntensity={0.6}
            metalness={0.1}
            roughness={0.3}
          />
        </mesh>

        {/* Cámara */}
        <mesh position={[0, 1.3, 0.12]} castShadow>
          <circleGeometry args={[0.05, 32]} />
          <meshStandardMaterial color="#0a0a0a" metalness={0.9} />
        </mesh>

        {/* Logo en la pantalla */}
        <mesh position={[0, -1, 0.12]}>
          <circleGeometry args={[0.2, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            metalness={0.8}
          />
        </mesh>
      </group>

      {/* Bisagra */}
      <mesh position={[0, 0.5, -1.7]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 5, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Puertos laterales */}
      <mesh position={[-2.5, 0.1, 0.5]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.8, 0.15, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} />
      </mesh>
      <mesh position={[2.5, 0.1, 0.5]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.8, 0.15, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} />
      </mesh>
    </group>
  )
}

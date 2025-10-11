# 🎨 Sistema de Modelos 3D - Documentación para Desarrolladores

## 📁 Estructura de Archivos

```
components/3d-models/
├── smartphone-3d.tsx       # Modelo procedural de smartphone
├── laptop-3d.tsx           # Modelo procedural de laptop
├── airpods-3d.tsx          # Modelo procedural de AirPods
├── tablet-3d.tsx           # Modelo procedural de tablet
├── smartwatch-3d.tsx       # Modelo procedural de smartwatch
├── custom-model-3d.tsx     # Loader para modelos GLB/GLTF
├── scene-3d.tsx            # Componente principal con Canvas
├── index.ts                # Barrel export
└── README.md               # Este archivo
```

---

## 🧩 Componentes

### `Scene3D` (Componente Principal)

Componente que renderiza el canvas de Three.js y selecciona automáticamente el modelo correcto.

**Props:**

```typescript
interface Scene3DProps {
  model3dType: string          // Tipo de modelo
  model3dUrl?: string          // URL para modelos custom
  model3dColor?: string        // Color hex (solo procedurales)
  model3dScale?: number        // Escala del modelo
  model3dAnimate?: boolean     // Activar/desactivar animación
  className?: string           // Clases CSS para el contenedor
}
```

**Uso:**

```tsx
import { Scene3D } from "@/components/3d-models"

<Scene3D
  model3dType="procedural-smartphone"
  model3dColor="#1a1a1a"
  model3dScale={1.0}
  model3dAnimate={true}
  className="w-full h-[500px]"
/>
```

**Características:**
- ✅ Iluminación automática optimizada
- ✅ OrbitControls para interacción
- ✅ Environment con preset "studio"
- ✅ Sombras y reflexiones
- ✅ Suspense para carga progresiva

---

### Modelos Procedurales

Todos los modelos procedurales comparten la misma interfaz:

```typescript
interface ModelProps {
  color?: string
  animate?: boolean
}
```

#### `Smartphone3D`

**Geometrías utilizadas:**
- RoundedBox (cuerpo y pantalla)
- CylinderGeometry (cámaras)
- CircleGeometry (flash)
- CapsuleGeometry (puerto USB-C)

**Materiales:**
- MeshStandardMaterial con metalness 0.95
- Emissive para pantalla y lentes

#### `Laptop3D`

**Características especiales:**
- Teclas individuales generadas dinámicamente
- Bisagra realista
- LED de encendido animado
- Rejillas de ventilación

#### `AirPods3D`

**Componentes:**
- Estuche con tapa abierta
- 2 auriculares con geometría de cápsula
- LED de carga con emissive
- Sensores ópticos

#### `Tablet3D`

**Detalles:**
- Sistema de cámaras tipo iPad Pro
- Conectores magnéticos en la base
- Altavoces estéreo
- Sensor LiDAR

#### `Smartwatch3D`

**Elementos:**
- Corona digital con ranuras
- Sensores de salud en la parte trasera
- Correas con hebilla magnética
- Pantalla OLED con emisión

---

### `CustomModel3D`

Carga y renderiza modelos GLB/GLTF externos.

**Props:**

```typescript
interface CustomModel3DProps {
  modelUrl: string    // Ruta al archivo GLB/GLTF
  color?: string      // (No se aplica a modelos externos)
  animate?: boolean   // Animación de rotación
  scale?: number      // Escala del modelo
}
```

**Uso:**

```tsx
import { CustomModel3D } from "@/components/3d-models"

<CustomModel3D
  modelUrl="/models/iphone.glb"
  animate={true}
  scale={1.5}
/>
```

**Características:**
- Usa `useGLTF` de @react-three/drei
- Suspense integrado con placeholder
- Environment con preset "studio"
- Center para centrar automáticamente

**Precargar modelos:**

```tsx
import { preloadModel } from "@/components/3d-models"

// En el componente o useEffect
preloadModel("/models/iphone.glb")
```

---

## 🎨 Personalización Avanzada

### Cambiar Iluminación

Editar `scene-3d.tsx`:

```tsx
// Luz ambiente más brillante
<ambientLight intensity={0.8} />

// Luz direccional más intensa
<directionalLight position={[10, 10, 5]} intensity={1.5} />

// Agregar luz de relleno
<pointLight position={[-10, 5, 5]} intensity={0.5} color="#ff6b6b" />
```

### Modificar Controles

```tsx
<OrbitControls
  enableZoom={true}
  enablePan={true}          // Habilitar paneo
  minDistance={2}           // Zoom mínimo
  maxDistance={20}          // Zoom máximo
  autoRotate={true}         // Rotación automática
  autoRotateSpeed={2}       // Velocidad de rotación
/>
```

### Cambiar Environment Preset

Opciones disponibles:
- `"studio"` (default)
- `"sunset"`
- `"dawn"`
- `"night"`
- `"warehouse"`
- `"forest"`
- `"apartment"`
- `"city"`
- `"park"`
- `"lobby"`

```tsx
<Environment preset="sunset" />
```

---

## 🚀 Crear un Nuevo Modelo Procedural

### Ejemplo: Crear `headphones-3d.tsx`

```tsx
"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { RoundedBox } from "@react-three/drei"
import * as THREE from "three"

interface Headphones3DProps {
  color?: string
  animate?: boolean
}

export default function Headphones3D({
  color = "#1a1a1a",
  animate = true
}: Headphones3DProps) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current && animate) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={meshRef} scale={1.5} position={[0, 0, 0]}>
      {/* Banda superior */}
      <mesh position={[0, 2, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.5, 0.15, 16, 32, Math.PI]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Auricular izquierdo */}
      <RoundedBox args={[0.8, 1.2, 0.4]} radius={0.2} position={[-1.5, 0, 0]}>
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
        />
      </RoundedBox>

      {/* Auricular derecho */}
      <RoundedBox args={[0.8, 1.2, 0.4]} radius={0.2} position={[1.5, 0, 0]}>
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
        />
      </RoundedBox>

      {/* Almohadillas */}
      <mesh position={[-1.5, 0, 0.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[1.5, 0, 0.3]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
    </group>
  )
}
```

### Paso 2: Agregar al Scene3D

Editar `scene-3d.tsx`:

```tsx
import Headphones3D from "./headphones-3d"

// En el Suspense, agregar:
{model3dType === "procedural-headphones" && (
  <Headphones3D color={model3dColor} animate={model3dAnimate} />
)}
```

### Paso 3: Actualizar Schema de Strapi

Editar `backend-ecommerce/src/api/product/content-types/product/schema.json`:

```json
"model3dType": {
  "type": "enumeration",
  "enum": [
    "none",
    "procedural-smartphone",
    "procedural-laptop",
    "procedural-airpods",
    "procedural-tablet",
    "procedural-smartwatch",
    "procedural-headphones",  // ← Agregar aquí
    "custom-glb"
  ]
}
```

### Paso 4: Exportar en index.ts

```tsx
export { default as Headphones3D } from "./headphones-3d"
```

---

## 🎯 Optimización de Rendimiento

### 1. Lazy Loading

```tsx
import { lazy, Suspense } from "react"

const Scene3D = lazy(() => import("@/components/3d-models/scene-3d"))

<Suspense fallback={<div>Cargando modelo 3D...</div>}>
  <Scene3D {...props} />
</Suspense>
```

### 2. Reducir Polígonos

Para modelos procedurales, reduce los segmentos:

```tsx
// Antes (más calidad, menos performance)
<cylinderGeometry args={[0.2, 0.2, 0.15, 32]} />

// Después (menos calidad, más performance)
<cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
```

### 3. Disable Shadows en Móviles

```tsx
const isMobile = typeof window !== "undefined" && window.innerWidth < 768

<Canvas shadows={!isMobile}>
  {/* ... */}
</Canvas>
```

### 4. Usar LOD (Level of Detail)

```tsx
import { Detailed } from "@react-three/drei"

<Detailed distances={[0, 10, 20]}>
  <HighDetailModel />      {/* Cerca */}
  <MediumDetailModel />    {/* Media distancia */}
  <LowDetailModel />       {/* Lejos */}
</Detailed>
```

---

## 🐛 Debugging

### Activar Stats de Rendimiento

```tsx
import { Stats } from "@react-three/drei"

<Canvas>
  <Stats />
  {/* resto del código */}
</Canvas>
```

### Ver Helpers

```tsx
import { axesHelper, gridHelper } from "@react-three/drei"

<Canvas>
  <axesHelper args={[5]} />
  <gridHelper args={[10, 10]} />
  {/* ... */}
</Canvas>
```

### Console Log de Modelos GLB

```tsx
const { scene } = useGLTF(modelUrl)
console.log("Model structure:", scene)
```

---

## 📚 Recursos

**Documentación:**
- [Three.js](https://threejs.org/docs/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Drei](https://github.com/pmndrs/drei)

**Tutoriales:**
- [React Three Fiber Journey](https://threejs-journey.com/)
- [Three.js Fundamentals](https://threejsfundamentals.org/)

**Herramientas:**
- [glTF Viewer](https://gltf-viewer.donmccurdy.com/)
- [Three.js Editor](https://threejs.org/editor/)
- [Blender](https://www.blender.org/)

---

## 🤝 Contribuir

Para agregar nuevos modelos procedurales:

1. Crear archivo `tu-modelo-3d.tsx`
2. Seguir la interfaz estándar de props
3. Usar RoundedBox para bordes suaves
4. Agregar shadows: `castShadow` y `receiveShadow`
5. Implementar animación con `useFrame`
6. Actualizar `scene-3d.tsx` y `index.ts`
7. Documentar en este README

---

¡Happy coding! 🚀

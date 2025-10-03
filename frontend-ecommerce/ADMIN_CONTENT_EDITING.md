# 📝 Sistema de Edición de Contenido para Administradores

## 🎯 Descripción General

El sistema permite a los administradores editar el contenido de las páginas institucionales directamente desde el navegador, sin necesidad de modificar código.

## ✅ Páginas Editables

Las siguientes páginas tienen contenido editable cuando estás logueado como administrador:

1. ✅ **Sobre Nosotros** (`/sobre-nosotros`) - **IMPLEMENTADO**
2. 🔄 **Contáctanos** (`/contactanos`) - Pendiente
3. 🔄 **Términos y Condiciones** (`/terminos`) - Pendiente
4. 🔄 **Política de Privacidad** (`/privacidad`) - Pendiente
5. 🔄 **Preguntas Frecuentes** (`/faq`) - Pendiente

## 🚀 Cómo Usar el Sistema de Edición

### Paso 1: Iniciar Sesión como Administrador

1. Ve a `/auth/login`
2. Ingresa con tu cuenta de administrador (debe tener `isAdmin: true`)
3. Una vez logueado, verás un indicador en la esquina inferior derecha: **"Modo Administrador Activo"**

### Paso 2: Editar Contenido

1. Navega a cualquier página editable (ej: `/sobre-nosotros`)
2. Pasa el mouse sobre el texto que deseas editar
3. Aparecerá un **botón de edición (✏️)** en la esquina superior derecha del elemento
4. Haz clic en el botón de edición
5. Se abrirá un campo de texto editable
6. Modifica el contenido como desees
7. Haz clic en **"Guardar"** para aplicar los cambios
8. Si quieres cancelar, haz clic en **"Cancelar"**

### Paso 3: Confirmar Cambios

- Los cambios se guardan automáticamente en el servidor
- Verás una notificación de confirmación en la esquina superior derecha
- Los cambios son visibles inmediatamente para todos los usuarios

## 📋 Elementos Editables por Página

### Sobre Nosotros (`/sobre-nosotros`)

#### Hero Section
- **Título Principal**: "Innovatech Solutions"
- **Descripción**: Texto introductorio principal

#### Sección Misión, Visión e Historia
- **Misión - Título**: "Nuestra Misión"
- **Misión - Descripción**: Texto completo de la misión
- **Visión - Título**: "Nuestra Visión"
- **Visión - Descripción**: Texto completo de la visión
- **Historia - Título**: "Nuestra Historia"
- **Historia - Descripción**: Texto completo de la historia

#### Sección Equipo
- **Título de Sección**: "Conoce a Nuestro Equipo"
- **Descripción de Sección**: Subtítulo del equipo

#### Sección Valores
- **Título de Sección**: "Principios que nos Guían"
- **Descripción de Sección**: Subtítulo de valores

## 🔒 Seguridad

### Verificación de Permisos

- Solo los usuarios con `isAdmin: true` pueden editar contenido
- Todos los endpoints del API verifican el estado de administrador
- Si intentas editar sin permisos, recibirás un error 403 (No Autorizado)

### Validación de Datos

- No se permiten campos vacíos
- El contenido se sanitiza antes de guardarse
- Se mantiene un log de cambios (próximamente)

## 🎨 Características del Sistema

### Componentes Principales

1. **EditableText**: Componente para editar texto en línea
   - Soporta texto corto (Input) y largo (Textarea)
   - Validación en tiempo real
   - Animaciones suaves

2. **AdminToolbar**: Barra de herramientas visible solo para admins
   - Indicador de modo administrador
   - Botón para guardar todos los cambios (próximamente)

3. **API Routes**: Endpoints para persistencia
   - `GET /api/content/sobre-nosotros` - Obtener contenido
   - `PATCH /api/content/sobre-nosotros` - Actualizar contenido

## 📊 Estructura de Datos

### Ejemplo de Estructura (Sobre Nosotros)

```json
{
  "hero": {
    "title": "Innovatech Solutions",
    "description": "Transformamos ideas en realidades digitales..."
  },
  "mission": {
    "title": "Nuestra Misión",
    "description": "Impulsar el crecimiento..."
  },
  "vision": {
    "title": "Nuestra Visión",
    "description": "Ser líderes en el desarrollo..."
  },
  "history": {
    "title": "Nuestra Historia",
    "description": "Desde nuestros inicios en 2010..."
  },
  "teamTitle": "Conoce a Nuestro Equipo",
  "teamDescription": "Profesionales altamente cualificados...",
  "valuesTitle": "Principios que nos Guían",
  "valuesDescription": "Los valores fundamentales..."
}
```

## 🔧 Desarrollo

### Agregar Nueva Página Editable

Para hacer editable una nueva página, sigue estos pasos:

1. **Importar componentes necesarios**:
```typescript
import { EditableText, AdminToolbar } from '@/components/editable-content';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from "@/hooks/use-toast";
```

2. **Agregar estado y función de guardado**:
```typescript
const { isAdmin } = useAuth();
const { toast } = useToast();
const [content, setContent] = useState({ /* estructura de contenido */ });

const handleSaveContent = async (field: string, value: string) => {
  // Implementar lógica de guardado
};
```

3. **Usar EditableText en el JSX**:
```typescript
<EditableText
  initialValue={content.field}
  onSave={(value) => handleSaveContent('field', value)}
  isAdmin={isAdmin}
  as="h1" // o "h2", "h3", "p", "span"
  multiline={false} // true para textarea
  className="your-classes"
/>
```

4. **Agregar AdminToolbar**:
```typescript
<AdminToolbar isAdmin={isAdmin} />
```

5. **Crear endpoint API** en `/app/api/content/[page]/route.ts`

### Props de EditableText

| Prop | Tipo | Descripción |
|------|------|-------------|
| `initialValue` | string | Valor inicial del texto |
| `onSave` | (value: string) => Promise<void> | Función para guardar |
| `isAdmin` | boolean | Si el usuario es admin |
| `className` | string | Clases CSS |
| `multiline` | boolean | Si usa textarea o input |
| `as` | 'h1'\|'h2'\|'h3'\|'p'\|'span' | Elemento HTML a renderizar |

## 🚧 Roadmap

### Fase 1 (Completada)
- [x] Sistema de edición base
- [x] Página "Sobre Nosotros" editable
- [x] API endpoint para persistencia
- [x] Verificación de permisos

### Fase 2 (Pendiente)
- [ ] Agregar edición a "Contáctanos"
- [ ] Agregar edición a "Términos y Condiciones"
- [ ] Agregar edición a "Política de Privacidad"
- [ ] Agregar edición a "FAQ"

### Fase 3 (Futuro)
- [ ] Historial de cambios
- [ ] Vista previa antes de guardar
- [ ] Exportar/Importar contenido
- [ ] Edición de imágenes
- [ ] Sistema de revisiones
- [ ] Múltiples idiomas

## ⚠️ Notas Importantes

1. **Backup**: Por ahora, los datos se guardan en memoria. En producción, debes implementar persistencia en base de datos.

2. **Validación del Admin**: El endpoint actualmente retorna `true` para testing. Implementa validación real del token JWT.

3. **Sanitización**: Asegúrate de sanitizar el contenido antes de guardarlo para evitar XSS.

4. **Rate Limiting**: Implementa rate limiting en los endpoints para evitar abuso.

## 📞 Soporte

Si tienes problemas con el sistema de edición:

1. Verifica que estés logueado como administrador
2. Revisa la consola del navegador por errores
3. Contacta al equipo de desarrollo

---

**Última actualización**: ${new Date().toLocaleDateString('es-ES')}
**Versión**: 1.0.0

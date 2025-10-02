"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false)

  // Efecto para marcar cuando el componente está montado en el cliente
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Evitar problemas de hidratación renderizando el contenido solo en el cliente
  return (
    <NextThemesProvider {...props}>
      {mounted ? children : null}
    </NextThemesProvider>
  )
}

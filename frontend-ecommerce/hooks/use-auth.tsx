import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { toast } from './use-toast'

interface User {
  id: number
  username: string
  email: string
  jwt: string
  isAdmin?: boolean
  role?: {
    id: number
    name: string
    type: string
  }
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (identifier: string, password: string) => Promise<boolean>
  register: (username: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
}

export const useAuth = create(
  persist<AuthStore>(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isAdmin: false,

      login: async (identifier: string, password: string) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                identifier,
                password,
              }),
            }
          )

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data?.error?.message || 'Error al iniciar sesión')
          }

          // Obtener información completa del usuario con populate para el rol
          const userResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me?populate=role`,
            {
              headers: {
                'Authorization': `Bearer ${data.jwt}`,
              },
            }
          )

          const userData = await userResponse.json()

          // Usar el campo isAdmin personalizado del usuario
          const isAdminUser = userData.isAdmin === true

          set({
            user: {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              jwt: data.jwt,
              isAdmin: userData.isAdmin,
              role: userData.role,
            },
            isAuthenticated: true,
            isAdmin: isAdminUser,
          })

          toast({
            title: 'Sesión iniciada',
            description: `Bienvenido ${userData.username}`,
          })

          return true
        } catch (error: any) {
          toast({
            title: 'Error al iniciar sesión',
            description: error.message,
            variant: 'destructive',
          })
          return false
        }
      },

      register: async (username: string, email: string, password: string) => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/local/register`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username,
                email,
                password,
              }),
            }
          )

          const data = await response.json()

          if (!response.ok) {
            throw new Error(data?.error?.message || 'Error al registrarse')
          }

          // Obtener información completa del usuario con populate para el rol
          const userResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me?populate=role`,
            {
              headers: {
                'Authorization': `Bearer ${data.jwt}`,
              },
            }
          )

          const userData = await userResponse.json()

          // Usar el campo isAdmin personalizado del usuario (false por defecto al registrarse)
          const isAdminUser = userData.isAdmin === true

          set({
            user: {
              id: userData.id,
              username: userData.username,
              email: userData.email,
              jwt: data.jwt,
              isAdmin: userData.isAdmin,
              role: userData.role,
            },
            isAuthenticated: true,
            isAdmin: isAdminUser,
          })

          toast({
            title: 'Registro exitoso',
            description: `Bienvenido ${userData.username}`,
          })

          return true
        } catch (error: any) {
          toast({
            title: 'Error al registrarse',
            description: error.message,
            variant: 'destructive',
          })
          return false
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false,
        })
        toast({
          title: 'Sesión cerrada',
        })
      },

      checkAuth: () => {
        const state = get()
        if (state.user?.jwt) {
          const isAdminUser = state.user.isAdmin === true
          set({ isAuthenticated: true, isAdmin: isAdminUser })
        } else {
          set({ isAuthenticated: false, user: null, isAdmin: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

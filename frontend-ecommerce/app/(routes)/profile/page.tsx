"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { User, Mail, Shield, Calendar } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    if (user) {
      setUsername(user.username)
      setEmail(user.email)
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || !user) {
    return null
  }

  const handleSave = async () => {
    // TODO: Implementar actualización de perfil
    setIsEditing(false)
  }

  return (
    <div className="max-w-4xl px-4 py-16 mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Mi Perfil</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Administra tu información personal
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Sidebar */}
        <Card className="h-fit md:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <User className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-center">{user.username}</CardTitle>
            <CardDescription className="text-center">{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Usuario verificado</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Miembro desde {new Date().getFullYear()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          {/* Información Personal */}
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>
                Actualiza tus datos personales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nombre de usuario
                  </div>
                </Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={!isEditing}
                  placeholder="Tu nombre de usuario"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Correo electrónico
                  </div>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  placeholder="tu@email.com"
                />
              </div>

              <Separator />

              <div className="flex gap-3">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)} className="w-full">
                    Editar Perfil
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave} className="flex-1">
                      Guardar Cambios
                    </Button>
                    <Button
                      onClick={() => {
                        setIsEditing(false)
                        if (user) {
                          setUsername(user.username)
                          setEmail(user.email)
                        }
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Seguridad */}
          <Card>
            <CardHeader>
              <CardTitle>Seguridad</CardTitle>
              <CardDescription>
                Administra la seguridad de tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Contraseña</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Última actualización: hace 30 días
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Cambiar
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Autenticación de dos factores</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Agrega una capa extra de seguridad
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Activar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preferencias */}
          <Card>
            <CardHeader>
              <CardTitle>Preferencias</CardTitle>
              <CardDescription>
                Personaliza tu experiencia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Notificaciones por email</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Recibe actualizaciones sobre tus pedidos
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Idioma y región</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Español (México)
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Cambiar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

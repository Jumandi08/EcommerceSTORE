"use client"

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Package,
  MapPin,
  Bell,
  Lock,
  Shield,
  CreditCard,
  Store,
  ChevronRight,
  Mail,
  Calendar,
  Settings
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'

type Section = 'profile' | 'orders' | 'addresses' | 'followed-stores' | 'balance' | 'notifications' | 'privacy' | 'security'

export default function ProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isAuthenticated, logout } = useAuth()
  const [activeSection, setActiveSection] = useState<Section>('profile')
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

    const section = searchParams.get('section') as Section
    if (section) {
      setActiveSection(section)
    }
  }, [isAuthenticated, user, router, searchParams])

  if (!isAuthenticated || !user) {
    return null
  }

  const getInitials = () => {
    if (!user?.username) return "U";
    return user.username.substring(0, 2).toUpperCase();
  };

  const menuSections = [
    {
      title: "Mi Cuenta",
      items: [
        { icon: User, label: "Perfil", section: "profile" as Section, color: "text-blue-600" },
        { icon: Package, label: "Mis Pedidos", section: "orders" as Section, color: "text-green-600" },
      ]
    },
    {
      title: "Gestión",
      items: [
        { icon: MapPin, label: "Direcciones", section: "addresses" as Section, color: "text-purple-600" },
        { icon: Store, label: "Tiendas Seguidas", section: "followed-stores" as Section, color: "text-orange-600" },
      ]
    },
    {
      title: "Pagos y Seguridad",
      items: [
        { icon: CreditCard, label: "Saldo", section: "balance" as Section, color: "text-emerald-600" },
        { icon: Bell, label: "Notificaciones", section: "notifications" as Section, color: "text-yellow-600" },
        { icon: Lock, label: "Privacidad", section: "privacy" as Section, color: "text-red-600" },
        { icon: Shield, label: "Seguridad", section: "security" as Section, color: "text-indigo-600" },
      ]
    }
  ];

  const handleSave = async () => {
    // TODO: Implementar actualización de perfil con backend
    setIsEditing(false)
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <motion.div
            key="profile"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
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
                    <Button onClick={() => setIsEditing(true)} className="w-full bg-rose-600 hover:bg-rose-700">
                      Editar Perfil
                    </Button>
                  ) : (
                    <>
                      <Button onClick={handleSave} className="flex-1 bg-rose-600 hover:bg-rose-700">
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
          </motion.div>
        )

      case 'orders':
        return (
          <motion.div
            key="orders"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Mis Pedidos</CardTitle>
                <CardDescription>
                  Historial de tus compras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Aún no tienes pedidos
                  </p>
                  <Button
                    onClick={() => router.push('/')}
                    className="bg-rose-600 hover:bg-rose-700"
                  >
                    Explorar Productos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 'addresses':
        return (
          <motion.div
            key="addresses"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Direcciones de Envío</CardTitle>
                <CardDescription>
                  Administra tus direcciones guardadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    No tienes direcciones guardadas
                  </p>
                  <Button className="bg-rose-600 hover:bg-rose-700">
                    Agregar Dirección
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 'followed-stores':
        return (
          <motion.div
            key="followed-stores"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Tiendas Seguidas</CardTitle>
                <CardDescription>
                  Tiendas que sigues para recibir actualizaciones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Store className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    No sigues ninguna tienda aún
                  </p>
                  <Button
                    onClick={() => router.push('/')}
                    className="bg-rose-600 hover:bg-rose-700"
                  >
                    Explorar Tiendas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 'balance':
        return (
          <motion.div
            key="balance"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Saldo y Métodos de Pago</CardTitle>
                <CardDescription>
                  Administra tus tarjetas y saldo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-rose-600 to-rose-700 rounded-xl p-6 text-white">
                  <p className="text-sm opacity-90 mb-2">Saldo Disponible</p>
                  <p className="text-4xl font-bold">$0.00</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-4">Métodos de Pago</h3>
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      No tienes métodos de pago guardados
                    </p>
                    <Button variant="outline">
                      Agregar Tarjeta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 'notifications':
        return (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
                <CardDescription>
                  Configura cómo quieres recibir notificaciones
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
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Ofertas y promociones</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Recibe ofertas especiales
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Recordatorios de carrito</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Te recordamos productos en tu carrito
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 'privacy':
        return (
          <motion.div
            key="privacy"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Privacidad</CardTitle>
                <CardDescription>
                  Controla tu privacidad y datos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Perfil público</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Otros usuarios pueden ver tu perfil
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Mostrar historial de compras</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Visible en tu perfil público
                    </p>
                  </div>
                  <Switch />
                </div>

                <Separator />

                <Button variant="destructive" className="w-full">
                  Eliminar mi Cuenta
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )

      case 'security':
        return (
          <motion.div
            key="security"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
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

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Sesiones activas</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      1 dispositivo conectado
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-gradient-to-br from-rose-600 to-rose-700 text-white text-xl">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Mi Perfil
                </h1>
                <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  {user.email}
                  {user.isAdmin && (
                    <Badge className="bg-rose-600">Admin</Badge>
                  )}
                </p>
              </div>
            </div>

            <Button
              onClick={logout}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
            >
              Cerrar Sesión
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <div className="space-y-1">
                  {menuSections.map((section, idx) => (
                    <div key={section.title}>
                      <div className="px-2 py-3">
                        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                          {section.title}
                        </p>
                      </div>
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.section;
                        return (
                          <button
                            key={item.section}
                            onClick={() => setActiveSection(item.section)}
                            className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all ${
                              isActive
                                ? 'bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className={`w-4 h-4 ${isActive ? item.color : ''}`} />
                              <span className="text-sm font-medium">{item.label}</span>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                          </button>
                        );
                      })}
                      {idx < menuSections.length - 1 && <Separator className="my-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

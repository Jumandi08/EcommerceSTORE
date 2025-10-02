"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Package, Clock, Truck, CheckCircle, XCircle, Eye } from 'lucide-react'
import { formatPrice } from '@/lib/formatPrice'

// Tipos para los pedidos
interface OrderItem {
  id: number
  productName: string
  quantity: number
  price: number
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: OrderItem[]
}

// Datos de ejemplo (en producción vendrían de la API)
const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 1299.99,
    items: [
      { id: 1, productName: 'iPhone 13 Pro', quantity: 1, price: 1299.99 }
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-20',
    status: 'shipped',
    total: 899.99,
    items: [
      { id: 2, productName: 'AirPods Pro', quantity: 2, price: 449.99 }
    ]
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-22',
    status: 'processing',
    total: 1799.99,
    items: [
      { id: 3, productName: 'MacBook Air M2', quantity: 1, price: 1799.99 }
    ]
  }
]

const statusConfig = {
  pending: {
    label: 'Pendiente',
    icon: Clock,
    color: 'bg-yellow-500',
    variant: 'secondary' as const
  },
  processing: {
    label: 'Procesando',
    icon: Package,
    color: 'bg-blue-500',
    variant: 'default' as const
  },
  shipped: {
    label: 'Enviado',
    icon: Truck,
    color: 'bg-purple-500',
    variant: 'default' as const
  },
  delivered: {
    label: 'Entregado',
    icon: CheckCircle,
    color: 'bg-green-500',
    variant: 'default' as const
  },
  cancelled: {
    label: 'Cancelado',
    icon: XCircle,
    color: 'bg-red-500',
    variant: 'destructive' as const
  }
}

export default function OrdersPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    // Simular carga de datos
    setTimeout(() => {
      setOrders(mockOrders)
      setIsLoading(false)
    }, 500)
  }, [isAuthenticated, router])

  if (!isAuthenticated || !user) {
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-400 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-400">Cargando pedidos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl px-4 py-16 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Mis Pedidos</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Revisa el estado y detalles de tus compras
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 mb-8 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pedidos</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">En Proceso</p>
                <p className="text-2xl font-bold">
                  {orders.filter(o => o.status === 'processing').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Enviados</p>
                <p className="text-2xl font-bold">
                  {orders.filter(o => o.status === 'shipped').length}
                </p>
              </div>
              <Truck className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Entregados</p>
                <p className="text-2xl font-bold">
                  {orders.filter(o => o.status === 'delivered').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-xl font-semibold">No tienes pedidos aún</h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                ¡Comienza a comprar y tus pedidos aparecerán aquí!
              </p>
              <Button onClick={() => router.push('/')}>
                Ir a la tienda
              </Button>
            </CardContent>
          </Card>
        ) : (
          orders.map((order) => {
            const StatusIcon = statusConfig[order.status].icon
            return (
              <Card key={order.id} className="overflow-hidden transition-shadow hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{order.orderNumber}</CardTitle>
                      <CardDescription>
                        Realizado el {new Date(order.date).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </CardDescription>
                    </div>
                    <Badge variant={statusConfig[order.status].variant} className="gap-1">
                      <StatusIcon className="w-4 h-4" />
                      {statusConfig[order.status].label}
                    </Badge>
                  </div>
                </CardHeader>

                <Separator />

                <CardContent className="pt-4">
                  {/* Items */}
                  <div className="mb-4 space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded bg-gray-100 dark:bg-gray-800">
                            <Package className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-gray-600 dark:text-gray-400">
                              Cantidad: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p className="font-semibold">{formatPrice(item.price)}</p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Total y Acciones */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                      <p className="text-2xl font-bold">{formatPrice(order.total)}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalles
                      </Button>
                      {order.status === 'delivered' && (
                        <Button size="sm">
                          Volver a Comprar
                        </Button>
                      )}
                      {(order.status === 'pending' || order.status === 'processing') && (
                        <Button variant="destructive" size="sm">
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>

                {/* Progress Bar */}
                {order.status !== 'cancelled' && (
                  <div className="px-6 pb-6">
                    <div className="relative">
                      <div className="h-2 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
                        <div
                          className={`h-full ${statusConfig[order.status].color} transition-all duration-500`}
                          style={{
                            width: order.status === 'pending' ? '25%' :
                                   order.status === 'processing' ? '50%' :
                                   order.status === 'shipped' ? '75%' :
                                   '100%'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}

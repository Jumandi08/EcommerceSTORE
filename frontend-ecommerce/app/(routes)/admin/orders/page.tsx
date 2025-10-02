"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Search,
  Filter,
  Download,
  Eye,
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  MoreVertical
} from 'lucide-react'
import { formatPrice } from '@/lib/formatPrice'

interface OrderItem {
  id: number
  productName: string
  quantity: number
  price: number
}

interface Order {
  id: string
  orderNumber: string
  customer: string
  email: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  items: OrderItem[]
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: 'Juan Pérez',
    email: 'juan@example.com',
    total: 1299.99,
    status: 'pending',
    date: '2024-01-30',
    items: [
      { id: 1, productName: 'iPhone 13 Pro', quantity: 1, price: 1299.99 }
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: 'María García',
    email: 'maria@example.com',
    total: 899.99,
    status: 'processing',
    date: '2024-01-30',
    items: [
      { id: 2, productName: 'AirPods Pro', quantity: 2, price: 449.99 }
    ]
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: 'Carlos López',
    email: 'carlos@example.com',
    total: 1799.99,
    status: 'shipped',
    date: '2024-01-29',
    items: [
      { id: 3, productName: 'MacBook Air M2', quantity: 1, price: 1799.99 }
    ]
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: 'Ana Martínez',
    email: 'ana@example.com',
    total: 549.99,
    status: 'delivered',
    date: '2024-01-29',
    items: [
      { id: 4, productName: 'Apple Watch Series 8', quantity: 1, price: 549.99 }
    ]
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    customer: 'Pedro Rodríguez',
    email: 'pedro@example.com',
    total: 299.99,
    status: 'cancelled',
    date: '2024-01-28',
    items: [
      { id: 5, productName: 'HomePod mini', quantity: 1, price: 299.99 }
    ]
  }
]

const statusConfig = {
  pending: { label: 'Pendiente', icon: Clock, color: 'bg-yellow-500', variant: 'secondary' as const },
  processing: { label: 'Procesando', icon: Package, color: 'bg-blue-500', variant: 'default' as const },
  shipped: { label: 'Enviado', icon: Truck, color: 'bg-purple-500', variant: 'default' as const },
  delivered: { label: 'Entregado', icon: CheckCircle, color: 'bg-green-500', variant: 'default' as const },
  cancelled: { label: 'Cancelado', icon: XCircle, color: 'bg-red-500', variant: 'destructive' as const }
}

export default function AdminOrdersPage() {
  const router = useRouter()
  const { user, isAuthenticated, isAdmin } = useAuth()
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    if (isAuthenticated && !isAdmin) {
      router.push('/')
      return
    }
  }, [isAuthenticated, isAdmin, router])

  useEffect(() => {
    let filtered = orders

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(
        order =>
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtrar por estado
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [searchQuery, statusFilter, orders])

  if (!isAuthenticated || !user || !isAdmin) {
    return null
  }

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  const stats = {
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  }

  return (
    <div className="max-w-7xl px-4 py-8 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Gestión de Pedidos</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Administra todos los pedidos de la tienda
            </p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exportar CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 mb-6 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pendientes</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Procesando</p>
                <p className="text-2xl font-bold">{stats.processing}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Enviados</p>
                <p className="text-2xl font-bold">{stats.shipped}</p>
              </div>
              <Truck className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Entregados</p>
                <p className="text-2xl font-bold">{stats.delivered}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-gray-400" />
              <Input
                placeholder="Buscar por número de orden, cliente o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendientes</SelectItem>
                  <SelectItem value="processing">Procesando</SelectItem>
                  <SelectItem value="shipped">Enviados</SelectItem>
                  <SelectItem value="delivered">Entregados</SelectItem>
                  <SelectItem value="cancelled">Cancelados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pedidos ({filteredOrders.length})</CardTitle>
          <CardDescription>Lista completa de pedidos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon
              return (
                <div
                  key={order.id}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold">{order.orderNumber}</h3>
                        <Badge variant={statusConfig[order.status].variant} className="gap-1">
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig[order.status].label}
                        </Badge>
                      </div>
                      <div className="grid gap-1 text-sm text-gray-600 dark:text-gray-400 md:grid-cols-3">
                        <div>
                          <span className="font-medium">Cliente:</span> {order.customer}
                        </div>
                        <div>
                          <span className="font-medium">Email:</span> {order.email}
                        </div>
                        <div>
                          <span className="font-medium">Fecha:</span>{' '}
                          {new Date(order.date).toLocaleDateString('es-MX')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{formatPrice(order.total)}</p>
                    </div>
                  </div>

                  <Separator className="my-3" />

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {order.items.length} producto(s)
                    </div>
                    <div className="flex gap-2">
                      <Select
                        value={order.status}
                        onValueChange={(value) => updateOrderStatus(order.id, value as Order['status'])}
                      >
                        <SelectTrigger className="w-[160px] h-9">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendiente</SelectItem>
                          <SelectItem value="processing">Procesando</SelectItem>
                          <SelectItem value="shipped">Enviado</SelectItem>
                          <SelectItem value="delivered">Entregado</SelectItem>
                          <SelectItem value="cancelled">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}

            {filteredOrders.length === 0 && (
              <div className="py-16 text-center">
                <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2 text-xl font-semibold">No se encontraron pedidos</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Intenta ajustar los filtros de búsqueda
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedOrder(null)}
        >
          <Card
            className="w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <CardTitle>Detalles del Pedido</CardTitle>
              <CardDescription>{selectedOrder.orderNumber}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Cliente</p>
                  <p className="text-lg font-semibold">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</p>
                  <p className="text-lg font-semibold">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Fecha</p>
                  <p className="text-lg font-semibold">
                    {new Date(selectedOrder.date).toLocaleDateString('es-MX')}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Estado</p>
                  <Badge variant={statusConfig[selectedOrder.status].variant} className="mt-1">
                    {statusConfig[selectedOrder.status].label}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="mb-3 text-lg font-semibold">Productos</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Cantidad: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold">{formatPrice(item.price)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <p className="text-xl font-semibold">Total</p>
                <p className="text-2xl font-bold">{formatPrice(selectedOrder.total)}</p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => setSelectedOrder(null)}>
                  Cerrar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

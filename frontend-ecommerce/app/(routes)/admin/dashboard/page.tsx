"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  AlertTriangle,
  Eye,
  Edit,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles
} from 'lucide-react'
import { formatPrice } from '@/lib/formatPrice'

// Tipos
interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalUsers: number
  revenueChange: number
  ordersChange: number
}

interface TopProduct {
  id: number
  name: string
  sales: number
  revenue: number
  stock: number
}

interface RecentOrder {
  id: string
  orderNumber: string
  customer: string
  total: number
  status: string
  date: string
}

interface LowStockProduct {
  id: number
  name: string
  stock: number
  sold: number
}

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, isAdmin } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  // Datos de ejemplo (en producción vendrían de la API)
  const [stats] = useState<DashboardStats>({
    totalRevenue: 45678.90,
    totalOrders: 156,
    totalProducts: 48,
    totalUsers: 892,
    revenueChange: 12.5,
    ordersChange: -3.2
  })

  const [topProducts] = useState<TopProduct[]>([
    { id: 1, name: 'iPhone 13 Pro', sales: 45, revenue: 58495.55, stock: 12 },
    { id: 2, name: 'MacBook Air M2', sales: 32, revenue: 57599.68, stock: 8 },
    { id: 3, name: 'AirPods Pro', sales: 78, revenue: 19499.22, stock: 25 },
    { id: 4, name: 'iPad Pro', sales: 28, revenue: 27999.72, stock: 15 }
  ])

  const [recentOrders] = useState<RecentOrder[]>([
    { id: '1', orderNumber: 'ORD-2024-156', customer: 'Juan Pérez', total: 1299.99, status: 'pending', date: '2024-01-30' },
    { id: '2', orderNumber: 'ORD-2024-155', customer: 'María García', total: 899.99, status: 'processing', date: '2024-01-30' },
    { id: '3', orderNumber: 'ORD-2024-154', customer: 'Carlos López', total: 1799.99, status: 'shipped', date: '2024-01-29' },
    { id: '4', orderNumber: 'ORD-2024-153', customer: 'Ana Martínez', total: 549.99, status: 'delivered', date: '2024-01-29' }
  ])

  const [lowStockProducts] = useState<LowStockProduct[]>([
    { id: 1, name: 'iPhone 13 Pro Max', stock: 3, sold: 42 },
    { id: 2, name: 'Apple Watch Series 8', stock: 5, sold: 38 },
    { id: 3, name: 'HomePod mini', stock: 2, sold: 15 }
  ])

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    // Verificar que el usuario sea administrador
    if (isAuthenticated && !isAdmin) {
      router.push('/')
      return
    }

    setTimeout(() => setIsLoading(false), 500)
  }, [isAuthenticated, isAdmin, router])

  if (!isAuthenticated || !user || !isAdmin) {
    return null
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-400 animate-pulse" />
          <p className="text-gray-600 dark:text-gray-400">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500',
    processing: 'bg-blue-500',
    shipped: 'bg-purple-500',
    delivered: 'bg-green-500',
    cancelled: 'bg-red-500'
  }

  const statusLabels: Record<string, string> = {
    pending: 'Pendiente',
    processing: 'Procesando',
    shipped: 'Enviado',
    delivered: 'Entregado',
    cancelled: 'Cancelado'
  }

  return (
    <div className="max-w-7xl px-4 py-8 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Dashboard Administrativo</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Bienvenido, {user.username}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push('/admin/hero-slides')}>
              <Sparkles className="w-4 h-4 mr-2" />
              Hero Slides
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Exportar Reportes
            </Button>
            <Button>
              <Package className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
            <div className="flex items-center mt-1 text-xs">
              {stats.revenueChange > 0 ? (
                <>
                  <ArrowUpRight className="w-4 h-4 mr-1 text-green-600" />
                  <span className="text-green-600">+{stats.revenueChange}%</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="w-4 h-4 mr-1 text-red-600" />
                  <span className="text-red-600">{stats.revenueChange}%</span>
                </>
              )}
              <span className="ml-1 text-gray-600 dark:text-gray-400">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
            <ShoppingCart className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <div className="flex items-center mt-1 text-xs">
              {stats.ordersChange > 0 ? (
                <>
                  <ArrowUpRight className="w-4 h-4 mr-1 text-green-600" />
                  <span className="text-green-600">+{stats.ordersChange}%</span>
                </>
              ) : (
                <>
                  <ArrowDownRight className="w-4 h-4 mr-1 text-red-600" />
                  <span className="text-red-600">{stats.ordersChange}%</span>
                </>
              )}
              <span className="ml-1 text-gray-600 dark:text-gray-400">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Productos</CardTitle>
            <Package className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              {lowStockProducts.length} con stock bajo
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              +24 este mes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Acceso Rápido</CardTitle>
          <CardDescription>Gestiona los elementos principales de tu tienda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => router.push('/admin/hero-slides')}
            >
              <Sparkles className="w-6 h-6 text-rose-600" />
              <span className="text-sm font-medium">Hero Slides</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => router.push('/admin/products')}
            >
              <Package className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium">Productos</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2"
              onClick={() => router.push('/admin/orders')}
            >
              <ShoppingCart className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-medium">Pedidos</span>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2"
            >
              <Users className="w-6 h-6 text-orange-600" />
              <span className="text-sm font-medium">Clientes</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Productos Más Vendidos
            </CardTitle>
            <CardDescription>Top productos por ventas este mes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 font-bold text-white bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {product.sales} ventas · Stock: {product.stock}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatPrice(product.revenue)}</p>
                      <Button variant="ghost" size="sm" className="h-8">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {index < topProducts.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Pedidos Recientes
            </CardTitle>
            <CardDescription>Últimas transacciones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={order.id}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{order.orderNumber}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {order.customer}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="font-bold">{formatPrice(order.total)}</p>
                        <Badge variant="secondary" className="text-xs">
                          <div className={`w-2 h-2 rounded-full mr-1 ${statusColors[order.status]}`} />
                          {statusLabels[order.status]}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {index < recentOrders.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <AlertTriangle className="w-5 h-5" />
              Alerta de Stock Bajo
            </CardTitle>
            <CardDescription>Productos que necesitan reabastecimiento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 border border-orange-200 rounded-lg bg-orange-50 dark:bg-orange-950 dark:border-orange-800"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium">{product.name}</p>
                    <Badge variant="destructive" className="text-xs">
                      ¡{product.stock} left!
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Vendidos: {product.sold} unidades
                  </p>
                  <div className="mt-3">
                    <div className="h-2 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
                      <div
                        className="h-full bg-orange-500 transition-all"
                        style={{ width: `${(product.stock / (product.stock + product.sold)) * 100}%` }}
                      />
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-3" variant="outline">
                    Reabastecer
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

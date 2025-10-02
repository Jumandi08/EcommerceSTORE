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
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  AlertTriangle,
  TrendingUp,
  DollarSign
} from 'lucide-react'
import { formatPrice } from '@/lib/formatPrice'

interface Product {
  id: number
  name: string
  slug: string
  category: string
  price: number
  stock: number
  sold: number
  isFeatured: boolean
  isActive: boolean
  image: string
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'iPhone 13 Pro',
    slug: 'iphone-13-pro',
    category: 'Smartphones',
    price: 1299.99,
    stock: 12,
    sold: 45,
    isFeatured: true,
    isActive: true,
    image: '/products/iphone.jpg'
  },
  {
    id: 2,
    name: 'MacBook Air M2',
    slug: 'macbook-air-m2',
    category: 'Laptops',
    price: 1799.99,
    stock: 8,
    sold: 32,
    isFeatured: true,
    isActive: true,
    image: '/products/macbook.jpg'
  },
  {
    id: 3,
    name: 'AirPods Pro',
    slug: 'airpods-pro',
    category: 'Audio',
    price: 249.99,
    stock: 25,
    sold: 78,
    isFeatured: false,
    isActive: true,
    image: '/products/airpods.jpg'
  },
  {
    id: 4,
    name: 'iPad Pro 12.9"',
    slug: 'ipad-pro-129',
    category: 'Tablets',
    price: 1099.99,
    stock: 15,
    sold: 28,
    isFeatured: false,
    isActive: true,
    image: '/products/ipad.jpg'
  },
  {
    id: 5,
    name: 'Apple Watch Series 8',
    slug: 'apple-watch-series-8',
    category: 'Wearables',
    price: 549.99,
    stock: 3,
    sold: 38,
    isFeatured: false,
    isActive: true,
    image: '/products/watch.jpg'
  },
  {
    id: 6,
    name: 'HomePod mini',
    slug: 'homepod-mini',
    category: 'Audio',
    price: 99.99,
    stock: 2,
    sold: 15,
    isFeatured: false,
    isActive: false,
    image: '/products/homepod.jpg'
  }
]

export default function AdminProductsPage() {
  const router = useRouter()
  const { user, isAuthenticated, isAdmin } = useAuth()
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [stockFilter, setStockFilter] = useState<string>('all')

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
    let filtered = products

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtrar por categoría
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter)
    }

    // Filtrar por stock
    if (stockFilter === 'low') {
      filtered = filtered.filter(product => product.stock < 10)
    } else if (stockFilter === 'out') {
      filtered = filtered.filter(product => product.stock === 0)
    }

    setFilteredProducts(filtered)
  }, [searchQuery, categoryFilter, stockFilter, products])

  if (!isAuthenticated || !user || !isAdmin) {
    return null
  }

  const categories = Array.from(new Set(products.map(p => p.category)))

  const stats = {
    total: products.length,
    active: products.filter(p => p.isActive).length,
    lowStock: products.filter(p => p.stock < 10).length,
    outOfStock: products.filter(p => p.stock === 0).length
  }

  const toggleProductStatus = (productId: number) => {
    setProducts(products.map(product =>
      product.id === productId ? { ...product, isActive: !product.isActive } : product
    ))
  }

  return (
    <div className="max-w-7xl px-4 py-8 mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Gestión de Productos</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Administra el inventario de la tienda
            </p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Producto
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 mb-6 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Productos</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Activos</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Stock Bajo</p>
                <p className="text-2xl font-bold text-orange-600">{stats.lowStock}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Agotados</p>
                <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
              </div>
              <Package className="w-8 h-8 text-red-500" />
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
                placeholder="Buscar productos por nombre o categoría..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-[180px]">
                  <Package className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="low">Stock Bajo (&lt;10)</SelectItem>
                  <SelectItem value="out">Agotados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </div>
                <div className="flex gap-1">
                  {product.isFeatured && (
                    <Badge variant="secondary" className="text-xs">
                      Destacado
                    </Badge>
                  )}
                  <Badge variant={product.isActive ? 'default' : 'outline'} className="text-xs">
                    {product.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="pt-4 space-y-4">
              {/* Price and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Precio</p>
                  <p className="text-xl font-bold">{formatPrice(product.price)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Stock</p>
                  <div className="flex items-center gap-2">
                    <p className={`text-xl font-bold ${
                      product.stock === 0 ? 'text-red-600' :
                      product.stock < 10 ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {product.stock}
                    </p>
                    {product.stock < 10 && product.stock > 0 && (
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Vendidos</span>
                  <span className="font-semibold">{product.sold} unidades</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Ingresos</span>
                  <span className="font-semibold">{formatPrice(product.sold * product.price)}</span>
                </div>
              </div>

              {/* Stock Progress */}
              <div>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Disponibilidad</span>
                  <span className="font-medium">
                    {Math.round((product.stock / (product.stock + product.sold)) * 100)}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-700">
                  <div
                    className={`h-full transition-all ${
                      product.stock === 0 ? 'bg-red-500' :
                      product.stock < 10 ? 'bg-orange-500' :
                      'bg-green-500'
                    }`}
                    style={{ width: `${Math.round((product.stock / (product.stock + product.sold)) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant={product.isActive ? 'destructive' : 'default'}
                  size="sm"
                  onClick={() => toggleProductStatus(product.id)}
                >
                  {product.isActive ? (
                    <Trash2 className="w-4 h-4" />
                  ) : (
                    <Package className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="mb-2 text-xl font-semibold">No se encontraron productos</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Intenta ajustar los filtros de búsqueda
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

'use client';
import { useGetCategoryProduct } from "@/api/getCategoryProduct";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ResponseType } from "@/types/response";
import { useParams} from "next/navigation";
import FiltersControlsCategory from "./components/filters-controls-category";
import SearchBar from "./components/search-bar";
import SortOptions from "./components/sort-options";
import SkeletonSchema from "@/components/skeletonSchema";
import ProductCard from "./components/product-card";
import { ProductType } from "@/types/product";
import { useState, useMemo } from "react";

export default function Page() {
  const params = useParams()
  const {categorySlug} = params
  const {result, loading}: ResponseType = useGetCategoryProduct(categorySlug || '')

  // Filter states
  const [filterOrigin, setFilterOrigin] = useState('')
  const [filterPrice, setFilterPrice] = useState('')
  const [filterStock, setFilterStock] = useState('')
  const [filterBrand, setFilterBrand] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('default')

  // Clear all filters function
  const handleClearFilters = () => {
    setFilterOrigin('')
    setFilterPrice('')
    setFilterStock('')
    setFilterBrand('')
    setSearchQuery('')
    setSortBy('default')
  }

  // Apply all filters and search
  const filteredAndSortedProducts = useMemo(() => {
    if (!result || result.length === 0) return [];

    let filtered = [...result];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product: ProductType) =>
        product.attributes.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.attributes.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Origin filter
    if (filterOrigin) {
      filtered = filtered.filter((product: ProductType) =>
        product.attributes.origin === filterOrigin
      );
    }

    // Price filter
    if (filterPrice) {
      const [min, max] = filterPrice.split('-');
      filtered = filtered.filter((product: ProductType) => {
        const price = product.attributes.price;
        if (max === 'max') {
          return price >= parseInt(min);
        }
        return price >= parseInt(min) && price <= parseInt(max);
      });
    }

    // Stock filter
    if (filterStock) {
      filtered = filtered.filter((product: ProductType) => {
        const stock = product.attributes.stock;
        switch (filterStock) {
          case 'in-stock':
            return stock > 0;
          case 'low-stock':
            return stock > 0 && stock < 10;
          case 'out-of-stock':
            return stock === 0;
          default:
            return true;
        }
      });
    }

    // Brand filter
    if (filterBrand) {
      filtered = filtered.filter((product: ProductType) =>
        product.attributes.taste === filterBrand
      );
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.attributes.price - b.attributes.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.attributes.price - a.attributes.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.attributes.productName.localeCompare(b.attributes.productName));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.attributes.productName.localeCompare(a.attributes.productName));
        break;
      case 'stock-desc':
        filtered.sort((a, b) => b.attributes.stock - a.attributes.stock);
        break;
      default:
        break;
    }

    return filtered;
  }, [result, filterOrigin, filterPrice, filterStock, filterBrand, searchQuery, sortBy]);

  // Count active filters
  const activeFiltersCount = [filterOrigin, filterPrice, filterStock, filterBrand, searchQuery].filter(Boolean).length;

  return (
    <div className="max-w-7xl py-4 mx-auto px-4 sm:py-16 sm:px-6 lg:px-8">
      {/* Header */}
      {!loading && result && result.length > 0 && result[0]?.attributes?.category?.data?.attributes?.categoryName && (
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {result[0].attributes.category.data.attributes.categoryName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {result.length} producto{result.length !== 1 ? 's' : ''} disponible{result.length !== 1 ? 's' : ''}
          </p>
        </div>
      )}

      <Separator className="mb-6" />

      {/* Search and Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
        <div className="sm:w-auto">
          <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      {/* Active Filters Badge */}
      {activeFiltersCount > 0 && (
        <div className="mb-4">
          <Badge variant="secondary" className="text-sm">
            {activeFiltersCount} filtro{activeFiltersCount !== 1 ? 's' : ''} activo{activeFiltersCount !== 1 ? 's' : ''}
          </Badge>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <FiltersControlsCategory
          setFilterOrigin={setFilterOrigin}
          setFilterPrice={setFilterPrice}
          setFilterStock={setFilterStock}
          setFilterBrand={setFilterBrand}
          products={result}
          onClearFilters={handleClearFilters}
        />

        {/* Products Grid */}
        <div className="flex-1">
          {loading && (
            <SkeletonSchema grid={3}/>
          )}

          {!loading && filteredAndSortedProducts.length > 0 ? (
            <>
              <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Mostrando {filteredAndSortedProducts.length} de {result?.length || 0} productos
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
                {filteredAndSortedProducts.map((product: ProductType)=> (
                  <ProductCard key={product.id} product={product}/>
                ))}
              </div>
            </>
          ) : !loading ? (
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <p className="text-2xl font-semibold mb-2">No se encontraron productos</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Intenta ajustar los filtros o la búsqueda
                </p>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleClearFilters}
                    className="text-rose-600 hover:text-rose-700 font-medium"
                  >
                    Limpiar todos los filtros
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

import { Button } from '@/components/ui/button'
import { FilterX } from 'lucide-react'
import FilterOrigin from './filter-origin'
import FilterPrice from './filter-price'
import FilterStock from './filter-stock'
import FilterBrand from './filter-brand'
import { ProductType } from '@/types/product'

type FiltersControlsCategoryProps = {
  setFilterOrigin: (origin: string) => void
  setFilterPrice: (range: string) => void
  setFilterStock: (status: string) => void
  setFilterBrand: (brand: string) => void
  products: ProductType[] | null
  onClearFilters: () => void
}

const FiltersControlsCategory = (props: FiltersControlsCategoryProps) => {
  const { setFilterOrigin, setFilterPrice, setFilterStock, setFilterBrand, products, onClearFilters } = props

  return (
    <div className='sm:w-[320px] sm:mt-5'>
      <div className='sticky top-24 bg-white dark:bg-gray-950 border rounded-lg shadow-sm p-6'>
        <div className='flex items-center justify-between mb-5'>
          <h3 className='text-lg font-bold'>Filtros</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className='text-xs hover:text-rose-600'
          >
            <FilterX className='w-4 h-4 mr-1' />
            Limpiar
          </Button>
        </div>

        <div className='space-y-1'>
          <FilterPrice setFilterPrice={setFilterPrice} products={products} />
          <FilterStock setFilterStock={setFilterStock} products={products} />
          <FilterOrigin setFilterOrigin={setFilterOrigin} products={products} />
          <FilterBrand setFilterBrand={setFilterBrand} products={products} />
        </div>
      </div>
    </div>
  )
}

export default FiltersControlsCategory
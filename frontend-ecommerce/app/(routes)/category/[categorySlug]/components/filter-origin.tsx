import { useMemo } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/types/product";
import { MapPin } from "lucide-react";


type FilterOriginProps = {
  setFilterOrigin: (origin: string) => void
  products: ProductType[] | null
}

const FilterOrigin = (props: FilterOriginProps) => {
    const {setFilterOrigin, products} = props

    // Extract unique origins from products with count - memoized for performance
    const originOptions = useMemo(() => {
      if (!products) return [];

      const uniqueOrigins = Array.from(new Set(products.map(p => p.attributes.origin).filter(Boolean)));

      const originsWithCount = uniqueOrigins.map(origin => ({
        value: origin,
        label: origin,
        count: products.filter(p => p.attributes.origin === origin).length
      }));

      return [
        { label: "Todos", value: "", count: products.length },
        ...originsWithCount.sort((a, b) => b.count - a.count)
      ];
    }, [products])

  return (
    <div className="my-5 border-b pb-5">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-rose-600" />
          <p className="font-bold">Origen</p>
        </div>

        {originOptions.length <= 1 ? (
            <p className="text-sm text-gray-500">No hay orígenes disponibles</p>
        ) : (
          <RadioGroup onValueChange={(value)=> setFilterOrigin(value)} defaultValue="">
              {originOptions.map((option)=>(
                  <div key={option.value} className="flex items-center justify-between space-x-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 px-2 rounded-md transition-colors">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`origin-${option.value}`} />
                        <Label htmlFor={`origin-${option.value}`} className="cursor-pointer capitalize">
                          {option.label}
                        </Label>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {option.count}
                      </Badge>
                  </div>
              ))}
          </RadioGroup>
        )}
    </div>
  )
}

export default FilterOrigin
import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/types/product";
import { Tag } from "lucide-react";

type FilterBrandProps = {
  setFilterBrand: (brand: string) => void;
  products: ProductType[] | null;
};

const FilterBrand = ({ setFilterBrand, products }: FilterBrandProps) => {
  const brandOptions = useMemo(() => {
    if (!products) return [];

    // Extract unique brands (currently using taste field)
    const uniqueBrands = Array.from(
      new Set(products.map((p) => p.attributes.taste).filter(Boolean))
    );

    // Count products for each brand
    const brandsWithCount = uniqueBrands.map((brand) => ({
      value: brand,
      label: brand,
      count: products.filter((p) => p.attributes.taste === brand).length,
    }));

    // Add "All" option
    return [
      { label: "Todas", value: "", count: products.length },
      ...brandsWithCount.sort((a, b) => b.count - a.count), // Sort by count descending
    ];
  }, [products]);

  return (
    <div className="my-5 border-b pb-5">
      <div className="flex items-center gap-2 mb-3">
        <Tag className="w-4 h-4 text-rose-600" />
        <p className="font-bold">Marca</p>
      </div>

      {brandOptions.length <= 1 ? (
        <p className="text-sm text-gray-500">No hay marcas disponibles</p>
      ) : (
        <RadioGroup onValueChange={setFilterBrand} defaultValue="">
          {brandOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-center justify-between space-x-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 px-2 rounded-md transition-colors"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`brand-${option.value}`} />
                <Label htmlFor={`brand-${option.value}`} className="cursor-pointer capitalize">
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
  );
};

export default FilterBrand;

import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/types/product";
import { DollarSign } from "lucide-react";

type FilterPriceProps = {
  setFilterPrice: (range: string) => void;
  products: ProductType[] | null;
};

const FilterPrice = ({ setFilterPrice, products }: FilterPriceProps) => {
  const priceRanges = useMemo(() => {
    if (!products || products.length === 0) return [];

    const prices = products
      .map(p => p.attributes.price)
      .filter(price => price !== null && price !== undefined);

    if (prices.length === 0) return [];

    const maxPrice = Math.max(...prices);
    const step = Math.ceil(maxPrice / 4);

    const ranges = [
      { label: "Todos", value: "", min: 0, max: Infinity },
      { label: `$0 - $${step}`, value: `0-${step}`, min: 0, max: step },
      { label: `$${step + 1} - $${step * 2}`, value: `${step + 1}-${step * 2}`, min: step + 1, max: step * 2 },
      { label: `$${step * 2 + 1} - $${step * 3}`, value: `${step * 2 + 1}-${step * 3}`, min: step * 2 + 1, max: step * 3 },
      { label: `$${step * 3 + 1}+`, value: `${step * 3 + 1}-max`, min: step * 3 + 1, max: Infinity },
    ];

    // Count products in each range
    return ranges.map(range => ({
      ...range,
      count: products.filter(p => {
        const price = p.attributes.price;
        return price >= range.min && price <= range.max;
      }).length
    }));
  }, [products]);

  return (
    <div className="my-5 border-b pb-5">
      <div className="flex items-center gap-2 mb-3">
        <DollarSign className="w-4 h-4 text-rose-600" />
        <p className="font-bold">Rango de Precio</p>
      </div>

      {priceRanges.length === 0 ? (
        <p className="text-sm text-gray-500">No hay precios disponibles</p>
      ) : (
        <RadioGroup onValueChange={setFilterPrice} defaultValue="">
          {priceRanges.map((range) => (
            <div key={range.value} className="flex items-center justify-between space-x-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 px-2 rounded-md transition-colors">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={range.value} id={`price-${range.value}`} />
                <Label htmlFor={`price-${range.value}`} className="cursor-pointer">
                  {range.label}
                </Label>
              </div>
              <Badge variant="secondary" className="text-xs">
                {range.count}
              </Badge>
            </div>
          ))}
        </RadioGroup>
      )}
    </div>
  );
};

export default FilterPrice;

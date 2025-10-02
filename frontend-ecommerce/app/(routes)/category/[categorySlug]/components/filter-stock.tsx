import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/types/product";
import { Package } from "lucide-react";

type FilterStockProps = {
  setFilterStock: (status: string) => void;
  products: ProductType[] | null;
};

const FilterStock = ({ setFilterStock, products }: FilterStockProps) => {
  const stockOptions = useMemo(() => {
    if (!products) return [];

    const allCount = products.length;
    const inStockCount = products.filter(p => p.attributes.stock > 0).length;
    const outOfStockCount = products.filter(p => p.attributes.stock === 0).length;
    const lowStockCount = products.filter(p => p.attributes.stock > 0 && p.attributes.stock < 10).length;

    return [
      { label: "Todos", value: "", count: allCount },
      { label: "En Stock", value: "in-stock", count: inStockCount },
      { label: "Stock Bajo (<10)", value: "low-stock", count: lowStockCount },
      { label: "Agotado", value: "out-of-stock", count: outOfStockCount },
    ];
  }, [products]);

  return (
    <div className="my-5 border-b pb-5">
      <div className="flex items-center gap-2 mb-3">
        <Package className="w-4 h-4 text-rose-600" />
        <p className="font-bold">Disponibilidad</p>
      </div>

      <RadioGroup onValueChange={setFilterStock} defaultValue="">
        {stockOptions.map((option) => (
          <div
            key={option.value}
            className="flex items-center justify-between space-x-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 px-2 rounded-md transition-colors"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`stock-${option.value}`} />
              <Label htmlFor={`stock-${option.value}`} className="cursor-pointer">
                {option.label}
              </Label>
            </div>
            <Badge
              variant={option.value === "out-of-stock" ? "destructive" : option.value === "low-stock" ? "outline" : "secondary"}
              className="text-xs"
            >
              {option.count}
            </Badge>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterStock;

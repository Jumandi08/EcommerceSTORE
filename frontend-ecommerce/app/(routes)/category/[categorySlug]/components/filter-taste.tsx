import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ProductType } from "@/types/product";
import { Sparkles } from "lucide-react";

type FilterTasteProps = {
  setFilterTaste: (taste: string) => void;
  products: ProductType[] | null;
};

const FilterTaste = ({ setFilterTaste, products }: FilterTasteProps) => {
  const tasteOptions = useMemo(() => {
    if (!products) return [];

    // Extract unique tastes
    const uniqueTastes = Array.from(
      new Set(products.map((p) => p.attributes.taste).filter(Boolean))
    );

    // Count products for each taste
    const tastesWithCount = uniqueTastes.map((taste) => ({
      value: taste,
      label: taste,
      count: products.filter((p) => p.attributes.taste === taste).length,
    }));

    // Add "All" option
    return [
      { label: "Todos", value: "", count: products.length },
      ...tastesWithCount.sort((a, b) => b.count - a.count), // Sort by count descending
    ];
  }, [products]);

  return (
    <div className="my-5 border-b pb-5">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-rose-600" />
        <p className="font-bold">Tipo / Sabor</p>
      </div>

      {tasteOptions.length <= 1 ? (
        <p className="text-sm text-gray-500">No hay tipos disponibles</p>
      ) : (
        <RadioGroup onValueChange={setFilterTaste} defaultValue="">
          {tasteOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-center justify-between space-x-2 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 px-2 rounded-md transition-colors"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`taste-${option.value}`} />
                <Label htmlFor={`taste-${option.value}`} className="cursor-pointer capitalize">
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

export default FilterTaste;

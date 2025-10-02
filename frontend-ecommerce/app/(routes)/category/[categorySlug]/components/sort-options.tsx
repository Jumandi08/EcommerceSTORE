import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOptionsProps = {
  sortBy: string;
  setSortBy: (sort: string) => void;
};

const SortOptions = ({ sortBy, setSortBy }: SortOptionsProps) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <ArrowUpDown className="w-4 h-4 text-gray-500" />
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[200px] border-2">
          <SelectValue placeholder="Ordenar por..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Predeterminado</SelectItem>
          <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
          <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
          <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
          <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
          <SelectItem value="stock-desc">Stock: Mayor a Menor</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SortOptions;

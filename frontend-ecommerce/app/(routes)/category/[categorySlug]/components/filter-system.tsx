import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type FilterSystemProps = {
  setFilterSystem: (system: string) => void
}

const FilterSystem = (props: FilterSystemProps) => {
  const { setFilterSystem } = props;
  const systems = ["Iphone", "Android"];

  return (
    <div className="my-5">
      <p className="mb-3 font-bold">Sistema</p>
      <RadioGroup onValueChange={(value) => setFilterSystem(value)}>
        {systems.map((system: string) => (
          <div key={system} className="flex items-center space-x-2">
            <RadioGroupItem value={system} id={system} />
            <Label htmlFor={system}>{system}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterSystem; 
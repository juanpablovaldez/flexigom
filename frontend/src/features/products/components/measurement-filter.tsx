import { ChevronDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MEASUREMENTS } from "../constants/products-constants";

interface MeasurementFilterProps {
  selectedMeasurements: string[];
  onMeasurementChange: (measurement: string, checked: boolean) => void;
}

export function MeasurementFilter({
  selectedMeasurements,
  onMeasurementChange,
}: MeasurementFilterProps) {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex justify-between items-center pb-3 w-full cursor-pointer">
        <h3 className="font-medium">Tamaño</h3>
        <ChevronDown className="size-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3">
        {MEASUREMENTS.map((measurement) => (
          <div key={measurement.value} className="flex items-center space-x-2">
            <Checkbox
              id={measurement.value}
              checked={selectedMeasurements.includes(measurement.value)}
              onCheckedChange={(checked) =>
                onMeasurementChange(measurement.value, checked as boolean)
              }
            />
            <Label
              htmlFor={measurement.value}
              className="font-normal text-sm capitalize cursor-pointer"
            >
              {measurement.label}
            </Label>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

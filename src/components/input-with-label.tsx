import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FunctionComponent } from "react";

type InputWithLabelProps = {
    label: string;
    placeholder: string;
    type: string;
    id: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const InputWithLabel: FunctionComponent<InputWithLabelProps> = ({
  label, placeholder, type, id, value,
  onChange
}) => {
  return (
    <div className="grid w-full items-center gap-3">
      <Label htmlFor={id} className="text-foreground">{label}</Label>
      <Input 
        type={type} 
        id={id} 
        placeholder={placeholder} 
        value={value} 
        className="bg-background" 
        onChange={onChange}
      />
    </div>
  )
}


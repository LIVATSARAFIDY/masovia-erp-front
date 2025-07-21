import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { FunctionComponent } from "react"

type TextareaWithLabelProps = {  
    label: string
    placeholder: string
    id: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export const TextareaWithLabel: FunctionComponent<TextareaWithLabelProps> = ({
    label, placeholder, id, value, onChange
}) => {
  return (
    <div className="grid w-full gap-3">
      <Label htmlFor={id}>{label}</Label>
      <Textarea placeholder={placeholder} id={id} value={value} onChange={onChange} />
    </div>
  )
}
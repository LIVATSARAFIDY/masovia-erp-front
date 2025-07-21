import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }

  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function formatAmountWithDecimal(amount: string) {
  const  [integerPart, decimalPart] = amount.split(".")
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  const result = `${formattedInteger}.${decimalPart}`
  return result
}
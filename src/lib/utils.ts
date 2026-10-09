import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCategoryUrl(categorySlug: string) {
  return `/san-pham/${categorySlug}`;
}

export function getProductUrl(productSlug: string, categorySlug: string) {
  return `/san-pham/${categorySlug}/${productSlug}`;
}

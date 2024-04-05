import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function enumToSelectFieldItems(enumObject: any) {
  return Object.keys(enumObject).map((key) => ({
    value: key,
    description: enumObject[key],
  }));
}

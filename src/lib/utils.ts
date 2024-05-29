import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (value: string) => {
  if (!value) return ""; // Handle null or undefined values
  return format(new Date(value), "MMMM d, yyyy");
};

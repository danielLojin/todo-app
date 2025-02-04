import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// custom Error handling for Zod validation
export class CustomZodError extends Error {
  zodParsingError: string;
  constructor(message: string, zodParsingError: string) {
    super(message);
    this.name = "ZodParsingError";
    this.zodParsingError = zodParsingError;
  }
}

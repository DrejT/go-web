import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const API_URL = "https://start-server.vercel.app/api/v1/";
export const API_URL = "http://localhost:8080/api/v1/";

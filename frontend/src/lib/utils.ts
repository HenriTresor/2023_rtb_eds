import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export const generateHeaders = (token: string) => {

    return {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${token}`
    }
}
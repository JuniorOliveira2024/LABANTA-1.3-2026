import { format } from "date-fns"

export function formatDate(date: Date): string {
    return format(date, "dd/MM/yyyy")
}

/**
 * Converte "dd-MM-yyyy" → "yyyy-MM-dd" para inserção no MySQL
 */
export function formatDateDDMMYYYY(date: string): string {
    const [day, month, year] = date.split("-")
    return `${year}-${month}-${day}`
}

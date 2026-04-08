import { hash, compare } from "bcrypt"

const SALT_ROUNDS = 12

export async function hashPassword(passwordEmTexto: string): Promise<string> {
    return await hash(passwordEmTexto, SALT_ROUNDS)
}

export async function comparePassword(passwordEmTexto: string, passwordHash: string): Promise<boolean> {
    return await compare(passwordEmTexto, passwordHash)
}

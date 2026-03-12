import db from "./lib/db.js"

export async function getUsers() {
const [rows] = await db.execute("SELECT * FROM tabela_utilizadores")

return rows
}

export async function getUsersById(id: string) {
    const [rows] = await db.execute(
        `SELECT * FROM tbl_utilizadores
        WHERE tbl_utilizadores.id =?`,

        [id]
    )
    
    if(Array.isArray(rows) && rows.length === 0) return null
    return Array.isArray(rows) ? rows[0] : null

}
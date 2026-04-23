import db from "../lib/db.js";
import type { CategoriaDBType } from "../utils/types.js";

export const CategoriaModel = {
    async create(newCategoria: CategoriaDBType) {
        try {
            const query = 'INSERT INTO tbl_categorias (id, nome, descricao, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)'

            const values = [
                newCategoria.id,
                newCategoria.nome,
                newCategoria.descricao,
                newCategoria.enabled,
                new Date(),
                new Date()
            ]

            const rows: any = await db.execute(query, values)

            return rows[0].affectedRows === 1

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async getAll() {
        try {
            const query = 'SELECT * FROM tbl_categorias'

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async get(id: string) {
        try {
            const query = 'SELECT * FROM tbl_categorias WHERE id = ?'

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, categoriaAtualizada: CategoriaDBType) {
        try {
            const query = `UPDATE tbl_categorias
                        SET
                            nome=?,
                            descricao=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?;`

            const values = [
                categoriaAtualizada.nome,
                categoriaAtualizada.descricao,
                categoriaAtualizada.enabled,
                new Date(),
                id
            ]

            const rows: any = await db.execute(query, values)

            return rows[0].affectedRows === 1

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async delete(id: string) {
        try {
            const query = 'DELETE FROM tbl_categorias WHERE id = ?'

            const value = [id]

            const rows: any = await db.execute(query, value)

            return rows[0].affectedRows === 1

        } catch (error) {
            console.log(error)
            return null
        }
    }
}

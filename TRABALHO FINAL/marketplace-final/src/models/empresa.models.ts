import db from "../lib/db.js";
import type { EmpresaDBType } from "../utils/types.js";

export const EmpresaModel = {
    async create(newEmpresa: EmpresaDBType) {
        try {
            const query = 'INSERT INTO tbl_empresas (nome, descricao, email, telefone, endereco, cidade, estado, cep, cnpj, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

            const values = [
                newEmpresa.nome,
                newEmpresa.descricao,
                newEmpresa.email,
                newEmpresa.telefone,
                newEmpresa.endereco,
                newEmpresa.cidade,
                newEmpresa.estado,
                newEmpresa.cep,
                newEmpresa.cnpj,
                newEmpresa.enabled,
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
            const query = 'SELECT * FROM tbl_empresas'

            const rows = await db.execute(query)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : []

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async get(id: string) {
        try {
            const query = 'SELECT * FROM tbl_empresas WHERE id = ?'

            const value = [id]

            const rows = await db.execute(query, value)

            return Array.isArray(rows) && rows.length > 0 ? rows[0] : null

        } catch (error) {
            console.log(error)
            return null
        }
    },

    async update(id: string, empresaAtualizada: EmpresaDBType) {
        try {
            const query = `UPDATE tbl_empresas
                        SET
                            nome=?,
                            descricao=?,
                            email=?,
                            telefone=?,
                            endereco=?,
                            cidade=?,
                            estado=?,
                            cep=?,
                            cnpj=?,
                            enabled=?,
                            updated_at=?
                        WHERE
                            id=?;`

            const values = [
                empresaAtualizada.nome,
                empresaAtualizada.descricao,
                empresaAtualizada.email,
                empresaAtualizada.telefone,
                empresaAtualizada.endereco,
                empresaAtualizada.cidade,
                empresaAtualizada.estado,
                empresaAtualizada.cep,
                empresaAtualizada.cnpj,
                empresaAtualizada.enabled,
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
            const query = `DELETE FROM tbl_empresas WHERE id =?`

            const value = [id]

            const rows: any = await db.execute(query, value)

            return rows[0].affectedRows === 1
        } catch (error) {
            console.log(error)
            return null
        }
    }
}

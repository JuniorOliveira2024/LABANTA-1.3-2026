import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { NovoOrcamentoType } from "../util/types.js";
import { generateUUID } from "../util/uuid.js";


//funcao para atualizar orcamento
export const orcamentoModel = {
    async updateOrcamento(id: string, updatedOrcamento: NovoOrcamentoType): Promise<NovoOrcamentoType | null> {
        try {
            const query = "UPDATE tabela_orcamento SET total=?, id_utilizador=?, enabled=?, created_at=?, updated_at=? WHERE id=?"
            const values = [
                updatedOrcamento.total,
                updatedOrcamento.id_utilizador,
                updatedOrcamento.enabled,
                new Date(),
                new Date(),
                id
            ]
            const [rows] = await db.execute<NovoOrcamentoType & RowDataPacket[]>(query, values)
            return rows as NovoOrcamentoType
        } catch (error) {
            console.log(error)
            return null
        }
    },

    //funcao para criar orcamento
    async createOrcamento(orcamento: NovoOrcamentoType): Promise<NovoOrcamentoType | null> {
        try {
            const [rows] = await db.execute<NovoOrcamentoType & RowDataPacket[]>(
                `INSERT INTO tabela_orcamento
                VALUES(?,?,?,?,?,?)`,
                [
                    generateUUID(),
                    orcamento.total,
                    orcamento.id_utilizador,
                    orcamento.enabled,
                    new Date(),
                    new Date()
                ]
            )
<<<<<<< HEAD
            return rows as NovoOrcamentoType
        } catch (error) {
            console.log(error)
=======

            return rows as OrcamentoDBType
        } catch (err) {
            console.log(err)
>>>>>>> refs/remotes/origin/dev
            return null
        }
    },

<<<<<<< HEAD
    // funcao para apagar orcamento
    async deleteOrcamento(id: string): Promise<NovoOrcamentoType | null> {
        try {
            const query = "DELETE FROM tabela_orcamento WHERE id=?"
            const values = [id]
            const [rows] = await db.execute<NovoOrcamentoType & RowDataPacket[]>(query, values)
            return rows as NovoOrcamentoType
        } catch (error) {
            console.log(error)
=======
    async getAll(): Promise<OrcamentoDBType[] | null> {
        const [rows] = await db.execute<OrcamentoDBType[] & RowDataPacket[]>("SELECT * FROM table_orcamentos")

        return rows as OrcamentoDBType[]
    },

    async get(id: string): Promise<OrcamentoDBType | null> {
        try {
            const [rows] = await db.execute<OrcamentoDBType & RowDataPacket[]>(
                `SELECT * FROM table_orcamentos 
                WHERE table_orcamentos.id = ?`,
                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] as OrcamentoDBType : null
        } catch (err) {
            console.log(err)
>>>>>>> refs/remotes/origin/dev
            return null
        }
    },

<<<<<<< HEAD
    // funcao para obter orcamento por id
    async getOrcamento(id: string): Promise<NovoOrcamentoType | null> {
        try {
            const query = "SELECT * FROM tabela_orcamento WHERE id=?"
            const values = [id]
            const [rows] = await db.execute<NovoOrcamentoType & RowDataPacket[]>(query, values)
            return rows as NovoOrcamentoType

        } catch (error) {
            console.log(error)
=======
    async update(id: string, orcamento: Partial<OrcamentoDBType>) {
        try {
            const query = `UPDATE table_orcamentos SET total = ?, id_utilizadores = ?, enabled = ?, updated_at = ? WHERE id = ?`

            const queryValues: (number | string | boolean | Date)[] = [
                orcamento.total!,
                orcamento.id_utilizadores!,
                orcamento.enabled!,
                new Date(),
                id
            ];
            const [rows] = await db.execute(
                query,
                queryValues
            )
            console.log({ rows })
            return rows
        } catch (err) {
            console.log(err)
>>>>>>> refs/remotes/origin/dev
            return null
        }
    },

<<<<<<< HEAD
    // funcao para obter todos os orcamentos
    async getAllOrcamentos(): Promise<NovoOrcamentoType | null> {
        try {
            const query = "SELECT * FROM tabela_orcamento"
            const [rows] = await db.execute<NovoOrcamentoType & RowDataPacket[]>(query)
            return rows as NovoOrcamentoType
        } catch (error) {
            console.log(error)
=======
    async delete(id: string) {
        try {
            const rows: any = await db.execute(
                `DELETE FROM table_orcamentos 
                WHERE id = ?`,

                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
>>>>>>> refs/remotes/origin/dev
            return null
        }
    },

<<<<<<< HEAD







=======
    async updateBudget(id: string, total: number) {
        try {
            const rows: any = await db.execute(
                `UPDATE table_orcamentos SET total = ?, updated_at = ? WHERE id = ?`,
                [total, new Date(), id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    }
>>>>>>> refs/remotes/origin/dev
}
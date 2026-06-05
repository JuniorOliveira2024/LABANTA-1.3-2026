import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { OrcamentoDBType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const OrcamentoModel = {
    async create(orcamento: OrcamentoDBType): Promise<OrcamentoDBType | null> {
        try {
            const query = `INSERT INTO tbl_orcamento (id, total, id_utilizadores, enabled, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`;
            const values = [
                generateUUID(),
                orcamento.total,
                orcamento.id_utilizadores,
                orcamento.enabled ?? true,
                new Date(),
                new Date()
            ];
            
            await db.execute<OrcamentoDBType & RowDataPacket[]>(query, values);
            
            const [newOrcamento] = await db.execute<OrcamentoDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_orcamento ORDER BY id DESC LIMIT 1`,
            );

            return Array.isArray(newOrcamento) && newOrcamento.length > 0 ? newOrcamento[0] as OrcamentoDBType : null;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async getAll(): Promise<OrcamentoDBType[] | null> {
        try {
            const [rows] = await db.execute<OrcamentoDBType[] & RowDataPacket[]>("SELECT * FROM tbl_orcamento");
            return rows as OrcamentoDBType[];
        } catch (error) {
            console.log(error);
            return null;
        }
    },

    async get(id: string): Promise<OrcamentoDBType | null> {
        try {
            const [rows] = await db.execute<OrcamentoDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_orcamento WHERE id = ?`,
                [id]
            );

            if (Array.isArray(rows) && rows.length === 0) return null;
            return Array.isArray(rows) ? rows[0] as OrcamentoDBType : null;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async update(id: string, orcamento: Partial<OrcamentoDBType>): Promise<OrcamentoDBType | null> {
        try {
            const query = `UPDATE tbl_orcamento SET total = ?, id_utilizadores = ?, enabled = ?, updated_at = ? WHERE id = ?`;
            const queryValues = [
                orcamento.total ?? 0,
                orcamento.id_utilizadores ?? "",
                orcamento.enabled ?? true,
                new Date(),
                id
            ];
                
            const [rows] = await db.execute<OrcamentoDBType & RowDataPacket[]>(query, queryValues);
            return rows as OrcamentoDBType;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async delete(id: string): Promise<OrcamentoDBType | null> {
        try {
            const rows: any = await db.execute(`DELETE FROM tbl_orcamento WHERE id = ?`, [id]);
            return rows[0]?.affectedRows === 0 ? null : rows[0] as OrcamentoDBType;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async updateBudget(id: string, total: number): Promise<OrcamentoDBType | null> {
        try {
            const rows: any = await db.execute(
                `UPDATE tbl_orcamento SET total = ?, updated_at = ? WHERE id = ?`,
                [total, new Date(), id]
            );
            return rows[0]?.affectedRows === 0 ? null : rows[0] as OrcamentoDBType;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
};

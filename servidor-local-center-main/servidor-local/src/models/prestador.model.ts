import type { RowDataPacket } from "mysql2";
import db from "../lib/db.js";
import type { PrestadorDBType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const PrestadorModel = {
    async create(prestador: PrestadorDBType): Promise<PrestadorDBType | null> {
        try {
            const query = `INSERT INTO tbl_prestadores 
            (id, taxa_urgencia, percentagem_desconto, minimo_desconto, nif, profissao, enable, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const values = [
                generateUUID(),
                prestador.taxa_urgencia,
                prestador.percentagem_desconto,
                prestador.minimo_desconto,
                prestador.nif,
                prestador.profissao,
                prestador.enable ?? true,
                new Date(),
                new Date()
            ];

            const [rows] = await db.execute<PrestadorDBType & RowDataPacket[]>(query, values);
            return rows as PrestadorDBType;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async getAll(): Promise<PrestadorDBType[] | null> {
        try {
            const [rows] = await db.execute<PrestadorDBType[] & RowDataPacket[]>("SELECT * FROM tbl_prestadores");
            return rows as PrestadorDBType[];
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async get(id: string): Promise<PrestadorDBType | null> {
        try {
            const [rows] = await db.execute<PrestadorDBType[] & RowDataPacket[]>(
                `SELECT * FROM tbl_prestadores WHERE id = ?`, [id]
            );

            if (Array.isArray(rows) && rows.length === 0) return null;
            return Array.isArray(rows) ? rows[0] as PrestadorDBType : null;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async update(id: string, prestador: PrestadorDBType): Promise<PrestadorDBType | null> {
        try {
            const query = `UPDATE tbl_prestadores 
                SET taxa_urgencia = ?, 
                percentagem_desconto = ?, 
                minimo_desconto = ?, 
                nif = ?, 
                profissao = ?, 
                enable = ?, 
                updated_at = ?
                WHERE id = ?`;
            const values = [
                prestador.taxa_urgencia,
                prestador.percentagem_desconto,
                prestador.minimo_desconto,
                prestador.nif,
                prestador.profissao,
                prestador.enable,
                new Date(),
                id
            ];

            const [rows] = await db.execute<PrestadorDBType & RowDataPacket[]>(query, values);
            return rows as PrestadorDBType;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async delete(id: string): Promise<PrestadorDBType | null> {
        try {
            const rows: any = await db.execute(`DELETE FROM tbl_prestadores WHERE id = ?`, [id]);
            return rows[0]?.affectedRows === 0 ? null : rows[0] as PrestadorDBType;
        } catch (err) {
            console.log(err);
            return null;
        }
    },

    async getPrecoHora(id: string): Promise<any | null> {
        try {
            const query = `SELECT
                                p.percentagem_desconto,
                                p.taxa_urgencia,
                                pr.preco_hora
                            FROM tbl_prestadores p
                            INNER JOIN tbl_proposta pr ON p.id = pr.id_prestador
                            WHERE p.id_utilizador = ?`;
            const value = [id];
            const [rows] = await db.execute<any[] & RowDataPacket[]>(query, value);
            if (Array.isArray(rows) && rows.length === 0) return null;
            return Array.isArray(rows) ? rows[0] : null;
        } catch (err) {
            console.log(err);
            return null;
        }
    }
};

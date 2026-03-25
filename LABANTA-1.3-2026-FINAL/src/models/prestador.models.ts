
import db from "../lib/db.js";
import type { PrestadorType } from "../utils/types.js";
import { generateUUID } from "../utils/uuid.js";

export const prestadorModel = {
    async create(prestador: PrestadorType) {
        try {
            const id = generateUUID();
            const query = `
                INSERT INTO tabela_prestadores 
                (id, nif, profissao, taxa_urgencia, minimo_desconto, percentagem_desconto, disponivel, enabled, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values: any[] = [
                id,
                prestador.nif,
                prestador.profissao,
                prestador.taxa_urgencia,
                prestador.minimo_desconto,
                prestador.percentagem_desconto,
                prestador.disponivel,
                prestador.enabled,
                new Date(),
                new Date()
            ];

            await db.execute(query, values);
            return { id, ...prestador };
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    async getAll() {
        try {
            const [rows] = await db.execute("SELECT * FROM tabela_prestadores");
            return rows;
        } catch (err) {
            console.error(err);
            return [];
        }
    },

    async get(id: string) {
        try {
            const [rows]: any = await db.execute("SELECT * FROM tabela_prestadores WHERE id = ?", [id]);
            if (rows.length > 0) {
                return rows[0];
            }
            return null;
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    async update(id: string, prestador: Partial<PrestadorType>) {
        try {
            const query = `
                UPDATE tabela_prestadores 
                SET nif = ?, profissao = ?, taxa_urgencia = ?, minimo_desconto = ?, 
                    percentagem_desconto = ?, disponivel = ?, enabled = ?, updated_at = ?
                WHERE id = ?
            `;
            const values: any[] = [
                prestador.nif ?? 0,
                prestador.profissao ?? "",
                prestador.taxa_urgencia ?? 0,
                prestador.minimo_desconto ?? 0,
                prestador.percentagem_desconto ?? 0,
                prestador.disponivel ?? false,
                prestador.enabled ?? false,
                new Date(),
                id
            ];
            const [result] = await db.execute(query, values);
            return result;
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    async delete(id: string) {
        try {
            const [result] = await db.execute("DELETE FROM tabela_prestadores WHERE id = ?", [id]);
            return result;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
};

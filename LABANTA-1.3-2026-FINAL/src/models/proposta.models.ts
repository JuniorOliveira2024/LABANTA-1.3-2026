
import db from "../lib/db.js";
import type { PropostaType } from "../utils/types.js";

export const propostaModel = {
    async create(proposta: PropostaType) {
        try {
            const query = `
                INSERT INTO tabela_proposta 
                (id_prestacao_servico, preco_hora, horas_estimadas, estado, enabled, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values: any[] = [
                proposta.id_prestacao_servico,
                proposta.preco_hora,
                proposta.horas_estimadas,
                proposta.estado,
                proposta.enabled,
                new Date(),
                new Date()
            ];

            const [result]: any = await db.execute(query, values);
            return { id: result.insertId, ...proposta };
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    async getAll() {
        try {
            const [rows] = await db.execute("SELECT * FROM tabela_proposta");
            return rows;
        } catch (err) {
            console.error(err);
            return [];
        }
    },

    async get(id: number) {
        try {
            const [rows]: any = await db.execute("SELECT * FROM tabela_proposta WHERE id = ?", [id]);
            if (rows.length > 0) {
                return rows[0];
            }
            return null;
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    async update(id: number, proposta: Partial<PropostaType>) {
        try {
            const query = `
                UPDATE tabela_proposta 
                SET preco_hora = ?, horas_estimadas = ?, estado = ?, enabled = ?, updated_at = ?
                WHERE id = ?
            `;
            const values: any[] = [
                proposta.preco_hora ?? 0,
                proposta.horas_estimadas ?? 0,
                proposta.estado ?? 'pendente',
                proposta.enabled ?? false,
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

    async delete(id: number) {
        try {
            const [result] = await db.execute("DELETE FROM tabela_proposta WHERE id = ?", [id]);
            return result;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
};


import db from "../lib/db.js";
import type { OrcamentoType, PrestacaoServicoType } from "../utils/types.js";

export const orcamentoModel = {
    async create(orcamento: OrcamentoType) {
        try {
            const query = `
                INSERT INTO tabela_orcamento (total, id_utilizadores, enabled, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?)
            `;
            const values: any[] = [
                orcamento.total,
                orcamento.id_utilizadores,
                orcamento.enabled,
                new Date(),
                new Date()
            ];

            const [result]: any = await db.execute(query, values);
            return { id: result.insertId, ...orcamento };
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    async createPrestacaoServico(prestacao: PrestacaoServicoType) {
        try {
            const query = `
                INSERT INTO tabela_prestacao_servico 
                (designacao, subtotal, horas_estimadas, id_prestador, id_servico, preco_hora, estado, id_orcamento, enabled, created_at, updated_at) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values: any[] = [
                prestacao.designacao,
                prestacao.subtotal,
                prestacao.horas_estimadas,
                prestacao.id_prestador,
                prestacao.id_servico,
                prestacao.preco_hora,
                prestacao.estado,
                prestacao.id_orcamento ?? null,
                prestacao.enabled,
                new Date(),
                new Date()
            ];

            const [result]: any = await db.execute(query, values);
            return { id: result.insertId, ...prestacao };
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    async getAll() {
        try {
            const [rows] = await db.execute("SELECT * FROM tabela_orcamento");
            return rows;
        } catch (err) {
            console.error(err);
            return [];
        }
    },

    async get(id: number) {
        try {
            const [rows]: any = await db.execute("SELECT * FROM tabela_orcamento WHERE id = ?", [id]);
            if (rows.length > 0) {
                const [itens]: any = await db.execute("SELECT * FROM tabela_prestacao_servico WHERE id_orcamento = ?", [id]);
                return { ...rows[0], itens };
            }
            return null;
        } catch (err) {
            console.error(err);
            return null;
        }
    },

    async update(id: number, orcamento: Partial<OrcamentoType>) {
        try {
            const query = `
                UPDATE tabela_orcamento 
                SET total = ?, enabled = ?, updated_at = ?
                WHERE id = ?
            `;
            const values: any[] = [
                orcamento.total ?? 0,
                orcamento.enabled ?? false,
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
            const [result] = await db.execute("DELETE FROM tabela_orcamento WHERE id = ?", [id]);
            return result;
        } catch (err) {
            console.error(err);
            return null;
        }
    }
};

import db from "../lib/db.js"
import type { OrcamentoDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"

export const OrcamentoModel = {

    async create(orcamento: OrcamentoDBType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_orcamentos (id, total, id_utilizador2, enabled, created_at, updated_at)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    generateUUID(),
                    orcamento.total ?? 0,
                    orcamento.id_utilizador2,
                    orcamento.enabled ?? true,
                    new Date(),
                    new Date()
                ]
            )
            return rows
        } catch (erro) {
            console.error("[OrcamentoModel.create]", erro)
            return null
        }
    },

    async getAll() {
        try {
            const [rows] = await db.execute("SELECT * FROM tbl_orcamentos")
            return rows
        } catch (erro) {
            console.error("[OrcamentoModel.getAll]", erro)
            return null
        }
    },

    async getById(id: string) {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_orcamentos WHERE id = ?`,
                [id]
            )
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (erro) {
            console.error("[OrcamentoModel.getById]", erro)
            return null
        }
    },

    async update(id: string, orcamento: OrcamentoDBType) {
        try {
            const [rows] = await db.execute(
                `UPDATE tbl_orcamentos
                 SET total = ?, id_utilizador2 = ?, enabled = ?, updated_at = ?
                 WHERE id = ?`,
                [
                    orcamento.total,
                    orcamento.id_utilizador2,
                    orcamento.enabled,
                    new Date(),
                    id
                ]
            )
            return rows
        } catch (erro) {
            console.error("[OrcamentoModel.update]", erro)
            return null
        }
    },

    async delete(id: string) {
        try {
            const rows: any = await db.execute(
                `DELETE FROM tbl_orcamentos WHERE id = ?`,
                [id]
            )
            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (erro) {
            console.error("[OrcamentoModel.delete]", erro)
            return null
        }
    },

    /**
     * Calcula o total do orçamento aplicando:
     *  1. subtotal = SUM(preco_hora × horas_estimadas) por prestação
     *  2. se subtotal >= minimo_desconto → aplica prescentagem_desconto
     *  3. aplica taxa_urgencia sobre o valor com desconto
     *  4. grava o total final em tbl_orcamentos.total
     */
    async OrcamentoModelValorTotal(id: string) {
        try {
            // Vai buscar todas as prestações ligadas ao orçamento + dados do prestador
            const [rows] = await db.execute(
                `SELECT
                    ps.id              AS id_prestacao,
                    ps.preco_hora,
                    ps.horas_estimadas,
                    p.taxa_urgencia,
                    p.minimo_desconto,
                    p.prescentagem_desconto
                 FROM tbl_prestacao_servico ps
                 JOIN tbl_prestadores p ON ps.id_prestadores = p.id
                 WHERE ps.id_orcamento = ?
                   AND ps.enabled = TRUE`,
                [id]
            )

            if (!Array.isArray(rows) || rows.length === 0) return null

            let totalGeral = 0
            const detalhe: any[] = []

            for (const row of rows as any[]) {
                const subtotal       = row.preco_hora * row.horas_estimadas
                const temDesconto    = subtotal >= row.minimo_desconto
                const valorDesconto  = temDesconto ? subtotal * row.prescentagem_desconto : 0
                const aposDesconto   = subtotal - valorDesconto
                const valorUrgencia  = aposDesconto * row.taxa_urgencia
                const totalPrestacao = aposDesconto + valorUrgencia

                totalGeral += totalPrestacao
                detalhe.push({
                    id_prestacao: row.id_prestacao,
                    subtotal: +subtotal.toFixed(2),
                    desconto_aplicado: temDesconto,
                    valor_desconto: +valorDesconto.toFixed(2),
                    taxa_urgencia_aplicada: +valorUrgencia.toFixed(2),
                    total_prestacao: +totalPrestacao.toFixed(2)
                })
            }

            totalGeral = +totalGeral.toFixed(2)

            await db.execute(
                `UPDATE tbl_orcamentos SET total = ?, updated_at = ? WHERE id = ?`,
                [totalGeral, new Date(), id]
            )

            return {
                id,
                valorTotal: totalGeral,
                prestacoes: detalhe.length,
                detalhe
            }
        } catch (error) {
            console.error("[OrcamentoModel.OrcamentoModelValorTotal]", error)
            return null
        }
    }
}

import db from "../lib/db.js"
import type { PropostaDBType } from "../utils/types.js"

export const PropostaModel = {

    async create(newProposta: PropostaDBType) {
        try {
            const query = `INSERT INTO tbl_proposta
                (id_prestacao_servico, preco_hora, horas_estimadas, estado, enabled, created_at, updated_at)
                VALUES (?,?,?,?,?,?,?)`
            const values = [
                newProposta.id_prestacao_servico,
                newProposta.preco_hora,
                newProposta.horas_estimadas,
                newProposta.estado ?? 'pendente',
                newProposta.enabled ?? true,
                new Date(),
                new Date()
            ]
            const rows: any = await db.execute(query, values)
            return rows[0].affectedRows === 1
        } catch (error) {
            console.error("[PropostaModel.create]", error)
            return null
        }
    },

    async getAll() {
        try {
            const [rows] = await db.execute('SELECT * FROM tbl_proposta ORDER BY created_at DESC')
            return rows
        } catch (error) {
            console.error("[PropostaModel.getAll]", error)
            return null
        }
    },

    async get(id: string) {
        try {
            const [rows] = await db.execute('SELECT * FROM tbl_proposta WHERE id = ?', [id])
            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (error) {
            console.error("[PropostaModel.get]", error)
            return null
        }
    },

    async update(id: string, propostaAtualizado: PropostaDBType) {
        try {
            const query = `UPDATE tbl_proposta
                SET id_prestacao_servico=?, preco_hora=?, horas_estimadas=?,
                    estado=?, enabled=?, updated_at=?
                WHERE id=?`
            const values = [
                propostaAtualizado.id_prestacao_servico,
                propostaAtualizado.preco_hora,
                propostaAtualizado.horas_estimadas,
                propostaAtualizado.estado,
                propostaAtualizado.enabled,
                new Date(),
                id
            ]
            const rows: any = await db.execute(query, values)
            return rows[0].affectedRows === 1
        } catch (error) {
            console.error("[PropostaModel.update]", error)
            return null
        }
    },

    /**
     * Fluxo em cascata ao aceitar uma proposta:
     *  1. Busca a proposta e o id_prestacao_servico associado
     *  2. Rejeita todas as outras propostas para a mesma prestação
     *  3. Marca esta proposta como "Aceitada"
     *  4. Actualiza o estado da tbl_prestacao_servico para "enprogresso"
     */
    async PropostaAceita(id: string) {
        const conn = await (db as any).getConnection()
        try {
            await conn.beginTransaction()

            // 1 — Buscar a proposta alvo
            const [propostaRows]: any = await conn.execute(
                `SELECT id, id_prestacao_servico FROM tbl_proposta WHERE id = ? AND enabled = TRUE`,
                [id]
            )
            if (!Array.isArray(propostaRows) || propostaRows.length === 0) {
                await conn.rollback()
                conn.release()
                return null
            }
            const proposta = propostaRows[0] as any
            const idPrestacaoServico = proposta.id_prestacao_servico

            // 2 — Rejeitar propostas concorrentes
            await conn.execute(
                `UPDATE tbl_proposta
                 SET estado = 'Rejeitada', updated_at = ?
                 WHERE id_prestacao_servico = ? AND id != ? AND estado = 'pendente'`,
                [new Date(), idPrestacaoServico, id]
            )

            // 3 — Aceitar esta proposta
            await conn.execute(
                `UPDATE tbl_proposta
                 SET estado = 'Aceitada', updated_at = ?
                 WHERE id = ?`,
                [new Date(), id]
            )

            // 4 — Actualizar estado da prestação de serviço
            await conn.execute(
                `UPDATE tbl_prestacao_servico
                 SET estado = 'enprogresso', updated_at = ?
                 WHERE id = ?`,
                [new Date(), idPrestacaoServico]
            )

            await conn.commit()
            conn.release()

            return {
                propostaId: id,
                idPrestacaoServico,
                estado: 'Aceitada'
            }
        } catch (error) {
            await conn.rollback()
            conn.release()
            console.error("[PropostaModel.PropostaAceita]", error)
            return null
        }
    },

    async delete(id: string) {
        try {
            const rows: any = await db.execute(
                `DELETE FROM tbl_proposta WHERE id = ?`, [id]
            )
            return rows[0].affectedRows === 1
        } catch (error) {
            console.error("[PropostaModel.delete]", error)
            return null
        }
    }
}

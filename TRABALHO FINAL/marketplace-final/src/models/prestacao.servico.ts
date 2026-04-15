import db from "../lib/db.js"
import type { PrestacaoServicoDBType } from "../utils/types.js"
import { generateUUID } from "../utils/uuid.js"


export const PrestacaoServicoModel = {
    async create(prestacaoServico: PrestacaoServicoDBType) {
        try {
            const [rows] = await db.execute(
                `INSERT INTO tbl_prestacao_servico 
                (id, designacao, subtorial, horas_estimadas, id_prestadores, id_servico, preco_hora, id_orcamento, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,

                [
                    generateUUID(),
                    prestacaoServico.designacao,
                    prestacaoServico.subtorial,
                    prestacaoServico.horas_estimadas,
                    prestacaoServico.id_prestadores,
                    prestacaoServico.id_servico,
                    prestacaoServico.preco_hora,
                    prestacaoServico.id_orcamento,
                    new Date()
                ]
            )
            console.log({ rows })
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAll() {
        const [rows] = await db.execute("SELECT * FROM tbl_prestacao_servico")

        return rows
    },

    async get(id: string) {
        try {
            const [rows] = await db.execute(
                `SELECT * FROM tbl_prestacao_servico 
                WHERE tbl_prestacao_servico.id = ?`,

                [id]
            )

            if (Array.isArray(rows) && rows.length === 0) return null
            return Array.isArray(rows) ? rows[0] : null
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async update(id: string, prestacaoServico: PrestacaoServicoDBType) {
        try {
            const [rows] = await db.execute(
                `UPDATE tbl_prestacao_servico 
                SET designacao = ?, 
                subtorial = ?, 
                horas_estimadas = ?, 
                id_prestadores = ?, 
                id_servico = ?, 
                preco_hora = ?, 
                id_orcamento = ?, 
                updated_at = ?
                WHERE id = ?`,

                [
                    prestacaoServico.designacao,
                    prestacaoServico.subtorial,
                    prestacaoServico.horas_estimadas,
                    prestacaoServico.id_prestadores,
                    prestacaoServico.id_servico,
                    prestacaoServico.preco_hora,
                    prestacaoServico.id_orcamento,
                    new Date(),
                    id
                ]
            )
            console.log({ rows })
            return rows
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async delete(id: string) {
        try {
            const rows: any = await db.execute(
                `DELETE FROM tbl_prestacao_servico 
                WHERE id = ?`,

                [id]
            )

            return rows[0].affectedRows === 0 ? null : rows[0]
        } catch (err) {
            console.log(err)
            return null
        }
    },

    async getAllPrestacoesServicoBy(categoria: string) {
        try {
            const [rows] = await db.execute(
                `SELECT DISTINCT
                    ps.id,
                    ps.designacao,
                    ps.subtorial,
                    ps.horas_estimadas,
                    ps.id_prestadores,
                    ps.id_servico,
                    ps.preco_hora,
                    ps.id_orcamento,
                    ps.estado,
                    ps.enabled,
                    ps.created_at,
                    ps.updated_at,
                    s.categoria,
                    s.nome AS servico_nome,
                    s.descricao AS servico_descricao
                FROM tbl_prestacao_servico ps
                INNER JOIN tbl_servicos s ON ps.id_servico = s.id
                WHERE s.categoria = ?`,
                [categoria]
            )

            return Array.isArray(rows) ? rows : []
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

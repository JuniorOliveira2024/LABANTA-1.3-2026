import type { Request, Response } from "express"
import type { OrcamentoDBType } from "../utils/types.js"
import { OrcamentoModel } from "../models/orcamento.models.js"

export const OrcamentoController = {

    async create(req: Request, res: Response) {
        const dados: OrcamentoDBType = req.body
        if (!dados || !dados.id_utilizador2) {
            return res.status(400).json({ status: "error", message: "id_utilizador2 é obrigatório", data: null })
        }
        const result = await OrcamentoModel.create(dados)
        if (!result) return res.status(500).json({ status: "error", message: "Erro ao criar orçamento", data: null })
        return res.status(201).json({ status: "success", message: "Orçamento criado com sucesso", data: result })
    },

    async getAll(req: Request, res: Response) {
        const result = await OrcamentoModel.getAll()
        if (!result) return res.status(500).json({ status: "error", message: "Erro ao buscar orçamentos", data: null })
        return res.status(200).json({ status: "success", message: "Orçamentos buscados com sucesso", data: result })
    },

    async getById(req: Request, res: Response) {
        const id = req.params.id as string
        if (!id) return res.status(400).json({ status: "error", message: "ID obrigatório", data: null })
        const result = await OrcamentoModel.getById(id)
        if (!result) return res.status(404).json({ status: "error", message: "Orçamento não encontrado", data: null })
        return res.status(200).json({ status: "success", message: "Orçamento encontrado com sucesso", data: result })
    },

    async update(req: Request, res: Response) {
        const id = req.params.id as string
        const dados: OrcamentoDBType = req.body
        if (!id) return res.status(400).json({ status: "error", message: "ID obrigatório", data: null })
        if (!dados) return res.status(400).json({ status: "error", message: "Dados inválidos", data: null })
        const result = await OrcamentoModel.update(id, dados)
        if (!result) return res.status(400).json({ status: "error", message: "Erro ao actualizar orçamento", data: null })
        return res.status(200).json({ status: "success", message: "Orçamento actualizado com sucesso", data: result })
    },

    async delete(req: Request, res: Response) {
        const id = req.params.id as string
        if (!id) return res.status(400).json({ status: "error", message: "ID obrigatório", data: null })
        const result = await OrcamentoModel.delete(id)
        if (!result) return res.status(400).json({ status: "error", message: "Erro ao apagar orçamento", data: null })
        return res.status(200).json({ status: "success", message: "Orçamento apagado com sucesso", data: null })
    },

    /** PUT /orcamento/:id/calcular-valor-total */
    async calcularValorTotal(req: Request, res: Response) {
        const id = req.params.id as string
        if (!id) return res.status(400).json({ status: "error", message: "ID obrigatório", data: null })
        const result = await OrcamentoModel.OrcamentoModelValorTotal(id)
        if (!result) return res.status(404).json({ status: "error", message: "Orçamento não encontrado ou sem prestações associadas", data: null })
        return res.status(200).json({ status: "success", message: "Valor total calculado e gravado com sucesso", data: result })
    }
}

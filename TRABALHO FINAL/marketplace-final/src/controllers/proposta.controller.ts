import type { PropostaDBType } from "../utils/types.js"
import { PropostaModel } from "../models/proposta.models.js"
import type { Request, Response } from "express"

export const PropostaController = {

    async create(req: Request, res: Response) {
        const newProposta: PropostaDBType = req.body
        if (!newProposta || !newProposta.id_prestacao_servico || !newProposta.preco_hora || !newProposta.horas_estimadas) {
            return res.status(400).json({ status: "error", message: "Campos obrigatórios em falta (id_prestacao_servico, preco_hora, horas_estimadas)", data: null })
        }
        const result = await PropostaModel.create(newProposta)
        if (!result) return res.status(500).json({ status: "error", message: "Erro ao criar proposta", data: null })
        return res.status(201).json({ status: "success", message: "Proposta criada com sucesso", data: null })
    },

    async getAll(req: Request, res: Response) {
        const result = await PropostaModel.getAll()
        if (!result) return res.status(500).json({ status: "error", message: "Erro ao buscar propostas", data: null })
        return res.status(200).json({ status: "success", message: "Propostas buscadas com sucesso", data: result })
    },

    async get(req: Request, res: Response) {
        const { id } = req.params
        if (!id) return res.status(400).json({ status: "error", message: "ID obrigatório", data: null })
        const result = await PropostaModel.get(id)
        if (!result) return res.status(404).json({ status: "error", message: "Proposta não encontrada", data: null })
        return res.status(200).json({ status: "success", message: "Proposta encontrada com sucesso", data: result })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params
        const updatedProposta: PropostaDBType = req.body
        if (!id) return res.status(400).json({ status: "error", message: "ID obrigatório", data: null })
        if (!updatedProposta) return res.status(400).json({ status: "error", message: "Dados da proposta inválidos", data: null })

        const result = await PropostaModel.update(id, updatedProposta)
        if (!result) return res.status(400).json({ status: "error", message: "Erro ao actualizar proposta", data: null })
        return res.status(200).json({ status: "success", message: "Proposta actualizada com sucesso", data: null })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params
        if (!id) return res.status(400).json({ status: "error", message: "ID obrigatório", data: null })
        const result = await PropostaModel.delete(id)
        if (!result) return res.status(400).json({ status: "error", message: "Erro ao apagar proposta", data: null })
        return res.status(200).json({ status: "success", message: "Proposta apagada com sucesso", data: null })
    },

    /** PUT /proposta/aceitar/:id — fluxo em cascata completo */
    async AceitarProposta(req: Request, res: Response) {
        const { id } = req.params
        if (!id) return res.status(400).json({ status: "error", message: "ID obrigatório", data: null })

        const result = await PropostaModel.PropostaAceita(id)
        if (!result) return res.status(404).json({ status: "error", message: "Proposta não encontrada ou erro ao aceitar", data: null })
        return res.status(200).json({ status: "success", message: "Proposta aceite com sucesso", data: result })
    }
}

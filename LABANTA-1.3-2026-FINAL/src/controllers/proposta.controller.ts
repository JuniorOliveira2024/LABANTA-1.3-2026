import type { Request, Response } from "express";
import { propostaModel } from "../models/proposta.models.js";
import type { PropostaType } from "../utils/types.js";

export const PropostaController = {
    async create(req: Request, res: Response) {
        const propostaData: PropostaType = req.body;
        
        if (!propostaData.id_prestacao_servico || !propostaData.preco_hora) {
            return res.status(400).json({
                status: false,
                message: "ID de prestação de serviço e preço por hora são obrigatórios",
                data: null
            });
        }

        const result = await propostaModel.create(propostaData);
        
        if (result) {
            return res.status(201).json({
                status: true,
                message: "Proposta criada com sucesso",
                data: result
            });
        }

        return res.status(500).json({
            status: false,
            message: "Erro ao criar proposta",
            data: null
        });
    },

    async getAll(req: Request, res: Response) {
        const result = await propostaModel.getAll();
        return res.json({
            status: true,
            message: "Lista de propostas",
            data: result
        });
    },

    async get(req: Request, res: Response) {
        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                status: false,
                message: "ID inválido",
                data: null
            });
        }

        const result = await propostaModel.get(parseInt(id));
        
        if (result) {
            return res.json({
                status: true,
                message: "Proposta encontrada",
                data: result
            });
        }

        return res.status(404).json({
            status: false,
            message: "Proposta não encontrada",
            data: null
        });
    },

    async update(req: Request, res: Response) {
        const id = req.params.id;
        const propostaData: Partial<PropostaType> = req.body;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                status: false,
                message: "ID inválido",
                data: null
            });
        }
        
        const result = await propostaModel.update(parseInt(id), propostaData);
        
        if (result) {
            return res.json({
                status: true,
                message: "Proposta atualizada com sucesso",
                data: result
            });
        }

        return res.status(500).json({
            status: false,
            message: "Erro ao atualizar proposta",
            data: null
        });
    },

    async delete(req: Request, res: Response) {
        const id = req.params.id;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                status: false,
                message: "ID inválido",
                data: null
            });
        }

        const result = await propostaModel.delete(parseInt(id));
        
        if (result) {
            return res.json({
                status: true,
                message: "Proposta removida com sucesso",
                data: result
            });
        }

        return res.status(500).json({
            status: false,
            message: "Erro ao remover proposta",
            data: null
        });
    }
};
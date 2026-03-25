
import type { Request, Response } from "express";
import { orcamentoModel } from "../models/or├ºamento.models.js";
import type { OrcamentoType, PrestacaoServicoType } from "../utils/types.js";

export const OrcamentoController = {
    async create(req: Request, res: Response) {
        const { total, id_utilizadores, enabled, itens }: { total: number, id_utilizadores: string, enabled: boolean, itens: PrestacaoServicoType[] } = req.body;
        
        if (!id_utilizadores || total === undefined) {
            return res.status(400).json({
                status: false,
                message: "ID de utilizador e total são obrigatórios",
                data: null
            });
        }

        const orcamentoResult = await orcamentoModel.create({ total, id_utilizadores, enabled });
        
        // Verificamos se orcamento Resultante possui um id antes de tentar itegrar sobre os itens
        if (orcamentoResult && (orcamentoResult as any).id && itens && itens.length > 0) {
            for (const item of itens) {
                await orcamentoModel.createPrestacaoServico({
                    ...item,
                    id_orcamento: (orcamentoResult as any).id
                });
            }
        }

        if (orcamentoResult) {
            return res.status(201).json({
                status: true,
                message: "Orçamento criado com sucesso",
                data: orcamentoResult
            });
        }

        return res.status(500).json({
            status: false,
            message: "Erro ao criar orçamento",
            data: null
        });
    },

    async getAll(req: Request, res: Response) {
        const result = await orcamentoModel.getAll();
        return res.json({
            status: true,
            message: "Lista de orçamentos",
            data: result
        });
    },

    async get(req: Request, res: Response) {
        const idParam = req.params.id;

        // 1. Verifica se existe e se não é um array
        if (!idParam || Array.isArray(idParam)) {
            return res.status(400).json({
                status: false,
                message: "ID inválido",
                data: null
            });
        }

        // 2. Converte para número de forma segura
        const id = parseInt(idParam, 10);

        if (isNaN(id)) {
            return res.status(400).json({
                status: false,
                message: "O ID deve ser numérico",
                data: null
            });
        }

        const result = await orcamentoModel.get(id);
        
        if (result) {
            return res.json({
                status: true,
                message: "Orçamento encontrado",
                data: result
            });
        }

        return res.status(404).json({
            status: false,
            message: "Orçamento não encontrado",
            data: null
        });
    },

    async update(req: Request, res: Response) {
        const idParam = req.params.id;
        const orcamentoData: Partial<OrcamentoType> = req.body;
        
        if (!idParam || Array.isArray(idParam)) {
            return res.status(400).json({
                status: false,
                message: "ID inválido",
                data: null
            });
        }

        const id = parseInt(idParam, 10);

        if (isNaN(id)) {
            return res.status(400).json({
                status: false,
                message: "O ID deve ser numérico",
                data: null
            });
        }

        const result = await orcamentoModel.update(id, orcamentoData);
        
        if (result) {
            return res.json({
                status: true,
                message: "Orçamento atualizado com sucesso",
                data: result
            });
        }

        return res.status(500).json({
            status: false,
            message: "Erro ao atualizar orçamento",
            data: null
        });
    },

    async delete(req: Request, res: Response) {
        const idParam = req.params.id;

        if (!idParam || Array.isArray(idParam)) {
            return res.status(400).json({
                status: false,
                message: "ID inválido",
                data: null
            });
        }

        const id = parseInt(idParam, 10);

        if (isNaN(id)) {
            return res.status(400).json({
                status: false,
                message: "O ID deve ser numérico",
                data: null
            });
        }

        const result = await orcamentoModel.delete(id);
        
        if (result) {
            return res.json({
                status: true,
                message: "Orçamento removido com sucesso",
                data: result
            });
        }

        return res.status(500).json({
            status: false,
            message: "Erro ao remover orçamento",
            data: null
        });
    }
};

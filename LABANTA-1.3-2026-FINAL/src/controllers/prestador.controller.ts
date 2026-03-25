import type { Request, Response } from "express";
import { prestadorModel } from "../models/prestador.models.js";
import type { PrestadorType } from "../utils/types.js";

export const PrestadorController = {
    async create(req: Request, res: Response) {
        const prestadorData: PrestadorType = req.body;
        
        if (!prestadorData.nif || !prestadorData.profissao) {
            return res.status(400).json({
                status: false,
                message: "NIF e Profissão são obrigatórios",
                data: null
            });
        }

        const result = await prestadorModel.create(prestadorData);
        
        if (result) {
            return res.status(201).json({
                status: true,
                message: "Prestador criado com sucesso",
                data: result
            });
        }

        return res.status(500).json({
            status: false,
            message: "Erro ao criar prestador",
            data: null
        });
    },

    async getAll(req: Request, res: Response) {
        const result = await prestadorModel.getAll();

        return res.json({
            status: true,
            message: "Lista de prestadores",
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

        const result = await prestadorModel.get(id);
        
        if (result) {
            return res.json({
                status: true,
                message: "Prestador encontrado",
                data: result
            });
        }

        return res.status(404).json({
            status: false,
            message: "Prestador não encontrado",
            data: null
        });
    },

    async update(req: Request, res: Response) {
        const id = req.params.id;
        const prestadorData: Partial<PrestadorType> = req.body;

        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                status: false,
                message: "ID inválido",
                data: null
            });
        }
        
        const result = await prestadorModel.update(id, prestadorData);
        
        if (result) {
            return res.json({
                status: true,
                message: "Prestador atualizado com sucesso",
                data: result
            });
        }

        return res.status(500).json({
            status: false,
            message: "Erro ao atualizar prestador",
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

        const result = await prestadorModel.delete(id);
        
        if (result) {
            return res.json({
                status: true,
                message: "Prestador removido com sucesso",
                data: result
            });
        }

        return res.status(500).json({
            status: false,
            message: "Erro ao remover prestador",
            data: null
        });
    }
};
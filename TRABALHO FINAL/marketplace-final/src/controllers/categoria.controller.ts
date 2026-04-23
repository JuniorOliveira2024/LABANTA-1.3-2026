import { CategoriaModel } from "../models/categoria.models.js"
import type { CategoriaDBType } from "../utils/types.js"
import type { Request, Response } from "express"


export const CategoriaController = {
    async CreateCategoria(req: Request, res: Response) {
        const newCategoria: CategoriaDBType = req.body

        if (!newCategoria) {
            return res.status(400).json({
                status: "error",
                message: "Dados de categoria invalidos",
                data: null
            })
        }

        const createCategoriaResponse = await CategoriaModel.create(newCategoria)
        if (!createCategoriaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar categoria",
                data: null
            })
        }
        return res.status(201).json({
            status: "success",
            message: "Categoria criada com sucesso",
            data: null
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllCategoriaResponse = await CategoriaModel.getAll()
        if (!getAllCategoriaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar categorias",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Categorias buscadas com sucesso",
            data: getAllCategoriaResponse
        })
    },

    async get(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID da categoria nao fornecido",
                data: null
            })
        }

        const getCategoriaResponse = await CategoriaModel.get(id as string)
        if (!getCategoriaResponse) {
            return res.status(404).json({
                status: "error",
                message: "Categoria nao encontrada",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Categoria encontrada com sucesso",
            data: getCategoriaResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedCategoria: CategoriaDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedCategoria) {
            return res.status(400).json({
                status: "error",
                message: "Dados de categoria invalidos",
                data: null
            })
        }

        const updatedCategoriaResponse = await CategoriaModel.update(id as string, updatedCategoria)

        if (!updatedCategoriaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar categoria",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Categoria atualizada com sucesso",
            data: null
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params
        
        if(!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }
        
        const deleteCategoriaResponse = await CategoriaModel.delete(id as string)
        if(!deleteCategoriaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar categoria",
                data: null
            })
        }
        
        return res.status(200).json({
            status: "success",
            message: "Categoria apagada com sucesso",
            data: null
        })
    }
}

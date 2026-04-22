import { EmpresaModel } from "../models/empresa.models.js"
import type { EmpresaDBType } from "../utils/types.js"
import type { Request, Response } from "express"


export const EmpresaController = {
    async CreateEmpresa(req: Request, res: Response) {
        const newEmpresa: EmpresaDBType = req.body

        if (!newEmpresa) {
            return res.status(400).json({
                status: "error",
                message: "Dados de empresa invalidos",
                data: null
            })
        }

        const createEmpresaResponse = await EmpresaModel.create(newEmpresa)
        if (!createEmpresaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao criar empresa",
                data: null
            })
        }
        return res.status(201).json({
            status: "success",
            message: "Empresa criada com sucesso",
            data: null
        })
    },

    async getAll(req: Request, res: Response) {
        const getAllEmpresaResponse = await EmpresaModel.getAll()
        if (!getAllEmpresaResponse) {
            return res.status(500).json({
                status: "error",
                message: "Erro ao buscar empresas",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Empresas buscadas com sucesso",
            data: getAllEmpresaResponse
        })
    },

    async get(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID da empresa nao fornecido",
                data: null
            })
        }

        const getEmpresaResponse = await EmpresaModel.get(id as string)
        if (!getEmpresaResponse) {
            return res.status(404).json({
                status: "error",
                message: "Empresa nao encontrada",
                data: null
            })
        }
        return res.status(200).json({
            status: "success",
            message: "Empresa encontrada com sucesso",
            data: getEmpresaResponse
        })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params

        const updatedEmpresa: EmpresaDBType = req.body

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        if (!updatedEmpresa) {
            return res.status(400).json({
                status: "error",
                message: "Dados de empresa invalidos",
                data: null
            })
        }

        const updatedEmpresaResponse = await EmpresaModel.update(id as string, updatedEmpresa)

        if (!updatedEmpresaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao atualizar empresa",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Empresa atualizada com sucesso",
            data: null
        })
    },

    async delete(req: Request, res: Response) {
        const id = req.params.id

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null
            })
        }

        const deletedEmpresaResponse = await EmpresaModel.delete(id as string)

        if (!deletedEmpresaResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao deletar empresa",
                data: null
            })
        }

        return res.status(200).json({
            status: "success",
            message: "Empresa deletada com sucesso",
            data: null
        })
    }
}

import { UserModel } from "../models/user.models.js"
import type { UserDBType } from "../utils/types.js"
import type { Request, Response } from "express"
import { comparePassword } from "../utils/password.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const UserController = {

    async create(req: Request, res: Response) {
        const newUser: UserDBType = req.body
        if (!newUser || !newUser.nome || !newUser.email || !newUser.password) {
            return res.status(400).json({ status: "error", message: "Campos obrigatórios em falta (nome, email, password)", data: null })
        }
        const result = await UserModel.create(newUser)
        if (!result) {
            return res.status(500).json({ status: "error", message: "Erro ao criar utilizador. O email pode já estar registado.", data: null })
        }
        return res.status(201).json({ status: "success", message: "Utilizador criado com sucesso", data: null })
    },

    async getAll(req: Request, res: Response) {
        const result = await UserModel.getAll()
        if (!result) {
            return res.status(500).json({ status: "error", message: "Erro ao buscar utilizadores", data: null })
        }
        return res.status(200).json({ status: "success", message: "Utilizadores buscados com sucesso", data: result })
    },

    async get(req: Request, res: Response) {
        const { id } = req.params
        if (!id) return res.status(400).json({ status: "error", message: "ID obrigatório", data: null })

        const result = await UserModel.get(id)
        if (!result) return res.status(404).json({ status: "error", message: "Utilizador não encontrado", data: null })
        return res.status(200).json({ status: "success", message: "Utilizador encontrado com sucesso", data: result })
    },

    async update(req: Request, res: Response) {
        const { id } = req.params
        const updatedUser: UserDBType = req.body
        if (!id) return res.status(400).json({ status: "error", message: "ID obrigatório", data: null })
        if (!updatedUser) return res.status(400).json({ status: "error", message: "Dados inválidos", data: null })

        const result = await UserModel.update(id, updatedUser)
        if (!result) return res.status(400).json({ status: "error", message: "Erro ao actualizar utilizador", data: null })
        return res.status(200).json({ status: "success", message: "Utilizador actualizado com sucesso", data: null })
    },

    async login(req: Request, res: Response) {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ status: "error", message: "email e password são obrigatórios", data: null })
        }
        const userData = await UserModel.getByEmail(email)
        if (!userData) {
            return res.status(404).json({ status: "error", message: "Não existe nenhuma conta com esse email", data: null })
        }
        const isPasswordValid = await comparePassword(password, userData.password)
        if (!isPasswordValid) {
            return res.status(401).json({ status: "error", message: "Credenciais inválidos", data: null })
        }
        const payload = { id: userData.id, email: userData.email, nome: userData.nome }
        const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" })
        return res.status(200).json({ status: "success", message: "Login realizado com sucesso", data: { token, user: payload } })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params
        if (!id) return res.status(400).json({ status: "error", message: "ID obrigatório", data: null })

        const result = await UserModel.delete(id)
        if (!result) return res.status(400).json({ status: "error", message: "Erro ao apagar utilizador", data: null })
        return res.status(200).json({ status: "success", message: "Utilizador apagado com sucesso", data: null })
    },

    /** PUT /user/:id/update-password — requer oldPassword + newPassword */
    async updatePassword(req: Request, res: Response) {
        const { id } = req.params
        const { oldPassword, newPassword } = req.body

        if (!id || !oldPassword || !newPassword) {
            return res.status(400).json({ status: "error", message: "id, oldPassword e newPassword são obrigatórios", data: null })
        }

        const result = await UserModel.updatePassword(id, oldPassword, newPassword)
        if (!result) {
            return res.status(500).json({ status: "error", message: "Erro interno ao alterar password", data: null })
        }
        if (typeof result === "object" && !result.ok) {
            if (result.reason === "not_found") {
                return res.status(404).json({ status: "error", message: "Utilizador não encontrado", data: null })
            }
            if (result.reason === "wrong_password") {
                return res.status(401).json({ status: "error", message: "Password antiga incorreta", data: null })
            }
            return res.status(400).json({ status: "error", message: "Erro ao alterar password", data: null })
        }
        return res.status(200).json({ status: "success", message: "Password alterada com sucesso", data: null })
    },

    /** PUT /user/:id/reset-password — sem validar a antiga (admin/recuperação) */
    async resetPassword(req: Request, res: Response) {
        const { id } = req.params
        const { password } = req.body
        if (!id || !password) {
            return res.status(400).json({ status: "error", message: "id e password são obrigatórios", data: null })
        }
        const result = await UserModel.resetPassword(id, password)
        if (!result) return res.status(400).json({ status: "error", message: "Erro ao redefinir password", data: null })
        return res.status(200).json({ status: "success", message: "Password redefinida com sucesso", data: null })
    }
}

export { UserModel }

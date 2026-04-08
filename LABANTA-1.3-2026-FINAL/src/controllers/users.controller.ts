import type { Request, Response } from "express";
import type { UserType } from "../utils/types.js";
import { usersModel } from "../models/users.models.js";
import { generateUUID } from "../utils/uuid.js";
import { comparePassword } from "../utils/password.js";
import jwt from "jsonwebtoken";

export const userController = {
    async create(req: Request, res: Response) {
        const user: UserType = req.body;

        if (!user) {
            res.status(400).json({
                status: "error",
                message: "Dados de utilizador invalidos",
                data: null,
            });
        }

        console.log(user);

        const createUserResponse = await usersModel.create(user);

        res.status(201).json(
            {
                status: "successo",
                message: "Utilizador criado com sucesso",
                data: createUserResponse
            });
    },


    async getAll(req: Request, res: Response) {
        const getUsersResponse = await usersModel.getAll();

        res.json(getUsersResponse);
    },

    async get(req: Request, res: Response) {
        const { id } = req.params;
        const getUserResponse = await usersModel.get(id as string);

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID do utilizador é obrigatório",
                data: null
            });

        }

        if (!getUserResponse) {
            return res.status(404).json({
                status: "error",
                message: "Utilizador não encontrado",
                data: null
            });

        }

        res.json(getUserResponse);
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const updatedUser: UserType = req.body;

        if (!id) {
            return res.status(400).json(
                {
                    status: "error",
                    message: "ID é obrigatório",
                    data: null
                }
            )
        }

        if (!updatedUser) {
            return res.status(400).json(
                {
                    status: "error",
                    message: "Dados de utilizador inválidos",
                    data: null
                }
            )
        }

        const updateUserResponse = await usersModel.update(generateUUID(), updatedUser);

        if (!updateUserResponse) {
            return res.status(400).json(
                {
                    status: "error",
                    message: "Erro ao atualizar utilizador",
                    data: null
                }
            )
        }

        return res.status(200).json(
            {
                status: "success",
                message: "Utilizador atualizado com sucesso",
                data: updateUserResponse
            }
        )
    },
async login(req: Request, res: Response){
        const {email, password} = req.body

        if(!email || !password){
            return res.status(404).json({
                status: "error",
                message: "Credenciais inválidos",
                data: null
            })
        }

        const userData = await usersModel.getByEmail(email as string)

        if(!userData){
            return res.status(404).json({
                status: "error",
                message: "não existe nehum utilizador com este email",
                data: null
            })
        }

        const isPasswordValid = await comparePassword(password, userData.password)

        if(!isPasswordValid){
            return res.status(401).json({
                status: "error",
                message: "Credenciais inválidos",
                data: null
            })
        }

        const payload = {
            id: userData.id,
            email: userData.email,
            nome: userData.nome,
            
        }

        const token  = jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: "1h"})
        return res.status(200).json({
        status: "success",
        message: "Login efetuado com sucesso",
        data: { token }
    });

    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: "error",
                message: "ID obrigatorio",
                data: null,
            });
        }

        const deleteUserResponse = await usersModel.delete(id as string);

        if (!deleteUserResponse) {
            return res.status(400).json({
                status: "error",
                message: "Erro ao apagar servico",
                data: null,
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Servico apagado com sucesso",
            data: deleteUserResponse,
        });
    }
}
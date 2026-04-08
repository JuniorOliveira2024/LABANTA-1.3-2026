import { Router } from "express";
import { userController } from "../controllers/users.controller.js";
import AuthMiddleware from "../security/auth.middleware.js";

const UsersRouter = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id",
    login: "/login"
}

const router = Router()


router.get(UsersRouter.getAll,AuthMiddleware, userController.getAll)
router.get(UsersRouter.getById, userController.get)
router.post(UsersRouter.create, userController.create)
router.put(UsersRouter.update, userController.update)
router.delete(UsersRouter.delete, userController.delete) 
router.post(UsersRouter.login, userController.login)

export { router };
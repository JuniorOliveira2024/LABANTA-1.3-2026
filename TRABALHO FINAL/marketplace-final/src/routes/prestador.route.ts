import { Router } from "express"
import { PrestadorController } from "../controllers/prestador.controller.js"
import AuthMiddleware from "../security/auth.middleware.js"

const PrestadorRoute = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.post(PrestadorRoute.create, AuthMiddleware, PrestadorController.create)
router.get(PrestadorRoute.getAll, AuthMiddleware, PrestadorController.getAll)
router.get(PrestadorRoute.getById, AuthMiddleware, PrestadorController.get)
router.put(PrestadorRoute.update, AuthMiddleware, PrestadorController.update)
router.delete(PrestadorRoute.delete, AuthMiddleware, PrestadorController.delete)

export { router }
import { Router } from "express"
import { PrestacaoServicoController } from "../controllers/prestacao_servico.controller.js"
import AuthMiddleware from "../security/auth.middleware.js"

const PrestacaoServicoRoute = {
    create: "/create",
    getAll: "/",
    getByCategory: "/categoria/:categoria",
    getById: "/get-by-id/:id",
    update: "/update/:id",
    delete: "/delete/:id"
}

const router = Router()

router.post(PrestacaoServicoRoute.create, AuthMiddleware, PrestacaoServicoController.create)
router.get(PrestacaoServicoRoute.getByCategory, AuthMiddleware, PrestacaoServicoController.getAllPrestacoesServicoByCategoria)
router.get(PrestacaoServicoRoute.getAll, AuthMiddleware, PrestacaoServicoController.getAll)
router.get(PrestacaoServicoRoute.getById, AuthMiddleware, PrestacaoServicoController.get)
router.put(PrestacaoServicoRoute.update, AuthMiddleware, PrestacaoServicoController.update)
router.delete(PrestacaoServicoRoute.delete, AuthMiddleware, PrestacaoServicoController.delete)

export { router }
import { Router } from "express"
import { ServiceController} from "../controllers/servico.controller.js"
import AuthMiddleware from "../security/auth.middleware.js"



const ServiceRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const router = Router()
router.post(ServiceRoute.create, AuthMiddleware, ServiceController.CreateServico)
router.get(ServiceRoute.getById, AuthMiddleware, ServiceController.get)
router.get(ServiceRoute.getAll, AuthMiddleware, ServiceController.getAll)
router.put(ServiceRoute.update, AuthMiddleware, ServiceController.update)
router.delete(ServiceRoute.delete, AuthMiddleware, ServiceController.delete)


export { router }

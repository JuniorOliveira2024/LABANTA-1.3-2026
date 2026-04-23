import { Router } from "express"
import { CategoriaController } from "../controllers/categoria.controller.js"
import AuthMiddleware from "../security/auth.middleware.js"



const CategoriaRoute = {
    create:"/create",
    getById:"/get-by-id/:id",
    getAll:"/",
    update:"/update/:id",
    delete:"/delete/:id"
}

const router = Router()
router.post(CategoriaRoute.create, AuthMiddleware, CategoriaController.CreateCategoria)
router.get(CategoriaRoute.getById, AuthMiddleware, CategoriaController.get)
router.get(CategoriaRoute.getAll, AuthMiddleware, CategoriaController.getAll)
router.put(CategoriaRoute.update, AuthMiddleware, CategoriaController.update)
router.delete(CategoriaRoute.delete, AuthMiddleware, CategoriaController.delete)


export { router }

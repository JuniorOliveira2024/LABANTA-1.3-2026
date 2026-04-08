import { Router } from "express"
import { UserController } from "../controllers/users.controler.js"
import AuthMiddleware from "../security/auth.middleware.js"

const router = Router()

// Rotas públicas
router.post("/create",    UserController.create)
router.post("/login",     UserController.login)

// Rotas específicas com parâmetros de path compostos ANTES das genéricas /:id
router.put("/:id/update-password", AuthMiddleware, UserController.updatePassword)
router.put("/:id/reset-password",  UserController.resetPassword)

// Rotas protegidas genéricas
router.get("/",      AuthMiddleware, UserController.getAll)
router.get("/:id",   AuthMiddleware, UserController.get)
router.put("/:id",   AuthMiddleware, UserController.update)
router.delete("/:id", AuthMiddleware, UserController.delete)

export { router }

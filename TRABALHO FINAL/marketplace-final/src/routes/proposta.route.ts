import { Router } from "express";
import { PropostaController } from "../controllers/proposta.controller.js";
import AuthMiddleware from "../security/auth.middleware.js"

const router = Router()

router.post("/create", AuthMiddleware, PropostaController.create)

router.get("/", AuthMiddleware, PropostaController.getAll)

router.get("/:id", AuthMiddleware, PropostaController.get)

// Rota especifica antes da generica /:id no PUT
router.put("/aceitar/:id", AuthMiddleware, PropostaController.AceitarProposta)

router.put("/:id", AuthMiddleware, PropostaController.update)

router.delete("/:id", AuthMiddleware, PropostaController.delete)

export { router }

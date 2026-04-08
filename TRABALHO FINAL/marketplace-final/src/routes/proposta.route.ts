import { Router } from "express";
import { PropostaController } from "../controllers/proposta.controller.js";

const router = Router()

router.post("/create", PropostaController.create)

router.get("/", PropostaController.getAll)

router.get("/:id", PropostaController.get)

// Rota especifica antes da generica /:id no PUT
router.put("/aceitar/:id", PropostaController.AceitarProposta)

router.put("/:id", PropostaController.update)

router.delete("/:id", PropostaController.delete)

export { router }


import { Router } from "express";
import { PropostaController } from "../controllers/proposta.controller.js";

const router = Router();

const PropostaRoutes = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
};

router.post(PropostaRoutes.create, PropostaController.create);
router.get(PropostaRoutes.getById, PropostaController.get);
router.get(PropostaRoutes.getAll, PropostaController.getAll);
router.put(PropostaRoutes.update, PropostaController.update);
router.delete(PropostaRoutes.delete, PropostaController.delete);

export { router };

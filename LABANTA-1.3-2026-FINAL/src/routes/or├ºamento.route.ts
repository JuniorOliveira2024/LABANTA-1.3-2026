
import { Router } from "express";
import { OrcamentoController } from "../controllers/or├ºamento.controller.js";

const router = Router();

const OrcamentoRoutes = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
};

router.post(OrcamentoRoutes.create, OrcamentoController.create);
router.get(OrcamentoRoutes.getById, OrcamentoController.get);
router.get(OrcamentoRoutes.getAll, OrcamentoController.getAll);
router.put(OrcamentoRoutes.update, OrcamentoController.update);
router.delete(OrcamentoRoutes.delete, OrcamentoController.delete);

export { router };

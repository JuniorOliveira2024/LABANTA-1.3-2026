
import { Router } from "express";
import { PrestadorController } from "../controllers/prestador.controller.js";

const router = Router();

const PrestadorRoutes = {
    create: "/create",
    getById: "/get-by-id/:id",
    getAll: "/",
    update: "/update/:id",
    delete: "/delete/:id"
};

router.post(PrestadorRoutes.create, PrestadorController.create);
router.get(PrestadorRoutes.getById, PrestadorController.get);
router.get(PrestadorRoutes.getAll, PrestadorController.getAll);
router.put(PrestadorRoutes.update, PrestadorController.update);
router.delete(PrestadorRoutes.delete, PrestadorController.delete);

export { router };

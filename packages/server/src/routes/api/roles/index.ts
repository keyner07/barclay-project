import { Router } from "express";
import rolesController from "../../../controllers/roles/roles.controller";

const router = Router()


router.get("/", rolesController.getAll);
router.get("/:id", rolesController.getOne);
router.post("/", rolesController.create);
router.delete("/:id", rolesController.delete);
router.patch("/:id", rolesController.update);


export default router;
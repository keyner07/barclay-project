import { Router } from "express";
import permissionsController from "../../../controllers/permissions/permissions.controller";

const router = Router()


router.get("/", permissionsController.getAll);
router.get("/:id", permissionsController.getOne);
router.post("/create", permissionsController.create);
router.delete("/delete", permissionsController.delete);
router.post("/update/:id", permissionsController.update);


export default router;
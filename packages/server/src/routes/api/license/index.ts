import { Router } from "express";
import licensesController from "../../../controllers/license/licenses.controller";

const router = Router();

router.get("/", licensesController.getAll);
router.get("/pending", licensesController.getPending);
router.post("/", licensesController.create);
router.delete("/:id", licensesController.delete);
router.get("/:id", licensesController.getOne);
router.patch("/:id", licensesController.update);

export default router;
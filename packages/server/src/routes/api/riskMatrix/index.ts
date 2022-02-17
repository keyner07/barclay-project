import { Router } from "express";
import riskMatrixController from "../../../controllers/riskMatrix/riskMatrix.controller";

const router = Router();

router.patch("/", riskMatrixController.update);
router.patch("/add-or-update-risk-matriz", riskMatrixController.addOrCreateRiskMatriz);
router.get("/getOne", riskMatrixController.getOne);
router.get("/list-by-user-logIn", riskMatrixController.listByUserLogIn);

export default router;

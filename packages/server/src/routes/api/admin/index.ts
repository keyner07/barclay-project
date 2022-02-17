import { Router } from "express";
import PaymentController from "../../../controllers/admin/PaymentController";

const router = Router();

router.get("/dashboard/stats", PaymentController.dashboardStats)

export default router;
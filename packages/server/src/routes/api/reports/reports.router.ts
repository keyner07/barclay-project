import { Router } from "express";
import reportsController from "../../../controllers/reports/reports.controller";

const router = Router();

router.post('/ros/:searchId', reportsController.saveROSReport)
router.post('/rte/:searchId', reportsController.saveRTEReport)

export default router;
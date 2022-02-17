import { Router } from "express";
import { AuthenticateMiddleware } from "../../middlewares/authenticate.middleware";
import usersRoutes from "./users";
import rolesRoutes from "./roles";
import licenseRoutes from "./license";
import permissionsRoutes from "./permissions";
import paymentsRoutes from "./payments";
import searchRoutes from "./search";
import riskMatrix from "./riskMatrix";
import adminRoutes from "./admin";
import reportsRouter from "./reports/reports.router";

const router = Router()

router.use("/users", usersRoutes);
router.use("/roles", AuthenticateMiddleware, rolesRoutes);
router.use("/permissions", AuthenticateMiddleware, permissionsRoutes);
router.use("/licenses", AuthenticateMiddleware, licenseRoutes);
router.use("/payments", AuthenticateMiddleware, paymentsRoutes);
router.use("/search", AuthenticateMiddleware, searchRoutes);
router.use("/risk-matrix", AuthenticateMiddleware, riskMatrix);
router.use("/reports", AuthenticateMiddleware, reportsRouter);
router.use("/admin", adminRoutes);

export default router;
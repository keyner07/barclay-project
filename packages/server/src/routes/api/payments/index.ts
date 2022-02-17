import { Router } from "express";
import paymentsController from "../../../controllers/payments/payments.controller";
import { AuthenticateMiddleware } from "../../../middlewares/authenticate.middleware";

const router = Router()

router.post("/", AuthenticateMiddleware, paymentsController.create);
router.get("/", AuthenticateMiddleware, paymentsController.getAll);
router.get("/license_user/:id", AuthenticateMiddleware, paymentsController.getByLicenseUserId);
router.get("/transaction_id/:transactionId", AuthenticateMiddleware, paymentsController.getByTransactionId);


export default router;
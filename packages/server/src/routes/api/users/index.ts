import { Router } from "express";
import usersController from "../../../controllers/users/users.controller";
import { AuthenticateMiddleware } from "../../../middlewares/authenticate.middleware";

const router = Router()

router.post("/login", usersController.login);
router.post("/register", usersController.register);
router.post("/logout", AuthenticateMiddleware, usersController.logout);
router.get("/", AuthenticateMiddleware, usersController.getAll);
router.get("/:DNI", AuthenticateMiddleware, usersController.getOne);
router.delete("/delete", AuthenticateMiddleware, usersController.delete);
router.patch("/update/:DNI", AuthenticateMiddleware, usersController.update);
router.post("/add_license", AuthenticateMiddleware, usersController.addLicense);
router.post("/inactive_license/:licenseRelationId", AuthenticateMiddleware, usersController.toInactiveLicense);


export default router;
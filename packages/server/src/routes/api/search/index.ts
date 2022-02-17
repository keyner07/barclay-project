import { Router } from "express";
import searchController from "../../../controllers/search/search.controller";

const router = Router();

router.post("/fisica", searchController.searchFisica);
router.post("/juridica", searchController.searchJuridica);
router.get("/", searchController.getAll);
router.post("/google-consulting", searchController.googleConsulting);
router.get("/:id", searchController.getOne);
router.patch('/save-results', searchController.replaceResults);


export default router;

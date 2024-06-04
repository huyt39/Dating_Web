import { Router } from "express";
import * as controller from "../../controllers/client/partner.controller"

const router: Router = Router();

router.get("/:slugCategory", controller.index);
router.get("/detail/:slugPartner", controller.detail);
export const partnerRoutes: Router = router;
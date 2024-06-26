import { Router } from "express";
import * as controller from "../../controllers/client/profile.controller";

const router: Router = Router();

router.get("/", controller.index);
router.post("/edit",controller.edit);

export const profileRoutes: Router = router;

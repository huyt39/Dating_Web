import { Router } from "express";
import * as controller from "../../controllers/client/home.controller"

const router: Router = Router();

router.get("/", controller.index);
export const homeRoutes: Router = router;
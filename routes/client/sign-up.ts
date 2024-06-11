import { Router } from "express";
import * as controller from "../../controllers/client/sign-up.controller"

const router: Router = Router();

router.get("/", controller.index);
export const signUpRoutes: Router = router;
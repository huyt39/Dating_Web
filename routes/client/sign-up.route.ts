import { Router } from "express";
import * as controller from "../../controllers/client/sign-up.controller"

const router: Router = Router();

router.get("/", controller.index);
router.post("/", controller.register);
export const signUpRoutes: Router = router;
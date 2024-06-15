import { Router } from "express";
import * as controller from "../../controllers/client/log-in.controller";

const router: Router = Router();

router.get("/", controller.index);
router.post("/", controller.login);
router.get("/logout", controller.logout);

export const logInRoutes: Router = router;

import { Router } from "express";
import { index, register } from "../../controllers/client/sign-up.controller";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = Router();

router.get("/", index);
router.post("/", upload.array("photos", 3), register);

export const signUpRoutes: Router = router;

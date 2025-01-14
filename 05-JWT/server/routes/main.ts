import express from "express";
const router = express.Router();
import { login, dashboard } from "../controllers/main";
import { authMiddleware } from "../middleware/auth";

router.route("/login").post(login);
router.route("/dashboard").get(authMiddleware, dashboard);

export default router;

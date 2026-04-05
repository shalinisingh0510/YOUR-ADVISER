import express from "express";
import { login, signup, getProfile } from "./auth.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", requireAuth, getProfile);

export default router;

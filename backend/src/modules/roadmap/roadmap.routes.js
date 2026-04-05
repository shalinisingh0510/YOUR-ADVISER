import express from "express";
import { generateRoadmap, fetchRoadmap, updateProgress } from "./roadmap.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/generate", requireAuth, generateRoadmap);
router.get("/", requireAuth, fetchRoadmap);
router.patch("/progress", requireAuth, updateProgress);

export default router;

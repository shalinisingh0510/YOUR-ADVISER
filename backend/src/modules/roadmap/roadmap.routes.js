import express from "express";
import { generateRoadmap, fetchRoadmap } from "./roadmap.controller.js";
import { requireAuth } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/generate", requireAuth, generateRoadmap);
router.get("/", requireAuth, fetchRoadmap);

export default router;

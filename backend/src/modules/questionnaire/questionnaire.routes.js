import express from "express";
import { requireAuth } from "../../middlewares/auth.middleware.js";
import {
  getQuestionnaire,
  submitAptitude,
  submitQuestionnaire
} from "./questionnaire.controller.js";

const router = express.Router();

router.get("/", requireAuth, getQuestionnaire);
router.post("/submit", requireAuth, submitQuestionnaire);
router.post("/aptitude", requireAuth, submitAptitude);

export default router;

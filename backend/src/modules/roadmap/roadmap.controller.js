import { 
  generateGroqRoadmap, 
  getUserRoadmap, 
  updateUserProgress, 
  updateRoadmapNotes, 
  getRoadmapHistory 
} from "./roadmap.service.js";
import pool from "../../config/db.js";

export const generateRoadmap = async (req, res) => {
  try {
    console.log(`🧠 [Roadmap] Fetching answers for user: ${req.user.id}`);
    const qaResult = await pool.query(`SELECT answers FROM questionnaire_answers WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`, [req.user.id]);
    const aptResult = await pool.query(`SELECT answers FROM aptitude_answers WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`, [req.user.id]);

    const qaAnswers = qaResult.rows[0]?.answers || {};
    const aptAnswers = aptResult.rows[0]?.answers || {};

    if (!qaAnswers.topics && !qaAnswers.interests) {
      console.warn(`⚠️ [Roadmap] User ${req.user.id} has no questionnaire answers. Using defaults.`);
    }

    // Simple Aptitude Scoring Logic
    let score = 0;
    if (aptAnswers.logic_1 === "32") score += 50;
    if (aptAnswers.focus_1 === "Practice coding a recent topic") score += 50;

    const combinedAnswers = { 
      ...qaAnswers, 
      aptitude_score: score,
      aptitude_level: score >= 100 ? "Advanced" : score >= 50 ? "Intermediate" : "Beginner"
    };

    console.log(`🤖 [Roadmap] Initializing AI generation for user: ${req.user.id}`);
    const roadmap = await generateGroqRoadmap(req.user.id, combinedAnswers);
    console.log(`✅ [Roadmap] Generation successful for user: ${req.user.id}`);
    
    return res.status(201).json({ message: "Roadmap generated", roadmap });
  } catch (error) {
    console.error("❌ Roadmap generation controller error:", error);
    return res.status(500).json({ 
      message: "Engineering error during roadmap construction.",
      debug: error.message,
      stack: error.stack
    });
  }
};

export const fetchRoadmap = async (req, res) => {
  try {
    const roadmap = await getUserRoadmap(req.user.id);
    if (!roadmap) {
      return res.status(404).json({ message: "No active roadmap found." });
    }
    return res.status(200).json({ roadmap });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch roadmap" });
  }
};

export const updateProgress = async (req, res) => {
  const { progress } = req.body;
  try {
    const updated = await updateUserProgress(req.user.id, progress);
    return res.status(200).json({ message: "Progress updated", roadmap: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update progress" });
  }
};

export const updateNotes = async (req, res) => {
  const { notes } = req.body;
  try {
    const updated = await updateRoadmapNotes(req.user.id, notes);
    return res.status(200).json({ message: "Notes updated", roadmap: updated });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to update notes" });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await getRoadmapHistory(req.user.id);
    return res.status(200).json({ history });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch history" });
  }
};

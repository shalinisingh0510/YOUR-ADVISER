import { generateGroqRoadmap, getUserRoadmap, updateUserProgress } from "./roadmap.service.js";
import pool from "../../config/db.js";

export const generateRoadmap = async (req, res) => {
  try {
    // Fetch user's latest questionnaire and aptitude answers from DB
    const qaResult = await pool.query(`SELECT answers FROM questionnaire_answers WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`, [req.user.id]);
    const aptResult = await pool.query(`SELECT answers FROM aptitude_answers WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`, [req.user.id]);

    const qaAnswers = qaResult.rows[0]?.answers || {};
    const aptAnswers = aptResult.rows[0]?.answers || {};

    const combinedAnswers = { ...qaAnswers, ...aptAnswers };

    const roadmap = await generateGroqRoadmap(req.user.id, combinedAnswers);
    return res.status(201).json({ message: "Roadmap generated", roadmap });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to generate roadmap" });
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

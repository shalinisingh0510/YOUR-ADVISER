import { generateGroqRoadmap, getUserRoadmap } from "./roadmap.service.js";

export const generateRoadmap = async (req, res) => {
  const { answers } = req.body;
  
  if (!answers) {
    return res.status(400).json({ message: "Answers are required to generate a roadmap." });
  }

  try {
    const roadmap = await generateGroqRoadmap(req.user.id, answers);
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

import Groq from "groq-sdk";
import pool from "../../config/db.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const generateGroqRoadmap = async (userId, answers) => {
  const prompt = `
    You are a world-class career strategist and senior software architect. 
    Design a high-precision, 8-week learning roadmap for a user with the following profile:
    
    Target Domain: ${answers.topics || answers.interests || "Full Stack Development"}
    Current Level: ${answers.aptitude_level || "Beginner"}
    Commitment: ${answers.time_commitment || "5-8 hours/week"}
    Learning Style: ${answers.learning_ability || "Visual/Practical"}

    Requirements:
    1. Weekly structure: title, duration, focus_skills (array), and difficulty (1-10).
    2. Minimum 4 granual tasks per week. Each task must have: id, title, type (theory/coding/project), and duration_estimate.
    3. Minimum 3 high-quality resources per week with real-world titles (e.g., specific YouTube channels or documentation sites).
    4. Ensure the progression is logical and builds on previous weeks.

    Return ONLY a JSON object:
    {
      "roadmap": [
        {
          "id": "w1",
          "title": "...",
          "focus_skills": ["...", "..."],
          "difficulty": 3,
          "tasks": [
            { "id": "t1", "title": "...", "type": "coding", "duration": "2h" }
          ],
          "resources": [
            { "title": "...", "type": "video", "url": "https://..." }
          ]
        }
      ]
    }
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an elite career intelligence API. Output valid JSON only. Be ultra-specific and realistic with resource URLs."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama3-70b-8192",
      temperature: 0.45,
      response_format: { type: "json_object" }
    });

    const outputString = chatCompletion.choices[0]?.message?.content || "{}";
    const outputJSON = JSON.parse(outputString);
    const roadmapArray = outputJSON.roadmap || [];

    // Save to DB
    const result = await pool.query(
      `INSERT INTO roadmaps (user_id, focus_area, content)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [userId, (answers.topics || answers.interests || "Primary Focus").toString(), JSON.stringify(roadmapArray)]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Groq generation failed", error);
    throw new Error("Roadmap architect failed to initialize. Resource exhaustion or API limits.");
  }
};

export const getUserRoadmap = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM roadmaps WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
    [userId]
  );
  return result.rows[0];
};

export const toggleTaskStatus = async (userId, roadmapId, taskId) => {
  return { message: "Task toggled" };
};

export const updateUserProgress = async (userId, progress) => {
  const result = await pool.query(
    `UPDATE roadmaps 
     SET progress = $1 
     WHERE user_id = $2 
     RETURNING *`,
    [progress, userId]
  );
  return result.rows[0];
};

export const updateRoadmapNotes = async (userId, notes) => {
  const result = await pool.query(
    `UPDATE roadmaps 
     SET notes = $1 
     WHERE user_id = $2 
     ORDER BY created_at DESC 
     LIMIT 1
     RETURNING *`,
    [notes, userId]
  );
  return result.rows[0];
};

export const getRoadmapHistory = async (userId) => {
  const result = await pool.query(
    `SELECT id, focus_area, progress, version_name, created_at 
     FROM roadmaps 
     WHERE user_id = $1 
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

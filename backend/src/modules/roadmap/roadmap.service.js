import Groq from "groq-sdk";
import pool from "../../config/db.js";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const generateGroqRoadmap = async (userId, answers) => {
  const prompt = `
    You are an expert career counselor and senior developer. 
    Based on the following user profile, generate a comprehensive, week-by-week learning roadmap.

    User Profile:
    - Learning Preference: ${answers.learning_ability || "Average"}
    - Topics of Interest: ${Array.isArray(answers.topics || answers.interests) ? (answers.topics || answers.interests).join(', ') : (answers.topics || answers.interests || "Web Development")}
    - Available Time: ${answers.time_commitment || "5-7 hours"}
    - Current Level: ${answers.aptitude_level || "Beginner"}

    Return ONLY a valid JSON object matching the following structure exactly. 
    It MUST have a root key "roadmap" containing an array of weekly objects.
    {
      "roadmap": [
        {
          "id": "week1",
          "title": "Week Title",
          "duration": "Week 1",
          "status": "active",
          "tasks": [
            { "id": "t1", "title": "Task 1", "type": "reading" },
            { "id": "t2", "title": "Task 2", "type": "video" },
            { "id": "t3", "title": "Task 3", "type": "practice" }
          ],
          "resources": [
            { "title": "Resource 1", "type": "video", "url": "https://youtube.com/..." }
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
          content: "You are an API that outputs strict, valid JSON. Never return conversational text."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama3-8b-8192",
      temperature: 0.5,
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
      [userId, (answers.topics || answers.interests || "General").toString(), JSON.stringify(roadmapArray)]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Groq generation failed", error);
    throw new Error("Failed to generate roadmap from AI.");
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

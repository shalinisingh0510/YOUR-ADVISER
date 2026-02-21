import pool from "../../config/db.js";

export const processQuestionnaire = (answers) => {
  const signals = {
    learningAbility: answers.learning_ability || "Average pace",
    languagePref: answers.language_pref || "English",
    aptitude: answers.aptitude_level || "Beginner",
    priorKnowledge: answers.prior_knowledge || "No experience",
    consistency: answers.consistency || "3-4 days",
    interests: answers.interests || []
  };

  return signals;
};

export const saveQuestionnaireAnswers = async ({ userId, answers, signals }) => {
  const result = await pool.query(
    `INSERT INTO questionnaire_answers (user_id, answers, signals)
     VALUES ($1, $2, $3)
     RETURNING id, created_at`,
    [userId, answers, signals]
  );

  return result.rows[0];
};

export const saveAptitudeAnswers = async ({ userId, answers }) => {
  const result = await pool.query(
    `INSERT INTO aptitude_answers (user_id, answers)
     VALUES ($1, $2)
     RETURNING id, created_at`,
    [userId, answers]
  );

  return result.rows[0];
};

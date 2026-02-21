import { questionnaireSchema } from "./questionnaire.schema.js";
import { validateAnswers } from "./questionnaire.validator.js";
import {
  processQuestionnaire,
  saveAptitudeAnswers,
  saveQuestionnaireAnswers
} from "./questionnaire.service.js";

export const getQuestionnaire = (req, res) => {
  res.json({ questions: questionnaireSchema });
};

export const submitQuestionnaire = async (req, res) => {
  const { answers } = req.body;
  const { valid, errors } = validateAnswers(answers);

  if (!valid) {
    return res.status(400).json({ message: "Invalid answers", errors });
  }

  try {
    const signals = processQuestionnaire(answers);
    const record = await saveQuestionnaireAnswers({
      userId: req.user.id,
      answers,
      signals
    });

    return res.status(201).json({
      message: "Questionnaire submitted",
      record,
      signals
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save answers" });
  }
};

export const submitAptitude = async (req, res) => {
  const { answers } = req.body;
  if (!answers || typeof answers !== "object") {
    return res.status(400).json({ message: "Answers required" });
  }

  try {
    const record = await saveAptitudeAnswers({ userId: req.user.id, answers });
    return res.status(201).json({ message: "Aptitude saved", record });
  } catch (error) {
    return res.status(500).json({ message: "Failed to save aptitude" });
  }
};

import { questionnaireSchema } from "./questionnaire.schema.js";

export const validateAnswers = (answers = {}) => {
  const errors = [];

  questionnaireSchema.forEach((question) => {
    const value = answers[question.id];
    if (question.required && (value === undefined || value === null || value === "")) {
      errors.push(`${question.id} is required`);
      return;
    }

    if (question.type === "multi") {
      if (!Array.isArray(value)) {
        errors.push(`${question.id} must be an array`);
        return;
      }
      value.forEach((entry) => {
        if (!question.options.includes(entry)) {
          errors.push(`${question.id} has invalid option`);
        }
      });
      return;
    }

    if (question.options && value && !question.options.includes(value)) {
      errors.push(`${question.id} has invalid option`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
};


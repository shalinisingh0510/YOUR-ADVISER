export const questionnaireSchema = [
  {
    id: "learning_ability",
    type: "scale",
    prompt: "How fast do you learn new concepts?",
    options: ["Slow and steady", "Average pace", "Fast learner", "Very fast learner"],
    required: true
  },
  {
    id: "language_pref",
    type: "mcq",
    prompt: "Preferred learning language",
    options: ["English", "Hindi", "Tamil", "Bengali", "Other"],
    required: true
  },
  {
    id: "aptitude_level",
    type: "scale",
    prompt: "Rate your current aptitude confidence",
    options: ["Beginner", "Growing", "Confident", "Expert"],
    required: true
  },
  {
    id: "prior_knowledge",
    type: "mcq",
    prompt: "Your current experience level",
    options: ["No experience", "Some basics", "Intermediate", "Advanced"],
    required: true
  },
  {
    id: "consistency",
    type: "scale",
    prompt: "How consistent can you be each week?",
    options: ["2-3 days", "3-4 days", "5 days", "Daily"],
    required: true
  },
  {
    id: "interests",
    type: "multi",
    prompt: "Which topics interest you most?",
    options: ["Web Development", "Data Science", "UI/UX", "Mobile Apps", "AI/ML"],
    required: true
  }
];

import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Brain, Clock, Sparkles, CheckCircle2 } from "lucide-react";

const fallbackQuestions = [
  {
    id: "learn_style",
    type: "mcq",
    prompt: "How do you prefer to learn?",
    icon: <Brain className="w-6 h-6 text-indigo-500" />,
    options: ["Video Tutorials", "Written Articles", "Hands-on Projects", "Mix of Everything"],
  },
  {
    id: "time_commitment",
    type: "scale",
    prompt: "How many hours can you dedicate per week?",
    icon: <Clock className="w-6 h-6 text-cyan-500" />,
    options: ["2-4 hours", "5-7 hours", "8-10 hours", "10+ hours"],
  },
  {
    id: "topics",
    type: "multi",
    prompt: "Which topics excite you the most? (Select multiple)",
    icon: <Sparkles className="w-6 h-6 text-pink-500" />,
    options: ["Frontend Web", "Backend Systems", "Machine Learning", "Mobile Apps", "UI/UX Design"],
  },
];

export default function Questionnaire() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    let mounted = true;
    api
      .get("/api/questionnaire")
      .then((response) => {
        if (mounted) {
          setQuestions(response.data?.questions?.length > 0 ? response.data.questions : fallbackQuestions);
          setStatus({ loading: false, error: "" });
        }
      })
      .catch(() => {
        if (mounted) {
          setQuestions(fallbackQuestions);
          setStatus({ loading: false, error: "" });
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const updateAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const toggleMulti = (id, value) => {
    const list = answers[id] || [];
    if (list.includes(value)) {
      updateAnswer(
        id,
        list.filter((item) => item !== value)
      );
    } else {
      updateAnswer(id, [...list, value]);
    }
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const onSubmit = async () => {
    setStatus({ loading: true, error: "" });
    try {
      await api.post("/api/questionnaire/submit", { answers });
      navigate("/aptitude");
    } catch (error) {
      setStatus({
        loading: false,
        error: error?.response?.data?.message || "Submission failed. Try again.",
      });
    }
  };

  const isCurrentStepValid = () => {
    if (!questions[currentStep]) return false;
    const currentQ = questions[currentStep];
    const answer = answers[currentQ.id];
    if (currentQ.type === "multi") {
      return answer && answer.length > 0;
    }
    return !!answer;
  };

  const progress = questions.length > 0 ? ((currentStep) / questions.length) * 100 : 0;

  if (status.loading && questions.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 mx-auto max-w-4xl relative min-h-[80vh] flex flex-col justify-center">
      {/* Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-pink-500/10 blur-[100px] -z-10 rounded-full" />

      {/* Header & Progress */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-sm text-sm font-medium">
            <span className="text-cyan-600 dark:text-cyan-400 tracking-wider uppercase text-xs font-bold">Step 1 of 2</span>
            <span className="text-slate-400 mx-1">•</span>
            <span className="text-slate-700 dark:text-slate-300">Learning Profile</span>
          </div>
          <NavLink to="/aptitude" className="text-sm text-slate-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors hover:underline">
            Skip for now
          </NavLink>
        </div>

        <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-slate-200/20 dark:shadow-black/40 border border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden min-h-[400px] flex flex-col">
        {status.error && (
          <div className="mb-6 p-4 rounded-xl bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-100 dark:border-pink-500/20 flex items-center justify-between">
            <span>{status.error}</span>
          </div>
        )}

        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {questions[currentStep] && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full absolute inset-0"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-800 shadow-sm">
                    {questions[currentStep].icon || <Brain className="w-6 h-6 text-cyan-500" />}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold font-display text-slate-900 dark:text-white leading-tight tracking-tight drop-shadow-sm">
                    {questions[currentStep].prompt}
                  </h2>
                </div>

                <div className={`grid gap-4 ${questions[currentStep].type === 'scale' ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {questions[currentStep].options.map((option) => {
                    const isSelected = questions[currentStep].type === 'multi'
                      ? (answers[questions[currentStep].id] || []).includes(option)
                      : answers[questions[currentStep].id] === option;

                    return (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        key={option}
                        onClick={() => {
                          if (questions[currentStep].type === 'multi') {
                            toggleMulti(questions[currentStep].id, option);
                          } else {
                            updateAnswer(questions[currentStep].id, option);
                            // Auto advance for single choice if not on last step
                            if (currentStep < questions.length - 1) {
                              setTimeout(() => handleNext(), 300);
                            }
                          }
                        }}
                        className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-200 overflow-hidden flex items-center justify-between group
                          ${isSelected
                            ? 'bg-cyan-50/50 dark:bg-cyan-500/10 border-cyan-500 shadow-md shadow-cyan-500/10'
                            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-cyan-500/30'
                          }
                        `}
                      >
                        <span className={`font-semibold text-lg ${isSelected ? 'text-cyan-700 dark:text-cyan-400' : 'text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400'}`}>
                          {option}
                        </span>

                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ml-4
                          ${isSelected ? 'bg-cyan-500 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'border-slate-300 dark:border-slate-600'}
                        `}>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={currentStep === 0}
            onClick={handlePrev}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30 disabled:hover:text-slate-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back
          </motion.button>

          {currentStep === questions.length - 1 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!isCurrentStepValid() || status.loading}
              onClick={onSubmit}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 disabled:opacity-50 disabled:shadow-none transition-all"
            >
              {status.loading ? "Saving..." : "Complete Profile"}
              {!status.loading && <Sparkles className="w-5 h-5" />}
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!isCurrentStepValid()}
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md shadow-slate-900/10 dark:shadow-white/10 disabled:opacity-50 transition-all hover:bg-slate-800 dark:hover:bg-slate-100"
            >
              Next <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}

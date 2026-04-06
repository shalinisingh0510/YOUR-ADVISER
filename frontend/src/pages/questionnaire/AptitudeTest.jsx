import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import api from "../../services/api.js";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Lightbulb, Focus, Sparkles, CheckCircle2, Zap, Trophy } from "lucide-react";

const sampleQuestions = [
  {
    id: "logic_1",
    prompt: "Which pattern comes next in the sequence: 2, 4, 8, 16, ?",
    icon: <Lightbulb className="w-6 h-6 text-pink-500" />,
    options: ["18", "24", "32", "40"],
  },
  {
    id: "focus_1",
    prompt: "You have 1 hour today. What do you prioritize?",
    icon: <Focus className="w-6 h-6 text-indigo-500" />,
    options: ["Watch a new concept video", "Practice coding a recent topic", "Review flashcards/notes", "Plan the rest of the week"],
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { staggerChildren: 0.1, duration: 0.5 }
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

export default function AptitudeTest() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState({ loading: false, error: "" });

  const updateAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    if (currentStep < sampleQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async () => {
    setStatus({ loading: true, error: "" });
    try {
      await api.post("/api/questionnaire/aptitude", { answers });
      await api.post("/api/roadmap/generate", {});
      navigate("/roadmap");
    } catch (error) {
      setStatus({
        loading: false,
        error: error?.response?.data?.message || "Submission failed. Try again.",
      });
    }
  };

  const isCurrentStepValid = () => {
    if (!sampleQuestions[currentStep]) return false;
    const currentQ = sampleQuestions[currentStep];
    return !!answers[currentQ.id];
  };

  const progress = sampleQuestions.length > 0 ? ((currentStep + 1) / sampleQuestions.length) * 100 : 0;
  const currentQ = sampleQuestions[currentStep];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-50 selection:bg-cyan-500/30 transition-colors duration-500 relative flex flex-col pt-32 lg:pt-40">
      {/* Premium Background Ornaments */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden -z-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-pink-600/10 dark:bg-pink-600/5 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-cyan-600/10 dark:bg-cyan-600/5 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      <div className="container px-4 md:px-8 mx-auto max-w-5xl flex-1 flex flex-col py-12">
        {/* Navigation & Progress Header */}
        <div className="flex flex-col gap-8 mb-12">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium text-sm">Back to Profile</span>
            </button>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold tracking-widest uppercase opacity-40">Cognitive Assessment</span>
              <NavLink to="/roadmap" className="text-xs font-bold tracking-widest uppercase text-pink-600 dark:text-pink-400 hover:opacity-80 transition-opacity">
                Skip for now
              </NavLink>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Sharpen the edge.</h1>
                <p className="text-slate-500 dark:text-slate-400 font-light">Let's check your problem-solving velocity.</p>
              </div>
              <div className="text-right">
                <span className="text-4xl font-black font-mono opacity-10 dark:opacity-20 leading-none">{Math.round(progress)}%</span>
              </div>
            </div>
            <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-pink-500 via-indigo-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8, ease: "circOut" }}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          <div className="space-y-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-10"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-sm text-pink-600 dark:text-pink-400">
                    {currentQ.icon || <Lightbulb className="w-8 h-8" />}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight max-w-xl">
                    {currentQ.prompt}
                  </h2>
                </div>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = answers[currentQ.id] === option;

                    return (
                      <motion.button
                        key={option}
                        variants={itemVariants}
                        whileHover={{ scale: 1.01, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          updateAnswer(currentQ.id, option);
                          if (currentStep < sampleQuestions.length - 1) {
                            setTimeout(() => handleNext(), 400);
                          }
                        }}
                        className={`group relative p-6 rounded-[1.5rem] border-2 text-left transition-all duration-300 flex items-center justify-between
                          ${isSelected 
                            ? 'bg-white dark:bg-slate-800 border-pink-500 shadow-xl shadow-pink-500/10' 
                            : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
                          }
                        `}
                      >
                        <div className="flex items-center gap-5">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold transition-colors
                            ${isSelected ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/40' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'}
                          `}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className={`text-lg font-semibold transition-colors ${isSelected ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'}`}>
                            {option}
                          </span>
                        </div>
                        
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0
                          ${isSelected ? 'bg-pink-500 border-pink-500' : 'border-slate-300 dark:border-slate-700'}
                        `}>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-6 pt-8 relative z-10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="px-8 py-4 rounded-2xl font-bold flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-20 transition-all border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm"
              >
                <ArrowLeft className="w-5 h-5" /> Previous
              </motion.button>

              {currentStep === sampleQuestions.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onSubmit}
                  disabled={!isCurrentStepValid() || status.loading}
                  className="flex-1 px-8 py-4 rounded-2xl font-black bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.05)] flex items-center justify-center gap-3 transition-all hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 group cursor-pointer pointer-events-auto"
                >
                  {status.loading ? "Architecting your path..." : "Generate My Roadmap"}
                  {!status.loading && <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />}
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  disabled={!isCurrentStepValid()}
                  className="flex-1 px-8 py-4 rounded-2xl font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl flex items-center justify-center gap-2 transition-all hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 cursor-pointer pointer-events-auto"
                >
                  Continue <ArrowRight className="w-5 h-5" />
                </motion.button>
              )}
            </div>
            {status.error && (
              <p className="text-pink-600 dark:text-pink-400 text-sm font-medium animate-shake text-center">{status.error}</p>
            )}
          </div>

          <aside className="hidden lg:block space-y-8 sticky top-32">
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-pink-600 to-indigo-600 text-white shadow-2xl shadow-pink-600/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
              <Trophy className="w-10 h-10 mb-6 text-pink-200" />
              <h4 className="text-xl font-bold mb-3 tracking-tight">Final Step</h4>
              <p className="text-pink-100 font-light text-sm leading-relaxed">
                By understanding your current logical baseline, our engine can calibrate the difficulty curve of your roadmap milestones.
              </p>
            </div>

            <div className="p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <h4 className="text-sm font-bold tracking-widest uppercase opacity-40 mb-6">Assessment Data</h4>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500 font-medium">Questions</span>
                  <span className="text-sm font-bold">{currentStep + 1} / {sampleQuestions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500 font-medium">Type</span>
                  <span className="text-xs px-2 py-1 rounded bg-pink-500/10 text-pink-600 dark:text-pink-400 font-bold uppercase">Logic & Prioritization</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}


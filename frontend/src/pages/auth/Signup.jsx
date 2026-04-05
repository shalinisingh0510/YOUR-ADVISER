import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signup } from "../../services/auth.service.js";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, Target, ArrowRight, Sparkles, AlertCircle, CheckCircle2, Star } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    goal: "Software Development",
  });
  const [status, setStatus] = useState({ loading: false, error: "" });

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });
    try {
      await signup(form);
      navigate("/questionnaire");
    } catch (error) {
      setStatus({
        loading: false,
        error: error?.response?.data?.message || "Onboarding failed. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-50 selection:bg-indigo-500/30 transition-colors duration-500 flex items-center justify-center p-4 md:p-8 relative overflow-hidden pt-20">
      {/* Dynamic Background Ornaments */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-purple-600/10 dark:bg-purple-600/5 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl grid lg:grid-cols-[1fr_1.2fr] bg-white/70 dark:bg-slate-950/40 backdrop-blur-3xl rounded-[3rem] overflow-hidden shadow-[0_32px_120px_rgba(0,0,0,0.08)] dark:shadow-[0_32px_120px_rgba(0,0,0,0.4)] border border-white/40 dark:border-slate-800/50 relative"
      >
        {/* Visual Brand Side */}
        <div className="relative hidden lg:flex flex-col justify-between p-16 overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-indigo-950 to-purple-900 -z-10" />
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(168,85,247,0.15),transparent_50%)]" />
          
          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-xs font-bold tracking-widest uppercase mb-8"
            >
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Future-Proof Your Skills</span>
            </motion.div>
            
            <h2 className="text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Begin your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">great evolution.</span>
            </h2>
            <p className="text-indigo-100/70 text-xl font-light leading-relaxed max-w-md">
              Join thousands of architects building personalized learning paths with generative intelligence.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <h3 className="text-sm font-bold tracking-widest uppercase text-white/40">Included in access</h3>
            <div className="grid gap-4">
              {[
                "Personalized AI Roadmap Generator",
                "Curated Premium Learning Resources",
                "Cognitive Velocity Assessment",
                "Global Progress Leaderboards"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-center gap-4 text-indigo-100/90 font-medium"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  </div>
                  <span className="text-sm tracking-wide">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Signup Form Side */}
        <div className="p-8 md:p-14 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-8">
            <div className="space-y-3">
              <h3 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Create Profile</h3>
              <p className="text-slate-500 dark:text-slate-400 font-light text-lg italic">
                Let's calibrate your learning trajectory.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Identity</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-500 transition-colors">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={onChange}
                      required
                      className="w-full pl-14 pr-6 py-4 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all outline-none text-slate-950 dark:text-white font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Primary Objective</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-500 transition-colors">
                      <Target className="w-5 h-5" />
                    </div>
                    <select
                      name="goal"
                      value={form.goal}
                      onChange={onChange}
                      className="w-full pl-14 pr-6 py-4 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all outline-none text-slate-950 dark:text-white font-medium appearance-none"
                    >
                      <option>Software Development</option>
                      <option>Data Science</option>
                      <option>UX Design</option>
                      <option>Product Management</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Email Terminal</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="architect@future.com"
                    value={form.email}
                    onChange={onChange}
                    required
                    className="w-full pl-14 pr-6 py-4 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all outline-none text-slate-950 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Security Key</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-purple-500 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={onChange}
                    required
                    className="w-full pl-14 pr-6 py-4 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all outline-none text-slate-950 dark:text-white font-medium"
                  />
                </div>
              </div>

              <AnimatePresence>
                {status.error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-2xl bg-pink-50 dark:bg-pink-500/10 border border-pink-100 dark:border-pink-500/20 flex items-center gap-3 text-pink-600 dark:text-pink-400 shadow-sm shadow-pink-500/5"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <p className="text-sm font-bold m-0 italic">{status.error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 disabled:cursor-wait transition-all shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] group"
                >
                  {status.loading ? (
                    <div className="w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Begin Onboarding
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </div>

              <div className="text-center pt-6">
                <p className="text-slate-500 dark:text-slate-500 text-sm font-medium">
                  Already have an account? {" "}
                  <NavLink to="/login" className="text-slate-900 dark:text-white font-black hover:underline underline-offset-4 decoration-2 decoration-purple-500 transition-all">
                    Access Terminal
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signup } from "../../services/auth.service.js";
import { motion } from "framer-motion";
import { Mail, Lock, User, Target, ArrowRight, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";

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
        error: error?.response?.data?.message || "Signup failed. Try again.",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid md:grid-cols-2 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200/50 dark:border-slate-800/50 relative"
      >
        {/* Left Side - Visual */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-black/10 rounded-full blur-[60px] translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium mb-6 shadow-lg shadow-black/5">
              <Sparkles className="w-4 h-4" />
              <span>Create Profile</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 tracking-tight drop-shadow-sm">Start your journey.</h2>
            <p className="text-white/90 text-lg max-w-sm font-light">
              Tell us your goals and we will architect the perfect roadmap for you.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-[2rem] shadow-xl shadow-black/5">
              <h3 className="font-semibold mb-4 text-white">What you'll unlock</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm text-white/90 font-medium">
                  <div className="bg-white/20 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                  Personalized AI Roadmap
                </li>
                <li className="flex items-center gap-3 text-sm text-white/90 font-medium">
                  <div className="bg-white/20 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                  Curated Premium Resources
                </li>
                <li className="flex items-center gap-3 text-sm text-white/90 font-medium">
                  <div className="bg-white/20 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-white" /></div>
                  Weekly Progress Analytics
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center relative my-auto bg-white/50 dark:bg-slate-900/50">
          <div className="max-w-md w-full mx-auto">
            <h3 className="text-3xl font-bold mb-2 tracking-tight text-slate-900 dark:text-white">Create Account</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8 font-light">
              Already have an account? <NavLink to="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 hover:underline font-medium transition-colors">Log in</NavLink>
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={onChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={onChange}
                    required
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={onChange}
                      required
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 col-span-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Primary Goal</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                      <Target className="w-5 h-5" />
                    </div>
                    <select
                      name="goal"
                      value={form.goal}
                      onChange={onChange}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none appearance-none text-slate-900 dark:text-white"
                    >
                      <option>Software Development</option>
                      <option>Data Science</option>
                      <option>UX Design</option>
                      <option>Product Management</option>
                      <option>Digital Marketing</option>
                    </select>
                  </div>
                </div>
              </div>

              {status.error && (
                <div className="p-3.5 mt-2 rounded-xl bg-pink-50 dark:bg-pink-500/10 border border-pink-200 dark:border-pink-500/20 flex items-center gap-3 text-pink-600 dark:text-pink-400">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium m-0">{status.error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 mt-6 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-lg shadow-slate-900/10 dark:shadow-white/10"
              >
                {status.loading ? (
                  <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

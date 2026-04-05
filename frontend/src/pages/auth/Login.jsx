import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service.js";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: "" });

  const onChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus({ loading: true, error: "" });
    try {
      await login(form);
      navigate("/dashboard");
    } catch (error) {
      setStatus({
        loading: false,
        error: error?.response?.data?.message || "Login failed. Try again.",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl grid md:grid-cols-2 bg-white dark:bg-surface-dark rounded-[2.5rem] overflow-hidden shadow-2xl border border-border"
      >
        {/* Left Side - Visual */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-primary via-purple-600 to-accent text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Welcome Back</span>
            </div>
            <h2 className="text-4xl font-bold mb-4 font-display">Continue your journey.</h2>
            <p className="text-white/80 text-lg max-w-sm">
              Resume your personalized learning roadmap and track your weekly progress.
            </p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="glass-card !bg-white/10 !border-white/20 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-bold">1</span>
              </div>
              <div>
                <strong className="block text-sm">Saved Roadmaps</strong>
                <span className="text-xs text-white/70">Pick up right where you left off</span>
              </div>
            </div>
            <div className="glass-card !bg-white/10 !border-white/20 p-4 rounded-2xl flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-bold">2</span>
              </div>
              <div>
                <strong className="block text-sm">Weekly Tracking</strong>
                <span className="text-xs text-white/70">Keep your streaks alive</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
          <div className="max-w-md w-full mx-auto">
            <h3 className="text-3xl font-bold mb-2">Login</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Don't have an account? <NavLink to="/signup" className="text-primary hover:underline font-medium">Create one</NavLink>
            </p>

            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={onChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={onChange}
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                  />
                </div>
                <div className="flex justify-end pt-1">
                  <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</a>
                </div>
              </div>

              {status.error && (
                <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 flex items-center gap-3 text-red-600 dark:text-red-400">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium m-0">{status.error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 mt-4 bg-foreground text-background dark:bg-white dark:text-black rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-100 disabled:opacity-70 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
              >
                {status.loading ? (
                  <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                ) : (
                  <>
                    Sign in to your account
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

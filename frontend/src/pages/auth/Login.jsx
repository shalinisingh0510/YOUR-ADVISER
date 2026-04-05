import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service.js";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle, ShieldCheck, Zap } from "lucide-react";

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
        error: error?.response?.data?.message || "Authentication failed. Please verify your credentials.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-50 selection:bg-cyan-500/30 transition-colors duration-500 flex items-center justify-center p-4 md:p-8 relative overflow-hidden pt-20">
      {/* Dynamic Background */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[700px] h-[700px] bg-cyan-600/10 dark:bg-cyan-600/5 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl grid lg:grid-cols-[1.1fr_1fr] bg-white/70 dark:bg-slate-950/40 backdrop-blur-3xl rounded-[3rem] overflow-hidden shadow-[0_32px_120px_rgba(0,0,0,0.08)] dark:shadow-[0_32px_120px_rgba(0,0,0,0.4)] border border-white/40 dark:border-slate-800/50 relative"
      >
        {/* Visual Brand Side */}
        <div className="relative hidden lg:flex flex-col justify-between p-16 overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-slate-900 to-indigo-950 -z-10" />
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_20%,rgba(129,140,248,0.15),transparent_50%)]" />
          
          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-indigo-100 text-xs font-bold tracking-widest uppercase mb-8 shadow-2xl"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Intelligence Platform</span>
            </motion.div>
            
            <h2 className="text-5xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              Navigate your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">career velocity.</span>
            </h2>
            <p className="text-indigo-100/70 text-xl font-light leading-relaxed max-w-md">
              Securely access your personalized learning ecosystem and AI-driven growth metrics.
            </p>
          </div>

          <div className="relative z-10 grid gap-4">
            {[
              { icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />, title: "Secure Access", desc: "Enterprise-grade encryption" },
              { icon: <Zap className="w-5 h-5 text-pink-400" />, title: "Instant Sync", desc: "Across all your devices" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-5 group hover:bg-white/10 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-tight">{feature.title}</h4>
                  <p className="text-white/50 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Login Form Side */}
        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-10">
            <div className="space-y-3 text-center lg:text-left">
              <h3 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back</h3>
              <p className="text-slate-500 dark:text-slate-400 font-light text-lg italic">
                Ready to continue your evolution?
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-1">Email Terminal</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="architect@future.com"
                    value={form.email}
                    onChange={onChange}
                    required
                    className="w-full pl-14 pr-6 py-4.5 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-slate-950 dark:text-white font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Security Key</label>
                  <a href="#" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:opacity-80 transition-opacity">Reset access?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={onChange}
                    required
                    className="w-full pl-14 pr-6 py-4.5 bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-slate-950 dark:text-white font-medium"
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

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status.loading}
                  className="w-full py-5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 disabled:cursor-wait transition-all shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] group"
                >
                  {status.loading ? (
                    <div className="w-6 h-6 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Execute Login
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </div>

              <div className="text-center pt-8">
                <p className="text-slate-500 dark:text-slate-500 text-sm font-medium">
                  First time here? {" "}
                  <NavLink to="/signup" className="text-slate-900 dark:text-white font-black hover:underline underline-offset-4 decoration-2 decoration-indigo-500 transition-all">
                    Initiate Onboarding
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


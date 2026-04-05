import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Clock,
  Flame,
  CheckCircle2,
  BookOpen,
  LayoutTemplate,
  History,
  ArrowRight,
  TrendingUp,
  Award,
  Sparkles,
  Zap,
  RefreshCw,
  Target
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);

  const fetchData = async () => {
    try {
      const [profileRes, roadmapRes] = await Promise.all([
        api.get("/api/auth/profile"),
        api.get("/api/roadmap").catch(() => ({ data: { roadmap: null } }))
      ]);
      setUser(profileRes.data.user);
      setRoadmap(roadmapRes.data.roadmap);
    } catch (err) {
      console.error("Dashboard data fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRegenerate = async () => {
    setRegenerating(true);
    try {
      await api.post("/api/roadmap/generate");
      await fetchData();
    } catch (err) {
      console.error("Regeneration failed", err);
    } finally {
      setRegenerating(false);
    }
  };

  const calculateProgress = () => {
    return roadmap?.progress || 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full" 
        />
      </div>
    );
  }

  const roadmapContent = roadmap ? (typeof roadmap.content === 'string' ? JSON.parse(roadmap.content) : roadmap.content) : null;
  const roadmapArray = Array.isArray(roadmapContent) ? roadmapContent : (roadmapContent?.roadmap || []);
  
  const activeMilestones = roadmapArray.slice(0, 3).map((week, idx) => ({
    label: `Phase ${idx + 1}`,
    status: idx === 0 ? "active" : "upcoming",
    title: week.title,
    skills: week.focus_skills || []
  }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-50 selection:bg-indigo-500/30 transition-colors duration-500 pt-24 pb-12 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[800px] h-[800px] bg-indigo-600/10 dark:bg-indigo-600/5 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-purple-600/10 dark:bg-purple-600/5 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      <div className="container px-4 md:px-8 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-10"
        >
          {/* Welcome Dashboard Header */}
          <section className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative bg-white/70 dark:bg-slate-950/40 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] border border-white/40 dark:border-slate-800/50 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden">
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left z-10">
                <div className="relative">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl overflow-hidden group/avatar">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} 
                      alt="Avatar" 
                      className="w-full h-full rounded-[1.8rem] bg-slate-900 group-hover/avatar:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-[#030712] flex items-center justify-center text-indigo-500 shadow-xl">
                    <Zap className="w-5 h-5 fill-current" />
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-black tracking-widest uppercase mb-3 border border-indigo-500/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Prime Architect</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-3">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">{user?.name?.split(' ')[0] || "Architect"}</span>
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-lg font-light flex items-center justify-center md:justify-start gap-2 italic">
                    <Target className="w-4 h-4 text-indigo-500" /> Exploring: {roadmap?.focus_area || "Universal Logic"}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 z-10 w-full lg:w-auto">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRegenerate}
                  disabled={regenerating}
                  className="px-6 py-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-sm font-bold flex items-center gap-3 hover:bg-white dark:hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${regenerating ? 'animate-spin' : ''}`} />
                  {regenerating ? "Architecting..." : "Regenerate Path"}
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/roadmap")}
                  className="px-8 py-4 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-sm font-black flex items-center gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.05)] group/btn"
                >
                  Continue Journey
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </div>
          </section>

          {/* Stats & Velocity Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Active Nodes", value: roadmap ? roadmapArray.length : "0", icon: <LayoutTemplate className="w-6 h-6" />, color: "text-indigo-500", bg: "bg-indigo-500/10" },
              { label: "Pathway Progress", value: `${calculateProgress()}%`, icon: <TrendingUp className="w-6 h-6" />, color: "text-cyan-500", bg: "bg-cyan-500/10" },
              { label: "Learning Streak", value: "3 Days", icon: <Flame className="w-6 h-6" />, color: "text-pink-500", bg: "bg-pink-500/10" },
              { label: "Mastery Level", value: "Lvl 4", icon: <Award className="w-6 h-6" />, color: "text-purple-500", bg: "bg-purple-500/10" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-[2.5rem] bg-white dark:bg-slate-950/40 backdrop-blur-2xl border border-white/40 dark:border-slate-800/50 shadow-xl overflow-hidden hover:scale-[1.02] transition-all duration-500"
              >
                <div className={`absolute -right-6 -top-6 w-24 h-24 ${stat.bg} rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                <div className="flex flex-col justify-between h-full relative z-10">
                  <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} mb-8 shadow-inner border border-white/10`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-slate-500 dark:text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">{stat.label}</p>
                    <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Visual Pathway Preview */}
            <div className="lg:col-span-2 space-y-8">
              <div className="section-header flex items-center justify-between px-2">
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
                  <Zap className="w-6 h-6 text-indigo-500" /> Current Trajectory
                </h2>
                <NavLink to="/roadmap" className="text-sm font-bold text-indigo-500 hover:opacity-80 transition-opacity">Full Timeline</NavLink>
              </div>

              <div className="relative p-1 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-[3rem] shadow-2xl">
                <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur-3xl rounded-[2.8rem] p-10 space-y-12 overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] -z-10" />
                  
                  <div className="flex flex-col gap-10 relative">
                    {activeMilestones.length > 0 ? (
                      activeMilestones.map((m, i) => (
                        <div key={i} className="flex gap-8 group/item">
                          <div className="flex flex-col items-center">
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 z-10 relative shadow-2xl transition-all duration-500
                                ${m.status === 'active' ? 'bg-indigo-500 text-white scale-125 ring-[12px] ring-indigo-500/10' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'}
                              `}
                            >
                              {m.status === 'active' ? <Play className="w-4 h-4 fill-current ml-0.5" /> : <div className="w-2.5 h-2.5 rounded-full bg-current opacity-30" />}
                            </motion.div>
                            {i !== activeMilestones.length - 1 && (
                              <div className="w-1 h-full my-3 rounded-full bg-slate-100 dark:bg-slate-800/50 group-hover/item:bg-indigo-500/20 transition-colors" />
                            )}
                          </div>

                          <div className={`flex-1 pb-10 ${m.status === 'active' ? 'opacity-100' : 'opacity-40'}`}>
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-xs font-black uppercase tracking-widest text-indigo-500 tracking-thinner">{m.label}</span>
                              {m.status === 'active' && <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500 text-[10px] font-black uppercase ring-1 ring-indigo-500/20 animate-pulse">Running</span>}
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">{m.title}</h4>
                            <div className="flex flex-wrap gap-2">
                              {m.skills.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-xs font-bold border border-slate-200 dark:border-slate-800">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-20 text-center space-y-4">
                        <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center mx-auto text-slate-400 mb-6 border border-dashed border-slate-200 dark:border-slate-800">
                          <History className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold dark:text-white">The board is blank.</h3>
                        <p className="text-slate-500 font-light">Complete the assessment to render your trajectory.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Side Intelligence Widgets */}
            <aside className="space-y-10">
              <div className="space-y-6">
                <h2 className="text-xl font-black tracking-tight px-2 flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-purple-500" /> Resource Matrix
                </h2>
                <div className="bg-white/70 dark:bg-slate-950/40 backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white/40 dark:border-slate-800/50 shadow-xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  
                  <div className="space-y-5 relative">
                    {roadmap ? (
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light italic">
                        The AI has curated <span className="text-indigo-500 font-bold">12 premium modules</span> specifically for your progression velocity. Access them in the Roadmap view.
                      </p>
                    ) : (
                      <p className="text-sm text-slate-500 font-light italic text-center">Intelligence pending...</p>
                    )}
                    <button onClick={() => navigate("/roadmap")} className="w-full py-4 rounded-2xl bg-indigo-500 text-white text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20">
                      Open Learning Matrix
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-black tracking-tight px-2 flex items-center gap-3">
                  <History className="w-5 h-5 text-slate-400" /> Version Control
                </h2>
                <div className="space-y-4">
                  <div className="p-6 rounded-[2rem] bg-white/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800/50 flex items-center justify-between group cursor-pointer hover:bg-white dark:hover:bg-slate-900 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-500 transition-colors">
                        <History className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold dark:text-white">v1.0 Basic Path</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Archive</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function NavLink({ to, children, className }) {
  return <a href={to} className={className}>{children}</a>;
}


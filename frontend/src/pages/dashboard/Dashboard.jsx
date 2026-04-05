import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import { motion } from "framer-motion";
import {
  Play,
  Clock,
  Flame,
  CheckCircle2,
  CircleDashed,
  BookOpen,
  LayoutTemplate,
  History,
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchData();
  }, []);

  const calculateProgress = () => {
    if (!roadmap || !roadmap.content) return 0;
    const content = typeof roadmap.content === 'string' ? JSON.parse(roadmap.content) : roadmap.content;
    const roadmapArray = Array.isArray(content) ? content : (content.roadmap || []);
    if (roadmapArray.length === 0) return 0;
    // For now, return a calculation or just the progress from db if we implemented that
    return roadmap.progress || 0;
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
      </div>
    );
  }

  const roadmapContent = roadmap ? (typeof roadmap.content === 'string' ? JSON.parse(roadmap.content) : roadmap.content) : null;
  const roadmapArray = Array.isArray(roadmapContent) ? roadmapContent : (roadmapContent?.roadmap || []);
  const activeMilestones = roadmapArray.slice(0, 4).map((week, idx) => ({
    label: `Week ${idx + 1}`,
    status: idx === 0 ? "active" : "upcoming",
    title: week.title
  }));

  return (
    <div className="container px-4 py-8 mx-auto max-w-6xl w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-slate-200/20 dark:shadow-black/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-medium text-xs mb-4 border border-cyan-500/20">
              <Award className="w-3.5 h-3.5" />
              <span>Learning Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight drop-shadow-sm">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">{user?.name || "Member"}</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-light">Your current goal: <strong className="text-slate-700 dark:text-slate-300 font-semibold">{roadmap?.focus_area || "Generate a Roadmap"}</strong></p>
          </div>

          <div className="flex gap-3 relative z-10 shrink-0">
            <button onClick={() => navigate("/roadmap")} className="px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              View Roadmap
            </button>
            <button onClick={() => navigate("/roadmap")} className="px-5 py-2.5 rounded-full bg-cyan-500 text-white dark:bg-cyan-500 dark:text-white text-sm font-bold hover:bg-cyan-600 transition-colors shadow-md shadow-cyan-500/25">
              Continue Learning
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Roadmap Status", value: roadmap ? "Active" : "None", icon: <BookOpen className="w-5 h-5 text-cyan-500" />, trend: roadmap ? "Up to date" : "Needs start" },
            { label: "Completed Steps", value: roadmap?.progress || "0", icon: <CheckCircle2 className="w-5 h-5 text-indigo-500" />, trend: "Keep it up" },
            { label: "Daily Streak", value: "1 day", icon: <Flame className="w-5 h-5 text-pink-500" />, trend: "Fresh start!" },
          ].map((stat, i) => (
            <div key={i} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md shadow-slate-200/20 dark:shadow-black/20 flex items-start justify-between group hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-colors">
              <div>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{stat.value}</h3>
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md w-fit border border-emerald-100 dark:border-emerald-500/20">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                {stat.icon}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            {/* Progress Card */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md shadow-slate-200/20 dark:shadow-black/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="flex justify-between items-end mb-6 relative z-10">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">Overall Progress</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-light">{roadmap ? "Your learning path progress" : "No active roadmap"}</p>
                </div>
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">{calculateProgress()}%</span>
              </div>

              <div className="h-4 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden relative z-10 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress()}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                />
              </div>

              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl" />
            </div>

            {/* Path visualization */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md shadow-slate-200/20 dark:shadow-black/20">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-100 dark:border-indigo-800/50">
                    <LayoutTemplate className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Active Roadmap</h2>
                </div>
                <button onClick={() => navigate("/roadmap")} className="text-sm text-cyan-600 dark:text-cyan-400 font-medium hover:text-cyan-500 transition-colors hover:underline">View Full Path</button>
              </div>

              <div className="space-y-0 relative z-10">
                {activeMilestones.length > 0 ? (
                  activeMilestones.map((m, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors
                          ${m.status === 'complete' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25' :
                            m.status === 'active' ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/20 shadow-md shadow-cyan-500/25' :
                              'bg-slate-50 dark:bg-slate-800 text-slate-400 border-2 border-dashed border-slate-300 dark:border-slate-700'}
                        `}>
                          {m.status === 'complete' && <CheckCircle2 className="w-4 h-4" />}
                          {m.status === 'active' && <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />}
                        </div>
                        {i !== activeMilestones.length - 1 && (
                          <div className={`w-0.5 h-full my-1 rounded-full ${m.status === 'complete' ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                        )}
                      </div>

                      <div className={`pb-8 pt-1 ${m.status !== 'upcoming' ? 'opacity-100' : 'opacity-50'}`}>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{m.label}</p>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white drop-shadow-sm">{m.title}</h4>
                        {m.status === 'active' && (
                          <div onClick={() => navigate("/roadmap")} className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-sm font-medium border border-cyan-500/20 cursor-pointer hover:bg-cyan-500/20 transition-colors">
                            Resume Chapter <ArrowRight className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                   <div className="text-slate-500 dark:text-slate-400">Complete the questionnaire to see your roadmap milestones.</div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar Area */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Today's Lessons Card */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md shadow-slate-200/20 dark:shadow-black/20 relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />

              <div className="flex items-center justify-between mb-6 relative z-10">
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Recent Tasks</h2>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 font-light italic">
                 {roadmap ? "Check your latest roadmap for tasks." : "Tasks will appear here once you have a roadmap."}
              </div>
            </div>

            {/* Versions History */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md shadow-slate-200/20 dark:shadow-black/20">
              <div className="flex items-center gap-2 mb-6">
                <History className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Roadmap History</h2>
              </div>

              <div className="space-y-3 relative z-10">
                {/* Placeholder for history */}
                <div className="text-sm text-slate-500 dark:text-slate-400">No history available yet.</div>
              </div>
            </div>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

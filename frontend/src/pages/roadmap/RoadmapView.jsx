import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api.js";
import {
  CheckCircle2,
  Circle,
  BookOpen,
  MonitorPlay,
  FileText,
  PenTool,
  Calendar,
  ChevronRight,
  TrendingUp,
  Save,
  Clock,
  Layout,
  Star,
  Zap,
  ArrowLeft,
  ExternalLink,
  BrainCircuit
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function RoadmapView() {
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState({});
  const [activeWeek, setActiveWeek] = useState(null);
  const [roadmapData, setRoadmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    let mounted = true;
    api.get("/api/roadmap")
      .then(res => {
        if(mounted) {
          try {
            const parsed = typeof res.data.roadmap.content === 'string' 
              ? JSON.parse(res.data.roadmap.content) 
              : res.data.roadmap.content;
            
            const data = Array.isArray(parsed) ? parsed : (parsed?.roadmap || []);
            setRoadmapData(data);
            if (data.length > 0) {
              setActiveWeek(data[0].id);
            }
          } catch(e) {
            console.error(e);
            setError("The spectral blueprint failed to render. Please regenerate.");
          }
          setLoading(false);
        }
      })
      .catch(err => {
        if(mounted){
          setError("No active trajectory found in this sector.");
          setLoading(false);
        }
      });
    return () => mounted = false;
  }, []);

  const toggleTask = async (id) => {
    const newDone = { ...done, [id]: !done[id] };
    setDone(newDone);
    
    if (roadmapData.length > 0) {
      const totalTasks = roadmapData.reduce((acc, week) => acc + (week.tasks?.length || 0), 0);
      const completedTasks = Object.values(newDone).filter(Boolean).length;
      const progress = Math.round((completedTasks / totalTasks) * 100);
      
      try {
        await api.patch("/api/roadmap/progress", { progress });
      } catch (err) {
        console.error("Progress sync failed", err);
      }
    }
  };

  const calculateProgress = () => {
    if(!roadmapData || roadmapData.length === 0) return 0;
    const totalTasks = roadmapData.reduce((acc, week) => acc + (week.tasks?.length || 0), 0);
    if(totalTasks === 0) return 0;
    const completedTasks = Object.values(done).filter(Boolean).length;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.3)]" 
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-red-500/10 rounded-[2rem] flex items-center justify-center text-red-500 mb-8 border border-red-500/20">
          <BrainCircuit className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">{error}</h2>
        <NavLink to="/dashboard" className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Return to Base
        </NavLink>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-50 pt-24 pb-20 selection:bg-indigo-500/30 overflow-hidden">
      {/* Immersive Background Blur Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="container px-4 md:px-8 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* Enhanced Header Dashboard */}
          <header className="relative bg-white/70 dark:bg-slate-950/40 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] border border-white/40 dark:border-slate-800/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 group overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
            
            <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-black text-[10px] tracking-widest uppercase mb-4 border border-indigo-500/20">
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>Strategic Trajectory</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">
                Your Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Blueprint</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg font-light max-w-xl italic">
                A meticulously computed path through the complex landscape of technology.
              </p>
            </div>

            <div className="relative z-10 bg-slate-50 dark:bg-slate-900 p-8 rounded-[2.5rem] w-full md:w-80 shrink-0 border border-slate-200 dark:border-slate-800 shadow-inner">
              <div className="flex justify-between items-end mb-4">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Completion Velocity</span>
                <span className="text-3xl font-black text-indigo-500">{calculateProgress()}%</span>
              </div>
              <div className="h-4 bg-slate-200 dark:bg-slate-950 rounded-full overflow-hidden shadow-inner p-1">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateProgress()}%` }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Immersive Timeline View */}
            <div className="lg:col-span-8 space-y-8">
              {roadmapData.map((step, index) => {
                const isActive = activeWeek === step.id;
                const isPast = index < roadmapData.findIndex(s => s.id === activeWeek);

                return (
                  <motion.div
                    key={step.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setActiveWeek(step.id)}
                    className={`group relative p-8 md:p-10 rounded-[3rem] border transition-all duration-500 cursor-pointer overflow-hidden
                      ${isActive
                        ? 'bg-white/90 dark:bg-slate-950/60 backdrop-blur-3xl border-indigo-500/30 shadow-2xl ring-1 ring-indigo-500/20'
                        : 'bg-white/40 dark:bg-slate-950/20 backdrop-blur-xl border-white/20 dark:border-slate-900 hover:border-indigo-500/30'}
                    `}
                  >
                    <div className="flex items-start gap-8 relative z-10 w-full">
                      {/* Timeline Counter */}
                      <div className="shrink-0 hidden sm:block">
                        <div className={`w-16 h-16 rounded-3xl flex flex-col items-center justify-center transition-all duration-500
                            ${isActive ? 'bg-indigo-600 text-white shadow-[0_15px_30px_rgba(79,70,229,0.3)] scale-110' :
                            isPast ? 'bg-emerald-500 text-white opacity-50' :
                              'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800'}
                         `}>
                          <span className="text-[10px] font-black uppercase tracking-tighter mb-0.5">Wk</span>
                          <span className="text-2xl font-black leading-none">{index + 1}</span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              {isActive && <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />}
                              <p className={`text-xs font-black uppercase tracking-widest ${isActive ? 'text-indigo-500' : 'text-slate-400'}`}>
                                {step.duration || `Week ${index + 1}`}
                              </p>
                              {step.difficulty && (
                                <div className="flex items-center gap-1 ml-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-2.5 h-2.5 ${i < Math.ceil(step.difficulty/2) ? 'text-amber-400 fill-current' : 'text-slate-200 dark:text-slate-800'}`} />
                                  ))}
                                </div>
                              )}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-500 transition-colors">
                              {step.title}
                            </h3>
                          </div>
                          
                          <AnimatePresence>
                            {isActive && (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-2"
                              >
                                <Zap className="w-3.5 h-3.5 text-indigo-500 fill-current" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">Live Phase</span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Visual Task Grid */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-8 pt-8 border-t border-slate-100 dark:border-slate-900 mt-6"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {step.tasks.map((task) => {
                                  const isDone = !!done[task.id];
                                  return (
                                    <motion.div
                                      whileHover={{ scale: 1.02, x: 5 }}
                                      key={task.id}
                                      onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}
                                      className={`group/task flex items-center gap-4 p-5 rounded-[1.8rem] border transition-all duration-300 cursor-pointer
                                        ${isDone ? 'bg-slate-50 dark:bg-slate-900/40 border-transparent opacity-60' : 'bg-white dark:bg-slate-950/60 border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 hover:shadow-xl'}
                                      `}
                                    >
                                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all
                                        ${isDone ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 dark:bg-slate-900 text-slate-400 group-hover/task:bg-indigo-500/10 group-hover/task:text-indigo-500'}
                                      `}>
                                        {isDone ? <CheckCircle2 className="w-6 h-6" /> : <div className="w-3 h-3 rounded-full border-2 border-current opacity-40" />}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-bold truncate ${isDone ? 'text-slate-400 line-through italic' : 'text-slate-800 dark:text-slate-200'}`}>
                                          {task.title}
                                        </p>
                                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1 opacity-60">{task.type || 'Research Node'}</p>
                                      </div>
                                    </motion.div>
                                  );
                                })}
                              </div>

                              {/* Matrix Resources */}
                              <div className="bg-slate-50/50 dark:bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/60">
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-3">
                                  <MonitorPlay className="w-4 h-4 text-indigo-500" /> Authorized Resources
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {step.resources.map((res, i) => (
                                    <a
                                      key={i}
                                      href={res.url}
                                      target="_blank"
                                      rel="noreferrer"
                                      onClick={e => e.stopPropagation()}
                                      className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/50 transition-all group/link shadow-sm"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover/link:text-indigo-500 transition-colors">
                                          {res.type === 'video' ? <MonitorPlay className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                        </div>
                                        <span className="text-xs font-bold dark:text-slate-300 truncate max-w-[150px]">{res.title}</span>
                                      </div>
                                      <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover/link:text-indigo-500 transition-colors" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Tactical Sidebar */}
            <aside className="lg:col-span-4 space-y-10">
              <div className="bg-white/80 dark:bg-slate-950/60 backdrop-blur-3xl rounded-[3rem] p-8 border border-white/40 dark:border-slate-800/50 shadow-2xl space-y-8 lg:sticky lg:top-28">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shadow-inner border border-indigo-500/10">
                    <PenTool className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black dark:text-white tracking-tight">Mission Journal</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Real-time local sync</p>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-slate-50/50 dark:from-slate-950/50 to-transparent pointer-events-none rounded-b-2xl" />
                  <textarea
                    className="w-full h-80 p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl resize-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm font-medium text-slate-700 dark:text-slate-300 outline-none leading-relaxed shadow-inner scrollbar-hide"
                    placeholder="Log architectural insights, tactical blockers, or quantum leaps in understanding..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <div className="absolute bottom-4 right-4 pointer-events-none opacity-40">
                    <Layout className="w-5 h-5 text-indigo-500" />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={savingNotes}
                  className="w-full py-5 rounded-2xl bg-slate-900 text-white dark:bg-indigo-600 dark:text-white font-black text-sm uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <Save className={`w-4 h-4 ${savingNotes ? 'animate-pulse' : ''}`} />
                  {savingNotes ? "Saving Node..." : "Commit Changes"}
                </motion.button>

                {/* Progress Mini Widget */}
                <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 px-1">Trajectory Velocity</h4>
                  <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800/50">
                    <div className="w-12 h-12 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 flex items-center justify-center text-xs font-black text-indigo-500">
                      {calculateProgress()}%
                    </div>
                    <div>
                      <p className="text-xs font-bold dark:text-white truncate">Overall Momentum</p>
                      <p className="text-[10px] text-slate-400 font-medium tracking-tight mt-0.5">Maintain consistency</p>
                    </div>
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

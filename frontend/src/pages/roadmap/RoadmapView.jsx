import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
  Layout
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
  visible: { y: 0, opacity: 1 }
};

export default function RoadmapView() {
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState({});
  const [activeWeek, setActiveWeek] = useState(null);
  const [roadmapData, setRoadmapData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    api.get("/api/roadmap")
      .then(res => {
        if(mounted) {
          try {
            // DB returns the object. 'content' holds our JSON array.
            const parsed = typeof res.data.roadmap.content === 'string' 
              ? JSON.parse(res.data.roadmap.content) 
              : res.data.roadmap.content;
            
            setRoadmapData(Array.isArray(parsed) ? parsed : (parsed?.roadmap || []));
            if (parsed && Array.isArray(parsed) && parsed.length > 0) {
              setActiveWeek(parsed[0].id);
            } else if (parsed?.roadmap?.length > 0) {
              setActiveWeek(parsed.roadmap[0].id);
            }
          } catch(e) {
            console.error(e);
            setError("Failed to parse roadmap structure.");
          }
          setLoading(false);
        }
      })
      .catch(err => {
        if(mounted){
          setError("Failed to load roadmap or you haven't generated one yet.");
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
        console.error("Failed to sync progress", err);
      }
    }
  };

  const getTaskIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'video': return <MonitorPlay className="w-4 h-4 text-pink-500" />;
      case 'reading': return <BookOpen className="w-4 h-4 text-indigo-500" />;
      case 'practice': return <PenTool className="w-4 h-4 text-cyan-500" />;
      default: return <FileText className="w-4 h-4 text-slate-500" />;
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
     return <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
     </div>;
  }

  if (error || !roadmapData || roadmapData.length === 0) {
    return (
      <div className="container px-4 py-8 mx-auto max-w-7xl w-full text-center mt-20">
        <h2 className="text-2xl font-bold dark:text-white mb-4">{error || "No roadmap found."}</h2>
        <a href="/questionnaire" className="px-6 py-2 bg-cyan-500 text-white rounded-lg">Generate one now</a>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl w-full">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Header Dashboard */}
        <motion.div variants={itemVariants} className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-200/50 dark:border-slate-800/50 shadow-md shadow-slate-200/20 dark:shadow-black/20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/20 transition-colors" />

          <div className="relative z-10 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-medium text-xs mb-4 border border-cyan-500/20">
              <Layout className="w-3.5 h-3.5" />
              <span>Learning Journey</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight drop-shadow-sm">
              Your Roadmap
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl font-light">
              Follow the timeline, check off tasks, and keep your notes in one beautifully organized space.
            </p>
          </div>

          <div className="relative z-10 bg-slate-50 dark:bg-slate-800/80 p-6 rounded-2xl w-full md:w-64 shrink-0 border border-slate-200 dark:border-slate-700 shadow-inner">
            <div className="flex justify-between items-end mb-4">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Progress</span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">{calculateProgress()}%</span>
            </div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${calculateProgress()}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Main Timeline Area */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            {roadmapData.map((step, index) => {
              const isActive = activeWeek === step.id;
              const isPast = index < roadmapData.findIndex(s => s.id === activeWeek);

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveWeek(step.id)}
                  className={`relative p-6 md:p-8 rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden
                    ${isActive
                      ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-cyan-500/30 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/20'
                      : 'bg-white/50 dark:bg-slate-900/40 backdrop-blur-sm border-slate-100 dark:border-slate-800/50 hover:border-cyan-500/20 hover:bg-white/80 dark:hover:bg-slate-900/60'}
                  `}
                >
                  {/* Decorative line connecting cards conceptually */}
                  {index !== roadmapData.length - 1 && (
                    <div className="absolute left-10 md:left-12 bottom-0 w-0.5 h-6 bg-slate-200 dark:bg-slate-800 transition-colors translate-y-full z-0 hidden lg:block" />
                  )}

                  <div className="flex items-start gap-4 relative z-10 w-full">
                    {/* Status Indicator */}
                    <div className="shrink-0 pt-1 hidden sm:block">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors
                          ${isActive ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/30' :
                          isPast ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' :
                            'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'}
                       `}>
                        {isPast ? <CheckCircle2 className="w-6 h-6" /> : <Calendar className="w-6 h-6" />}
                      </div>
                    </div>

                    <div className="flex-1 w-full min-w-0">
                      {/* Card Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                        <div>
                          <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400'}`}>
                            {step.duration}
                          </p>
                          <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white truncate drop-shadow-sm">
                            {step.title}
                          </h3>
                        </div>
                        {isActive && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full shrink-0">
                            <Clock className="w-3.5 h-3.5" /> In Progress
                          </span>
                        )}
                      </div>

                      {/* Content Area - Expands if active */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="space-y-6 pt-2 border-t border-slate-100 dark:border-slate-800"
                        >
                          {/* Tasks List */}
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Tasks to complete
                            </h4>
                            <div className="space-y-3">
                              {step.tasks.map((task) => {
                                const isDone = !!done[task.id];
                                return (
                                  <motion.div
                                    whileHover={{ x: 4 }}
                                    key={task.id}
                                    onClick={(e) => { e.stopPropagation(); toggleTask(task.id); }}
                                    className={`group flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer shadow-sm
                                      ${isDone ? 'bg-slate-50/50 dark:bg-slate-800/30 border-transparent opacity-80' : 'bg-white dark:bg-slate-900/80 border-slate-100 dark:border-slate-700 hover:border-cyan-500/30'}
                                    `}
                                  >
                                    <div className="shrink-0 transition-colors">
                                      {isDone ? (
                                        <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                      ) : (
                                        <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 group-hover:text-cyan-500" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className={`block text-sm font-medium transition-all ${isDone ? 'text-slate-400 line-through' : 'text-slate-700 dark:text-slate-200'}`}>
                                        {task.title}
                                      </span>
                                    </div>
                                    <div className="shrink-0 p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-inner">
                                      {getTaskIcon(task.type)}
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Suggested Resources */}
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-cyan-500" /> Resources
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {step.resources.map((resource, i) => (
                                <a
                                  key={i}
                                  href={resource.url}
                                  onClick={e => e.stopPropagation()}
                                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-lg transition-colors border border-transparent hover:border-slate-300 dark:hover:border-slate-600"
                                >
                                  {resource.type === 'video' ? <MonitorPlay className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
                                  {resource.title}
                                </a>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Sidebar Area */}
          <motion.div variants={itemVariants} className="space-y-6 lg:sticky lg:top-24">
            {/* Notes Widget */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/50 dark:border-slate-800/50 shadow-md shadow-slate-200/20 dark:shadow-black/20 flex flex-col h-[500px]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-800/50 flex items-center justify-center">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white tracking-tight">Roadmap Notes</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-light">Auto-saved locally</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col relative group">
                <textarea
                  className="w-full flex-1 p-4 bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl resize-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all text-sm text-slate-700 dark:text-slate-300 outline-none shadow-inner"
                  placeholder="Jot down your thoughts, blockers, or ideas. Example: Week 2 DOM manipulation felt tricky, need to re-watch the querySelector video..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <span className="text-xs text-slate-400 bg-white/80 dark:bg-slate-800/80 px-2 py-1 rounded backdrop-blur-md shadow-sm border border-slate-200 dark:border-slate-700">
                    Markdown supported
                  </span>
                </div>
              </div>

              <button className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold hover:scale-[1.02] active:scale-[0.98] hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-md shadow-slate-900/10 dark:shadow-white/10">
                <Save className="w-4 h-4" /> Save Notes
              </button>
            </div>

            {/* Motivation Widget */}
            <div className="bg-gradient-to-br from-cyan-500 via-indigo-500 to-pink-500 p-6 rounded-3xl text-white shadow-lg shadow-indigo-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-2 flex items-center gap-2 drop-shadow-sm">
                  <TrendingUp className="w-5 h-5" /> Keep it up!
                </h4>
                <p className="text-white/90 text-sm font-light">
                  You are doing great. Consistency is key to mastering these concepts. Try to code for 30 minutes every day.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}

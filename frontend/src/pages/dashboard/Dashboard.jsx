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

const overview = [
  { label: "Courses in progress", value: "3", icon: <BookOpen className="w-5 h-5 text-cyan-500" />, trend: "+1 this week" },
  { label: "Hours this week", value: "5h 40m", icon: <Clock className="w-5 h-5 text-indigo-500" />, trend: "2h over goal" },
  { label: "Daily Streak", value: "8 days", icon: <Flame className="w-5 h-5 text-pink-500" />, trend: "Personal best!" },
];

const milestones = [
  { label: "Week 1", status: "complete", title: "Foundations done" },
  { label: "Week 2", status: "active", title: "React hooks in progress" },
  { label: "Week 3", status: "upcoming", title: "API integration" },
  { label: "Week 4", status: "upcoming", title: "Portfolio project" },
];

const lessons = [
  { title: "React State Patterns", time: "20 min", type: "Core Concept", status: "pending" },
  { title: "CSS Layout Lab", time: "15 min", type: "Hands-on Practice", status: "pending" },
  { title: "Career Prep Notes", time: "10 min", type: "Reflection", status: "done" },
];

const versions = [
  { id: "v3", label: "Roadmap v3", date: "Jan 20, 2026", status: "Active" },
  { id: "v2", label: "Roadmap v2", date: "Jan 05, 2026", status: "Archived" },
  { id: "v1", label: "Roadmap v1", date: "Dec 12, 2025", status: "Archived" },
];

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
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">Aisha</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg font-light">Your current goal: <strong className="text-slate-700 dark:text-slate-300 font-semibold">Full-Stack Web Development</strong></p>
          </div>

          <div className="flex gap-3 relative z-10 shrink-0">
            <button className="px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
              View Roadmap
            </button>
            <button className="px-5 py-2.5 rounded-full bg-cyan-500 text-white dark:bg-cyan-500 dark:text-white text-sm font-bold hover:bg-cyan-600 transition-colors shadow-md shadow-cyan-500/25">
              Continue Learning
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {overview.map((stat, i) => (
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
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-light">2 weeks ahead of schedule</p>
                </div>
                <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">55%</span>
              </div>

              <div className="h-4 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden relative z-10 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "55%" }}
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
                <button className="text-sm text-cyan-600 dark:text-cyan-400 font-medium hover:text-cyan-500 transition-colors hover:underline">View Full Path</button>
              </div>

              <div className="space-y-0 relative z-10">
                {milestones.map((m, i) => (
                  <div key={m.label} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors
                        ${m.status === 'complete' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25' :
                          m.status === 'active' ? 'bg-cyan-500 text-white ring-4 ring-cyan-500/20 shadow-md shadow-cyan-500/25' :
                            'bg-slate-50 dark:bg-slate-800 text-slate-400 border-2 border-dashed border-slate-300 dark:border-slate-700'}
                      `}>
                        {m.status === 'complete' && <CheckCircle2 className="w-4 h-4" />}
                        {m.status === 'active' && <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />}
                      </div>
                      {i !== milestones.length - 1 && (
                        <div className={`w-0.5 h-full my-1 rounded-full ${m.status === 'complete' ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                      )}
                    </div>

                    <div className={`pb-8 pt-1 ${m.status !== 'upcoming' ? 'opacity-100' : 'opacity-50'}`}>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{m.label}</p>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white drop-shadow-sm">{m.title}</h4>
                      {m.status === 'active' && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-sm font-medium border border-cyan-500/20 cursor-pointer hover:bg-cyan-500/20 transition-colors">
                          Resume Chapter <ArrowRight className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar Area */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Today's Lessons Card */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md shadow-slate-200/20 dark:shadow-black/20 relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors" />

              <div className="flex items-center justify-between mb-6 relative z-10">
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Today's Tasks</h2>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs font-bold">3</span>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                {lessons.map((lesson, i) => (
                  <div key={i} className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4
                    ${lesson.status === 'done' ? 'bg-slate-50/50 dark:bg-slate-800/30 border-transparent opacity-70' : 'bg-white dark:bg-slate-800/80 border-slate-100 dark:border-slate-700 shadow-sm hover:border-cyan-500/40 hover:shadow-cyan-500/5'}`}>

                    <div className="shrink-0 mt-1">
                      {lesson.status === 'done' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <CircleDashed className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-cyan-500 transition-colors" />
                      )}
                    </div>

                    <div className="flex-1">
                      <strong className={`block text-sm font-semibold mb-1 tracking-tight ${lesson.status === 'done' ? 'line-through text-slate-500' : 'text-slate-900 dark:text-white'}`}>
                        {lesson.title}
                      </strong>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.time}</span>
                        <span>•</span>
                        <span>{lesson.type}</span>
                      </div>
                    </div>

                    {lesson.status !== 'done' && (
                      <button className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/20 transition-colors shrink-0">
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Versions History */}
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-md shadow-slate-200/20 dark:shadow-black/20">
              <div className="flex items-center gap-2 mb-6">
                <History className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Roadmap History</h2>
              </div>

              <div className="space-y-3 relative z-10">
                {versions.map((v) => (
                  <div key={v.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                    <div>
                      <strong className="block text-sm font-semibold tracking-tight text-slate-900 dark:text-white">{v.label}</strong>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{v.date}</span>
                    </div>
                    {v.status === 'Active' ? (
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-md">
                        Active
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

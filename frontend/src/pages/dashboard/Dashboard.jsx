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
  { label: "Courses in progress", value: "3", icon: <BookOpen className="w-5 h-5 text-blue-500" />, trend: "+1 this week" },
  { label: "Hours this week", value: "5h 40m", icon: <Clock className="w-5 h-5 text-purple-500" />, trend: "2h over goal" },
  { label: "Daily Streak", value: "8 days", icon: <Flame className="w-5 h-5 text-orange-500" />, trend: "Personal best!" },
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
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white dark:bg-surface-dark p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-accent font-medium text-xs mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>Learning Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-display">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Aisha</span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg">Your current goal: <strong className="text-gray-700 dark:text-gray-300">Full-Stack Web Development</strong></p>
          </div>

          <div className="flex gap-3 relative z-10 shrink-0">
            <button className="px-5 py-2.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
              View Roadmap
            </button>
            <button className="px-5 py-2.5 rounded-full bg-foreground text-background dark:bg-white dark:text-black text-sm font-medium hover:scale-105 active:scale-95 transition-transform shadow-md">
              Continue Learning
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {overview.map((stat, i) => (
            <div key={i} className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-start justify-between group hover:border-primary/30 transition-colors">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded w-fit">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            {/* Progress Card */}
            <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden">
              <div className="flex justify-between items-end mb-6 relative z-10">
                <div>
                  <h2 className="text-xl font-bold mb-1">Overall Progress</h2>
                  <p className="text-gray-500 text-sm">2 weeks ahead of schedule</p>
                </div>
                <span className="text-3xl font-bold text-primary dark:text-accent">55%</span>
              </div>

              <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative z-10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "55%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>

              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl" />
            </div>

            {/* Path visualization */}
            <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <LayoutTemplate className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold">Active Roadmap</h2>
                </div>
                <button className="text-sm text-primary font-medium hover:underline">View Full Path</button>
              </div>

              <div className="space-y-0">
                {milestones.map((m, i) => (
                  <div key={m.label} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors
                        ${m.status === 'complete' ? 'bg-emerald-500 text-white' :
                          m.status === 'active' ? 'bg-primary text-white ring-4 ring-primary/20' :
                            'bg-gray-100 dark:bg-gray-800 text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-700'}
                      `}>
                        {m.status === 'complete' && <CheckCircle2 className="w-4 h-4" />}
                        {m.status === 'active' && <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />}
                      </div>
                      {i !== milestones.length - 1 && (
                        <div className={`w-0.5 h-full my-1 rounded-full ${m.status === 'complete' ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-800'}`} />
                      )}
                    </div>

                    <div className={`pb-8 pt-1 ${m.status !== 'upcoming' ? 'opacity-100' : 'opacity-60'}`}>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{m.label}</p>
                      <h4 className="text-base font-bold text-gray-900 dark:text-white">{m.title}</h4>
                      {m.status === 'active' && (
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
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
            <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />

              <div className="flex items-center justify-between mb-6 relative z-10">
                <h2 className="text-lg font-bold">Today's Tasks</h2>
                <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                  <span className="text-xs font-bold">3</span>
                </div>
              </div>

              <div className="space-y-4 relative z-10">
                {lessons.map((lesson, i) => (
                  <div key={i} className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4
                    ${lesson.status === 'done' ? 'bg-gray-50 dark:bg-gray-800/50 border-transparent opacity-60' : 'bg-white dark:bg-surface-dark border-gray-100 dark:border-gray-700 hover:border-primary/40 hover:shadow-md'}`}>

                    <div className="shrink-0 mt-1">
                      {lesson.status === 'done' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <CircleDashed className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                      )}
                    </div>

                    <div className="flex-1">
                      <strong className={`block text-sm font-semibold mb-1 ${lesson.status === 'done' ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                        {lesson.title}
                      </strong>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.time}</span>
                        <span>•</span>
                        <span>{lesson.type}</span>
                      </div>
                    </div>

                    {lesson.status !== 'done' && (
                      <button className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors shrink-0">
                        <Play className="w-3.5 h-3.5 ml-0.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Versions History */}
            <div className="bg-white dark:bg-surface-dark p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <History className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-bold">Roadmap History</h2>
              </div>

              <div className="space-y-3">
                {versions.map((v) => (
                  <div key={v.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors">
                    <div>
                      <strong className="block text-sm font-semibold">{v.label}</strong>
                      <span className="text-xs text-gray-500">{v.date}</span>
                    </div>
                    {v.status === 'Active' ? (
                      <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded-md">
                        Active
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-gray-400" />
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

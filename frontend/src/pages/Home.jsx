import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, BrainCircuit, Target, Sparkles, Zap, MapPin, CheckCircle2 } from "lucide-react";

const highlights = [
  "Curated free resources",
  "Weekly learning rhythm",
  "Clear skill checkpoints",
  "Career-aligned milestones",
];

const features = [
  {
    title: "Smart Questionnaire",
    desc: "Understand your learning style, prior knowledge, and daily bandwidth in minutes.",
    icon: <BrainCircuit className="w-6 h-6 text-purple-500" />
  },
  {
    title: "AI-Powered Roadmap",
    desc: "Get a step-by-step path tailored exactly to your goals using curated free resources.",
    icon: <MapPin className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Progress Tracking",
    desc: "Stay consistent and motivated with weekly check-ins and visual milestones.",
    icon: <Target className="w-6 h-6 text-emerald-500" />
  },
  {
    title: "Bite-Sized Sessions",
    desc: "Plan your daily study sessions without overwhelm to fit your busy schedule.",
    icon: <Zap className="w-6 h-6 text-amber-500" />
  },
];

const stats = [
  { label: "Active learners", value: "12k+" },
  { label: "Roadmaps generated", value: "38k+" },
  { label: "Completion rate", value: "94%" },
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
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

export default function Home() {
  return (
    <div className="w-full overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-blob animation-delay-4000" />
      </div>

      <div className="container px-4 mx-auto max-w-6xl">
        {/* Hero Section */}
        <section className="pt-16 pb-20 md:pt-24 md:pb-32 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col gap-6"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary dark:text-accent w-fit font-medium text-sm backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span>Smart learning guidance for ambitious students</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              Build a career roadmap that feels <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-accent text-glow">personal.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
              your_Advisor blends intelligent career mapping, weekly planning, and high-quality free resources into one beautiful learning portal.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-4">
              <NavLink to="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-foreground text-background dark:bg-white dark:text-black rounded-full font-semibold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/10 dark:shadow-white/10 group">
                Start Your Journey
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </NavLink>
              <NavLink to="/questionnaire" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-lg border-2 border-border hover:border-gray-400 dark:hover:border-gray-500 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all hover:bg-white dark:hover:bg-gray-800">
                Take the Quiz
              </NavLink>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mt-8">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  {item}
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative lg:ml-auto w-full max-w-md"
          >
            {/* Main Interactive Card */}
            <div className="glass-card rounded-[2rem] p-8 relative z-10 border border-white/40 dark:border-gray-700/50 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold font-display">Today's Plan</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">3 tasks • 45 mins left</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="group p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-md transition-all cursor-pointer flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <strong className="block text-gray-900 dark:text-white font-semibold">System Design Recap</strong>
                    <span className="text-sm text-gray-500">15 mins • Reading</span>
                  </div>
                </div>

                <div className="group p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-md transition-all cursor-pointer flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <strong className="block text-gray-900 dark:text-white font-semibold">React Hooks Dive</strong>
                    <span className="text-sm text-gray-500">20 mins • Video</span>
                  </div>
                </div>

                <div className="group p-4 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/30 hover:shadow-md transition-all cursor-pointer flex items-center gap-4 opacity-60 hover:opacity-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-gray-900 dark:text-white font-semibold line-through decoration-2">CSS Grid Quiz</strong>
                    <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-accent to-blue-500 rounded-2xl -rotate-6 opacity-50 blur-xl -z-10" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-500 to-primary rounded-full opacity-50 blur-xl -z-10" />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 font-display">Your personal learning orchestrator</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Everything you need to master new skills without feeling overwhelmed or lost in tutorial hell.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-3xl border border-white/50 dark:border-gray-700"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center mb-6 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 mb-20">
          <div className="bg-foreground text-background dark:bg-surface-dark dark:text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Proven impact on student success</h2>
                <p className="text-lg text-gray-300 dark:text-gray-400 max-w-lg mb-8">
                  Join thousands of learners who have found clarity and direction through our personalized roadmaps.
                </p>
                <NavLink to="/signup" className="inline-flex items-center gap-2 font-semibold text-primary dark:text-accent hover:underline decoration-2 underline-offset-4">
                  Join the community <ArrowRight className="w-5 h-5" />
                </NavLink>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/5 dark:bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm"
                  >
                    <strong className="block text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 dark:from-white dark:to-gray-500 mb-2">
                      {stat.value}
                    </strong>
                    <span className="text-gray-400 font-medium">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

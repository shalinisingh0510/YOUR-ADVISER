import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, BrainCircuit, Target, Sparkles, MapPin, CheckCircle2, Briefcase, GraduationCap, ArrowUpRight, Code, Trophy, Network } from "lucide-react";

// Content Data
const studentFeatures = [
  "Curated learning resources",
  "Interview prep & mock tests",
  "Internship tracking",
  "Peer study groups",
];

const proFeatures = [
  "Leadership & soft skills",
  "Advanced system design",
  "Network expansion",
  "Salary negotiation tactics",
];

const features = [
  {
    title: "AI-Powered Assessment",
    desc: "Discover where you stand in minutes with our adaptive tech and soft skills evaluation.",
    icon: <BrainCircuit className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />,
    color: "from-cyan-500/20 to-cyan-500/0",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10"
  },
  {
    title: "Dynamic Roadmaps",
    desc: "A living, breathing career path that adapts to market trends and your personal growth.",
    icon: <MapPin className="w-6 h-6 text-violet-500 dark:text-violet-400" />,
    color: "from-violet-500/20 to-violet-500/0",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10"
  },
  {
    title: "Actionable Milestones",
    desc: "Break down multi-year goals into weekly, achievable tasks that build momentum.",
    icon: <Target className="w-6 h-6 text-pink-500 dark:text-pink-400" />,
    color: "from-pink-500/20 to-pink-500/0",
    border: "border-pink-500/30",
    bg: "bg-pink-500/10"
  },
  {
    title: "Exclusive Networks",
    desc: "Connect with mentors and peers who share your exact career trajectory.",
    icon: <Network className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
    color: "from-amber-500/20 to-amber-500/0",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10"
  },
];

const stats = [
  { label: "Active Professionals", value: "45k+" },
  { label: "Student Placements", value: "12k+" },
  { label: "Goal Completion", value: "94%" },
  { label: "Career Pivot Success", value: "88%" },
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
    <div className="w-full overflow-hidden bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-50 selection:bg-cyan-500/30 transition-colors duration-500">
      {/* Background Ambient Ornaments */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-cyan-600/20 dark:bg-cyan-600/10 rounded-full blur-[100px] dark:blur-[120px] animate-blob mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 dark:bg-violet-600/10 rounded-full blur-[100px] dark:blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[20%] w-[700px] h-[700px] bg-pink-600/20 dark:bg-pink-600/10 rounded-full blur-[100px] dark:blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen" />
        {/* Optional Noise Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="container px-4 md:px-8 mx-auto max-w-7xl relative z-10">
        
        {/* --- HERO SECTION --- */}
        <section className="min-h-[100svh] flex items-center pt-32 pb-20 md:pt-32 md:pb-32 grid lg:grid-cols-2 gap-16 lg:gap-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col gap-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/60 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-cyan-600 dark:text-cyan-400 w-fit font-medium text-sm backdrop-blur-md shadow-sm dark:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              <Sparkles className="w-4 h-4" />
              <span className="tracking-wide">Limitless growth logic.</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.05]">
              Architect your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-indigo-600 to-pink-600 dark:from-cyan-400 dark:via-indigo-400 dark:to-pink-500 drop-shadow-sm dark:drop-shadow-[0_0_30px_rgba(129,140,248,0.3)]">
                future self.
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed font-light">
              Your Advisor is a premium intelligence platform mapping hyper-personalized trajectories for <span className="text-slate-900 dark:text-slate-200 font-medium">ambitious students</span> and <span className="text-slate-900 dark:text-slate-200 font-medium">seasoned professionals</span>.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 mt-4">
              <NavLink to="/signup" className="relative group inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 rounded-full font-bold text-lg transition-all overflow-hidden shadow-xl shadow-slate-900/10 dark:shadow-none">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-indigo-500 dark:from-cyan-300 dark:to-indigo-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                <span className="relative z-10 flex items-center gap-2">
                  Launch Platform <ArrowRight className="w-5 h-5 group-hover:rotate-[-45deg] transition-transform duration-300" />
                </span>
              </NavLink>
              <NavLink to="/questionnaire" className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-lg border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md transition-all hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white relative z-10">
                Take the Assessment
              </NavLink>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="relative lg:ml-auto w-full max-w-lg perspective-1000"
          >
            {/* 3D Floating Interactive Planner Card */}
            <div className="relative group transform-gpu transition-all duration-700 hover:-rotate-y-6 hover:rotate-x-6 hover:scale-[1.02]">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-400 dark:from-cyan-500 dark:via-indigo-500 dark:to-pink-500 rounded-[2.5rem] blur-xl opacity-20 dark:opacity-30 group-hover:opacity-40 dark:group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              <div className="bg-white/80 dark:bg-slate-900/60 rounded-[2.5rem] p-8 md:p-10 relative z-10 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-xl isolate shadow-2xl shadow-slate-200/50 dark:shadow-none">
                
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Daily Protocol</h3>
                    <p className="text-sm text-cyan-600 dark:text-cyan-400 font-bold mt-1 uppercase tracking-wider">Phase 3: Mastery</p>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 dark:from-cyan-500/20 dark:to-indigo-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-300 border border-cyan-500/20 shadow-sm dark:shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <Code className="w-7 h-7" />
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Review Microservices", tag: "Architecture", time: "45m", active: true },
                    { title: "Salary Negotiation VR", tag: "Soft Skills", time: "20m", active: false },
                    { title: "K8s Deployment Lab", tag: "Hands-on", time: "1h", active: false },
                  ].map((task, i) => (
                    <div key={i} className={`group/task p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer
                      ${task.active ? 'bg-slate-900 dark:bg-slate-800/80 border-slate-900 dark:border-cyan-500/30 shadow-md dark:shadow-[0_0_20px_rgba(6,182,212,0.1)] text-white' : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors
                          ${task.active ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 group-hover/task:text-slate-700 dark:group-hover/task:text-slate-300'}`}>
                          <span className="font-bold font-mono">0{i+1}</span>
                        </div>
                        <div>
                          <strong className="block text-[15px] font-semibold">{task.title}</strong>
                          <span className="text-xs tracking-wide font-medium opacity-80 dark:opacity-70 mt-0.5 block">{task.tag}</span>
                        </div>
                      </div>
                      <span className="text-sm font-mono opacity-60 dark:opacity-50">{task.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Orbital glowing ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-slate-300/50 dark:border-slate-700/30 z-0 scale-y-50 animate-[spin_20s_linear_infinite] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] rounded-full border border-slate-200/50 dark:border-slate-800/30 z-0 scale-y-50 animate-[spin_30s_linear_infinite_reverse] pointer-events-none" />
          </motion.div>
        </section>

        {/* --- DUAL PATH SECTION --- */}
        <section className="py-24 relative z-10 bg-transparent">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Designed for every stage</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              Whether you are laying the foundation or vaulting into executive leadership, we build a scaffold around your ambition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 pl-0 md:px-12">
            {/* Student Track */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative p-1 rounded-3xl bg-gradient-to-b from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 group shadow-lg dark:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 dark:from-indigo-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 h-full rounded-[1.4rem] p-10 relative z-10 flex flex-col">
                <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-8 text-indigo-600 dark:text-indigo-400 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-4">For Students</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-light">Bridge the gap between academic theory and industry reality. Land your dream first role faster.</p>
                
                <ul className="space-y-5 flex-1">
                  {studentFeatures.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-slate-700 dark:text-slate-300">
                      <div className="mt-1 w-5 h-5 rounded-full border border-indigo-500/30 flex items-center justify-center bg-indigo-500/10 shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>

                <button className="mt-12 flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                  Explore Student Path <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Professional Track */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
              className="relative p-1 rounded-3xl bg-gradient-to-b from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 group shadow-lg dark:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 dark:from-cyan-500/10 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 h-full rounded-[1.4rem] p-10 relative z-10 flex flex-col">
                <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mb-8 text-cyan-600 dark:text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-4">For Professionals</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed font-light">Upskill, pivot, or climb the ladder. Strategic guidance for high-leverage career maneuvers.</p>
                
                <ul className="space-y-5 flex-1">
                  {proFeatures.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-slate-700 dark:text-slate-300">
                      <div className="mt-1 w-5 h-5 rounded-full border border-cyan-500/30 flex items-center justify-center bg-cyan-500/10 shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>

                <button className="mt-12 flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">
                  Explore Pro Path <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

          </div>
        </section>

        {/* --- CORE ENGINE SECTION --- */}
        <section className="py-24 relative z-10 bg-transparent">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">The Intelligence Engine</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
              Not just a curriculum, but a responsive operating system for your professional growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800/80 transition-all duration-300 relative overflow-hidden group shadow-lg dark:shadow-none`}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} dark:bg-slate-950 border ${feature.border} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl text-slate-900 dark:text-white font-bold mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-light">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="py-24 mb-20 relative z-10 bg-transparent">
          {/* Glassmorphic huge container */}
          <div className="relative rounded-[3rem] p-12 md:p-20 overflow-hidden border border-slate-200 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/30 backdrop-blur-md shadow-2xl dark:shadow-none">
            
            {/* Inner glowing orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-16 justify-between items-center">
              <div className="max-w-xl text-center lg:text-left">
                <div className="inline-flex items-center justify-center p-3 sm:p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-8 shadow-sm dark:shadow-none backdrop-blur-xl">
                  <Trophy className="w-8 h-8 text-pink-500 dark:text-pink-400" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Quantifiable velocity.</h2>
                <p className="text-xl text-slate-600 dark:text-slate-300 font-light leading-relaxed mb-8">
                  Data-backed progression resulting in higher placement rates and faster promotions across the board.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-8 w-full lg:w-auto">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center lg:items-start p-6 bg-white/80 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm dark:shadow-none"
                  >
                    <strong className="block text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400 mb-2 font-mono">
                      {stat.value}
                    </strong>
                    <span className="text-slate-600 dark:text-slate-400 font-medium text-sm text-center lg:text-left tracking-wide">{stat.label}</span>
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

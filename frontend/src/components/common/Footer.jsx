import { Github, Twitter, Linkedin, Mail, Sparkles, Zap, Command, Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full py-20 mt-20 overflow-hidden border-t border-slate-200 dark:border-slate-800/50 bg-white/40 dark:bg-slate-950/20 backdrop-blur-3xl">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container px-6 md:px-12 mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
          
          {/* Brand Identity Section */}
          <div className="lg:col-span-5 space-y-8">
            <NavLink to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <Command className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white uppercase tracking-widest">
                Adviser<span className="text-indigo-500">.</span>ai
              </span>
            </NavLink>
            
            <p className="text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed max-w-md italic">
              Empowering the next generation of architects through high-precision career trajectories and AI-driven skill acquisition.
            </p>

            <div className="flex items-center gap-4">
              {[
                { icon: <Twitter className="w-5 h-5" />, href: "#" },
                { icon: <Github className="w-5 h-5" />, href: "#" },
                { icon: <Linkedin className="w-5 h-5" />, href: "#" },
                { icon: <Mail className="w-5 h-5" />, href: "#" }
              ].map((social, i) => (
                <a 
                  key={SocialIconMapping[i]} // Just using index for brevity in this scratch tool
                  href={social.href}
                  className="w-12 h-12 rounded-[1.2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-indigo-500 hover:border-indigo-500/50 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Matrix */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 px-1">Navigation</h4>
              <ul className="space-y-5">
                {['Home', 'Platform', 'Security', 'Roadmaps'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-white transition-colors px-1 border-l-2 border-transparent hover:border-indigo-500 pl-4">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 px-1">Integrity</h4>
              <ul className="space-y-5">
                {['Privacy', 'Legal', 'Infrastructure', 'Ethics'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-white transition-colors px-1 border-l-2 border-transparent hover:border-indigo-500 pl-4">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 dark:bg-indigo-500/5 border border-indigo-500/10 space-y-4">
                <Zap className="w-8 h-8 text-indigo-500 fill-current mb-2" />
                <h4 className="text-sm font-black dark:text-white tracking-tight uppercase">Status: Nominal</h4>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-relaxed">All AI systems functioning within optimal parameters.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Footer Bar */}
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">
          <div className="flex items-center gap-8">
            <p>© {currentYear} ADVISER ARCHITECTURE. ALL RIGHTS RESERVED.</p>
            <a href="#" className="hover:text-indigo-500 transition-colors hidden sm:block">SYSTEM LOGS</a>
            <a href="#" className="hover:text-indigo-500 transition-colors hidden sm:block">NETWORK MAP</a>
          </div>
          <div className="flex items-center gap-2">
            <span>ENGINEERED WITH</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-current animate-pulse mx-1" />
            <span>BY THE ADVISER CORE TEAM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SocialIconMapping = ["tw", "gh", "li", "ml"];

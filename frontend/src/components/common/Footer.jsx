import { Github, Twitter, Linkedin, Mail, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-16 mt-20 border-t bg-slate-50 dark:bg-[#030712] border-slate-200 dark:border-slate-800/50">
      <div className="container px-4 md:px-8 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
                your_Advisor
              </h3>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-8 leading-relaxed font-light">
              Build skills with clarity, confidence, and a beautifully personalized roadmap that fits your exact career goals.
            </p>
            <div className="flex gap-4 text-slate-400">
              <a href="#" className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:text-cyan-500 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-all"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:text-cyan-500 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-all"><Github className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:text-cyan-500 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-all"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="p-2 rounded-full border border-slate-200 dark:border-slate-800 hover:text-cyan-500 hover:border-cyan-500/30 dark:hover:border-cyan-500/30 transition-all"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-6 tracking-wide">Product</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Roadmaps</a></li>
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-6 tracking-wide">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/50 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-500">
          <p>© 2026 your_Advisor. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0 font-medium">
            <span>Built with <span className="text-pink-500 animate-pulse">♥</span> for learners</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

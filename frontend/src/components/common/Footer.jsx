import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full py-12 mt-16 border-t bg-surface-light dark:bg-surface-dark/50 border-border">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4 block">
              your_Advisor
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6 leading-relaxed">
              Build skills with clarity, confidence, and a beautifully personalized roadmap that fits your exact goals.
            </p>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Roadmaps</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-500">
          <p>© 2026 your_Advisor. All rights reserved.</p>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <span>Built with <span className="text-rose-500">♥</span> for learners</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

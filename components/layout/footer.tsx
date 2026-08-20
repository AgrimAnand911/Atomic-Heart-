import React from "react";
import { Atom, ShieldCheck, ExternalLink, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-100">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/30">
                <Atom className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">
                Atomic<span className="text-indigo-600">Horizon</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-md leading-relaxed">
              AtomicHorizon is an open engineering initiative demonstrating Nuclear Energy, Small Modular Reactors (SMRs), and Gen IV systems as the essential zero-carbon baseload foundation for clean planetary energy transition and AI infrastructure.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Evidence-based • Standardized Physics Datasets</span>
            </div>
          </div>

          {/* Col 2: Scientific Citations */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              Primary Sources
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <a href="https://www.ipcc.ch/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                  IPCC Assessment Reports (AR5/AR6) <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </li>
              <li>
                <a href="https://www.iaea.org/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                  IAEA Power Reactor Info System <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </li>
              <li>
                <a href="https://unece.org/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                  UNECE Life Cycle Assessment (2021) <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </li>
              <li>
                <a href="https://ourworldindata.org/safest-sources-of-energy" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                  Our World in Data (Mortality/TWh) <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </li>
              <li>
                <a href="https://energy.mit.edu/research/future-nuclear-energy-carbon-constrained-world/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors flex items-center gap-1">
                  MIT Energy Initiative Study <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 font-bold mb-3">
              Interactive Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              <li>
                <a href="#calculator" className="hover:text-indigo-600 transition-colors">
                  Energy Density Calculator
                </a>
              </li>
              <li>
                <a href="#reactors" className="hover:text-indigo-600 transition-colors">
                  Next-Gen Reactor Explorer
                </a>
              </li>
              <li>
                <a href="#control-room" className="hover:text-indigo-600 transition-colors">
                  Virtual SMR Control Room
                </a>
              </li>
              <li>
                <a href="#grid-balancer" className="hover:text-indigo-600 transition-colors">
                  Grid Baseload & Dunkelflaute Sim
                </a>
              </li>
              <li>
                <a href="#myth-matrix" className="hover:text-indigo-600 transition-colors">
                  Scientific Myth vs. Fact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} AtomicHorizon Initiative. Released under MIT Open License.
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            Engineered with Next.js 15 • Tailwind CSS • Zero-Carbon Powered
          </div>
        </div>
      </div>
    </footer>
  );
}

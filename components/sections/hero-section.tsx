"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Play, Sparkles, Activity, ShieldCheck, Zap, Globe, Gauge, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const [co2TonsAvoided, setCo2TonsAvoided] = useState(68420194830);

  useEffect(() => {
    const interval = setInterval(() => {
      setCo2TonsAvoided((prev) => prev + 65);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="overview" className="pt-28 pb-16 md:pt-36 md:pb-24 relative overflow-hidden bg-dot-pattern">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Centered Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100/90 text-indigo-700 text-xs font-medium mb-6 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
          <span>Now Deploying SMRs — 440 Active Reactors Worldwide</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.1]">
          Power civilization{" "}
          <span className="text-indigo-600">cleaner</span>{" "}
          <span className="text-emerald-500">than ever</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed">
          The high-density energy platform delivering 3,000,000x the energy of coal per kilogram. Eliminate carbon emissions, stabilize grids 24/7, and power AI infrastructure with confidence.
        </p>

        {/* Three CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
          <a href="#calculator">
            <Button variant="primary" size="lg" className="rounded-xl font-semibold shadow-indigo-600/25">
              <span>Explore Calculator</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>

          <a href="#reactors">
            <Button variant="secondary" size="lg" className="rounded-xl gap-2 font-medium">
              <Play className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
              <span>See it in action</span>
            </Button>
          </a>

          <a href="#control-room" className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-indigo-600 px-3 py-2 transition-colors">
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-sm">
              <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
            </div>
            <span>Watch Sim</span>
          </a>
        </div>

        {/* 4 Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16 pt-10 border-t border-slate-200/80 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
              3,000,000<span className="text-indigo-600 font-sans">x</span>
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Energy Density vs Coal</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
              99.9%
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Base-Load Grid Uptime</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
              68.4<span className="text-slate-400 font-sans"> Gt</span>
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Global CO₂ Prevented</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
              0.13<span className="text-slate-400 font-sans"> km²</span>
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">Land Footprint / TWh</div>
          </div>
        </div>

        {/* Hero Showcase Mockup Card */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative rounded-3xl p-3 sm:p-4 bg-slate-900 shadow-2xl shadow-slate-900/20 border border-slate-800">
            {/* Top Mockup Title Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 text-xs text-slate-400 font-mono mb-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                </div>
                <span className="text-slate-300 ml-2 font-bold flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  ATOMIC TELEMETRY: GLOBAL REAL-TIME BASELOAD MONITOR
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[11px]">
                <span className="text-emerald-400">● 440 Active Reactors</span>
                <span className="text-slate-500">|</span>
                <span>Output: 2,750 TWh/yr</span>
              </div>
            </div>

            {/* Dashboard Mockup Interior */}
            <div className="bg-slate-950 rounded-2xl p-4 sm:p-6 text-left border border-slate-800/80">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Graph: Energy Density & Burnup Curve */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300 font-bold uppercase">FUEL YIELD vs MASS COMPONENT</span>
                    <span className="text-cyan-400">92.5% EFF</span>
                  </div>
                  {/* Histogram graphic visualization */}
                  <div className="h-32 flex items-end gap-1.5 pt-4 pb-1 border-b border-slate-800">
                    {[35, 42, 58, 72, 85, 96, 88, 70, 52, 40, 30, 24, 18, 14, 10, 8].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end h-full">
                        <div
                          className="w-full bg-cyan-400 rounded-t-sm transition-all hover:bg-cyan-300"
                          style={{ height: `${val}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>U-235 Fission Yield</span>
                    <span className="text-emerald-400">1 Pellet = 1 Ton Coal</span>
                  </div>
                </div>

                {/* Right Graph: Grid Synchronous Inertia */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-300 font-bold uppercase">GRID INERTIA & FREQUENCY (60.00 Hz)</span>
                    <span className="text-emerald-400 font-bold">100 / 100 STABLE</span>
                  </div>
                  {/* Histogram graphic visualization */}
                  <div className="h-32 flex items-end gap-1.5 pt-4 pb-1 border-b border-slate-800">
                    {[98, 99, 100, 99, 98, 100, 99, 100, 99, 98, 100, 99, 100, 99, 100, 99].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end h-full">
                        <div
                          className="w-full bg-indigo-500 rounded-t-sm transition-all hover:bg-indigo-400"
                          style={{ height: `${val}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Rotational Turbine Mass</span>
                    <span className="text-indigo-400">Zero Blackout Vulnerability</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Metric Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800/80 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">LIFECYCLE CO₂:</span>
                  <strong className="text-emerald-400">12 g CO₂/kWh</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">LAND OCCUPANCY:</span>
                  <strong className="text-cyan-400">0.13 km² / TWh</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">AVAILABILITY:</span>
                  <strong className="text-white">24/7 / 365 Continuous</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">SAFETY RATING:</span>
                  <strong className="text-indigo-400">0.03 Deaths / TWh</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { Atom, ShieldCheck, Thermometer, Flame, Layers, CheckCircle2, ChevronRight, Sparkles, Building2 } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { REACTOR_ARCHITECTURES } from "@/lib/reactor-data";

export function ReactorExplorer() {
  const [selectedReactorId, setSelectedReactorId] = useState<string>("smr-light-water");
  const selectedReactor = REACTOR_ARCHITECTURES.find((r) => r.id === selectedReactorId) || REACTOR_ARCHITECTURES[0];

  return (
    <section id="reactors" className="py-20 md:py-28 relative bg-slate-50/70 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="indigo" className="mb-3">
            Gen III+, SMRs & Gen IV Blueprints
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Next-Gen Reactor Architectural Explorer
          </h2>
          <p className="text-slate-600 mt-4 text-sm sm:text-base">
            Explore advanced Small Modular Reactors (SMRs), high-temperature gas systems, sodium fast breeders, and commercial fusion engineered with walk-away passive safety laws.
          </p>
        </div>

        {/* Reactor Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {REACTOR_ARCHITECTURES.map((reactor) => {
            const isSelected = selectedReactorId === reactor.id;
            return (
              <button
                key={reactor.id}
                onClick={() => setSelectedReactorId(reactor.id)}
                className={`p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-white border-indigo-500 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-500"
                    : "bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-indigo-600 font-semibold">
                    {reactor.category}
                  </span>
                  {isSelected && <span className="h-2 w-2 rounded-full bg-indigo-600"></span>}
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{reactor.name}</h3>
                <div className="mt-2 text-[11px] text-slate-500 font-mono">
                  {reactor.electricOutputMWe} MWe • {reactor.operatingTempC}°C
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Blueprint & Physics Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard glow="indigo" className="p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100">
                <div>
                  <Badge variant="indigo" className="mb-1">{selectedReactor.status}</Badge>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {selectedReactor.name}
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Thermal Output</span>
                    <strong className="text-slate-900 text-base">{selectedReactor.thermalOutputMWth} MWth</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Net Electric</span>
                    <strong className="text-indigo-600 text-base">{selectedReactor.electricOutputMWe} MWe</strong>
                  </div>
                </div>
              </div>

              {/* Reactor Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block font-mono">Coolant</span>
                  <span className="text-xs font-semibold text-slate-800 mt-1 block">{selectedReactor.coolant}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block font-mono">Core Temp</span>
                  <span className="text-xs font-semibold text-indigo-600 mt-1 block">
                    {selectedReactor.operatingTempC.toLocaleString()}°C
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block font-mono">Efficiency</span>
                  <span className="text-xs font-semibold text-slate-800 mt-1 block">{selectedReactor.efficiencyPercent}% Net</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[11px] text-slate-500 block font-mono">Footprint</span>
                  <span className="text-xs font-semibold text-emerald-600 mt-1 block">~{selectedReactor.deploymentFootprintAcres} Acres</span>
                </div>
              </div>

              {/* Passive Safety Systems */}
              <div className="mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <h4 className="text-base font-bold text-slate-900">
                    Inherent Passive Safety & Meltdown-Proof Laws
                  </h4>
                </div>
                <div className="space-y-3">
                  {selectedReactor.passiveSafetyMechanisms.map((safety, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                        <h5 className="text-sm font-semibold text-slate-900">{safety.title}</h5>
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{safety.description}</p>
                      <div className="mt-2 text-[11px] text-slate-500 font-mono">
                        Governing Physics: <span className="text-slate-700">{safety.physicsLaw}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Advantages */}
              <div className="mt-8">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 font-mono">
                  Architectural Advantages
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedReactor.keyAdvantages.map((adv, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Target Applications */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Target Applications
                </h4>
              </div>
              <ul className="space-y-2">
                {selectedReactor.industrialUseCases.map((useCase, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Commercial Manufacturers */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <h4 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Commercial Leaders
                </h4>
              </div>
              <div className="space-y-2">
                {selectedReactor.commercialLeaders.map((leader, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 flex items-center justify-between">
                    <span>{leader}</span>
                    <Badge variant="indigo" className="text-[10px]">Active</Badge>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Fuel Specs */}
            <GlassCard className="p-6 border-slate-200">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 font-semibold">
                Fuel & Containment
              </h4>
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Fuel Type:</span>
                  <span className="text-slate-900 font-medium">{selectedReactor.fuelType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Containment:</span>
                  <span className="text-slate-700">{selectedReactor.schematicDetails.containmentBarrier}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Decay Heat Removal:</span>
                  <span className="text-emerald-700 font-mono font-medium">{selectedReactor.schematicDetails.decayHeatRemovalTimeDays}</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

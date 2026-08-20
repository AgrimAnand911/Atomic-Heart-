"use client";

import React from "react";
import { Server, Sparkles, Building2, ShieldCheck, ArrowUpRight, Cpu, Flame } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";

const HYPERSCALER_DEALS = [
  {
    company: "Microsoft & Constellation",
    project: "Crane Clean Energy Center (Unit 1)",
    capacity: "835 MWe Clean Power",
    timeline: "20-Year Dedicated PPA (2028)",
    focus: "100% clean 24/7 dedicated nuclear electricity for next-gen hyperscale AI datacenter clusters.",
    icon: Server,
    color: "indigo",
  },
  {
    company: "Google & Kairos Power",
    project: "Fleet SMR Advanced Salt-Cooled Reactors",
    capacity: "500 MWe Clean Baseload",
    timeline: "First Unit 2030, Full Fleet 2035",
    focus: "Modular molten fluoride salt reactors providing firm power for US cloud and generative AI infrastructure.",
    icon: Cpu,
    color: "cyan",
  },
  {
    company: "Amazon Web Services (AWS) & Talen",
    project: "Cumulus Nuclear Datacenter Campus",
    capacity: "960 MWe Direct Campus Interconnect",
    timeline: "Operational (Expanding to 1+ GW)",
    focus: "Direct zero-carbon nuclear electricity supplied from the Susquehanna Steam Electric Station.",
    icon: Server,
    color: "indigo",
  },
  {
    company: "Dow Chemical & X-energy",
    project: "Seadrift Industrial Clean Heat Project",
    capacity: "320 MWe + High-Grade Steam",
    timeline: "DOE ARDP Co-Funded (2026)",
    focus: "Four Xe-100 SMR units delivering zero-carbon industrial process heat and power for chemical manufacturing.",
    icon: Flame,
    color: "emerald",
  },
];

export function TechHyperscalers() {
  return (
    <section id="partnerships" className="py-20 md:py-28 relative bg-slate-50/70 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="indigo" className="mb-3">
            Industrial & AI Infrastructure Momentum
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Powering the AI Revolution & Heavy Industry
          </h2>
          <p className="text-slate-600 mt-4 text-sm sm:text-base">
            Global technology leaders and heavy manufacturers have recognized that generative AI compute and chemical synthesis cannot run on intermittent weather—committing billions to long-term nuclear power purchase agreements.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HYPERSCALER_DEALS.map((deal, idx) => {
            const Icon = deal.icon;
            return (
              <GlassCard
                key={idx}
                glow={deal.color === "indigo" ? "indigo" : "emerald"}
                className="p-6 md:p-8 space-y-4 hover:border-indigo-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">{deal.company}</h3>
                      <span className="text-xs font-mono text-slate-500">{deal.project}</span>
                    </div>
                  </div>
                  <Badge variant={deal.color === "indigo" ? "indigo" : "emerald"}>
                    {deal.capacity}
                  </Badge>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {deal.focus}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Target Schedule:</span>
                  <span className="text-slate-800 font-semibold">{deal.timeline}</span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

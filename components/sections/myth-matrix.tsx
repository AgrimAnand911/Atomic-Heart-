"use client";

import React, { useState } from "react";
import { ShieldCheck, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, BookOpen, Sparkles, Filter } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { MYTH_FACT_ITEMS } from "@/lib/myth-data";
import { MythFactItem } from "@/types/nuclear";

export function MythMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string>("myth-waste-unsolved");

  const filteredItems = MYTH_FACT_ITEMS.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? "" : id);
  };

  return (
    <section id="myth-matrix" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="indigo" className="mb-3">
            Peer-Reviewed Scientific Reality
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Myth vs. Fact: The Empirical Truth
          </h2>
          <p className="text-slate-600 mt-4 text-sm sm:text-base">
            Deconstructing common misconceptions surrounding spent fuel management, low-dose radiation, statistical mortality, and construction economics using empirical data from the IAEA, DOE, and Lancet.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { key: "all", label: "All Topics" },
            { key: "waste", label: "Spent Fuel & Waste" },
            { key: "radiation", label: "Radiation & Health" },
            { key: "safety", label: "Life-Cycle Safety" },
            { key: "grid", label: "Grid Physics & Storage" },
            { key: "economics", label: "Capital & Build Times" },
          ].map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? "bg-indigo-600 text-white font-semibold border-indigo-600 shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion Cards Grid */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredItems.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <GlassCard
                key={item.id}
                glow={isExpanded ? "indigo" : "none"}
                className={`p-6 transition-all duration-200 ${
                  isExpanded ? "border-indigo-300 bg-white ring-1 ring-indigo-200" : "hover:border-slate-300"
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full flex items-start justify-between gap-4 text-left cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        MYTH
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        &ldquo;{item.myth}&rdquo;
                      </h3>
                    </div>

                    <div className="flex items-start gap-2 pt-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm font-semibold text-emerald-700">
                        {item.fact}
                      </p>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-100 text-slate-600 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Detailed Scientific Breakdown */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-6">
                    <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.scientificExplanation}
                    </div>

                    {/* Benchmark Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {item.dataPoints.map((dp, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                          <span className="text-[10px] font-mono text-slate-500 block">{dp.label}</span>
                          <div className="text-sm font-bold text-indigo-700 font-mono">{dp.value}</div>
                          <span className="text-[10px] text-slate-500 block">{dp.benchmark}</span>
                        </div>
                      ))}
                    </div>

                    {/* Verified Peer-Reviewed Sources */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 uppercase mb-2">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Peer-Reviewed Citations:</span>
                      </div>
                      <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                        {item.verifiedSources.map((source, sIdx) => (
                          <li key={sIdx}>{source}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

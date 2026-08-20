"use client";

import React, { useState, useMemo } from "react";
import { Zap, Trees, Flame, ShieldAlert, Cpu, Sparkles, Building2, Factory, Server, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { calculateEnergyComparison, ENERGY_PROFILES } from "@/lib/physics-constants";
import { formatNumber, formatCompactNumber } from "@/lib/utils";

const PRESETS = [
  {
    name: "AI Datacenter Campus",
    mwh: 876000,
    icon: Server,
    desc: "100 MW continuous compute facility",
  },
  {
    name: "Industrial Metropolis",
    mwh: 12000000,
    icon: Building2,
    desc: "1.5 Million citizen city grid",
  },
  {
    name: "Heavy Steel Mill / Refinery",
    mwh: 3500000,
    icon: Factory,
    desc: "Electrified heavy industrial plant",
  },
];

export function EnergyCalculator() {
  const [mwhDemand, setMwhDemand] = useState<number>(876000);
  const [activeTab, setActiveTab] = useState<"fuel" | "land" | "emissions" | "materials">("fuel");

  const results = useMemo(() => {
    return calculateEnergyComparison(mwhDemand);
  }, [mwhDemand]);

  const nuclearData = results.sources.nuclear;
  const coalData = results.sources.coal;
  const gasData = results.sources.gas;
  const solarData = results.sources.solar;
  const windData = results.sources.wind;

  return (
    <section id="calculator" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="indigo" className="mb-3">
            Multi-Variable Physics Engine
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Energy Density & Resource Calculator
          </h2>
          <p className="text-slate-600 mt-4 text-sm sm:text-base">
            Adjust target energy demand to compute the exact physical resources—fuel mass, land footprint, critical minerals, and life-cycle carbon—across nuclear, fossil, and renewable power.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          <span className="text-xs text-slate-400 uppercase font-mono mr-1">Presets:</span>
          {PRESETS.map((preset) => {
            const Icon = preset.icon;
            const isSelected = mwhDemand === preset.mwh;
            return (
              <button
                key={preset.name}
                onClick={() => setMwhDemand(preset.mwh)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-indigo-600" />
                <span>{preset.name}</span>
                <span className="text-slate-400 font-mono text-[10px]">
                  ({formatCompactNumber(preset.mwh)} MWh)
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Slider Box */}
        <div className="p-6 md:p-8 mb-10 rounded-2xl bg-white border border-slate-200/90 shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-semibold">
                Target Annual Electricity Generation
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono mt-1">
                {formatNumber(mwhDemand)} <span className="text-indigo-600 text-xl font-sans">MWh / year</span>
              </div>
              <span className="text-xs text-slate-500">
                Equivalent to <strong>{(mwhDemand / 1000000).toFixed(2)} Terawatt-hours (TWh)</strong>
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200 text-xs font-mono text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Continuous Baseload: <strong>{Math.round(mwhDemand / 8760)} MW</strong></span>
            </div>
          </div>

          {/* Slider input */}
          <div className="space-y-2">
            <input
              type="range"
              min={10000}
              max={25000000}
              step={10000}
              value={mwhDemand}
              onChange={(e) => setMwhDemand(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>10k MWh (Microgrid)</span>
              <span>5M MWh</span>
              <span>15M MWh</span>
              <span>25M MWh (State Grid)</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
            {[
              { key: "fuel", label: "Fuel Mass Required", icon: Zap },
              { key: "land", label: "Land Footprint (km²)", icon: Trees },
              { key: "emissions", label: "Lifecycle Carbon (CO₂)", icon: Flame },
              { key: "materials", label: "Mineral Intensity", icon: Cpu },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-slate-900 font-semibold shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4 text-indigo-600" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content 1: Fuel Mass */}
        {activeTab === "fuel" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard glow="emerald" className="p-6 border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="emerald">Clean Baseload</Badge>
                <Zap className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Nuclear Fission</h3>
              <div className="text-3xl font-extrabold text-emerald-600 font-mono mt-2">
                {nuclearData.fuelMassKg < 1000
                  ? `${nuclearData.fuelMassKg.toFixed(2)} kg`
                  : `${(nuclearData.fuelMassKg / 1000).toFixed(2)} Metric Tons`}
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Enriched Uranium Oxide (UO₂). A tiny volume fitting in the trunk of a passenger sedan provides this entire power demand for a full year.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between font-mono">
                  <span>Fuel Transport:</span>
                  <strong className="text-emerald-700">1 Single Pickup Truck</strong>
                </div>
                <div className="flex justify-between font-mono">
                  <span>Solid Waste Volume:</span>
                  <strong className="text-slate-800">~{(nuclearData.fuelMassKg * 0.0001).toFixed(3)} m³</strong>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="amber">Fossil Fuel</Badge>
                <Flame className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Coal Combustion</h3>
              <div className="text-3xl font-extrabold text-amber-600 font-mono mt-2">
                {coalData.fuelMassFormatted}
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Requires hundreds of unit-train rail cars transporting millions of metric tons of crushed coal annually.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between font-mono">
                  <span>Mass Ratio vs Nuclear:</span>
                  <strong className="text-amber-700">{formatCompactNumber(coalData.fuelComparisonRatio)}x More Fuel</strong>
                </div>
                <div className="flex justify-between font-mono">
                  <span>100-Ton Rail Cars:</span>
                  <strong className="text-slate-800">~{Math.round((coalData.fuelMassKg / 1000) / 100).toLocaleString()} Cars</strong>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Badge variant="zinc">Hydrocarbon</Badge>
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Natural Gas (LNG)</h3>
              <div className="text-3xl font-extrabold text-orange-600 font-mono mt-2">
                {gasData.fuelMassFormatted}
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Pressurized pipeline distribution subject to fuel price volatility and methane leakage risks.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between font-mono">
                  <span>Mass Ratio vs Nuclear:</span>
                  <strong className="text-orange-700">{formatCompactNumber(gasData.fuelComparisonRatio)}x More Fuel</strong>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Tab Content 2: Land Footprint */}
        {activeTab === "land" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <GlassCard glow="emerald" className="p-6 border-emerald-200">
              <Badge variant="emerald" className="mb-2">Nuclear Footprint</Badge>
              <div className="text-2xl sm:text-3xl font-bold text-emerald-700 font-mono">
                {nuclearData.landAreaKm2.toFixed(3)} km²
              </div>
              <span className="text-xs text-slate-500 font-mono">
                (~{nuclearData.landAreaSoccerFields} Soccer Pitches)
              </span>
              <p className="text-xs text-slate-600 mt-3">
                Compact footprint including plant, cooling towers, and security buffer. Leaves nature and forests undisturbed.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <Badge variant="amber" className="mb-2">Solar PV Footprint</Badge>
              <div className="text-2xl sm:text-3xl font-bold text-amber-700 font-mono">
                {solarData.landAreaKm2.toFixed(1)} km²
              </div>
              <span className="text-xs text-slate-500 font-mono">
                (~{solarData.landAreaSoccerFields.toLocaleString()} Soccer Pitches)
              </span>
              <p className="text-xs text-slate-600 mt-3">
                Requires <strong>{(solarData.landAreaKm2 / (nuclearData.landAreaKm2 || 1)).toFixed(0)}x more land area</strong> than nuclear due to diffuse photon flux and low capacity factor.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <Badge variant="cyan" className="mb-2">Onshore Wind</Badge>
              <div className="text-2xl sm:text-3xl font-bold text-cyan-700 font-mono">
                {windData.landAreaKm2.toFixed(1)} km²
              </div>
              <span className="text-xs text-slate-500 font-mono">
                (~{windData.landAreaSoccerFields.toLocaleString()} Soccer Pitches)
              </span>
              <p className="text-xs text-slate-600 mt-3">
                Requires <strong>{(windData.landAreaKm2 / (nuclearData.landAreaKm2 || 1)).toFixed(0)}x more land area</strong> across sprawling turbine fields and access corridors.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <Badge variant="zinc" className="mb-2">Coal Mining</Badge>
              <div className="text-2xl sm:text-3xl font-bold text-slate-800 font-mono">
                {coalData.landAreaKm2.toFixed(1)} km²
              </div>
              <span className="text-xs text-slate-500 font-mono">
                (~{coalData.landAreaSoccerFields.toLocaleString()} Soccer Pitches)
              </span>
              <p className="text-xs text-slate-600 mt-3">
                Extensive open-pit strip mines, mountain-top removal, and toxic coal ash storage basins.
              </p>
            </GlassCard>
          </div>
        )}

        {/* Tab Content 3: Emissions */}
        {activeTab === "emissions" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard glow="emerald" className="p-6 border-emerald-200">
              <Badge variant="emerald" className="mb-2">Zero Operational Emissions</Badge>
              <h4 className="text-base font-bold text-slate-900">Nuclear Lifecycle CO₂</h4>
              <div className="text-3xl font-bold text-emerald-600 font-mono mt-2">
                {formatNumber(nuclearData.lifecycleCO2MetricTons)} Tons
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Median 12g CO₂/kWh (primarily from concrete and steel manufacturing).
              </p>
              <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800">
                🌿 Avoids <strong>{formatCompactNumber(nuclearData.co2AvoidedVsCoalTons)} Metric Tons</strong> of CO₂ vs Coal.
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <Badge variant="amber" className="mb-2">Coal Emissions</Badge>
              <h4 className="text-base font-bold text-slate-900">Coal Combustion CO₂</h4>
              <div className="text-3xl font-bold text-amber-600 font-mono mt-2">
                {formatNumber(coalData.lifecycleCO2MetricTons)} Tons
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Emits 820g CO₂/kWh plus sulfur dioxide, nitrogen oxides, heavy metals (mercury, arsenic), and radioactive fly ash.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <Badge variant="zinc" className="mb-2">Natural Gas</Badge>
              <h4 className="text-base font-bold text-slate-900">Natural Gas CO₂</h4>
              <div className="text-3xl font-bold text-orange-600 font-mono mt-2">
                {formatNumber(gasData.lifecycleCO2MetricTons)} Tons
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Emits 490g CO₂/kWh. Incomplete combustion leaks unburned methane (84x more potent warming agent over 20 years).
              </p>
            </GlassCard>
          </div>
        )}

        {/* Tab Content 4: Materials */}
        {activeTab === "materials" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <GlassCard glow="emerald" className="p-6 border-emerald-200">
              <Badge variant="emerald" className="mb-2">Nuclear Material Efficiency</Badge>
              <div className="text-3xl font-bold text-emerald-600 font-mono">
                {formatNumber(nuclearData.mineralDemandTons)} Tons
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Ultra-high energy density translates directly into the lowest critical mineral consumption per unit of electricity generated.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <Badge variant="amber" className="mb-2">Solar PV Minerals</Badge>
              <div className="text-3xl font-bold text-amber-600 font-mono">
                {formatNumber(solarData.mineralDemandTons)} Tons
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Requires <strong>{(solarData.mineralDemandTons / (nuclearData.mineralDemandTons || 1)).toFixed(1)}x more materials</strong> (silicon, copper, glass, and silver) per TWh.
              </p>
            </GlassCard>

            <GlassCard className="p-6">
              <Badge variant="cyan" className="mb-2">Wind Turbine Minerals</Badge>
              <div className="text-3xl font-bold text-cyan-600 font-mono">
                {formatNumber(windData.mineralDemandTons)} Tons
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Requires <strong>{(windData.mineralDemandTons / (nuclearData.mineralDemandTons || 1)).toFixed(1)}x more materials</strong> (massive concrete, fiberglass, and rare earths) per TWh.
              </p>
            </GlassCard>
          </div>
        )}
      </div>
    </section>
  );
}

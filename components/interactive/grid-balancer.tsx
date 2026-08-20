"use client";

import React, { useState, useMemo } from "react";
import { Activity, Zap, Sun, Wind, Flame, BatteryCharging, AlertTriangle, ShieldCheck, CloudFog, CloudLightning, SunMedium, Compass } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { runGridSimulation } from "@/lib/grid-simulator-engine";
import { GridSimulationState } from "@/types/nuclear";

export function GridBalancer() {
  const [nuclearPercent, setNuclearPercent] = useState<number>(60);
  const [solarPercent, setSolarPercent] = useState<number>(20);
  const [windPercent, setWindPercent] = useState<number>(20);
  const [gasPercent, setGasPercent] = useState<number>(0);
  const [batteryStorageGWh, setBatteryStorageGWh] = useState<number>(10);
  const [weatherPattern, setWeatherPattern] = useState<GridSimulationState["weatherPattern"]>("normal");

  const simulationState: GridSimulationState = {
    nuclearPercent,
    solarPercent,
    windPercent,
    gasPercent,
    batteryStorageGWh,
    currentHour: 14,
    weatherPattern,
  };

  const simResults = useMemo(() => {
    return runGridSimulation(simulationState);
  }, [nuclearPercent, solarPercent, windPercent, gasPercent, batteryStorageGWh, weatherPattern]);

  return (
    <section id="grid-balancer" className="py-20 md:py-28 relative bg-slate-50/70 border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="indigo" className="mb-3">
            24/7 Grid Reliability Modeling
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            24/7 Baseload & Grid Stability Balancer
          </h2>
          <p className="text-slate-600 mt-4 text-sm sm:text-base">
            Mix power sources and test grid vulnerability against weather anomalies like <em>Dunkelflaute</em> (two-week winter wind/solar collapses) to see why nuclear rotational inertia prevents catastrophic grid frequency failures.
          </p>
        </div>

        {/* Weather Pattern Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          <span className="text-xs text-slate-400 font-mono uppercase mr-1">Weather:</span>
          {[
            { key: "normal", label: "Nominal Spring/Autumn", icon: SunMedium },
            { key: "dunkelflaute", label: "Winter Dunkelflaute (Calm + Fog)", icon: CloudFog },
            { key: "heatwave", label: "Summer Heatwave (Air Con Peak)", icon: Sun },
            { key: "wind_storm", label: "Gale Storm", icon: CloudLightning },
          ].map((weather) => {
            const Icon = weather.icon;
            const isSelected = weatherPattern === weather.key;
            return (
              <button
                key={weather.key}
                onClick={() => setWeatherPattern(weather.key as any)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{weather.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Column */}
          <GlassCard className="p-6 space-y-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono border-b border-slate-100 pb-3">
              Grid Generation Mix (%)
            </h3>

            {/* Nuclear % */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  Nuclear Baseload:
                </span>
                <strong className="text-slate-900">{nuclearPercent}%</strong>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={nuclearPercent}
                onChange={(e) => setNuclearPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            {/* Solar % */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-amber-700 font-semibold flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  Solar PV Array:
                </span>
                <strong className="text-slate-900">{solarPercent}%</strong>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={solarPercent}
                onChange={(e) => setSolarPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Wind % */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-cyan-700 font-semibold flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-cyan-600" />
                  Wind Turbines:
                </span>
                <strong className="text-slate-900">{windPercent}%</strong>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={windPercent}
                onChange={(e) => setWindPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
            </div>

            {/* Gas % */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-orange-700 font-semibold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  Gas Peakers:
                </span>
                <strong className="text-slate-900">{gasPercent}%</strong>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={5}
                value={gasPercent}
                onChange={(e) => setGasPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            {/* Battery Storage Capacity GWh */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-semibold flex items-center gap-1.5">
                  <BatteryCharging className="w-3.5 h-3.5 text-indigo-600" />
                  Battery Storage:
                </span>
                <strong className="text-indigo-600">{batteryStorageGWh} GWh</strong>
              </div>
              <input
                type="range"
                min={0}
                max={80}
                step={5}
                value={batteryStorageGWh}
                onChange={(e) => setBatteryStorageGWh(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-[10px] text-slate-500">
                Provides ~{(batteryStorageGWh / 10).toFixed(1)} hours of 10 GW peak backup discharge.
              </span>
            </div>
          </GlassCard>

          {/* Visual 24-Hour Graph & Key Telemetry Metrics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Top Scorecards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <GlassCard className="p-4">
                <span className="text-[11px] font-mono text-slate-500 block">Reliability Index</span>
                <div className={`text-2xl font-bold font-mono mt-1 ${simResults.overallReliabilityScore > 98 ? "text-emerald-600" : "text-amber-600"}`}>
                  {simResults.overallReliabilityScore}%
                </div>
                <span className="text-[10px] text-slate-400">Continuous power</span>
              </GlassCard>

              <GlassCard className="p-4">
                <span className="text-[11px] font-mono text-slate-500 block">Grid Inertia</span>
                <div className={`text-2xl font-bold font-mono mt-1 ${simResults.gridInertiaScore >= 50 ? "text-indigo-600" : "text-rose-600"}`}>
                  {simResults.gridInertiaScore} / 100
                </div>
                <span className="text-[10px] text-slate-400">Frequency stability</span>
              </GlassCard>

              <GlassCard className="p-4">
                <span className="text-[11px] font-mono text-slate-500 block">Carbon Intensity</span>
                <div className="text-2xl font-bold text-slate-900 font-mono mt-1">
                  {simResults.totalCarbonIntensityGPerKWh} <span className="text-xs font-sans text-slate-400">g/kWh</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-mono">Net emissions rate</span>
              </GlassCard>

              <GlassCard className="p-4">
                <span className="text-[11px] font-mono text-slate-500 block">Blackout Risk</span>
                <div className="text-xs font-bold text-slate-900 font-mono mt-2 flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${simResults.blackoutRisk.includes("Negligible") ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                  <span>{simResults.blackoutRisk}</span>
                </div>
              </GlassCard>
            </div>

            {/* 24-Hour Graph */}
            <GlassCard glow="indigo" className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold text-slate-800 font-mono uppercase tracking-wider">
                  24-Hour Continuous Load vs. Generation (MW)
                </h4>
                <div className="flex items-center gap-3 text-[10px] font-mono">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500"></span> Nuclear</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400"></span> Solar</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-cyan-500"></span> Wind</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-orange-400"></span> Gas</span>
                </div>
              </div>

              {/* 24-Hour Graph Bars */}
              <div className="h-48 flex items-end gap-1 sm:gap-2 pt-6 pb-2 border-b border-slate-200">
                {simResults.hourlySupply.map((hourData) => {
                  const maxDisplayMW = 14000;
                  const nuclearHeight = (hourData.nuclearMW / maxDisplayMW) * 100;
                  const solarHeight = (hourData.solarMW / maxDisplayMW) * 100;
                  const windHeight = (hourData.windMW / maxDisplayMW) * 100;
                  const gasHeight = (hourData.gasMW / maxDisplayMW) * 100;
                  const demandLine = (hourData.demandMW / maxDisplayMW) * 100;

                  return (
                    <div
                      key={hourData.hour}
                      className="flex-1 flex flex-col justify-end h-full relative group cursor-pointer"
                    >
                      {/* Demand target marker */}
                      <div
                        className="absolute w-full h-[2px] bg-rose-500 z-20"
                        style={{ bottom: `${demandLine}%` }}
                      />

                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-30 p-2 bg-slate-900 text-white rounded-lg text-[10px] font-mono whitespace-nowrap shadow-xl">
                        <div>Hour: {hourData.hour}:00</div>
                        <div>Demand: {hourData.demandMW} MW</div>
                        <div>Supply: {hourData.totalGeneratedMW} MW</div>
                        {hourData.unmetDemandMW > 0 && (
                          <div className="text-rose-400 font-bold">Deficit: {hourData.unmetDemandMW} MW</div>
                        )}
                      </div>

                      {/* Stacked generation segments */}
                      <div
                        className="w-full bg-orange-400"
                        style={{ height: `${gasHeight}%` }}
                      />
                      <div
                        className="w-full bg-cyan-500"
                        style={{ height: `${windHeight}%` }}
                      />
                      <div
                        className="w-full bg-amber-400"
                        style={{ height: `${solarHeight}%` }}
                      />
                      <div
                        className="w-full bg-emerald-500"
                        style={{ height: `${nuclearHeight}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Hour X-Axis Labels */}
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2">
                <span>00:00</span>
                <span>06:00 (Morning Ramp)</span>
                <span>12:00 (Solar Peak)</span>
                <span>18:00 (Evening Peak)</span>
                <span>23:00</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}

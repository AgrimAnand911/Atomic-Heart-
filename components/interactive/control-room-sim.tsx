"use client";

import React, { useState, useEffect } from "react";
import { Activity, ShieldAlert, Zap, Thermometer, Gauge, RotateCcw, AlertTriangle, CheckCircle2, Play, Pause } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ControlRoomSim() {
  const [controlRodDepth, setControlRodDepth] = useState<number>(20);
  const [coolantFlowPercent, setCoolantFlowPercent] = useState<number>(100);
  const [isScrammed, setIsScrammed] = useState<boolean>(false);
  const [isSimRunning, setIsSimRunning] = useState<boolean>(true);

  // Telemetry state
  const [coreTempC, setCoreTempC] = useState<number>(315);
  const [neutronFluxPercent, setNeutronFluxPercent] = useState<number>(98);
  const [thermalPowerMWth, setThermalPowerMWth] = useState<number>(250);
  const [electricPowerMWe, setElectricPowerMWe] = useState<number>(77);
  const [reactivityPcm, setReactivityPcm] = useState<number>(0);
  const [dopplerFeedbackPcm, setDopplerFeedbackPcm] = useState<number>(-45);

  useEffect(() => {
    if (!isSimRunning) return;

    const interval = setInterval(() => {
      if (isScrammed) {
        setNeutronFluxPercent((prev) => Number(Math.max(0.8, prev * 0.75).toFixed(1)));
        setThermalPowerMWth((prev) => Number(Math.max(7.5, prev * 0.8).toFixed(1)));
        setElectricPowerMWe((prev) => Number(Math.max(0, prev * 0.6).toFixed(1)));
        setCoreTempC((prev) => Math.round(Math.max(120, prev - (prev - 120) * 0.1)));
        setReactivityPcm(-4500);
        setDopplerFeedbackPcm(0);
        return;
      }

      const baseReactivityFromRods = (50 - controlRodDepth) * 35;
      const targetFlux = Math.max(0, Math.min(120, (100 - controlRodDepth) * 1.25));
      const newFlux = neutronFluxPercent + (targetFlux - neutronFluxPercent) * 0.25;

      const targetThermal = (newFlux / 100) * 250;
      const newThermal = thermalPowerMWth + (targetThermal - thermalPowerMWth) * 0.2;

      const coolantExtractionRate = (coolantFlowPercent / 100);
      const tempDelta = (newThermal / 250 - coolantExtractionRate) * 40;
      const targetTemp = 300 + tempDelta;
      const newTemp = coreTempC + (targetTemp - coreTempC) * 0.15;

      const dopplerDelta = Math.max(-500, -(newTemp - 300) * 3.5);
      const effectiveReactivity = Math.round(baseReactivityFromRods + dopplerDelta);

      setNeutronFluxPercent(Number(newFlux.toFixed(1)));
      setThermalPowerMWth(Number(newThermal.toFixed(1)));
      setElectricPowerMWe(Number((newThermal * 0.31).toFixed(1)));
      setCoreTempC(Math.round(newTemp));
      setReactivityPcm(effectiveReactivity);
      setDopplerFeedbackPcm(Math.round(dopplerDelta));
    }, 400);

    return () => clearInterval(interval);
  }, [isSimRunning, isScrammed, controlRodDepth, coolantFlowPercent, neutronFluxPercent, thermalPowerMWth, coreTempC]);

  const handleScram = () => {
    setIsScrammed(true);
    setControlRodDepth(100);
  };

  const handleReset = () => {
    setIsScrammed(false);
    setControlRodDepth(20);
    setCoolantFlowPercent(100);
    setCoreTempC(315);
    setNeutronFluxPercent(98);
    setThermalPowerMWth(250);
    setElectricPowerMWe(77);
  };

  let systemStatus = "NOMINAL BASELOAD";
  let statusBadgeVariant: "emerald" | "amber" | "indigo" | "zinc" = "emerald";

  if (isScrammed) {
    systemStatus = "EMERGENCY SCRAM: PASSIVE DECAY HEAT COOLING ACTIVE";
    statusBadgeVariant = "zinc";
  } else if (coreTempC > 350) {
    systemStatus = "DOPPLER STABILIZING: INHERENT PHYSICS CURBING REACTIVITY";
    statusBadgeVariant = "amber";
  } else if (controlRodDepth > 50) {
    systemStatus = "REDUCED LOAD FOLLOWING OPERATION";
    statusBadgeVariant = "indigo";
  }

  return (
    <section id="control-room" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="indigo" className="mb-3">
            Real-Time Virtual Simulator
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Virtual SMR Control Room & Physics Engine
          </h2>
          <p className="text-slate-600 mt-4 text-sm sm:text-base">
            Interact with live control rod depth and primary coolant flow to witness how inherent Doppler feedback and passive cooling laws prevent core meltdowns under any condition.
          </p>
        </div>

        {/* Control Room Console Card */}
        <div className="p-6 md:p-8 max-w-5xl mx-auto rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-white">
          {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-950/80 text-indigo-400 border border-indigo-500/30">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Unit-1 SMR Reactor Core</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs font-mono font-bold ${isScrammed ? "text-slate-400" : coreTempC > 350 ? "text-amber-400" : "text-emerald-400"}`}>
                    {systemStatus}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSimRunning(!isSimRunning)}
                className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-mono text-slate-200 hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {isSimRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isSimRunning ? "Pause" : "Resume"}</span>
              </button>
              <button
                onClick={handleReset}
                className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-mono text-slate-200 hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleScram}
                disabled={isScrammed}
                className="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/50 border border-rose-400/40 disabled:opacity-40 cursor-pointer transition-all active:scale-95 flex items-center gap-1.5"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>SCRAM</span>
              </button>
            </div>
          </div>

          {/* Real-Time Telemetry Gauges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block">Thermal Output</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
                {thermalPowerMWth.toFixed(1)} <span className="text-xs font-sans text-emerald-400">MWth</span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, (thermalPowerMWth / 250) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block">Electric Output</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono mt-1">
                {electricPowerMWe.toFixed(1)} <span className="text-xs font-sans text-indigo-300">MWe</span>
              </div>
              <div className="mt-2 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${Math.min(100, (electricPowerMWe / 77) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block">Core Temperature</span>
              <div className={`text-2xl sm:text-3xl font-extrabold font-mono mt-1 ${coreTempC > 350 ? "text-amber-400" : "text-white"}`}>
                {coreTempC}°C
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Nominal: 300°C - 325°C</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 block">Reactivity</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
                {reactivityPcm} <span className="text-xs font-sans text-slate-400">pcm</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Doppler: {dopplerFeedbackPcm} pcm</span>
            </div>
          </div>

          {/* Interactive Controls Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
            {/* Control Rod Slider */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                  <Gauge className="w-4 h-4 text-emerald-400" />
                  <span>Control Rod Insertion</span>
                </label>
                <span className="text-xs font-mono text-emerald-400 font-bold">{controlRodDepth}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={controlRodDepth}
                disabled={isScrammed}
                onChange={(e) => setControlRodDepth(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 disabled:opacity-40"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>0% (Full Baseload)</span>
                <span>50% (Load Following)</span>
                <span>100% (Shutdown)</span>
              </div>
            </div>

            {/* Coolant Pump Flow Rate Selector */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-indigo-400" />
                  <span>Coolant Flow Rate</span>
                </label>
                <span className="text-xs font-mono text-indigo-400 font-bold">{coolantFlowPercent}% Flow</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: "100% Full", val: 100 },
                  { label: "50% Half", val: 50 },
                  { label: "0% Natural Conv.", val: 0 },
                ].map((option) => (
                  <button
                    key={option.val}
                    onClick={() => setCoolantFlowPercent(option.val)}
                    disabled={isScrammed}
                    className={`py-2 px-2.5 rounded-lg text-xs font-mono font-medium border transition-all cursor-pointer ${
                      coolantFlowPercent === option.val
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-sm"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400">
                At 0% pump flow, passive natural convection circulation continues removing decay heat indefinitely.
              </p>
            </div>
          </div>

          {/* Physics Law Demonstrator Callout */}
          <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-400 font-semibold block mb-0.5">
                Physical Law: Inherent Negative Temperature Coefficient
              </strong>
              If coolant circulation drops or temperature increases, U-238 atomic nuclei absorb more neutrons at higher thermal kinetic velocities, automatically curbing the reaction without human or software commands.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

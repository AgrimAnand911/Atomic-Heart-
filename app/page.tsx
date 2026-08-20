import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { EnergyCalculator } from "@/components/interactive/energy-calculator";
import { ReactorExplorer } from "@/components/interactive/reactor-explorer";
import { ControlRoomSim } from "@/components/interactive/control-room-sim";
import { GridBalancer } from "@/components/interactive/grid-balancer";
import { MythMatrix } from "@/components/sections/myth-matrix";
import { TechHyperscalers } from "@/components/sections/tech-hyperscalers";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fcfcfd] text-slate-900 selection:bg-indigo-500/20 selection:text-indigo-900">
      <Navbar />
      <HeroSection />
      <EnergyCalculator />
      <ReactorExplorer />
      <ControlRoomSim />
      <GridBalancer />
      <MythMatrix />
      <TechHyperscalers />
      <Footer />
    </main>
  );
}

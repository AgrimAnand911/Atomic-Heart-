import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AtomicHorizon | The Zero-Carbon Foundation for a High-Energy Future",
  description: "An interactive engineering platform demonstrating Nuclear Energy, SMRs, and Gen IV fission/fusion architectures as the core pillar for global clean energy transition.",
  keywords: ["Nuclear Energy", "Small Modular Reactors", "SMR", "Clean Energy", "Zero Carbon", "Grid Stability", "Gen IV Reactors", "Energy Density"],
  authors: [{ name: "AtomicHorizon Engineering Initiative" }],
  openGraph: {
    title: "AtomicHorizon | The Zero-Carbon Foundation for a High-Energy Future",
    description: "Explore interactive energy density calculators, SMR reactor simulators, 24/7 grid stability models, and peer-reviewed nuclear facts.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#fcfcfd] text-slate-900 antialiased selection:bg-indigo-500/20 selection:text-indigo-900">
        {children}
      </body>
    </html>
  );
}

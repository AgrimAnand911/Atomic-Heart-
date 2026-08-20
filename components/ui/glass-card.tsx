import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: "indigo" | "emerald" | "cyan" | "none";
  interactive?: boolean;
}

export function GlassCard({
  children,
  className,
  glow = "none",
  interactive = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300",
        interactive && "hover:border-indigo-300 hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer",
        glow === "indigo" && "shadow-lg shadow-indigo-500/5 border-indigo-200/80",
        glow === "emerald" && "shadow-lg shadow-emerald-500/5 border-emerald-200/80",
        glow === "cyan" && "shadow-lg shadow-cyan-500/5 border-cyan-200/80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

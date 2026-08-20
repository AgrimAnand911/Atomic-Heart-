import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "indigo" | "emerald" | "cyan" | "amber" | "zinc" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "indigo",
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-200/80",
    amber: "bg-amber-50 text-amber-700 border-amber-200/80",
    zinc: "bg-slate-100 text-slate-700 border-slate-200",
    outline: "bg-white text-slate-700 border-slate-200 shadow-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

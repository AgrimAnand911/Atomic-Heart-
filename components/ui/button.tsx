import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const variantStyles = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 font-medium shadow-md shadow-indigo-600/20 active:scale-[0.98]",
    secondary:
      "bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 shadow-sm active:scale-[0.98]",
    outline:
      "bg-transparent text-slate-700 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98]",
    ghost:
      "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100",
    dark:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-900/10 active:scale-[0.98]",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-4 py-2 text-sm rounded-xl gap-2",
    lg: "px-5 py-2.5 text-sm sm:text-base rounded-xl gap-2",
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

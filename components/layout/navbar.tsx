"use client";

import React, { useState, useEffect } from "react";
import { Atom, Moon, Sun, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            <Atom className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-0.5">
            Atomic<span className="text-indigo-600 font-extrabold">Horizon</span>
          </span>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <a href="#overview" className="hover:text-indigo-600 transition-colors">
            About
          </a>
          <a href="#calculator" className="hover:text-indigo-600 transition-colors">
            Density Calculator
          </a>
          <a href="#reactors" className="hover:text-indigo-600 transition-colors">
            Reactor Tech
          </a>
          <a href="#control-room" className="hover:text-indigo-600 transition-colors">
            Simulator
          </a>
          <a href="#grid-balancer" className="hover:text-indigo-600 transition-colors">
            Grid Stability
          </a>
          <a href="#myth-matrix" className="hover:text-indigo-600 transition-colors">
            FAQ & Myths
          </a>
          <a href="#partnerships" className="hover:text-indigo-600 transition-colors">
            Partnerships
          </a>
        </nav>

        {/* Right Action Area */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <Moon className="w-4 h-4" />
          </button>
          <a href="#calculator">
            <Button variant="primary" size="sm" className="rounded-xl px-4 py-2 text-xs font-semibold">
              <span>Explore Reactor Tech</span>
            </Button>
          </a>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 bg-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-white border-b border-slate-200 shadow-xl mt-3 space-y-2">
          <a
            href="#overview"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
          >
            About
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
          >
            Density Calculator
          </a>
          <a
            href="#reactors"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
          >
            Reactor Tech
          </a>
          <a
            href="#control-room"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
          >
            Simulator
          </a>
          <a
            href="#grid-balancer"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
          >
            Grid Stability
          </a>
          <a
            href="#myth-matrix"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
          >
            FAQ & Myths
          </a>
          <a
            href="#partnerships"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
          >
            Partnerships
          </a>
          <div className="pt-2">
            <a href="#calculator" onClick={() => setMobileMenuOpen(false)} className="block w-full">
              <Button variant="primary" size="md" className="w-full justify-center">
                Explore Reactor Tech
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

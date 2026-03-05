"use client";
import React from 'react';

export default function LuxuryLanding() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Navigation */}
      <nav className="p-8 flex justify-between items-center border-b border-white/5 backdrop-blur-sm fixed w-full z-50 bg-black/20">
        <div className="text-2xl font-black tracking-[0.4em] text-[#d4af37]">YURA</div>
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.3em] opacity-60">
          <span className="hover:opacity-100 cursor-pointer transition-opacity">The Vault</span>
          <span className="hover:opacity-100 cursor-pointer transition-opacity">Curation</span>
          <span className="hover:opacity-100 cursor-pointer transition-opacity">Access</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#d4af37]/5 blur-[120px] rounded-full"></div>
        
        <div className="relative z-10 text-center space-y-8 max-w-4xl">
          <h2 className="text-[10px] uppercase tracking-[0.6em] text-[#d4af37] mb-4">Midnight Grade Asset Custody</h2>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic italic">
            DEFINING <br/> <span className="text-transparent border-t border-b border-white/20 px-4">THE VAULT</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed tracking-wide">
            YURA is a secure layer between you and your collection. Archiving high-end eyewear, durags, and timepieces in a digital vault built for discretion.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
            <button className="px-12 py-5 bg-[#d4af37] text-black text-xs font-black uppercase tracking-[0.3em] hover:bg-white transition-all duration-500">
              Enter Vault Request
            </button>
            <button className="px-12 py-5 border border-white/10 text-xs font-black uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
              View Curated Drops
            </button>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <div className="fixed bottom-8 left-8 text-[8px] uppercase tracking-[0.5em] opacity-30">
        Protocol: Midnight Black 1.0 // Rabat, MA
      </div>
    </main>
  );
}
"use client";
import React from 'react';

export default function LuxuryLanding() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#d4af37] selection:text-black overflow-x-hidden">
      {/* Dynamic Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4af37]/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#d4af37]/5 blur-[120px] rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 p-8 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-black/40">
        <div className="text-2xl font-black tracking-[0.5em] text-[#d4af37] cursor-default">YURA</div>
        <div className="hidden md:flex gap-16 text-[9px] uppercase tracking-[0.4em] font-bold opacity-50">
          <span className="hover:text-[#d4af37] hover:opacity-100 transition-all cursor-pointer">The Vault</span>
          <span className="hover:text-[#d4af37] hover:opacity-100 transition-all cursor-pointer">Collections</span>
          <span className="hover:text-[#d4af37] hover:opacity-100 transition-all cursor-pointer">Access Protocol</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex flex-col justify-center items-center px-6 text-center">
        <div className="relative z-10 space-y-10 max-w-5xl">
          <div className="inline-block px-4 py-1 border border-[#d4af37]/30 rounded-full">
            <span className="text-[9px] uppercase tracking-[0.5em] text-[#d4af37] font-bold">Midnight Grade Asset Custody</span>
          </div>
          
          <h1 className="text-6xl md:text-[120px] font-black tracking-tighter leading-[0.85] uppercase italic italic text-white">
            DEFINING <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">THE VAULT</span>
          </h1>

          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed tracking-wide opacity-80">
            YURA is a secure layer between you and your collection. <br/>
            Archiving high-end eyewear, durags, and timepieces in a digital vault built for discretion.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center pt-6">
            <button className="group relative px-14 py-5 bg-[#d4af37] text-black text-[10px] font-black uppercase tracking-[0.4em] overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              <span className="relative z-10">Enter Vault Request</span>
              <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button className="px-14 py-5 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/5 hover:border-white/30 transition-all text-white">
              View Curated Drops
            </button>
          </div>
        </div>
      </section>

      {/* Footer Element */}
      <footer className="absolute bottom-8 w-full flex justify-between px-10 items-center opacity-20 text-[8px] uppercase tracking-[0.6em] text-white">
        <span>Rabat_Node_01 // MA</span>
        <div className="flex gap-4">
          <span>Security: Active</span>
          <span>Sovereign Access</span>
        </div>
      </footer>
    </main>
  );
}
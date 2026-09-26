"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Disc3, MailOpen } from "lucide-react";

interface IntroEnvelopeProps {
  onStart: () => void;
}

export default function IntroEnvelope({ onStart }: IntroEnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);

    // Multi-stage celebratory gold, champagne, and rose confetti blast
    try {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.55 },
        colors: ["#d4af37", "#f5e4bd", "#e7ba70", "#fffaf1", "#98713b", "#e11d48"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 70,
          origin: { x: 0.1, y: 0.6 },
          colors: ["#d4af37", "#fef3c7", "#fdf6e7"],
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 70,
          origin: { x: 0.9, y: 0.6 },
          colors: ["#d4af37", "#fef3c7", "#fdf6e7"],
        });
      }, 250);
    } catch (e) {
      console.warn("Confetti error:", e);
    }

    onStart();

    setTimeout(() => {
      setIsHidden(true);
    }, 1200);
  };

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-1000 ${isOpening ? "opacity-0 scale-110 pointer-events-none" : "opacity-100 scale-100"
        }`}
      style={{
        background: `radial-gradient(circle at 50% 35%, #2a1a0c 0%, #150d06 45%, #080503 100%)`,
      }}
    >
      {/* Ambient Fairy Lights & Swaying Golden Lanterns */}
      <div className="absolute top-0 left-0 right-0 flex justify-between px-8 sm:px-20 pointer-events-none z-0 opacity-90">
        {/* Lantern 1 */}
        <div className="flex flex-col items-center animate-soft-float">
          <div className="h-16 sm:h-24 w-[1.5px] bg-gradient-to-b from-[#d4af37] via-[#98713b] to-transparent"></div>
          <div className="relative -mt-1 flex items-center justify-center">
            <div className="h-12 w-9 rounded-lg border-2 border-[#d4af37] bg-[#2e1d0f]/90 shadow-[0_0_30px_rgba(255,214,133,0.7)] flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-[#ffeaad] shadow-[0_0_15px_#ffd56b] animate-pulse"></div>
            </div>
            <div className="h-4 w-[1px] bg-[#d4af37] absolute -bottom-4"></div>
          </div>
        </div>

        {/* Lantern 2 (Center-Left) */}
        <div className="flex flex-col items-center animate-soft-float delay-700 hidden sm:flex">
          <div className="h-10 sm:h-16 w-[1px] bg-gradient-to-b from-[#d4af37] to-transparent"></div>
          <div className="relative -mt-1 flex items-center justify-center">
            <div className="h-9 w-7 rounded-lg border border-[#d4af37] bg-[#2e1d0f]/90 shadow-[0_0_20px_rgba(255,214,133,0.5)] flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-[#ffeaad] shadow-[0_0_10px_#ffd56b] animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Lantern 3 (Right) */}
        <div className="flex flex-col items-center animate-soft-float delay-500">
          <div className="h-20 sm:h-28 w-[1.5px] bg-gradient-to-b from-[#d4af37] via-[#98713b] to-transparent"></div>
          <div className="relative -mt-1 flex items-center justify-center">
            <div className="h-12 w-9 rounded-lg border-2 border-[#d4af37] bg-[#2e1d0f]/90 shadow-[0_0_30px_rgba(255,214,133,0.7)] flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-[#ffeaad] shadow-[0_0_15px_#ffd56b] animate-pulse"></div>
            </div>
            <div className="h-4 w-[1px] bg-[#d4af37] absolute -bottom-4"></div>
          </div>
        </div>
      </div>

      {/* Floating Glowing Stardust Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[450px] w-[450px] rounded-full bg-[#d4af37]/15 blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#e8c77e]/12 blur-[130px] animate-pulse delay-1000"></div>

        {/* Floating Stars */}
        <div className="absolute top-20 left-1/4 text-2xl animate-soft-float text-[#ffe39c]/60">✦</div>
        <div className="absolute top-1/2 right-1/6 text-base animate-soft-float text-[#ffe39c]/40 delay-300">✧</div>
        <div className="absolute bottom-24 left-1/5 text-xl animate-soft-float text-[#ffe39c]/50 delay-700">✦</div>
        <div className="absolute bottom-1/3 right-1/4 text-2xl animate-soft-float text-[#ffe39c]/40 delay-1000">✧</div>
      </div>

      {/* Royal Luxury Physical Envelope Card */}
      <div className="relative z-10 w-full max-w-xl rounded-[36px] border-2 border-[#d4af37] bg-gradient-to-b from-[#22170e]/98 via-[#181009]/98 to-[#0f0a06]/98 p-8 sm:p-12 text-center shadow-[0_35px_100px_rgba(0,0,0,0.9),0_0_80px_rgba(212,175,55,0.3)] backdrop-blur-2xl transition duration-500 hover:border-[#ffe49e]">
        {/* Gold Foil Double Inset Border */}
        <div className="pointer-events-none absolute inset-3 rounded-[30px] border border-[#d4af37]/40"></div>
        <div className="pointer-events-none absolute inset-4 rounded-[26px] border border-[#d4af37]/20 border-dashed"></div>

        {/* Ornate Gold Filigree Corners (SVG) */}
        <div className="absolute top-4 left-4 w-9 h-9 text-[#d4af37] pointer-events-none">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 14V2h12M2 2l10 10M2 6h4M6 2v4" />
          </svg>
        </div>
        <div className="absolute top-4 right-4 w-9 h-9 text-[#d4af37] pointer-events-none rotate-90">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 14V2h12M2 2l10 10M2 6h4M6 2v4" />
          </svg>
        </div>
        <div className="absolute bottom-4 left-4 w-9 h-9 text-[#d4af37] pointer-events-none -rotate-90">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 14V2h12M2 2l10 10M2 6h4M6 2v4" />
          </svg>
        </div>
        <div className="absolute bottom-4 right-4 w-9 h-9 text-[#d4af37] pointer-events-none rotate-180">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 14V2h12M2 2l10 10M2 6h4M6 2v4" />
          </svg>
        </div>

        {/* Bismillah Calligraphy */}
        <div className="mb-4 text-[#eecb82] text-xl sm:text-2xl tracking-widest font-serif opacity-95">
          بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ
        </div>

        {/* ================= ULTRA-LUXURY VECTOR WAX SEAL (M & Y) ================= */}
        <div className="mx-auto mb-6 flex h-32 w-32 sm:h-36 sm:w-36 items-center justify-center rounded-full bg-gradient-to-tr from-[#7c5825] via-[#d4af37] to-[#fff1d0] p-1.5 shadow-[0_0_55px_rgba(212,175,55,0.7)] transition-all duration-300 hover:scale-105 select-none cursor-pointer">
          <svg
            viewBox="0 0 140 140"
            className="h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sealGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fff8e1" />
                <stop offset="25%" stopColor="#e8c77e" />
                <stop offset="60%" stopColor="#b88931" />
                <stop offset="100%" stopColor="#ffe9b0" />
              </linearGradient>
              <radialGradient id="sealInnerBg" cx="50%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#2c1d10" />
                <stop offset="65%" stopColor="#180f07" />
                <stop offset="100%" stopColor="#0b0603" />
              </radialGradient>
              <filter id="royalGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#ffe7a3" floodOpacity="0.5" />
              </filter>
            </defs>

            {/* Seal Base & Outer Metallic Rings */}
            <circle cx="70" cy="70" r="66" fill="url(#sealInnerBg)" stroke="url(#sealGoldGrad)" strokeWidth="3" />
            <circle cx="70" cy="70" r="60" fill="none" stroke="url(#sealGoldGrad)" strokeWidth="1" strokeDasharray="3.5 3" opacity="0.85" />
            <circle cx="70" cy="70" r="56" fill="none" stroke="url(#sealGoldGrad)" strokeWidth="0.75" opacity="0.5" />

            {/* Royal Crown on Top */}
            <path
              d="M63 32L70 24L77 32L83 28L80 37H60L57 28L63 32Z"
              fill="url(#sealGoldGrad)"
              filter="url(#royalGlow)"
            />


            {/* M & Y Monogram - Perfectly Centered, Spacious, Gorgeous */}
            <text
              x="70"
              y="79"
              textAnchor="middle"
              direction="ltr"
              fill="url(#sealGoldGrad)"
              fontFamily="'Playfair Display', Georgia, serif"
              fontStyle="italic"
              fontWeight="800"
              fontSize="28"
              letterSpacing="2"
              filter="url(#royalGlow)"
            >
              M &amp; Y
            </text>

            {/* Royal Heart Underneath */}
            <path
              d="M70 89C70 89 65 84 63 86.5C61 89 63 92 70 96C77 92 79 89 77 86.5C75 84 70 89 70 89Z"
              fill="url(#sealGoldGrad)"
              filter="url(#royalGlow)"
            />
          </svg>
        </div>

        {/* Subtitle */}
        <p className="text-xs uppercase tracking-[0.45em] text-[#d6b889] mb-2 font-sans font-bold">
          YOU ARE CORDIALLY INVITED
        </p>

        {/* Couple Names */}
        <div className="my-2 space-y-1">
          <h1 className="font-serif text-5xl sm:text-7xl font-normal text-gold-shimmer tracking-tight italic">
            Mohamed
          </h1>
          <div className="flex items-center justify-center gap-3 text-[#d4af37] my-1">
            <span className="h-[1.5px] w-20 bg-gradient-to-r from-transparent to-[#d4af37]"></span>
            <Heart className="h-5 w-5 fill-[#d4af37] animate-pulse" />
            <span className="h-[1.5px] w-20 bg-gradient-to-l from-transparent to-[#d4af37]"></span>
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl font-normal text-gold-shimmer tracking-tight italic">
            Yasmin
          </h1>
        </div>

        {/* Arabic Title */}
        <p className="font-serif text-2xl sm:text-3xl font-bold text-[#e1c182] mt-2">
          حفل زفاف محمد وياسمين
        </p>

        {/* Event Details Badge (Fixed direction so English never flips) */}
        <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-[#d4af37]/45 bg-white/5 py-3 px-6 text-xs sm:text-sm text-[#eedab7] shadow-inner">
          <span className="font-bold flex items-center gap-1.5">
            <span dir="ltr" className="font-serif font-bold text-amber-200">Villa La Riva</span>
            <span className="text-[#d4af37]">•</span>
            <span>جزيرة النيل</span>
          </span>
          <span className="text-[#d4af37]">|</span>
          <span className="font-bold">السبت، 31 أكتوبر 2026</span>
        </div>

        {/* Gold Separator */}
        <div className="my-6 mx-auto h-[1.5px] w-48 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>

        {/* Master Action Button */}
        <button
          onClick={handleOpen}
          disabled={isOpening}
          className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#98713b] via-[#d4af37] to-[#fff2c2] px-8 py-4 font-sans text-base sm:text-lg font-black text-[#140f0c] shadow-[0_15px_40px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_22px_55px_rgba(212,175,55,0.8)] active:scale-95 cursor-pointer"
        >
          <MailOpen className="h-6 w-6 transition group-hover:scale-115 text-[#140f0c]" />
          <span className="tracking-wide">افتح الدعوة</span>
          <Sparkles className="h-5 w-5 animate-pulse text-[#4d371d]" />
        </button>

      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Compass, Sparkles } from "lucide-react";

export default function NileScene() {
  const [boatKey, setBoatKey] = useState(0);

  // Allow clicking to restart boat voyage
  const restartVoyage = () => {
    setBoatKey((prev) => prev + 1);
  };

  return (
    <div className="relative my-8 overflow-hidden rounded-3xl border border-[#c5a059]/50 shadow-xl bg-[#1d2724]">
      {/* Sky & River Background Canvas */}
      <div
        className="relative h-96 w-full overflow-hidden select-none"
        style={{
          background: `linear-gradient(180deg, #d89650 0%, #ebb672 30%, #dfa55c 48%, #2e4d44 49%, #152b25 100%)`,
        }}
      >
        {/* Radiant Sunset Sun with Ambient Glow */}
        <div className="absolute left-1/2 top-7 -translate-x-1/2 flex items-center justify-center pointer-events-none">
          {/* Sun Rays Halo */}
          <div className="h-44 w-44 rounded-full bg-[#ffe4a0]/25 blur-2xl animate-pulse"></div>
          {/* Sun Core */}
          <div className="absolute h-24 w-24 rounded-full bg-gradient-to-b from-[#fffaf0] via-[#ffd77d] to-[#e68a2e] shadow-[0_0_50px_rgba(255,200,100,0.9)] animate-sun"></div>
        </div>

        {/* Soft Golden Sunset Clouds */}
        <div className="absolute top-12 animate-cloud-1 pointer-events-none opacity-45">
          <div className="h-7 w-36 rounded-full bg-white/70 blur-[3px]"></div>
        </div>
        <div className="absolute top-24 animate-cloud-2 pointer-events-none opacity-35">
          <div className="h-6 w-28 rounded-full bg-white/70 blur-[3px]"></div>
        </div>

        {/* Birds flying across the Nile twilight */}
        <div className="absolute top-14 left-0 animate-birds pointer-events-none text-xs text-[#4b351e]/80 font-mono tracking-widest">
          <span>︿ ︿</span>
          <span className="ml-5 -mt-3 inline-block">︿ ︿</span>
        </div>

        {/* ================= VILLA LA RIVA ISLAND ================= */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 sm:w-96 h-28 z-10">
          {/* Island Land Mass (Greenery & Soil) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-72 sm:w-88 h-16 rounded-[50%_50%_45%_45%] bg-gradient-to-b from-[#3e563d] via-[#2f4430] to-[#1c2e21] shadow-[0_15px_30px_rgba(0,0,0,0.45)]"></div>

          {/* Left Palm Tree */}
          <div className="absolute -top-10 left-6 sm:left-10 z-10">
            <svg width="60" height="70" viewBox="0 0 60 70" fill="none">
              <path d="M28 70C28 50 32 30 25 15" stroke="#4a3520" strokeWidth="4" strokeLinecap="round" />
              {/* Palm Fronds */}
              <path d="M25 15C15 10 5 15 0 25C10 20 20 18 25 15Z" fill="#354e34" />
              <path d="M25 15C20 5 10 0 2 2C8 10 18 12 25 15Z" fill="#446143" />
              <path d="M25 15C30 5 42 2 52 4C45 10 35 12 25 15Z" fill="#446143" />
              <path d="M25 15C35 10 48 16 56 26C45 20 35 18 25 15Z" fill="#354e34" />
              <path d="M25 15C25 2 28 -5 30 -10C32 -2 30 10 25 15Z" fill="#4f734d" />
            </svg>
          </div>

          {/* Right Palm Tree */}
          <div className="absolute -top-8 right-8 sm:right-12 z-10">
            <svg width="55" height="65" viewBox="0 0 55 65" fill="none">
              <path d="M26 65C26 48 22 30 28 15" stroke="#4a3520" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M28 15C18 10 8 14 2 24C12 18 22 17 28 15Z" fill="#354e34" />
              <path d="M28 15C34 6 45 4 54 8C46 13 37 14 28 15Z" fill="#446143" />
              <path d="M28 15C38 12 48 20 54 30C44 24 35 20 28 15Z" fill="#354e34" />
            </svg>
          </div>

          {/* Villa La Riva Architectural Building */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-36 sm:w-40 h-24 z-20">
            {/* Terracotta Hip Roof */}
            <div className="relative mx-auto w-0 h-0 border-l-[74px] sm:border-l-[82px] border-l-transparent border-r-[74px] sm:border-r-[82px] border-r-transparent border-b-[26px] border-b-[#7c4d29] drop-shadow-md"></div>

            {/* Main Villa Body */}
            <div className="relative -mt-0.5 mx-auto w-32 sm:w-36 h-20 bg-gradient-to-b from-[#fbf4e6] to-[#dfcbab] rounded-b-md border-x border-b border-[#bfa37c] shadow-lg p-1.5 flex flex-col justify-between">
              {/* Top Balcony & Lit Windows */}
              <div className="flex justify-around items-center px-1">
                {/* Window 1 */}
                <div className="h-6 w-4 rounded-t-full border border-[#6b4728] bg-[#ffea9f] shadow-[0_0_10px_#ffd56b] flex items-center justify-center">
                  <div className="h-4 w-[1px] bg-[#6b4728]/50"></div>
                </div>
                {/* Central Arch / Double Window */}
                <div className="h-7 w-6 rounded-t-full border border-[#6b4728] bg-[#ffea9f] shadow-[0_0_12px_#ffd56b] flex items-center justify-around px-0.5">
                  <div className="h-5 w-[1px] bg-[#6b4728]/50"></div>
                </div>
                {/* Window 2 */}
                <div className="h-6 w-4 rounded-t-full border border-[#6b4728] bg-[#ffea9f] shadow-[0_0_10px_#ffd56b] flex items-center justify-center">
                  <div className="h-4 w-[1px] bg-[#6b4728]/50"></div>
                </div>
              </div>

              {/* Lower Entrance & Villa Name Sign */}
              <div className="flex flex-col items-center">
                {/* Grand Arched Door */}
                <div className="h-6 w-6 rounded-t-full bg-[#46301d] border border-[#2b1d12] flex items-end justify-center pb-0.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#ffd56b] shadow-xs"></div>
                </div>
                {/* Villa Name Plate */}
                <div className="bg-[#46301d]/95 text-[#fdedc9] text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#c5a059]/60 shadow-xs whitespace-nowrap -mb-2 z-30">
                  Villa La Riva
                </div>
              </div>
            </div>

            {/* ================= THE WOODEN PIER / DOCK (مرسى الجزيرة) ================= */}
            <div className="absolute top-[88px] left-1/2 -translate-x-1/2 w-14 h-7 z-30 flex flex-col items-center pointer-events-none">
              {/* Wooden Planks Pier reaching into the water */}
              <div
                className="w-10 h-7 bg-[#543b24] border-x border-[#3b2716] shadow-md relative"
                style={{
                  backgroundImage: `repeating-linear-gradient(0deg, #6b4d32 0px, #6b4d32 3px, #422d1b 3px, #422d1b 4px)`,
                }}
              >
                {/* Left Pier Post with Lantern */}
                <div className="absolute -left-1 bottom-0 w-1.5 h-6 bg-[#342213] rounded-t-sm flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-[#ffea9f] shadow-[0_0_8px_#ffd56b] -mt-1"></div>
                </div>
                {/* Right Pier Post with Lantern */}
                <div className="absolute -right-1 bottom-0 w-1.5 h-6 bg-[#342213] rounded-t-sm flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-[#ffea9f] shadow-[0_0_8px_#ffd56b] -mt-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= NILE WATER & FLOWING WAVES ================= */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-[#224037]/95 via-[#162d26] to-[#0c1a16] z-20 overflow-hidden">
          {/* Sunset Reflection Light Beam on Nile */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-36 bg-gradient-to-b from-[#ffd89b]/40 via-[#d4af37]/20 to-transparent blur-md pointer-events-none"></div>

          {/* Shimmering Water Caustics */}
          <div
            className="absolute inset-0 animate-water opacity-35"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 12px)`,
            }}
          ></div>

          {/* ================= THE BOAT SAILING DIRECTLY TO VILLA LA RIVA ================= */}
          <div
            key={boatKey}
            className="absolute animate-boat-to-villa z-30 flex flex-col items-center cursor-pointer transition-transform hover:scale-110"
            title="مركب الزفاف متجهاً إلى Villa La Riva"
            onClick={restartVoyage}
          >
            {/* Water Wake / Ripples beneath boat */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full bg-white/20 blur-[1.5px] -z-10"></div>

            {/* Felucca Boat SVG with warm sunset sail */}
            <svg width="56" height="52" viewBox="0 0 56 52" fill="none" className="drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)]">
              {/* Front White/Gold Sail */}
              <path d="M24 4L42 34H24V4Z" fill="#FFFDF8" stroke="#E6C888" strokeWidth="1.2" />
              {/* Back Sail */}
              <path d="M22 10L8 34H22V10Z" fill="#F5E8CB" stroke="#D1B16D" strokeWidth="1" />
              {/* Wooden Mast */}
              <line x1="23.5" y1="2" x2="23.5" y2="37" stroke="#4A341E" strokeWidth="2" strokeLinecap="round" />
              {/* Golden Pennant Flag */}
              <path d="M24 3L30 5.5L24 8V3Z" fill="#D4AF37" />
              {/* Boat Hull (Wooden) */}
              <path d="M4 35L10 44H44L52 35H4Z" fill="#5E3F22" stroke="#3D2713" strokeWidth="1.5" />
              {/* Glowing Bow Lantern on front of boat */}
              <circle cx="50" cy="35" r="3" fill="#FFE599" filter="drop-shadow(0 0 5px #FFD700)" />
              {/* Passengers Silhouette Indicator */}
              <circle cx="28" cy="32" r="2.5" fill="#2E1C0C" />
              <circle cx="34" cy="32" r="2.5" fill="#2E1C0C" />
            </svg>

            {/* Label floating above boat */}
            <span className="text-[8px] font-bold text-amber-200 bg-black/60 px-1.5 py-0.5 rounded-full whitespace-nowrap shadow -mt-1">
              إلى الجزيرة ⛵
            </span>
          </div>
        </div>
      </div>

      {/* Atmospheric Narrative Banner Below the River Scene */}
      <div className="bg-gradient-to-b from-[#faf5eb] to-[#f4ead7] p-6 text-center border-t border-[#c5a059]/40">
        <p className="font-serif text-base sm:text-lg leading-relaxed text-[#564125]">
          ليلة تجمعنا على ضفاف النيل،
          وسط نسيم المساء وألوان الغروب،
          وفي أجواء هادئة تليق ببداية أجمل فصل في حكايتنا. ✨
        </p>
        <p className="mt-3 font-serif text-sm sm:text-base font-bold text-[#8c662f]">
          حضوركم هو أجمل ما يكتمل به هذا اليوم، وبوجودكم تصبح اللحظة ذكرى لا تُنسى. ❤️
        </p>
      </div>
    </div>
  );
}

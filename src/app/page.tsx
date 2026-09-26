"use client";

import React, { useRef, useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import ParticlesBackground from "@/components/ParticlesBackground";
import IntroEnvelope from "@/components/IntroEnvelope";
import PhotoFrame from "@/components/PhotoFrame";
import NileScene from "@/components/NileScene";
import ScratchCard from "@/components/ScratchCard";
import JourneySteps from "@/components/JourneySteps";
import CountdownTimer from "@/components/CountdownTimer";
import { Calendar, Clock, MapPin, Heart, Sparkles } from "lucide-react";

export default function WeddingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Triggered when user opens the invitation envelope
  const handleStartExperience = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay was prevented by browser policy:", err);
        });
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#120e0b] py-6 sm:py-14 px-3 sm:px-6">
      {/* Dynamic Golden Particles & Rose Petals */}
      <ParticlesBackground />

      {/* Floating Modern Audio Player */}
      <AudioPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
      />

      {/* Royal Opening Screen (Envelope & Wax Seal) */}
      <IntroEnvelope onStart={handleStartExperience} />

      {/* Ambient Luxury Lighting in the Background */}
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center overflow-hidden">
        <div className="h-[750px] w-[750px] rounded-full bg-[#c5a059]/12 blur-[150px] animate-pulse"></div>
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-[#e8c77e]/10 blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-[#98713b]/15 blur-[110px]"></div>
      </div>

      {/* Main Luxury Wedding Card */}
      <div className="relative mx-auto w-full max-w-2xl z-30">
        <article
          aria-label="بطاقة دعوة الزفاف الملكية"
          className="wedding-card wedding-card-inner rounded-[36px] p-6 sm:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.65),0_0_50px_rgba(197,160,89,0.15)]"
        >
          {/* Ornate Gold Filigree Corners (SVG) */}
          <div className="ornate-corner top-3.5 left-3.5 border-t-2 border-l-2 rounded-tl-xl"></div>
          <div className="ornate-corner top-3.5 right-3.5 border-t-2 border-r-2 rounded-tr-xl"></div>
          <div className="ornate-corner bottom-3.5 left-3.5 border-b-2 border-l-2 rounded-bl-xl"></div>
          <div className="ornate-corner bottom-3.5 right-3.5 border-b-2 border-r-2 rounded-br-xl"></div>

          {/* ================= HERO SECTION ================= */}
          <header className="relative text-center pt-2 sm:pt-4 pb-6">
            {/* Top Stars & Header */}
            <div className="text-xs tracking-[0.45em] text-[#a88448] font-serif mb-2 animate-soft-float">
              ✦ ✧ ✦
            </div>

            <div className="text-xs uppercase tracking-[0.3em] text-[#856a42] font-sans font-bold mb-3">
              WELCOME TO OUR WEDDING
            </div>

            {/* Couple Names */}
            <div className="my-4 space-y-1">
              <h2 className="font-serif text-5xl sm:text-7xl font-normal text-gold-shimmer tracking-tight italic">
                Mohamed
              </h2>

              <div className="flex items-center justify-center gap-3 my-2 text-[#b38e4a]">
                <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#c5a059]"></span>
                <span className="font-serif text-3xl italic text-[#9c753b]">&amp;</span>
                <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#c5a059]"></span>
              </div>

              <h2 className="font-serif text-5xl sm:text-7xl font-normal text-gold-shimmer tracking-tight italic">
                Yasmin
              </h2>
            </div>

            {/* Subtitle in Arabic */}
            <p className="font-serif text-xl sm:text-2xl font-bold text-[#866332] mt-2">
              حفل زفاف محمد وياسمين
            </p>

            {/* Song Quote Banner */}
            <div className="mx-auto mt-3 max-w-md rounded-full border border-[#c5a059]/40 bg-[#fff9ee]/90 py-2 px-5 text-xs sm:text-sm font-serif italic text-[#846231] shadow-xs flex items-center justify-center gap-2">
              <span className="text-amber-500">✨</span>
              <span>&ldquo;يا أحلى قرار أنا أخدته.. يا حلم سنين وحققته.. يا عمر جديد واتكتبلي&rdquo;</span>
              <span className="text-amber-500">✨</span>
            </div>

            {/* Ornate Gold Line */}
            <div className="mx-auto my-6 h-[1.5px] w-44 bg-gradient-to-r from-transparent via-[#c5a059] to-transparent"></div>

            {/* 3 Key Details Badges (Date / Time / Location) */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 border-y border-[#d9ccb3] py-5 my-6 text-[#5b472e]">
              {/* Date */}
              <div className="flex flex-col items-center justify-center p-2 rounded-xl transition hover:bg-[#fff9ef]">
                <Calendar className="h-6 w-6 text-[#a88448] mb-1.5" />
                <span className="font-serif text-xl sm:text-2xl font-black text-[#85612c]">
                  31
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#6a5438]">
                  أكتوبر / October
                </span>
              </div>

              {/* Time */}
              <div className="flex flex-col items-center justify-center p-2 rounded-xl transition hover:bg-[#fff9ef] border-x border-[#d9ccb3]">
                <Clock className="h-6 w-6 text-[#a88448] mb-1.5" />
                <span className="font-serif text-xl sm:text-2xl font-black text-[#85612c]">
                  4:00
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#6a5438]">
                  مساءً / PM
                </span>
              </div>

              {/* Location */}
              <div className="flex flex-col items-center justify-center p-2 rounded-xl transition hover:bg-[#fff9ef]">
                <MapPin className="h-6 w-6 text-[#a88448] mb-1.5" />
                <span dir="ltr" className="font-serif text-sm sm:text-lg font-black text-[#85612c] whitespace-nowrap">
                  Villa La Riva
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#6a5438]">
                  جزيرة النيل
                </span>
              </div>
            </div>
          </header>

          {/* ================= PHOTO & PRAYER SECTION ================= */}
          <PhotoFrame />

          {/* ================= NILE SUNSET SCENE ================= */}
          <NileScene />

          {/* ================= SCRATCH CARD SURPRISE ================= */}
          <ScratchCard />

          {/* ================= THE ROUTE & DIRECTIONS ================= */}
          <JourneySteps />

          {/* ================= COUNTDOWN TIMER & CALENDAR ================= */}
          <CountdownTimer />

          {/* ================= LUXURY FOOTER ================= */}
          <footer className="mt-12 text-center pt-8 border-t border-[#d9ccb3]">
            <h3 className="font-serif text-3xl font-medium italic text-gold-shimmer">
              Mohamed &amp; Yasmin
            </h3>

            <div className="my-3 flex items-center justify-center text-[#98713b]">
              <Heart className="h-6 w-6 fill-[#98713b] animate-pulse" />
            </div>

            <p className="font-serif text-base sm:text-lg leading-relaxed text-[#685237] max-w-md mx-auto">
              وجودكم هو أجمل جزء في يومنا،
              ونتمنى من قلوبنا أن تشاركونا هذه اللحظة المميزة التي لا تُنسى.
            </p>

            <div className="mt-8 text-xs text-[#9c8466]">
              31 October 2026 • <span dir="ltr" className="font-semibold">Villa La Riva</span>, Nile River, Giza
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}

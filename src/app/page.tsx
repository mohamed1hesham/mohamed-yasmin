"use client";

import React, { useRef, useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import IntroEnvelope from "@/components/IntroEnvelope";
import PhotoFrame from "@/components/PhotoFrame";
import NileScene from "@/components/NileScene";
import ScratchCard from "@/components/ScratchCard";
import JourneySteps from "@/components/JourneySteps";
import CountdownTimer from "@/components/CountdownTimer";

export default function WeddingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Triggered when user clicks "ابدأ الرحلة ✨" on the intro screen
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
    <>
      {/* Intro Welcome Screen (Exact visual match from reference) */}
      <IntroEnvelope onStart={handleStartExperience} />

      {/* Floating Modern Audio Player */}
      <AudioPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
      />

      {/* Main Container */}
      <main className="page">
        <article className="card" aria-label="بطاقة دعوة حفل زفاف محمد وياسمين">
          {/* ================= HERO SECTION ================= */}
          <section className="hero">
            <div className="hero-glow"></div>

            <div className="hero-top">✦ ✧ ✦</div>

            <div className="welcome">WELCOME TO OUR WEDDING</div>

            <div className="names">
              Mohamed
              <div className="and">&</div>
              Yasmin
            </div>

            <div className="gold-line"></div>

            {/* Event Key Details */}
            <div className="details">
              <div className="detail">
                <span className="icon">📅</span>
                <b>31</b>
                <br />
                October
              </div>

              <div className="detail">
                <span className="icon">🕓</span>
                <b>4:00</b>
                <br />
                PM
              </div>

              <div className="detail">
                <span className="icon">📍</span>
                <b>Villa</b>
                <br />
                La Riva
              </div>
            </div>
          </section>

          {/* ================= PHOTO & PRAYER SECTION ================= */}
          <PhotoFrame />

          {/* ================= SCRATCH CARD (70% THRESHOLD) ================= */}
          <ScratchCard />

          {/* ================= NILE SCENE (BOAT TO VILLA) ================= */}
          <NileScene />

          {/* ================= ROUTE & DIRECTIONS ================= */}
          <JourneySteps />

          {/* ================= COUNTDOWN TIMER ================= */}
          <CountdownTimer />

          {/* ================= FOOTER ================= */}
          <section className="reveal show">
            <div className="footer">Mohamed &amp; Yasmin</div>
            <div className="footer-heart">♡</div>
            <div className="note">
              وجودكم هو أجمل جزء في يومنا،
              <br />
              ونتمنى أن تشاركونا هذه اللحظة المميزة.
            </div>
          </section>
        </article>
      </main>
    </>
  );
}

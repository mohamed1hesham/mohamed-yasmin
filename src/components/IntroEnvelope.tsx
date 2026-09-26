"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";

interface IntroEnvelopeProps {
  onStart: () => void;
}

export default function IntroEnvelope({ onStart }: IntroEnvelopeProps) {
  const [isHiding, setIsHiding] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const startExperience = () => {
    // Multi-stage celebratory gold, champagne, and warm confetti blast
    try {
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.55 },
        colors: ["#98713b", "#ad8c55", "#b69a69", "#fffaf1", "#e7ba70"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.65 },
          colors: ["#98713b", "#d8bd8d", "#fffaf1"],
        });
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.65 },
          colors: ["#98713b", "#d8bd8d", "#fffaf1"],
        });
      }, 250);
    } catch (e) {
      console.warn("Confetti effect note:", e);
    }

    setIsHiding(true);
    onStart();

    // Remove from DOM after fade out completes
    setTimeout(() => {
      setIsRemoved(true);
    }, 1400);
  };

  if (isRemoved) return null;

  return (
    <div
      id="intro"
      className={`intro ${isHiding ? "hide" : ""}`}
      aria-label="شاشة الترحيب بالدعوة"
    >
      <div className="intro-content">
        <div className="intro-small">YOU ARE INVITED</div>

        <div className="intro-names">Mohamed</div>

        <div className="intro-and">&</div>

        <div className="intro-names">Yasmin</div>

        <div className="intro-line"></div>

        <button
          type="button"
          className="start-btn"
          onClick={startExperience}
          aria-label="ابدأ الرحلة"
        >
          <span>ابدأ الرحلة</span>
          <span>✨</span>
        </button>
      </div>
    </div>
  );
}

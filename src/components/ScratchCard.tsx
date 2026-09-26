"use client";

import React, { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Gift, RotateCcw, Heart } from "lucide-react";

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  // Initialize and draw the scratchable golden foil
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    // Luxury Golden Metallic Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#c5a059");
    gradient.addColorStop(0.25, "#e8cb85");
    gradient.addColorStop(0.5, "#9e7737");
    gradient.addColorStop(0.75, "#ffd98c");
    gradient.addColorStop(1, "#866027");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add gold speckles / texture
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(255, 255, 255, 0.3)" : "rgba(80, 50, 15, 0.15)";
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Outer decorative border on the foil
    ctx.strokeStyle = "rgba(255, 245, 215, 0.6)";
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Instruction Text on Foil (Using universal characters without emojis)
    ctx.fillStyle = "#3e2b14";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 16px 'Cairo', sans-serif, Arial";
    ctx.fillText("✨ اخربش هنا لاكتشاف المفاجأة ✨", width / 2, height / 2 - 12);

    ctx.fillStyle = "#614421";
    ctx.font = "12px 'Cairo', sans-serif, Arial";
    ctx.fillText("مرر إصبعك أو الماوس لمسح الغطاء الذهبي", width / 2, height / 2 + 16);

    setIsScratched(false);
    setScratchProgress(0);
  };

  useEffect(() => {
    initCanvas();
    const handleResize = () => {
      if (!isScratched) initCanvas();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    checkProgress();
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Sample pixels to calculate scratched area
    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    let transparentCount = 0;
    const step = 32; // sampling step for performance

    for (let i = 3; i < data.length; i += 4 * step) {
      if (data[i] === 0) {
        transparentCount++;
      }
    }

    const totalSamples = data.length / (4 * step);
    const percent = Math.round((transparentCount / totalSamples) * 100);
    setScratchProgress(percent);

    if (percent >= 70 && !isScratched) {
      setIsScratched(true);
      // Auto clear remaining foil
      ctx.clearRect(0, 0, width, height);
      // Trigger festive confetti blast
      try {
        confetti({
          particleCount: 90,
          spread: 85,
          origin: { y: 0.65 },
          colors: ["#c5a059", "#d4af37", "#fef3c7", "#e11d48"],
        });
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => setIsDrawing(false);

  // Touch Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDrawing(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => setIsDrawing(false);

  return (
    <section className="my-10 text-center">
      {/* Header */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c5a059]/40 bg-[#fffbf2] px-4 py-1.5 shadow-xs">
        <Sparkles className="h-4 w-4 text-[#c5a059]" />
        <span className="font-serif text-xs font-bold text-[#8e6b36]">
          مفاجأة تفاعلية من العروسين
        </span>
        <Gift className="h-4 w-4 text-[#c5a059]" />
      </div>

      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#795627] mb-2 flex items-center justify-center gap-2">
        <Sparkles className="h-6 w-6 text-[#c5a059]" />
        <span>بطاقة الخربشة الملكية</span>
        <Sparkles className="h-6 w-6 text-[#c5a059]" />
      </h3>
      <p className="text-xs sm:text-sm text-[#685237] max-w-md mx-auto mb-5">
        اخربش البطاقة الذهبية بيدك لاكتشاف رسالة خاصة ومفاجأة جهزها محمد وياسمين لأحبائهم!
      </p>

      {/* Scratch Box Container */}
      <div className="relative mx-auto h-52 sm:h-56 max-w-md overflow-hidden rounded-3xl border-2 border-[#c5a059] shadow-[0_15px_35px_rgba(110,80,35,0.18)] select-none">
        {/* Hidden Surprise Beneath the Foil */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#fffdf8] via-[#fcf5e5] to-[#f4e6ca] p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#98713b] via-[#c5a059] to-[#ebd299] text-white shadow-md mb-2 animate-bounce">
            <Heart className="h-6 w-6 fill-white" />
          </div>

          <h4 className="font-serif text-lg sm:text-xl font-bold text-[#8e6b36] mb-1">
            أنتم سر فرحتنا وسعادة ليلتنا 🤍
          </h4>

          <p className="font-serif text-xs sm:text-sm leading-relaxed text-[#5a462c] max-w-xs">
            «كنتم وما زلتم أغلى جزء في حكايتنا، وفرحتنا لا تكتمل إلا برؤيتكم وبابتسامتكم معنا على ضفاف النيل.. مستنيينكم تنورونا ونفرح سوا في أحلى ليلة!»
          </p>

          <span className="mt-2 text-xs font-bold font-serif text-[#9b773b]">
            — محمد &amp; ياسمين
          </span>
        </div>

        {/* Scratchable Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`absolute inset-0 h-full w-full cursor-pointer touch-none transition-opacity duration-700 ${isScratched ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
        />

        {/* Scratch Guide Hint (disappears on first touch) */}
        {!isScratched && scratchProgress === 0 && (
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-3 animate-bounce opacity-90 z-10">
            <span className="text-2xl filter drop-shadow">👆</span>
            <span className="text-[10px] font-bold text-[#3d270e] bg-amber-100/90 px-3 py-0.5 rounded-full shadow border border-[#c5a059]/50 mt-0.5">
              اسحب هنا بإصبعك
            </span>
          </div>
        )}
      </div>

      {/* Progress & Reset Button */}
      <div className="mt-4 flex flex-col items-center justify-center gap-2">
        {!isScratched && (
          <div className="w-52 h-2 rounded-full bg-[#c5a059]/20 overflow-hidden border border-[#c5a059]/30">
            <div
              className="h-full bg-gradient-to-r from-[#98713b] via-[#c5a059] to-[#ffd98c] transition-all duration-150"
              style={{ width: `${Math.min(100, Math.round((scratchProgress / 70) * 100))}%` }}
            ></div>
          </div>
        )}

        {isScratched ? (
          <button
            onClick={initCanvas}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#c5a059]/60 bg-white/90 px-5 py-2 text-xs font-bold text-[#795627] shadow-sm transition hover:bg-[#fff9ef] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>إعادة الخربشة</span>
          </button>
        ) : (
          <span className="text-[11px] font-bold text-[#a68244]">
            نسبة المسح: {scratchProgress}% من 70% المطلوبة 🤍
          </span>
        )}
      </div>
    </section>
  );
}

"use client";

import React, { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, RotateCcw, Heart } from "lucide-react";

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    // Warm Gold Foil Gradient matching the card aesthetic
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#d8bd8d");
    gradient.addColorStop(0.3, "#e6cfa4");
    gradient.addColorStop(0.7, "#c4a36d");
    gradient.addColorStop(1, "#bda778");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle golden sparkle dust
    for (let i = 0; i < 250; i++) {
      ctx.fillStyle = Math.random() > 0.5 ? "rgba(255, 255, 255, 0.4)" : "rgba(120, 90, 45, 0.15)";
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Border
    ctx.strokeStyle = "rgba(180, 150, 95, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    // Instruction text
    ctx.fillStyle = "#694e24";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 15px Arial, sans-serif";
    ctx.fillText("✨ اخربش هنا لكشف بطاقة التهنئة ✨", width / 2, height / 2 - 10);

    ctx.fillStyle = "#8a6c3d";
    ctx.font = "12px Arial, sans-serif";
    ctx.fillText("امسح 70% من الغطاء الذهبي لاكتشاف السر", width / 2, height / 2 + 15);

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
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkProgress();
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;
    let transparentCount = 0;
    const step = 32;

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
      ctx.clearRect(0, 0, width, height);
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.65 },
          colors: ["#98713b", "#bba06e", "#e7ba70", "#fffaf1"],
        });
      } catch (e) {
        console.warn(e);
      }
    }
  };

  return (
    <section className="reveal show my-8 text-center">
      <div className="mx-auto max-w-lg rounded-2xl border border-[#bba06e] bg-[#faf6ed] p-5 shadow-[0_10px_25px_rgba(74,61,37,0.08)]">
        {/* Title */}
        <div className="mb-3 flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 text-[#98713b]" />
          <h3 className="font-serif text-xl font-bold text-[#98713b]">
            مفاجأة الحضور الخاصة
          </h3>
          <Sparkles className="h-4 w-4 text-[#98713b]" />
        </div>

        <p className="text-xs text-[#7d684b] mb-4">
          مرر إصبعك لخربشة الطبقة الذهبية بنسبة 70% للكشف عن الرسالة
        </p>

        {/* Scratch Container */}
        <div className="relative mx-auto h-44 w-full max-w-md overflow-hidden rounded-xl border border-[#bba06e] bg-gradient-to-b from-[#fffdf8] to-[#f4ecd8] shadow-inner select-none">
          {/* Secret Message Revealed Underneath */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <Heart className="h-7 w-7 text-[#98713b] mb-1 animate-pulse" />
            <h4 className="font-serif text-lg font-bold text-[#98713b]">
              حضوركم فرحتنا وسعادتنا!
            </h4>
            <p className="mt-1 font-serif text-xs sm:text-sm text-[#5b5748] leading-relaxed max-w-xs">
              &ldquo;فرحتنا مش هتكمل إلا بيكم، وجودكم على ضفاف النيل في Villa La Riva هيخلي الليلة دي ذكرى محفورة في قلوبنا طول العمر&rdquo;
            </p>
            <span className="mt-2 text-[11px] font-bold text-[#b49661]">
              Mohamed & Yasmin • 31.10.2026
            </span>
          </div>

          {/* Golden Scratch Foil Canvas */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full cursor-pointer touch-none transition-opacity duration-700 ${
              isScratched ? "pointer-events-none opacity-0" : "opacity-100"
            }`}
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            onMouseMove={(e) => {
              if (isDrawing) scratch(e.clientX, e.clientY);
            }}
            onTouchStart={() => setIsDrawing(true)}
            onTouchEnd={() => setIsDrawing(false)}
            onTouchMove={(e) => {
              if (e.touches[0]) {
                scratch(e.touches[0].clientX, e.touches[0].clientY);
              }
            }}
          />
        </div>

        {/* Progress Bar & Reset Button */}
        <div className="mt-4 flex items-center justify-between px-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#806337] font-bold">نسبة الخربشة:</span>
            <div className="h-2 w-24 overflow-hidden rounded-full bg-[#e8dac0]">
              <div
                className="h-full bg-gradient-to-r from-[#bba06e] to-[#98713b] transition-all duration-200"
                style={{ width: `${Math.min(scratchProgress, 100)}%` }}
              ></div>
            </div>
            <span className="font-mono text-[#98713b] font-bold">
              {scratchProgress}% / 70%
            </span>
          </div>

          <button
            type="button"
            onClick={initCanvas}
            className="inline-flex items-center gap-1 rounded-full border border-[#bba06e] bg-white px-3 py-1 text-[11px] font-bold text-[#806337] hover:bg-[#92703d] hover:text-white transition cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>إعادة التغطية</span>
          </button>
        </div>
      </div>
    </section>
  );
}

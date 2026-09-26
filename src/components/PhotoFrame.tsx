"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ZoomIn, X, Sparkles } from "lucide-react";

export default function PhotoFrame() {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <>
      <section className="my-8 text-center">
        {/* Photo Container with Royal Double Border */}
        <div className="relative mx-auto max-w-md p-2">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#c5a059]/20 via-[#e2c17b]/30 to-[#98713b]/20 blur-md pointer-events-none"></div>

          <div className="group relative overflow-hidden rounded-2xl border-2 border-[#c5a059] bg-[#faf5eb] p-2 shadow-2xl transition duration-500 hover:shadow-[0_15px_40px_rgba(197,160,89,0.3)]">
            {/* Inner Gold Inset Border */}
            <div className="relative overflow-hidden rounded-xl">
              <img
                src="/images/couple.jpg"
                alt="Mohamed & Yasmin"
                className="w-full h-auto max-h-[500px] object-cover rounded-xl transition duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  // Fallback to Google Drive thumbnail if local image has issues
                  (e.target as HTMLImageElement).src =
                    "https://drive.google.com/thumbnail?id=1spsbylJ1ei_nyP3Dnekm6-Maaf_Ei2Wq&sz=w1200";
                }}
              />

              {/* Hover Overlay with Zoom Button */}
              <div
                onClick={() => setIsZoomed(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 backdrop-blur-[2px] transition duration-300 group-hover:opacity-100 cursor-pointer"
              >
                <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#7a582b] shadow-lg">
                  <ZoomIn className="h-4 w-4" />
                  <span>تكبير الصورة</span>
                </span>
              </div>
            </div>

            {/* Photo caption badge */}
            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-serif font-bold text-[#8e6b36]">
              <Sparkles className="h-3.5 w-3.5 text-[#c5a059]" />
              <span>Mohamed & Yasmin • حكاية حب أبدية</span>
              <Sparkles className="h-3.5 w-3.5 text-[#c5a059]" />
            </div>
          </div>
        </div>

        {/* Blessed Prayer (الدعاء المبارك) */}
        <div className="relative mx-auto mt-8 max-w-lg rounded-2xl border border-[#c5a059]/40 bg-gradient-to-b from-[#fdfbf6] via-[#faf4e6] to-[#f4ead5] p-6 text-center shadow-md">
          <span className="block font-serif text-4xl text-[#c5a059]/80 leading-none mb-2">
            ❝
          </span>
          <p className="font-serif text-base sm:text-lg leading-loose text-[#523e25] font-medium">
            اللهم اجعل هذا اليوم بداية خير وسعادة لنا، واجمع بيننا على المحبة والرحمة، واكتب لنا حياة مليئة بالفرح والبركة، وبارك لنا في خطوتنا القادمة، واجعل أيامنا القادمة مودة ورحمة وسكينة. 🤍
          </p>
          <span className="block font-serif text-4xl text-[#c5a059]/80 leading-none mt-2">
            ❞
          </span>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-300"
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[90vh] max-w-3xl overflow-hidden rounded-2xl border-2 border-[#c5a059]/80 p-2 bg-[#1b1510]">
            <img
              src="/images/couple.jpg"
              alt="Mohamed & Yasmin"
              className="max-h-[85vh] w-auto rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

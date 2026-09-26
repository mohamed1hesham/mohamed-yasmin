"use client";

import React, { useState } from "react";
import { ZoomIn, X } from "lucide-react";

export default function PhotoFrame() {
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <section className="reveal show my-4">
      {/* Intro Photo Card */}
      <div className="intro-photo relative group cursor-pointer" onClick={() => setIsZoomed(true)}>
        <img
          src="/images/couple.jpg"
          alt="Mohamed & Yasmin"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://drive.google.com/thumbnail?id=1spsbylJ1ei_nyP3Dnekm6-Maaf_Ei2Wq&sz=w1200";
          }}
        />

        {/* Subtle Hover Zoom Hint */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity rounded-[13px]">
          <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-serif font-bold text-[#806337] shadow">
            <ZoomIn className="h-3.5 w-3.5" />
            <span>تكبير الصورة</span>
          </span>
        </div>
      </div>

      {/* Blessed Wedding Prayer */}
      <div className="prayer">
        <span className="quote">❝</span>
        اللهم اجعل هذا اليوم بداية خير وسعادة لنا،
        <br />
        واجمع بيننا على المحبة والرحمة،
        <br />
        واكتب لنا حياة مليئة بالفرح والبركة،
        <br />
        وبارك لنا في خطوتنا القادمة،
        <br />
        واجعل أيامنا القادمة مودة ورحمة وسكينة. 🤍
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 transition cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-2xl border border-[#bba06e] p-2 bg-[#fcfaf5]">
            <img
              src="/images/couple.jpg"
              alt="Mohamed & Yasmin"
              className="max-h-[82vh] w-auto rounded-lg object-contain mx-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://drive.google.com/thumbnail?id=1spsbylJ1ei_nyP3Dnekm6-Maaf_Ei2Wq&sz=w1200";
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { MapPin, AlertCircle, Compass, Copy, Check, ExternalLink } from "lucide-react";

export default function JourneySteps() {
  const [copied, setCopied] = useState(false);

  const addressText =
    "آخر شارع البحر الأعظم، بعد مترو المنيب بحوالي 500 متر، تحت كوبري الأصجبي بجوار مدخل حدائق الري - نقطة ركوب مركب فيلا لا ريفا";

  const handleCopy = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="my-10 rounded-3xl border border-[#c5a059]/40 bg-gradient-to-b from-[#f9f3e6] via-[#f5ebda] to-[#ede0ca] p-6 sm:p-8 shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#c5a059]/20 text-[#8e6b36] mb-2">
          <Compass className="h-6 w-6 animate-spin duration-[12000ms]" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#8e6b36]">
          ⛵ رحلة الوصول إلى الجزيرة
        </h3>
        <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#685237]">
          تبدأ رحلتكم من نقطة الركوب على كورنيش النيل، ومن هناك يأخذكم المركب في جولة نيلية ساحرة إلى الجزيرة حيث تنتظركم <b>Villa La Riva</b>.
        </p>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {/* Step 1 */}
        <div className="group rounded-2xl border border-[#c5a059]/30 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#c5a059] hover:shadow-md">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#98713b] to-[#d8b467] text-white shadow-sm">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="flex-1 text-right">
              <h4 className="font-bold text-[#795627] text-base mb-1">
                📍 نقطة الركوب
              </h4>
              <p className="text-sm leading-relaxed text-[#5a462c]">
                آخر شارع البحر الأعظم، بعد محطة مترو المنيب بحوالي 500 متر، تحت كوبري الأصجبي بجوار مدخل حدائق الري.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 (Warning / Crucial Direction) */}
        <div className="group rounded-2xl border border-amber-400/50 bg-amber-50/90 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="flex-1 text-right">
              <h4 className="font-bold text-amber-900 text-base mb-1">
                ⚠️ إرشادات هامة جدًا للطريق
              </h4>
              <p className="text-sm leading-relaxed text-amber-950 font-medium">
                يرجى اللف من <b>آخر الكوبري</b> مباشرةً، وليس من تحت الكوبري لسهولة وتيسير الدخول إلى المرسى.
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="group rounded-2xl border border-[#c5a059]/30 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#c5a059] hover:shadow-md">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#3b6f63] to-[#5a9c8d] text-white shadow-sm">
              <span className="text-lg">🚤</span>
            </div>
            <div className="flex-1 text-right">
              <h4 className="font-bold text-[#2d5249] text-base mb-1">
                المركب متوفر ومجاني طوال المناسبة
              </h4>
              <p className="text-sm leading-relaxed text-[#5a462c]">
                لا يوجد موعد محدد للمركب، فهو يتحرك ذهابًا وإيابًا باستمرار كل 5 دقائق تقريبًا لخدمة وراحة جميع الضيوف الكرام.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href="https://maps.app.goo.gl/TKbCmjNWUiDrQuPp6"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#98713b] via-[#b68f4e] to-[#7f5d2d] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105 active:scale-95"
        >
          <MapPin className="h-4 w-4" />
          <span>افتح الموقع على Google Maps</span>
          <ExternalLink className="h-3.5 w-3.5 opacity-80" />
        </a>

        <button
          onClick={handleCopy}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#c5a059]/60 bg-white/90 px-6 py-3 text-sm font-bold text-[#795627] shadow transition hover:bg-white hover:scale-105 active:scale-95 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-600" />
              <span className="text-emerald-700">تم نسخ العنوان بنجاح!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>نسخ تفاصيل العنوان</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}

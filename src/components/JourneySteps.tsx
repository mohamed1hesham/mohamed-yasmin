"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function JourneySteps() {
  const [copied, setCopied] = useState(false);

  const addressText =
    "آخر شارع البحر الأعظم، بعد مترو المنيب بحوالي 500 متر، تحت كوبري الأصجبي بجوار مدخل حدائق الري - مركب فيلا لا ريفا";

  const handleCopy = () => {
    navigator.clipboard.writeText(addressText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="route reveal show my-6">
      <div className="route-title">⛵ رحلة الوصول</div>

      <div className="route-sub">
        تبدأ رحلتكم من نقطة الركوب،

        ومن هناك يأخذكم المركب إلى الجزيرة

        حيث تنتظركم Villa La Riva.
      </div>

      <div className="step text-center">

        📍 <b>نقطة الركوب</b>
        <br />
        آخر شارع البحر الأعظم،

        بعد مترو المنيب بحوالي 500 متر،

        تحت كوبري الأصجبي بجوار مدخل حدائق الري.
      </div>

      <div className="step text-center">
        ⚠️ <b>مهم جدًا</b>
        <br />
        لف من آخر الكوبري،

        مش من تحت الكوبري.
      </div>

      <div className="step text-center">
        🚤 <b>المركب متوفر طوال المناسبة</b>
        <br />
        مفيش ميعاد محدد للمركب،
        وهو بيتحرك رايح جاي تقريبًا كل 5 دقائق.
      </div>

      <a
        className="map-button"
        href="https://maps.app.goo.gl/TKbCmjNWUiDrQuPp6"
        target="_blank"
        rel="noopener noreferrer"
      >
        📍 افتح الموقع على Google Maps
      </a>

      {/* Copy Address Button */}
      <button
        type="button"
        onClick={handleCopy}
        className="mt-3 inline-flex items-center justify-center gap-1.5 text-xs text-[#806337] hover:text-[#98713b] underline cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-emerald-700 font-bold">تم نسخ تفاصيل العنوان!</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            <span>نسخ تفاصيل العنوان كتابةً</span>
          </>
        )}
      </button>
    </section>
  );
}

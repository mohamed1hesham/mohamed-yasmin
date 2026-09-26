"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Clock, Download } from "lucide-react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    isFinished: false,
  });

  useEffect(() => {
    // 31 October 2026, 16:00:00 Cairo Time
    const targetDate = new Date("October 31, 2026 16:00:00 GMT+0300").getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          isFinished: true,
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
        isFinished: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Google Calendar link
  const googleCalUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
    encodeURIComponent("حفل زفاف محمد وياسمين | Mohamed & Yasmin Wedding") +
    "&dates=20261031T130000Z/20261031T210000Z" +
    "&details=" +
    encodeURIComponent("يسعدنا ويشرفنا حضوركم حفل زفاف محمد وياسمين في Villa La Riva على ضفاف النيل") +
    "&location=" +
    encodeURIComponent("Villa La Riva, البحر الأعظم، الجيزة، مصر");

  // Download .ics for Apple / Outlook
  const downloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Mohamed & Yasmin Wedding//EN",
      "BEGIN:VEVENT",
      "UID:wedding-mohamed-yasmin-20261031@wedding.local",
      "DTSTAMP:20261031T130000Z",
      "DTSTART:20261031T130000Z",
      "DTEND:20261031T210000Z",
      "SUMMARY:حفل زفاف محمد وياسمين (Mohamed & Yasmin)",
      "DESCRIPTION:يسعدنا ويشرفنا حضوركم حفل زفافنا في فيلا لا ريفا على ضفاف النيل",
      "LOCATION:Villa La Riva, Giza, Egypt",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Mohamed_Yasmin_Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const timerItems = [
    { label: "يوم", labelEn: "Days", val: timeLeft.days },
    { label: "ساعة", labelEn: "Hours", val: timeLeft.hours },
    { label: "دقيقة", labelEn: "Minutes", val: timeLeft.minutes },
    { label: "ثانية", labelEn: "Seconds", val: timeLeft.seconds },
  ];

  return (
    <section className="my-10 text-center">
      {/* Title */}
      <div className="mb-2 flex items-center justify-center gap-2">
        <span className="h-[1px] w-8 bg-[#c5a059]/50"></span>
        <h3 className="font-serif text-2xl font-bold text-[#8f6b36] flex items-center gap-2">
          <span>🌅</span>
          <span>موعدنا المبارك</span>
        </h3>
        <span className="h-[1px] w-8 bg-[#c5a059]/50"></span>
      </div>

      <p className="font-serif text-lg font-semibold text-[#5a462c]">
        السبت، 31 أكتوبر 2026 • الساعة 4:00 مساءً
      </p>

      <div className="my-4 text-xs font-semibold uppercase tracking-widest text-[#a88448]">
        ✨ متبقي على لقائنا ومشاركتنا الفرحة ✨
      </div>

      {/* Countdown Digits Grid */}
      <div className="mx-auto flex max-w-sm justify-center gap-2 sm:gap-3">
        {timerItems.map((item, idx) => (
          <div
            key={idx}
            className="flex-1 rounded-2xl border border-[#c5a059]/50 bg-gradient-to-b from-[#fffefc] to-[#f4ead6] p-3 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="block font-serif text-3xl sm:text-4xl font-extrabold text-[#8c6731] tracking-tight">
              {item.val}
            </span>
            <span className="mt-1 block text-xs font-bold text-[#6d573d]">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href={googleCalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/60 bg-gradient-to-r from-[#98713b] to-[#c5a059] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:scale-105 active:scale-95"
        >
          <Calendar className="h-4 w-4" />
          <span>أضف لتقويم Google</span>
        </a>

        <button
          onClick={downloadIcs}
          className="inline-flex items-center gap-2 rounded-full border border-[#c5a059]/60 bg-white/70 px-5 py-2.5 text-xs font-bold text-[#7a582b] shadow-sm transition hover:bg-[#c5a059]/15 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Download className="h-4 w-4" />
          <span>حفظ الموعد (Apple / Outlook)</span>
        </button>
      </div>
    </section>
  );
}

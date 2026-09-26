"use client";

import React, { useEffect, useState } from "react";
import { Calendar, Download } from "lucide-react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const weddingDate = new Date("October 31, 2026 16:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
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
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const googleCalUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" +
    encodeURIComponent("حفل زفاف محمد وياسمين | Mohamed & Yasmin Wedding") +
    "&dates=20261031T130000Z/20261031T210000Z" +
    "&details=" +
    encodeURIComponent("يسعدنا ويشرفنا حضوركم حفل زفاف محمد وياسمين في Villa La Riva على ضفاف النيل") +
    "&location=" +
    encodeURIComponent("Villa La Riva, البحر الأعظم، الجيزة، مصر");

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
      "DESCRIPTION:يسعدنا ويشرفنا حضوركم حفل زفافنا في Villa La Riva على ضفاف النيل",
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

  return (
    <section className="time-section reveal show my-6 text-center">
      <h2 className="section-title">🌅 موعدنا</h2>

      <div className="font-serif text-lg text-[#5b5748] leading-relaxed">
        31 أكتوبر
        <br />
        الساعة 4:00 مساءً
      </div>

      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: "15px",
          marginTop: "25px",
          color: "#806d4d",
        }}
      >
        ✨ متبقي على لقائنا ✨
      </div>

      {/* Exact Countdown Boxes */}
      <div className="countdown">
        <div className="count-box">
          <span className="count-number" id="days">
            {timeLeft.days}
          </span>
          <span className="count-label">يوم</span>
        </div>

        <div className="count-box">
          <span className="count-number" id="hours">
            {timeLeft.hours}
          </span>
          <span className="count-label">ساعة</span>
        </div>

        <div className="count-box">
          <span className="count-number" id="minutes">
            {timeLeft.minutes}
          </span>
          <span className="count-label">دقيقة</span>
        </div>

        <div className="count-box">
          <span className="count-number" id="seconds">
            {timeLeft.seconds}
          </span>
          <span className="count-label">ثانية</span>
        </div>
      </div>

      {/* Calendar Add Buttons */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        <a
          href={googleCalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#bba06e] bg-[#faf6ed] px-4 py-2 text-xs font-serif font-bold text-[#806337] transition hover:bg-[#92703d] hover:text-white"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>إضافة لتقويم Google</span>
        </a>

        <button
          type="button"
          onClick={downloadIcs}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#bba06e] bg-[#faf6ed] px-4 py-2 text-xs font-serif font-bold text-[#806337] transition hover:bg-[#92703d] hover:text-white cursor-pointer"
        >
          <Download className="h-3.5 w-3.5" />
          <span>حفظ بالهاتف (Apple / Outlook)</span>
        </button>
      </div>
    </section>
  );
}

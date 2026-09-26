"use client";

import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music, Play, Pause, ChevronUp, ChevronDown, Upload, Disc3 } from "lucide-react";

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

export const TRACKS = [
  {
    id: "ahla-qarar",
    name: "أحلى قرار | عمرو جابر",
    subtitle: "يا أحلى قرار أنا أخدته.. يا عمر جديد 🤍",
    src: "/audio/ahla-qarar.mp3",
    type: "audio/mp3",
  },
  {
    id: "canon",
    name: "بيانو ملكي | Canon in D",
    subtitle: "موسيقى كلاسيكية رومانسية",
    src: "/audio/wedding-music.mp3",
    type: "audio/mp3",
  },
  {
    id: "oud",
    name: "عزف عود شرقي | بليغ حمدي",
    subtitle: "ألحان شرقية نيلية ساحرة",
    src: "/audio/oud-music.mp3",
    type: "audio/mp3",
  },
];

export default function AudioPlayer({ isPlaying, setIsPlaying, audioRef }: AudioPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [isExpanded, setIsExpanded] = useState(false);
  const [customTrackName, setCustomTrackName] = useState<string | null>(null);
  const [customTrackUrl, setCustomTrackUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentTrack = customTrackUrl
    ? {
        id: "custom",
        name: customTrackName || "أغنية مخصصة",
        subtitle: "ملف صوتي من جهازك",
        src: customTrackUrl,
      }
    : TRACKS[currentTrackIndex];

  // Handle Play/Pause
  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Audio playback prevented:", err);
      }
    }
  };

  // Change Track
  const handleSelectTrack = (index: number) => {
    setCustomTrackUrl(null);
    setCurrentTrackIndex(index);
    if (audioRef.current) {
      audioRef.current.src = TRACKS[index].src;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(console.warn);
      }
    }
  };

  // Handle Custom Audio Upload
  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCustomTrackUrl(url);
    setCustomTrackName(file.name.replace(/\.[^/.]+$/, ""));
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.load();
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      if (newVol > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef]);

  return (
    <>
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*"
        onChange={handleCustomUpload}
        className="hidden"
      />

      {/* Floating Modern Audio Control Dock */}
      <aside aria-label="مشغل الموسيقى" className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2">
        {/* Expanded Options Card */}
        {isExpanded && (
          <div className="w-80 rounded-2xl border border-[#c5a059]/40 bg-[#191410]/95 p-4 text-white shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-300">
            <div className="mb-3 flex items-center justify-between border-b border-[#c5a059]/20 pb-2">
              <span className="text-xs font-bold text-[#e8c77e] flex items-center gap-1.5">
                <Disc3 className="h-4 w-4 animate-spin text-[#d4af37]" />
                <span>أغاني ولحن حفل الزفاف</span>
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Track List */}
            <div className="space-y-2">
              {TRACKS.map((t, idx) => {
                const active = !customTrackUrl && currentTrackIndex === idx;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTrack(idx)}
                    className={`flex w-full flex-col rounded-xl p-2.5 text-right transition cursor-pointer ${
                      active
                        ? "bg-[#c5a059]/30 text-[#fbf0d9] font-bold border border-[#c5a059]/70 shadow-sm"
                        : "bg-white/5 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold truncate">{t.name}</span>
                      {active && isPlaying && (
                        <span className="flex items-center gap-0.5 ml-1">
                          <span className="h-3 w-0.5 bg-[#d4af37] animate-pulse"></span>
                          <span className="h-4 w-0.5 bg-[#d4af37] animate-pulse delay-75"></span>
                          <span className="h-2 w-0.5 bg-[#d4af37] animate-pulse delay-150"></span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#baa489] mt-0.5 truncate">
                      {t.subtitle}
                    </span>
                  </button>
                );
              })}

              {/* Custom Track (if loaded) */}
              {customTrackUrl && (
                <div className="flex w-full items-center justify-between rounded-xl border border-[#c5a059]/60 bg-[#c5a059]/30 p-2.5 text-right text-xs text-[#f6e1ba] font-bold">
                  <span className="truncate">🎵 {customTrackName}</span>
                  <span className="text-[10px] text-green-300">مخصص</span>
                </div>
              )}

              {/* Upload Custom Song Button */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#c5a059]/40 bg-white/5 px-3 py-2 text-xs text-[#d8b467] hover:bg-[#c5a059]/15 transition cursor-pointer"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>رفع أغنية أخرى من جهازك</span>
              </button>
            </div>

            {/* Volume Control */}
            <div className="mt-3 flex items-center gap-2 border-t border-[#c5a059]/20 pt-2.5">
              <button onClick={toggleMute} className="text-[#d8b467] hover:text-white transition cursor-pointer">
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="h-1.5 w-full cursor-pointer accent-[#c5a059] bg-white/20 rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Floating Pill Button */}
        <div className="flex items-center gap-1.5 rounded-full border border-[#c5a059]/70 bg-[#16120e]/95 p-1.5 pr-3.5 shadow-2xl backdrop-blur-md transition hover:border-[#c5a059] hover:shadow-[0_0_25px_rgba(197,160,89,0.4)]">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#98713b] via-[#c5a059] to-[#ebd299] text-[#1e1915] shadow-lg transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 fill-current" />
            ) : (
              <Play className="h-5 w-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Song Name & Animated Sound Bars */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2.5 px-2 text-right transition group cursor-pointer"
          >
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-bold text-[#f4deb0] max-w-[140px] truncate leading-tight group-hover:text-white">
                {currentTrack.name.split("|")[0]}
              </span>
              <span className="text-[9px] text-[#b89f78] flex items-center gap-1">
                {isPlaying ? "جاري العزف..." : "انقر للاستماع"}
              </span>
            </div>

            {/* Equalizer Wave Bars */}
            <div className="flex h-5 w-5 items-end justify-center gap-0.5 pb-0.5">
              {isPlaying ? (
                <>
                  <span className="w-1 rounded-full bg-[#c5a059] bar-1"></span>
                  <span className="w-1 rounded-full bg-[#d8b467] bar-2"></span>
                  <span className="w-1 rounded-full bg-[#ebd299] bar-3"></span>
                </>
              ) : (
                <Music className="h-4 w-4 text-[#b89f78]" />
              )}
            </div>

            {/* Chevron toggle */}
            <div className="text-[#c5a059]">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}

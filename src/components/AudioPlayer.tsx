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

      <aside aria-label="مشغل الموسيقى" className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2">
        {/* Expanded Options Card */}
        {isExpanded && (
          <div className="w-80 rounded-2xl border border-[#bba06e] bg-[#fcfaf5]/98 p-4 text-[#5b5748] shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="mb-3 flex items-center justify-between border-b border-[#d9ccb3] pb-2">
              <span className="text-xs font-bold text-[#98713b] flex items-center gap-1.5">
                <Disc3 className="h-4 w-4 animate-spin text-[#98713b]" />
                <span>أغاني ولحن حفل الزفاف</span>
              </span>
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="text-[#80704f] hover:text-[#98713b] transition cursor-pointer"
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
                    type="button"
                    onClick={() => handleSelectTrack(idx)}
                    className={`flex w-full flex-col rounded-xl p-2.5 text-right transition cursor-pointer ${
                      active
                        ? "bg-[#eee3d0] text-[#98713b] font-bold border border-[#bba06e]"
                        : "bg-white/70 text-[#5b5748] hover:bg-[#eee3d0]/60"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold truncate">{t.name}</span>
                      {active && isPlaying && (
                        <span className="flex items-center gap-0.5 ml-1">
                          <span className="h-3 w-0.5 bg-[#98713b] animate-pulse"></span>
                          <span className="h-4 w-0.5 bg-[#98713b] animate-pulse delay-75"></span>
                          <span className="h-2 w-0.5 bg-[#98713b] animate-pulse delay-150"></span>
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#80704f] mt-0.5 truncate">
                      {t.subtitle}
                    </span>
                  </button>
                );
              })}

              {/* Custom Track (if loaded) */}
              {customTrackUrl && (
                <div className="flex w-full items-center justify-between rounded-xl border border-[#bba06e] bg-[#eee3d0] p-2.5 text-right text-xs text-[#98713b] font-bold">
                  <span className="truncate">🎵 {customTrackName}</span>
                  <span className="text-[10px] text-emerald-700">مخصص</span>
                </div>
              )}

              {/* Upload Custom Song Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#bba06e] bg-white/60 px-3 py-2 text-xs text-[#806337] hover:bg-[#eee3d0] transition cursor-pointer"
              >
                <Upload className="h-3.5 w-3.5" />
                <span>رفع أغنية أخرى من جهازك</span>
              </button>
            </div>

            {/* Volume Control */}
            <div className="mt-3 flex items-center gap-2 border-t border-[#d9ccb3] pt-2.5">
              <button
                type="button"
                onClick={toggleMute}
                className="text-[#98713b] hover:text-[#765b35] transition cursor-pointer"
              >
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
                className="h-1.5 w-full cursor-pointer accent-[#98713b] bg-[#e5d8c3] rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Floating Pill Button */}
        <div className="flex items-center gap-1.5 rounded-full border border-[#bba06e] bg-[#fcfaf5]/95 p-1.5 pr-3 shadow-[0_10px_25px_rgba(74,61,37,0.15)] backdrop-blur-md transition hover:border-[#98713b]">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-[#98713b] to-[#bba06e] text-white shadow transition hover:scale-105 active:scale-95 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 fill-current" />
            ) : (
              <Play className="h-4 w-4 fill-current ml-0.5" />
            )}
          </button>

          {/* Song Name & Sound Bars */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-2 text-right transition group cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#806337] truncate max-w-[130px] group-hover:text-[#98713b]">
                {currentTrack.name.split("|")[0]}
              </span>
              <span className="text-[10px] text-[#9c8466]">
                {isPlaying ? "شغالة الآن 🎵" : "اضغط للتشغيل"}
              </span>
            </div>

            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                <span className="w-0.5 bg-[#98713b] bar-1"></span>
                <span className="w-0.5 bg-[#98713b] bar-2"></span>
                <span className="w-0.5 bg-[#98713b] bar-3"></span>
              </div>
            ) : (
              <Music className="h-3.5 w-3.5 text-[#98713b]" />
            )}

            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5 text-[#98713b]" />
            ) : (
              <ChevronUp className="h-3.5 w-3.5 text-[#98713b]" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";

interface AudioPlayerProps {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

// ONLY this official wedding song - fixed and unchangeable
const WEDDING_SONG_SRC = "/audio/wedding-theme.mp3";

export default function AudioPlayer({ isPlaying, setIsPlaying, audioRef }: AudioPlayerProps) {
  const [isMuted, setIsMuted] = useState(false);

  // Toggle Play / Pause
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

  // Toggle Mute
  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  };

  return (
    <>
      {/* Fixed Wedding Audio Element (Cannot be edited or changed) */}
      <audio
        ref={audioRef}
        src={WEDDING_SONG_SRC}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Clean Floating Audio Pill Dock (Play / Pause & Mute Only) */}
      <aside
        aria-label="مشغل موسيقى حفل الزفاف"
        className="fixed bottom-5 left-5 z-50 flex items-center"
      >
        <div className="flex items-center gap-2 rounded-full border border-[#bba06e] bg-[#fcfaf5]/95 p-1.5 px-3.5 shadow-[0_10px_25px_rgba(74,61,37,0.15)] backdrop-blur-md">
          {/* Play / Pause Button */}
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

          {/* Song Info & Sound Waves */}
          <div className="flex items-center gap-2 px-1 select-none">


            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-3.5 w-3.5 mr-1">
                <span className="w-0.5 bg-[#98713b] bar-1"></span>
                <span className="w-0.5 bg-[#98713b] bar-2"></span>
                <span className="w-0.5 bg-[#98713b] bar-3"></span>
              </div>
            ) : (
              <Music className="h-3.5 w-3.5 text-[#98713b] mr-1" />
            )}
          </div>

          {/* Mute / Unmute Button */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "إلغاء كتم الصوت" : "كتم الصوت"}
            className="flex h-7 w-7 items-center justify-center rounded-full text-[#98713b] hover:bg-[#eee3d0] transition cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-rose-700" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

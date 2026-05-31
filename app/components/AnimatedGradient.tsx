"use client";

import { useState } from "react";

const blobs = [
  { color: "#f9a8d4", size: "80%", x: "10%", y: "20%", duration: 14, delay: 0   },
  { color: "#c4b5fd", size: "70%", x: "55%", y: "10%", duration: 18, delay: -5  },
  { color: "#93c5fd", size: "75%", x: "75%", y: "60%", duration: 22, delay: -9  },
  { color: "#fbcfe8", size: "60%", x: "20%", y: "70%", duration: 16, delay: -4  },
  { color: "#bfdbfe", size: "65%", x: "45%", y: "40%", duration: 20, delay: -13 },
];

export default function AnimatedGradient({ className = "" }: { className?: string }) {
  const [playing, setPlaying] = useState(true);

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      {/* Blur container */}
      <div className="absolute inset-0" style={{ filter: "blur(80px)" }}>
        {blobs.map((blob, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-90"
            style={{
              backgroundColor: blob.color,
              width: blob.size,
              height: blob.size,
              left: blob.x,
              top: blob.y,
              transform: "translate(-50%, -50%)",
              animationName: `blob-drift-${i}`,
              animationDuration: `${blob.duration}s`,
              animationDelay: `${blob.delay}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDirection: "normal",
              animationPlayState: playing ? "running" : "paused",
            }}
          />
        ))}
      </div>

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Play/pause button */}
      <button
        onClick={() => setPlaying((p) => !p)}
        aria-label={playing ? "Pause animation" : "Play animation"}
        className="absolute bottom-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
      >
        {playing ? (
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
    </div>
  );
}

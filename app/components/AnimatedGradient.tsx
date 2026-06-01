"use client";

type Blob = { color: string; size: string; x: string; y: string; duration: number; delay: number };

const defaultBlobs: Blob[] = [
  { color: "#f9a8d4", size: "80%", x: "10%", y: "20%", duration: 14, delay: 0   },
  { color: "#c4b5fd", size: "70%", x: "55%", y: "10%", duration: 18, delay: -5  },
  { color: "#93c5fd", size: "75%", x: "75%", y: "60%", duration: 22, delay: -9  },
  { color: "#fbcfe8", size: "60%", x: "20%", y: "70%", duration: 16, delay: -4  },
  { color: "#bfdbfe", size: "65%", x: "45%", y: "40%", duration: 20, delay: -13 },
];

export const caseStudyBlobs: Blob[] = [
  { color: "#bae6fd", size: "80%", x: "10%", y: "20%", duration: 14, delay: 0   },
  { color: "#e0f2fe", size: "70%", x: "55%", y: "10%", duration: 18, delay: -5  },
  { color: "#7dd3fc", size: "75%", x: "75%", y: "60%", duration: 22, delay: -9  },
  { color: "#f0f9ff", size: "60%", x: "20%", y: "70%", duration: 16, delay: -4  },
  { color: "#cffafe", size: "65%", x: "45%", y: "40%", duration: 20, delay: -13 },
];

export const projectBlobs: Blob[] = [
  { color: "#60a5fa", size: "80%", x: "10%", y: "20%", duration: 14, delay: 0   },
  { color: "#2dd4bf", size: "70%", x: "55%", y: "10%", duration: 18, delay: -5  },
  { color: "#3b82f6", size: "75%", x: "75%", y: "60%", duration: 22, delay: -9  },
  { color: "#e0f2fe", size: "60%", x: "20%", y: "70%", duration: 16, delay: -4  },
  { color: "#93c5fd", size: "65%", x: "45%", y: "40%", duration: 20, delay: -13 },
];

export default function AnimatedGradient({
  className = "",
  blobs = defaultBlobs,
}: {
  className?: string;
  blobs?: Blob[];
}) {
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
    </div>
  );
}

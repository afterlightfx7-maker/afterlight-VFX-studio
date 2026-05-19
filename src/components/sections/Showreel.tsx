"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState, useRef } from "react";

interface ShowreelProps {
  // Pass your actual video path here later, e.g., "/videos/main-reel.mp4"
  videoSrc?: string; 
}

export default function Showreel({ videoSrc }: ShowreelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="section" style={{ padding: "0 2rem", position: "relative" }}>
      <div 
        style={{ 
          maxWidth: "1400px", 
          margin: "0 auto", 
          borderRadius: "1rem", 
          overflow: "hidden",
          position: "relative",
          aspectRatio: "21/9",
          backgroundColor: "#0a0a0c",
          border: "1px solid var(--color-border)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* The Video Element */}
        {videoSrc ? (
          <video 
            ref={videoRef}
            src={videoSrc}
            playsInline
            loop
            muted={false} // Adjust based on your reel
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
          />
        ) : (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(45deg, #050505 0%, #111 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <div style={{ width: "100%", height: "100%", backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h20v20H0z\" fill=\"%23000\" fill-opacity=\"0.1\"/%3E%3Cpath d=\"M10 10l10 10H0z\" fill=\"%2300d2ff\" fill-opacity=\"0.03\"/%3E%3C/svg%3E')" }} />
          </div>
        )}

        {/* Overlay Darken on Hover / Pause */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          opacity: isHovered || !isPlaying ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: "none"
        }} />

        {/* Play/Pause Button */}
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: isHovered || !isPlaying ? 1 : 0,
          transition: "opacity 0.3s ease"
        }}>
          <motion.button
            onClick={handlePlayClick}
            animate={{ scale: isHovered ? 1.1 : 1, backgroundColor: isHovered ? "rgba(0, 210, 255, 0.2)" : "rgba(20, 20, 25, 0.6)" }}
            transition={{ duration: 0.3 }}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid var(--color-accent-blue)",
              backdropFilter: "blur(8px)",
              cursor: "pointer",
              color: "white",
            }}
          >
            {isPlaying ? (
              <div style={{ width: "24px", height: "24px", display: "flex", gap: "6px", justifyContent: "center" }}>
                <div style={{ width: "6px", height: "100%", backgroundColor: "currentColor" }} />
                <div style={{ width: "6px", height: "100%", backgroundColor: "currentColor" }} />
              </div>
            ) : (
              <Play size={32} fill="currentColor" style={{ marginLeft: "6px" }} />
            )}
          </motion.button>
        </div>

        {/* Text Overlay */}
        <div style={{
          position: "absolute",
          bottom: "2rem",
          left: "3rem",
          opacity: isPlaying && !isHovered ? 0 : 1,
          transition: "opacity 0.3s ease"
        }}>
          <h2 style={{ fontSize: "2rem", margin: 0 }}>AFTERLIGHTFX REEL 2026</h2>
          <p style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-primary)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.8rem", marginTop: "0.5rem" }}>
            Press play to immerse
          </p>
        </div>
      </div>
    </section>
  );
}

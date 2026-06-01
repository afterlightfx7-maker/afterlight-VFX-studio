"use client";

import { motion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Showreel() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // default to true since we autoplay
  const [isMuted, setIsMuted] = useState(true); // default to true to allow autoplay
  const [videoSrc, setVideoSrc] = useState("");
  const [reelTitle, setReelTitle] = useState("AFTERLIGHTFX REEL 2026");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetch("/api/showreel")
      .then(res => res.json())
      .then(data => {
        if (data.videoUrl) setVideoSrc(data.videoUrl);
        if (data.title) setReelTitle(data.title);
      })
      .catch(() => {});
  }, []);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  return (
    <section className="section showreel-wrapper" style={{ padding: "0 2rem", position: "relative" }}>
      <div 
        className="showreel-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ position: "relative", overflow: "hidden", borderRadius: "16px", height: "80vh", minHeight: "500px", backgroundColor: "#000" }}
      >
        {/* The Video Element */}
        {videoSrc ? (
          <video 
            ref={videoRef}
            src={videoSrc}
            autoPlay
            playsInline
            loop
            muted={isMuted}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
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
          transition: "opacity 0.3s ease",
          pointerEvents: isHovered || !isPlaying ? "auto" : "none"
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

        {/* Audio Mute/Unmute Control (Bottom Right) */}
        <div style={{
          position: "absolute",
          bottom: "2rem",
          right: "3rem",
          zIndex: 10,
          opacity: isPlaying && !isHovered ? 0.3 : 1,
          transition: "opacity 0.3s ease",
          display: "flex",
          alignItems: "center"
        }}>
          <motion.button
            onClick={() => setIsMuted(!isMuted)}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0, 210, 255, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(20, 20, 25, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "var(--color-accent-blue)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 210, 255, 0.3)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
            }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
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
          <h2 style={{ fontSize: "2rem", margin: 0 }}>{reelTitle}</h2>
          <p style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-primary)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.8rem", marginTop: "0.5rem" }}>
            Press play to immerse
          </p>
        </div>
      </div>
    </section>
  );
}

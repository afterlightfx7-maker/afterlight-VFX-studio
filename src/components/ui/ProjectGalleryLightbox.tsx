"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectGalleryLightboxProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectGalleryLightbox({ project, onClose }: ProjectGalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Build media items list: main mediaSrc (image or video) + galleryImages
  const mediaItems = project
    ? [
        ...(project.mediaSrc
          ? [
              {
                src: project.mediaSrc,
                type:
                  project.mediaType === "video" ||
                  project.mediaSrc.includes("/video/") ||
                  project.mediaSrc.match(/\.(mp4|webm|ogg|mov|m4v)($|\?)/i) ||
                  project.mediaSrc.startsWith("data:video/")
                    ? ("video" as const)
                    : ("image" as const),
              },
            ]
          : []),
        ...(project.galleryImages ?? []).map((url) => ({
          src: url,
          type: "image" as const,
        })),
      ]
    : [];

  const totalImages = mediaItems.length;

  const goNext = useCallback(() => {
    if (totalImages <= 1) return;
    setDirection(1);
    setCurrentIndex(i => (i + 1) % totalImages);
  }, [totalImages]);

  const goPrev = useCallback(() => {
    if (totalImages <= 1) return;
    setDirection(-1);
    setCurrentIndex(i => (i - 1 + totalImages) % totalImages);
  }, [totalImages]);

  useEffect(() => {
    if (!project) return;
    setCurrentIndex(0);
    setDirection(0);
  }, [project]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, goNext, goPrev]);

  // Prevent body scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0, scale: 0.96 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -120 : 120, opacity: 0, scale: 0.96 })
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.92)",
            backdropFilter: "blur(18px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* Panel — stops propagation so clicks inside don't close */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={e => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              position: "relative",
              width: "min(92vw, 1100px)",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem"
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 0.25rem" }}>
              <div>
                <p style={{ color: "rgba(0,210,255,0.8)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.25rem", fontWeight: 600 }}>
                  {project.category}
                </p>
                <h2 style={{ fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 700, color: "#fff", margin: 0, letterSpacing: "0.02em" }}>
                  {project.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close gallery"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "50%",
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.7)",
                  transition: "all 0.25s ease",
                  flexShrink: 0
                }}
                onMouseOver={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseOut={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Image */}
            <div style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16/10",
              borderRadius: "16px",
              overflow: "hidden",
              background: project.bg || "#0a0a0f",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(0,210,255,0.05)"
            }}>
              {totalImages > 0 ? (
                <AnimatePresence custom={direction} initial={false} mode="wait">
                  {mediaItems[currentIndex].type === "video" ? (
                    <motion.video
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      src={mediaItems[currentIndex].src}
                      controls
                      autoPlay
                      playsInline
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "center"
                      }}
                    />
                  ) : (
                    <motion.img
                      key={currentIndex}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      src={mediaItems[currentIndex].src}
                      alt={`${project.title} — asset ${currentIndex + 1}`}
                      style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        objectPosition: "center"
                      }}
                    />
                  )}
                </AnimatePresence>
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.15)", fontSize: "1rem" }}>
                  No images uploaded yet
                </div>
              )}

              {/* Prev / Next Arrows */}
              {totalImages > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    aria-label="Previous image"
                    style={{
                      position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%",
                      width: "48px", height: "48px", display: "flex", alignItems: "center",
                      justifyContent: "center", cursor: "pointer", color: "#fff",
                      transition: "all 0.25s ease", zIndex: 2
                    }}
                    onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,210,255,0.2)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,210,255,0.5)"; }}
                    onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.55)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Next image"
                    style={{
                      position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
                      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.12)", borderRadius: "50%",
                      width: "48px", height: "48px", display: "flex", alignItems: "center",
                      justifyContent: "center", cursor: "pointer", color: "#fff",
                      transition: "all 0.25s ease", zIndex: 2
                    }}
                    onMouseOver={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,210,255,0.2)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,210,255,0.5)"; }}
                    onMouseOut={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.55)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"; }}
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}

              {/* Image counter badge */}
              {totalImages > 1 && (
                <div style={{
                  position: "absolute", bottom: "1rem", right: "1rem",
                  background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px",
                  padding: "0.35rem 0.85rem", fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.75)", letterSpacing: "0.05em", zIndex: 2
                }}>
                  {currentIndex + 1} / {totalImages}
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {totalImages > 1 && (
              <div style={{
                display: "flex",
                gap: "0.6rem",
                overflowX: "auto",
                paddingBottom: "0.25rem",
                scrollbarWidth: "none"
              }}>
                {mediaItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }}
                    aria-label={`View asset ${idx + 1}`}
                    style={{
                      flexShrink: 0,
                      width: "72px",
                      height: "50px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: idx === currentIndex
                        ? "2px solid rgba(0,210,255,0.85)"
                        : "2px solid rgba(255,255,255,0.07)",
                      cursor: "pointer",
                      padding: 0,
                      background: project.bg || "#111",
                      transition: "border-color 0.25s ease, transform 0.2s ease",
                      transform: idx === currentIndex ? "scale(1.05)" : "scale(1)"
                    }}
                  >
                    {item.type === "video" ? (
                      <video
                        src={item.src}
                        muted
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={`Thumb ${idx + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Dot indicators */}
            {totalImages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem" }}>
                {mediaItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setDirection(idx > currentIndex ? 1 : -1); setCurrentIndex(idx); }}
                    style={{
                      width: idx === currentIndex ? "22px" : "6px",
                      height: "6px",
                      borderRadius: "3px",
                      background: idx === currentIndex ? "rgba(0,210,255,0.9)" : "rgba(255,255,255,0.2)",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "all 0.3s ease"
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

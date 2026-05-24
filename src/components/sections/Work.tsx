"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

import { getStoredProjects } from "@/components/utils/adminData";
import { Project } from "@/data/projects";

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStoredProjects().then(data => {
      setProjects(data);
      setIsLoading(false);
    });
  }, []);

  const filteredProjects = projects.filter(p => 
    filter === "All" || p.category.toLowerCase() === filter.toLowerCase()
  );

  return (
    <section id="work" className="section container">
      <div className="work-header" style={{ marginBottom: "4rem" }}>
        <div>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ color: "var(--color-accent-blue)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600 }}
          >
            Our Work
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", margin: "1rem 0 0" }}
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
        </div>
        
        <div style={{ display: "flex", gap: "1rem" }}>
          {["All", "3D", "VFX", "Motion"].map((f, i) => (
            <button 
              key={f} 
              onClick={() => setFilter(f)}
              className="btn" 
              style={{ 
                padding: "0.5rem 1.5rem", 
                border: filter === f ? "1px solid var(--color-accent-blue)" : "1px solid var(--color-border)",
                color: filter === f ? "var(--color-accent-blue)" : "var(--color-text-muted)",
                fontSize: "0.75rem",
                borderRadius: "20px",
                backgroundColor: filter === f ? "rgba(0, 210, 255, 0.05)" : "transparent",
                transition: "all 0.3s ease"
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="work-grid">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={`skeleton-${i}`} className={`project-card-wrapper ${i === 0 || i === 3 ? "project-grid-span-8" : "project-grid-span-4"}`} style={{ height: "400px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)", animation: "shimmer 1.5s infinite" }} />
              <style>{`@keyframes shimmer { 100% { left: 200%; } }`}</style>
            </div>
          ))
        ) : (
          filteredProjects.map((project, i) => {
          let sizeClass = "project-grid-span-6";
          if (project.size === "large") sizeClass = "project-grid-span-8";
          if (project.size === "tall") sizeClass = "project-grid-span-4-row-2";
          if (project.size === "small") sizeClass = "project-grid-span-4";

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`project-card-wrapper ${sizeClass}`}
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "12px",
                backgroundColor: project.bg,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "2.5rem",
                border: "1px solid var(--color-border)"
              }}
            >
              {/* Media rendering layer */}
              {project.mediaSrc && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  transform: hoveredId === project.id ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
                }}>
                  {project.mediaType === "video" ? (
                    <video 
                      src={project.mediaSrc} 
                      autoPlay={hoveredId === project.id} 
                      muted 
                      loop 
                      playsInline
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Image 
                      src={project.mediaSrc?.includes("cloudinary.com") ? project.mediaSrc.replace("/upload/", "/upload/f_auto,q_auto,w_1200/") : project.mediaSrc} 
                      alt={project.title} 
                      fill 
                      unoptimized={true}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
              )}

              {/* Placeholder pattern (visible if no mediaSrc) */}
              {!project.mediaSrc && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h40v40H0z\" fill=\"%23ffffff\" fill-opacity=\"0.02\"/%3E%3Cpath d=\"M20 20l20 20H0z\" fill=\"%23000\" fill-opacity=\"0.1\"/%3E%3C/svg%3E')",
                  zIndex: 0,
                  transform: hoveredId === project.id ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
                }} />
              )}

              {/* Gradient Overlay for Text Readability */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 60%)`,
                zIndex: 1,
                opacity: hoveredId === project.id ? 0.8 : 0.6,
                transition: "opacity 0.4s ease"
              }} />

              <div style={{ position: "relative", zIndex: 2 }}>
                <motion.p
                  animate={{ y: hoveredId === project.id ? 0 : 10, opacity: hoveredId === project.id ? 1 : 0.7 }}
                  transition={{ duration: 0.3 }}
                  style={{ color: "var(--color-accent-blue)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "0.5rem" }}
                >
                  {project.category}
                </motion.p>
                <motion.h3
                  animate={{ y: hoveredId === project.id ? 0 : 10 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  style={{ fontSize: "1.8rem", margin: 0 }}
                >
                  {project.title}
                </motion.h3>
              </div>
            </motion.div>
          );
        }))}
      </div>
    </section>
  );
}

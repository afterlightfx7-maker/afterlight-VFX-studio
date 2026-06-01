"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Images } from "lucide-react";

import { getStoredProjects } from "@/components/utils/adminData";
import { Project } from "@/data/projects";
import ProjectGalleryLightbox from "@/components/ui/ProjectGalleryLightbox";

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    getStoredProjects().then(data => {
      setProjects(data);
      setIsLoading(false);
    });
  }, []);

  const filteredProjects = projects;

  const hasGallery = (project: Project) => {
    const galleryCount = project.galleryImages?.length ?? 0;
    const hasMain = !!(project.mediaSrc && project.mediaType === "image");
    return hasMain || galleryCount > 0;
  };

  return (
    <>
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

            const galleryAvailable = hasGallery(project);
            const isHovered = hoveredId === project.id;

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
                onClick={() => galleryAvailable && setActiveProject(project)}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: "12px",
                  backgroundColor: project.bg,
                  cursor: galleryAvailable ? "pointer" : "default",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "2.5rem",
                  border: `1px solid ${isHovered && galleryAvailable ? "rgba(0,210,255,0.35)" : "var(--color-border)"}`,
                  transition: "border-color 0.4s ease, box-shadow 0.4s ease",
                  boxShadow: isHovered && galleryAvailable ? "0 0 30px rgba(0,210,255,0.08)" : "none"
                }}
              >
                {/* Media rendering layer */}
                {project.mediaSrc && (
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
                  }}>
                    {project.mediaType === "video" ? (
                      <video 
                        src={project.mediaSrc} 
                        autoPlay={isHovered} 
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
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                    transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)"
                  }} />
                )}

                {/* Gradient Overlay for Text Readability */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 60%)`,
                  zIndex: 1,
                  opacity: isHovered ? 0.8 : 0.6,
                  transition: "opacity 0.4s ease"
                }} />

                {/* Gallery count badge (top right) */}
                {galleryAvailable && (
                  <motion.div
                    animate={{ opacity: isHovered ? 1 : 0.7, y: isHovered ? 0 : 4 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute",
                      top: "1.25rem",
                      right: "1.25rem",
                      zIndex: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      background: "rgba(0,0,0,0.55)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(0,210,255,0.25)",
                      borderRadius: "20px",
                      padding: "0.3rem 0.75rem",
                      fontSize: "0.72rem",
                      color: "rgba(0,210,255,0.9)",
                      fontWeight: 600,
                      letterSpacing: "0.05em"
                    }}
                  >
                    <Images size={12} />
                    {(project.galleryImages?.length ?? 0) + (project.mediaSrc && project.mediaType === "image" ? 1 : 0)} Photos
                  </motion.div>
                )}

                <div style={{ position: "relative", zIndex: 2 }}>
                  <motion.p
                    animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.7 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: "var(--color-accent-blue)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600, marginBottom: "0.5rem" }}
                  >
                    {project.category}
                  </motion.p>
                  <motion.h3
                    animate={{ y: isHovered ? 0 : 10 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                    style={{ fontSize: "1.8rem", margin: "0 0 0.5rem" }}
                  >
                    {project.title}
                  </motion.h3>

                  {/* "View Gallery" CTA shown on hover */}
                  {galleryAvailable && (
                    <motion.div
                      animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        fontSize: "0.8rem",
                        color: "rgba(0,210,255,0.85)",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase"
                      }}
                    >
                      <Images size={13} />
                      View Gallery
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          }))}
        </div>
      </section>

      {/* Lightbox */}
      <ProjectGalleryLightbox
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </>
  );
}

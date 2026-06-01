"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FolderOpen, 
  Plus, 
  Edit3, 
  Trash2, 
  Video,
  Image as ImageIcon,
  Search,
  Grid
} from "lucide-react";
import { getStoredProjects, deleteProject } from "@/components/utils/adminData";
import { Project } from "@/data/projects";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const load = () => {
      getStoredProjects().then(data => setProjects(data));
    };
    load();
    setMounted(true);
    // Re-fetch when user returns to this tab (e.g. after saving a project)
    window.addEventListener("focus", load);
    return () => window.removeEventListener("focus", load);
  }, []);


  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      const updated = await deleteProject(id);
      setProjects(updated);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <div>
      <header style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Projects Portfolio</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>Manage your cinematic featured works (3D, VFX, Motion).</p>
        </div>
        <Link href="/admin/projects/new" style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "0.5rem", 
          padding: "0.85rem 1.5rem", 
          backgroundColor: "var(--color-accent-blue)", 
          color: "black", 
          borderRadius: "8px", 
          textDecoration: "none",
          fontSize: "0.9rem",
          fontWeight: 700,
          boxShadow: "0 10px 20px rgba(0, 210, 255, 0.15)"
        }}>
          <Plus size={18} />
          New Project
        </Link>
      </header>

      {/* Toolbar */}
      <div style={{ 
        display: "flex", 
        gap: "1rem", 
        marginBottom: "2rem",
        padding: "1.25rem",
        backgroundColor: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "12px"
      }}>
        <div style={{ position: "relative", flexGrow: 1 }}>
          <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "0.75rem 1rem 0.75rem 3rem",
              color: "white",
              fontSize: "0.9rem",
              outline: "none"
            }}
          />
        </div>
      </div>

      {/* Projects Grid View */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
        gap: "1.5rem" 
      }}>
        {filteredProjects.length > 0 ? filteredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            style={{
              position: "relative",
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "16px",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}
          >
            <div style={{ 
              width: "100%", 
              aspectRatio: "16/9", 
              borderRadius: "8px", 
              backgroundColor: project.bg || "#111", 
              overflow: "hidden",
              position: "relative"
            }}>
              {project.mediaSrc ? (
                (project.mediaType === 'video' || project.mediaSrc.includes('/video/') || project.mediaSrc.match(/\.(mp4|webm|ogg|mov|m4v)($|\?)/i) || project.mediaSrc.startsWith('data:video/')) ? (
                  <video src={project.mediaSrc} muted loop autoPlay playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <img src={project.mediaSrc} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                )
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.1 }}>
                  <FolderOpen size={32} />
                </div>
              )}
              <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", padding: "0.4rem 0.8rem", backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", borderRadius: "20px", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.05em", color: "var(--color-accent-blue)" }}>
                {project.category}
              </div>
            </div>

            <div style={{ flexGrow: 1 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.25rem" }}>{project.title}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
                <Grid size={12} />
                Size: {project.size}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "1rem" }}>
              <Link 
                href={`/admin/projects/edit/${project.id}`}
                style={{ 
                  flexGrow: 1,
                  padding: "0.75rem", 
                  borderRadius: "8px", 
                  backgroundColor: "rgba(255,255,255,0.05)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  gap: "0.5rem",
                  color: "white",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600
                }}
              >
                <Edit3 size={16} /> Edit
              </Link>
              <button 
                onClick={() => handleDelete(project.id)}
                style={{ 
                  width: "42px", 
                  height: "42px", 
                  borderRadius: "8px", 
                  backgroundColor: "rgba(255, 50, 50, 0.05)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  color: "#ff4d4d",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        )) : (
          <div style={{ gridColumn: "1 / -1", padding: "5rem", textAlign: "center", backgroundColor: "rgba(255,255,255,0.01)", border: "2px dashed rgba(255,255,255,0.05)", borderRadius: "12px", color: "rgba(255,255,255,0.3)" }}>
            <FolderOpen size={48} style={{ opacity: 0.1, marginBottom: "1.5rem" }} />
            <div style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: "0.5rem" }}>No projects found</div>
            <p style={{ fontSize: "0.9rem" }}>Start adding your featured works to the portfolio.</p>
          </div>
        )}
      </div>
    </div>
  );
}

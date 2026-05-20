"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Image as ImageIcon, Video, Type, Layers, Box } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: Project) => Promise<any> | void;
  title: string;
}

export default function ProjectForm({ initialData, onSubmit, title }: ProjectFormProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Project>(initialData || {
    id: `proj${Date.now()}`,
    title: "",
    category: "3D",
    mediaSrc: "",
    mediaType: "image",
    size: "small",
    bg: "#111111"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      await onSubmit(formData);
      router.refresh();
      router.push("/admin/projects");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <header style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>{title}</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>Configure your cinematic project asset.</p>
        </div>
        <button 
          onClick={() => router.back()}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0.5rem", 
            padding: "0.75rem 1.25rem", 
            backgroundColor: "rgba(255,255,255,0.05)", 
            color: "rgba(255,255,255,0.6)", 
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px", 
            cursor: "pointer",
            fontSize: "0.85rem"
          }}
        >
          <X size={16} />
          Cancel
        </button>
      </header>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <section style={{ 
          backgroundColor: "rgba(255,255,255,0.01)", 
          border: "1px solid rgba(255,255,255,0.05)", 
          borderRadius: "16px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          <h3 style={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Project Details</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Project Title</label>
              <div style={{ position: "relative" }}>
                <Type size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. Luxury Villa VFX"
                  style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.85rem 1rem 0.85rem 2.75rem", color: "white", outline: "none" }}
                />
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Category</label>
              <div style={{ position: "relative" }}>
                <Layers size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                <select 
                  name="category" 
                  value={formData.category} 
                  onChange={handleChange}
                  style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.85rem 1rem 0.85rem 2.75rem", color: "white", outline: "none", appearance: "none" }}
                >
                  <option value="3D">3D Visualization</option>
                  <option value="VFX">Visual Effects (VFX)</option>
                  <option value="Motion">Motion Design</option>
                </select>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Grid Size</label>
              <div style={{ position: "relative" }}>
                <Box size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                <select 
                  name="size" 
                  value={formData.size} 
                  onChange={handleChange}
                  style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.85rem 1rem 0.85rem 2.75rem", color: "white", outline: "none", appearance: "none" }}
                >
                  <option value="small">Small (Standard)</option>
                  <option value="large">Large (Wide)</option>
                  <option value="tall">Tall (Portrait)</option>
                </select>
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Background Color (Hex)</label>
              <input 
                type="color" 
                name="bg" 
                value={formData.bg} 
                onChange={handleChange}
                style={{ width: "100%", height: "42px", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "4px", color: "white", cursor: "pointer" }}
              />
            </div>
          </div>
        </section>

        <section style={{ 
          backgroundColor: "rgba(255,255,255,0.01)", 
          border: "1px solid rgba(255,255,255,0.05)", 
          borderRadius: "16px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          <h3 style={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Project Media</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <button 
                  type="button" 
                  onClick={() => setFormData(prev => ({ ...prev, mediaType: "image" }))}
                  style={{ flexGrow: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid", borderColor: formData.mediaType === 'image' ? 'var(--color-accent-blue)' : 'rgba(255,255,255,0.1)', background: formData.mediaType === 'image' ? 'rgba(0, 210, 255, 0.05)' : 'transparent', color: formData.mediaType === 'image' ? 'white' : 'rgba(255,255,255,0.4)', cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                  <ImageIcon size={16} /> Image
                </button>
                <button 
                  type="button" 
                  onClick={() => setFormData(prev => ({ ...prev, mediaType: "video" }))}
                  style={{ flexGrow: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid", borderColor: formData.mediaType === 'video' ? 'var(--color-accent-blue)' : 'rgba(255,255,255,0.1)', background: formData.mediaType === 'video' ? 'rgba(0, 210, 255, 0.05)' : 'transparent', color: formData.mediaType === 'video' ? 'white' : 'rgba(255,255,255,0.4)', cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
                >
                  <Video size={16} /> Video
                </button>
              </div>

              <button
                type="button"
                onClick={() => document.getElementById('project-file-upload')?.click()}
                style={{
                  width: "100%",
                  padding: "1rem",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem"
                }}
              >
                {formData.mediaType === 'video' ? <Video size={18} /> : <ImageIcon size={18} />}
                Upload from Computer
              </button>
                  <input 
                    id="project-file-upload"
                    type="file" 
                    accept={formData.mediaType === 'image' ? "image/*" : "video/*"}
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setIsUploading(true);
                        const uploadData = new FormData();
                        uploadData.append("file", file);
                        try {
                          const res = await fetch("/api/upload", {
                            method: "POST",
                            body: uploadData
                          });
                          const data = await res.json();
                          if (data.url) {
                            setFormData(prev => ({ ...prev, mediaSrc: data.url }));
                          }
                        } catch (err) {
                          console.error("Upload error:", err);
                        } finally {
                          setIsUploading(false);
                        }
                      }
                    }}
                    style={{ display: "none" }}
                  />
                  {isUploading && (
                    <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--color-accent-blue)", textAlign: "center" }}>
                      Uploading cinematic asset to Cloud Storage...
                    </p>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Live Preview</label>
              <div style={{ 
                width: "100%", 
                aspectRatio: "16/9", 
                backgroundColor: "rgba(255,255,255,0.02)", 
                border: "1px solid rgba(255,255,255,0.05)", 
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: formData.bg
              }}>
                {formData.mediaSrc ? (
                  formData.mediaType === 'video' ? (
                    <video src={formData.mediaSrc} autoPlay muted loop style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <img src={formData.mediaSrc} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )
                ) : (
                  <div style={{ textAlign: "center", opacity: 0.1 }}>
                    {formData.mediaType === 'video' ? <Video size={32} /> : <ImageIcon size={32} />}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button
            type="submit"
            disabled={isUploading}
            style={{
              flexGrow: 1,
              padding: "1.1rem",
              backgroundColor: isUploading ? "rgba(255,255,255,0.1)" : "var(--color-accent-blue)",
              border: "none",
              borderRadius: "12px",
              color: isUploading ? "rgba(255,255,255,0.3)" : "black",
              fontWeight: 700,
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              cursor: isUploading ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: isUploading ? "none" : "0 10px 20px rgba(0, 210, 255, 0.2)"
            }}
          >
            <Save size={20} />
            {isUploading ? "Uploading Assets..." : "Publish Project"}
          </button>
        </div>
      </form>
    </div>
  );
}

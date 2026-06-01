"use client";

import { motion, Reorder } from "framer-motion";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Save, X, Image as ImageIcon, Video, Type, Layers, Box,
  Star, Trash2, GripVertical, Plus, Upload
} from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: Project) => Promise<any> | void;
  title: string;
}

// ── Small helper: upload one file to Cloudinary (or fall back to data URI)
async function uploadFile(file: File): Promise<string> {
  const sigRes = await fetch("/api/upload");
  const sigData = await sigRes.json();

  if (sigData.fallback) {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("api_key", sigData.apiKey);
  uploadData.append("timestamp", sigData.timestamp);
  uploadData.append("signature", sigData.signature);
  uploadData.append("folder", "afterlight_studio");

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${sigData.cloudName}/auto/upload`,
    { method: "POST", body: uploadData }
  );
  const result = await uploadRes.json();
  if (!result.secure_url) throw new Error(result.error?.message || "Upload failed");
  return result.secure_url;
}

export default function ProjectForm({ initialData, onSubmit, title }: ProjectFormProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const [formData, setFormData] = useState<Project>(initialData || {
    id: `proj${Date.now()}`,
    title: "",
    category: "3D",
    mediaSrc: "",
    mediaType: "image",
    size: "small",
    bg: "#111111",
    galleryImages: []
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
      await new Promise(resolve => setTimeout(resolve, 500));
      router.push("/admin/projects");
    } finally {
      setIsUploading(false);
    }
  };

  // ── Main thumbnail upload (single)
  const handleMainUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      const isVideo = file.type.startsWith("video/");
      setFormData(prev => ({ 
        ...prev, 
        mediaSrc: url,
        mediaType: isVideo ? "video" : "image"
      }));
    } catch (err: any) {
      alert(`Upload failed: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // ── Gallery images upload (multiple)
  const handleGalleryUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploadingGallery(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadFile(file);
        uploadedUrls.push(url);
      }
      setFormData(prev => ({
        ...prev,
        galleryImages: [...(prev.galleryImages ?? []), ...uploadedUrls]
      }));
    } catch (err: any) {
      alert(`Gallery upload failed: ${err.message}`);
    } finally {
      setUploadingGallery(false);
    }
  };

  // ── Set as main thumbnail
  const setAsMainThumbnail = useCallback((url: string) => {
    setFormData(prev => ({
      ...prev,
      mediaSrc: url,
      mediaType: "image",
      galleryImages: (prev.galleryImages ?? []).filter(g => g !== url)
    }));
  }, []);

  // ── Remove gallery image
  const removeGalleryImage = useCallback((url: string) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: (prev.galleryImages ?? []).filter(g => g !== url)
    }));
  }, []);

  const galleryImages = formData.galleryImages ?? [];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px",
    padding: "0.85rem 1rem 0.85rem 2.75rem",
    color: "white",
    outline: "none",
    fontSize: "0.9rem"
  };

  const sectionStyle: React.CSSProperties = {
    backgroundColor: "rgba(255,255,255,0.01)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: "16px",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: "0.8rem",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    marginBottom: "0.5rem",
    fontWeight: 600
  };

  return (
    <div style={{ maxWidth: "860px" }}>
      {/* ── Header */}
      <header style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>{title}</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>Configure your cinematic project asset.</p>
        </div>
        <button
          onClick={() => router.back()}
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.75rem 1.25rem",
            backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px",
            cursor: "pointer", fontSize: "0.85rem"
          }}
        >
          <X size={16} /> Cancel
        </button>
      </header>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

        {/* ── Project Details */}
        <section style={sectionStyle}>
          <h3 style={sectionTitle}>Project Details</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Project Title</label>
              <div style={{ position: "relative" }}>
                <Type size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Luxury Villa VFX" style={inputStyle} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Category</label>
              <div style={{ position: "relative" }}>
                <Layers size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                <select name="category" value={formData.category} onChange={handleChange} style={{ ...inputStyle, appearance: "none" }}>
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
                <select name="size" value={formData.size} onChange={handleChange} style={{ ...inputStyle, appearance: "none" }}>
                  <option value="small">Small (Standard)</option>
                  <option value="large">Large (Wide)</option>
                  <option value="tall">Tall (Portrait)</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Background Color</label>
              <input type="color" name="bg" value={formData.bg} onChange={handleChange}
                style={{ width: "100%", height: "42px", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "4px", cursor: "pointer" }} />
            </div>
          </div>
        </section>

        {/* ── Main Thumbnail */}
        <section style={sectionStyle}>
          <h3 style={sectionTitle}>Main Thumbnail / Cover Image</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Media type toggle */}
              <div style={{ display: "flex", gap: "0.75rem" }}>
                {(["image", "video"] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, mediaType: type }))}
                    style={{
                      flex: 1, padding: "0.7rem", borderRadius: "8px",
                      border: `1px solid ${formData.mediaType === type ? "var(--color-accent-blue)" : "rgba(255,255,255,0.1)"}`,
                      background: formData.mediaType === type ? "rgba(0,210,255,0.08)" : "transparent",
                      color: formData.mediaType === type ? "white" : "rgba(255,255,255,0.4)",
                      cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                      fontSize: "0.85rem", fontWeight: 600, transition: "all 0.25s ease"
                    }}
                  >
                    {type === "image" ? <ImageIcon size={15} /> : <Video size={15} />}
                    {type === "image" ? "Image" : "Video"}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => document.getElementById("main-file-upload")?.click()}
                style={{
                  width: "100%", padding: "1rem",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px",
                  color: "white", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
                  transition: "background 0.25s ease"
                }}
              >
                <Upload size={17} />
                Upload Cover Image / Video
              </button>
              <input id="main-file-upload" type="file" accept="image/*,video/*"
                onChange={handleMainUpload} style={{ display: "none" }} />

              {isUploading && (
                <p style={{ fontSize: "0.8rem", color: "var(--color-accent-blue)", textAlign: "center" }}>Uploading to Cloud Storage...</p>
              )}
            </div>

            {/* Preview */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Preview</label>
              <div style={{
                width: "100%", aspectRatio: "16/9",
                backgroundColor: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px",
                overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
                background: formData.bg
              }}>
                {formData.mediaSrc ? (
                  formData.mediaType === "video"
                    ? <video src={formData.mediaSrc} autoPlay muted loop style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <img src={formData.mediaSrc} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ textAlign: "center", opacity: 0.15 }}>
                    {formData.mediaType === "video" ? <Video size={32} /> : <ImageIcon size={32} />}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Gallery Images */}
        <section style={sectionStyle}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ ...sectionTitle, marginBottom: 0 }}>Gallery Images</h3>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
              {galleryImages.length} image{galleryImages.length !== 1 ? "s" : ""} in gallery
            </span>
          </div>

          {/* Drop zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => {
              e.preventDefault();
              setDragOver(false);
              handleGalleryUpload(e.dataTransfer.files);
            }}
            onClick={() => document.getElementById("gallery-file-upload")?.click()}
            style={{
              border: `2px dashed ${dragOver ? "rgba(0,210,255,0.7)" : "rgba(255,255,255,0.1)"}`,
              borderRadius: "14px",
              padding: "2.5rem",
              textAlign: "center",
              cursor: "pointer",
              background: dragOver ? "rgba(0,210,255,0.05)" : "transparent",
              transition: "all 0.25s ease",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem"
            }}
          >
            <div style={{
              width: "48px", height: "48px", borderRadius: "50%",
              background: "rgba(0,210,255,0.08)", border: "1px solid rgba(0,210,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(0,210,255,0.7)"
            }}>
              <Plus size={22} />
            </div>
            <div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600, marginBottom: "0.25rem" }}>
                {uploadingGallery ? "Uploading images..." : "Drag & Drop or Click to Add Images"}
              </p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>PNG, JPG, WEBP — Multiple files supported</p>
            </div>
          </div>
          <input id="gallery-file-upload" type="file" accept="image/*" multiple
            onChange={e => handleGalleryUpload(e.target.files)} style={{ display: "none" }} />

          {/* Gallery grid */}
          {galleryImages.length > 0 && (
            <div>
              <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginBottom: "1rem", letterSpacing: "0.05em" }}>
                DRAG TO REORDER · STAR TO SET AS MAIN THUMBNAIL
              </p>
              <Reorder.Group
                axis="x"
                values={galleryImages}
                onReorder={newOrder => setFormData(prev => ({ ...prev, galleryImages: newOrder }))}
                style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", listStyle: "none", padding: 0, margin: 0 }}
              >
                {galleryImages.map((url) => (
                  <Reorder.Item
                    key={url}
                    value={url}
                    style={{ cursor: "grab" }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      style={{
                        position: "relative",
                        width: "130px",
                        height: "90px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        border: "1px solid rgba(255,255,255,0.1)",
                        background: "#111",
                        flexShrink: 0
                      }}
                    >
                      <img src={url} alt="Gallery image" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />

                      {/* Actions overlay */}
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "rgba(0,0,0,0.55)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        gap: "0.4rem",
                        opacity: 0,
                        transition: "opacity 0.2s ease"
                      }}
                        className="gallery-img-overlay"
                        onMouseOver={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                        onMouseOut={e => { (e.currentTarget as HTMLElement).style.opacity = "0"; }}
                      >
                        <button
                          type="button"
                          title="Set as main thumbnail"
                          onClick={() => setAsMainThumbnail(url)}
                          style={{
                            background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.4)",
                            borderRadius: "6px", padding: "0.4rem", color: "gold", cursor: "pointer"
                          }}
                        >
                          <Star size={14} />
                        </button>
                        <button
                          type="button"
                          title="Remove image"
                          onClick={() => removeGalleryImage(url)}
                          style={{
                            background: "rgba(255,60,60,0.15)", border: "1px solid rgba(255,60,60,0.4)",
                            borderRadius: "6px", padding: "0.4rem", color: "#ff6b6b", cursor: "pointer"
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                        <div title="Drag to reorder" style={{ color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center" }}>
                          <GripVertical size={14} />
                        </div>
                      </div>
                    </motion.div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>
          )}
        </section>

        {/* ── Submit */}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button
            type="submit"
            disabled={isUploading || uploadingGallery}
            style={{
              flexGrow: 1, padding: "1.1rem",
              backgroundColor: isUploading || uploadingGallery ? "rgba(255,255,255,0.1)" : "var(--color-accent-blue)",
              border: "none", borderRadius: "12px",
              color: isUploading || uploadingGallery ? "rgba(255,255,255,0.3)" : "black",
              fontWeight: 700, fontSize: "1rem",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
              cursor: isUploading || uploadingGallery ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: isUploading || uploadingGallery ? "none" : "0 10px 20px rgba(0, 210, 255, 0.2)"
            }}
          >
            <Save size={20} />
            {isUploading ? "Uploading Cover..." : uploadingGallery ? "Uploading Gallery..." : "Publish Project"}
          </button>
        </div>
      </form>
    </div>
  );
}

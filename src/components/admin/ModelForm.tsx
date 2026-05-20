"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Box, Cpu, Zap, Type, Palette } from "lucide-react";
import { ModelAsset } from "@/data/models";

interface ModelFormProps {
  initialData?: ModelAsset;
  onSubmit: (data: ModelAsset) => Promise<any> | void;
  title: string;
}

export default function ModelForm({ initialData, onSubmit, title }: ModelFormProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<ModelAsset>(initialData || {
    id: `m${Date.now()}`,
    name: "",
    polys: "",
    textures: "",
    time: "",
    modelUrl: "",
    color: "var(--color-accent-blue)"
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
      router.push("/admin/models");
    } finally {
      setIsUploading(false);
    }
  };


  return (
    <div style={{ maxWidth: "800px" }}>
      <header style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>{title}</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>Update technical specs for your 3D interactive assets.</p>
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
        {/* Technical HUD Details */}
        <section style={{ 
          backgroundColor: "rgba(255,255,255,0.01)", 
          border: "1px solid rgba(255,255,255,0.05)", 
          borderRadius: "16px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          <h3 style={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Technical HUD Data</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Asset Name</label>
              <div style={{ position: "relative" }}>
                <Type size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. CYBERPUNK ENGINE"
                  style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.85rem 1rem 0.85rem 2.75rem", color: "white", outline: "none" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Polygon Count</label>
              <div style={{ position: "relative" }}>
                <Box size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                <input 
                  type="text" 
                  name="polys" 
                  value={formData.polys} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. 1.2M"
                  style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.85rem 1rem 0.85rem 2.75rem", color: "white", outline: "none" }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Texture Res</label>
              <div style={{ position: "relative" }}>
                <Cpu size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                <input 
                  type="text" 
                  name="textures" 
                  value={formData.textures} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. 4K PBR"
                  style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.85rem 1rem 0.85rem 2.75rem", color: "white", outline: "none" }}
                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Render Time</label>
              <div style={{ position: "relative" }}>
                <Zap size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                <input 
                  type="text" 
                  name="time" 
                  value={formData.time} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. 12h"
                  style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.85rem 1rem 0.85rem 2.75rem", color: "white", outline: "none" }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Accent Glow Color</label>
            <div style={{ position: "relative" }}>
              <Palette size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
              <select 
                name="color" 
                value={formData.color} 
                onChange={handleChange}
                style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.85rem 1rem 0.85rem 2.75rem", color: "white", outline: "none", appearance: "none" }}
              >
                <option value="var(--color-accent-blue)">Accent Blue</option>
                <option value="var(--color-accent-violet)">Accent Violet</option>
                <option value="var(--color-accent-gold)">Accent Gold</option>
              </select>
            </div>
          </div>
        </section>

        {/* 3D File Upload */}
        <section style={{ 
          backgroundColor: "rgba(255,255,255,0.01)", 
          border: "1px solid rgba(255,255,255,0.05)", 
          borderRadius: "16px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          <h3 style={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>3D Asset File</h3>
          
          <div style={{ padding: "3rem", border: "2px dashed rgba(255,255,255,0.05)", borderRadius: "12px", textAlign: "center" }}>
            <Box size={48} style={{ opacity: 0.1, marginBottom: "1.5rem" }} />
            <button
              type="button"
              onClick={() => document.getElementById('model-upload')?.click()}
              style={{
                padding: "0.85rem 2rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "white",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Upload .GLB File
            </button>
            <input 
              id="model-upload"
              type="file" 
              accept=".glb,.gltf"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setIsUploading(true);
                  try {
                    const sigRes = await fetch("/api/upload");
                    const sigData = await sigRes.json();

                    if (sigData.fallback) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFormData(prev => ({ ...prev, modelUrl: reader.result as string }));
                        setIsUploading(false);
                      };
                      reader.readAsDataURL(file);
                      return;
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
                    const uploadResult = await uploadRes.json();

                    if (uploadResult.secure_url) {
                      setFormData(prev => ({ ...prev, modelUrl: uploadResult.secure_url }));
                    } else {
                      alert(`Cloudinary Upload failed: ${uploadResult.error?.message || "Unknown error"}`);
                    }
                  } catch (err) {
                    console.error("Upload error:", err);
                    alert("Upload failed completely. Check your connection.");
                  } finally {
                    setIsUploading(false);
                  }
                }
              }}
              style={{ display: "none" }}
            />
            {formData.modelUrl && (
              <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--color-accent-blue)", wordBreak: "break-all" }}>
                Active URL: {formData.modelUrl}
              </p>
            )}
            {isUploading && (
              <p style={{ marginTop: "1rem", fontSize: "0.8rem", color: "var(--color-accent-gold)" }}>
                Uploading 3D Model to Cloud Storage...
              </p>
            )}
          </div>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.2)", textAlign: "center" }}>
            ⚠️ 3D models require secure Cloud Storage hosting for real-time WebGL rendering.
          </p>
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
            {isUploading ? "Uploading Model..." : "Save 3D Asset"}
          </button>
        </div>
      </form>
    </div>
  );
}

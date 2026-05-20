"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Image as ImageIcon, Link as LinkIcon, FileText, Type } from "lucide-react";
import { Product } from "@/data/products";

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (data: Product) => Promise<any> | void;
  title: string;
}

export default function ProductForm({ initialData, onSubmit, title }: ProductFormProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Product>(initialData || {
    id: `p${Date.now()}`,
    title: "",
    description: "",
    link: "",
    image: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      await onSubmit(formData);
      router.refresh();
      router.push("/admin/products");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <header style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>{title}</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>Fill in the details for your premium digital asset.</p>
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
        {/* Basic Info Group */}
        <section style={{ 
          backgroundColor: "rgba(255,255,255,0.01)", 
          border: "1px solid rgba(255,255,255,0.05)", 
          borderRadius: "16px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          <h3 style={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>General Information</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Product Title</label>
              <div style={{ position: "relative" }}>
                <Type size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. Urban Shipping Yard"
                  style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.85rem 1rem 0.85rem 2.75rem", color: "white", outline: "none" }}
                />
              </div>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>External Link (CGTrader/Store)</label>
              <div style={{ position: "relative" }}>
                <LinkIcon size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                <input 
                  type="url" 
                  name="link" 
                  value={formData.link} 
                  onChange={handleChange} 
                  required 
                  placeholder="https://www.cgtrader.com/..."
                  style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.85rem 1rem 0.85rem 2.75rem", color: "white", outline: "none" }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Description</label>
            <div style={{ position: "relative" }}>
              <FileText size={16} style={{ position: "absolute", left: "1rem", top: "1.1rem", color: "rgba(255,255,255,0.2)" }} />
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                required 
                placeholder="Describe the cinematic quality and features..."
                rows={4}
                style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "1rem 1rem 1rem 2.75rem", color: "white", outline: "none", resize: "none", lineHeight: 1.6 }}
              />
            </div>
          </div>
        </section>

        {/* Media Group */}
        <section style={{ 
          backgroundColor: "rgba(255,255,255,0.01)", 
          border: "1px solid rgba(255,255,255,0.05)", 
          borderRadius: "16px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem"
        }}>
          <h3 style={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Media & Thumbnail</h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Thumbnail Image</label>
                
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={{ position: "relative", flexGrow: 1 }}>
                    <ImageIcon size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
                    <input 
                      type="text" 
                      name="image" 
                      value={formData.image} 
                      onChange={handleChange} 
                      placeholder="Image URL or upload below..."
                      style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.85rem 1rem 0.85rem 2.75rem", color: "white", outline: "none" }}
                    />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    style={{
                      padding: "0 1.5rem",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "8px",
                      color: "white",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      whiteSpace: "nowrap"
                    }}
                  >
                    Choose File
                  </button>
                  <input 
                    id="file-upload"
                    type="file" 
                    accept="image/*,video/*"
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
                            setFormData(prev => ({ ...prev, image: data.url }));
                          } else {
                            alert(`Upload failed: ${data.error || "File might exceed Vercel's 4.5MB limit."}`);
                          }
                        } catch (err) {
                          console.error("Upload error:", err);
                          alert("Upload failed completely. The file is likely larger than the Vercel 4.5MB limit.");
                        } finally {
                          setIsUploading(false);
                        }
                      }
                    }}
                    style={{ display: "none" }}
                  />
                </div>
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)" }}>
                  {isUploading ? "Uploading file to Cloud Storage..." : "Click 'Choose File' to upload directly from your computer (Images or Videos)."}
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>Preview</label>
              <div style={{ 
                width: "100%", 
                aspectRatio: "16/9", 
                backgroundColor: "rgba(255,255,255,0.02)", 
                border: "1px solid rgba(255,255,255,0.05)", 
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {formData.image ? (
                  formData.image.startsWith('data:video') || formData.image.includes('.mp4') ? (
                    <video src={formData.image} autoPlay muted loop style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <img src={formData.image} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )
                ) : (
                  <ImageIcon size={32} style={{ opacity: 0.1 }} />
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
            {isUploading ? "Uploading Assets..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

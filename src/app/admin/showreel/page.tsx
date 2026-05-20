"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Film, Save, Upload, Link as LinkIcon } from "lucide-react";

export default function AdminShowreel() {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("AFTERLIGHTFX REEL 2026");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load current showreel from database
    fetch("/api/showreel")
      .then(res => res.json())
      .then(data => {
        if (data.videoUrl) setVideoUrl(data.videoUrl);
        if (data.title) setTitle(data.title);
      })
      .catch(() => {});
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const sigRes = await fetch("/api/upload");
      const sigData = await sigRes.json();

      if (sigData.fallback) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setVideoUrl(reader.result as string);
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
        setVideoUrl(uploadResult.secure_url);
      } else {
        alert(`Upload failed: ${uploadResult.error?.message || "Unknown error"}`);
      }
    } catch (err) {
      alert("Upload failed. Check your connection.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/showreel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoUrl, title }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        alert("Failed to save. Please try again.");
      }
    } catch {
      alert("Failed to save. Check your connection.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!mounted) return null;

  return (
    <div style={{ maxWidth: "800px" }}>
      <header style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
          <Film size={28} color="var(--color-accent-blue)" />
          <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Showreel Manager</h1>
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>
          Upload or paste a video URL for the showreel displayed on the homepage.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

        {/* Title Field */}
        <section style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <h3 style={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Reel Title</h3>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. AFTERLIGHTFX REEL 2026"
            style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.85rem 1rem", color: "white", outline: "none", fontSize: "1rem" }}
          />
        </section>

        {/* Upload Section */}
        <section style={{ backgroundColor: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "16px", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Showreel Video</h3>

          {/* Upload from Computer */}
          <div>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>Option 1 — Upload directly from your computer:</p>
            <button
              type="button"
              onClick={() => document.getElementById("showreel-upload")?.click()}
              disabled={isUploading}
              style={{ padding: "0.85rem 2rem", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: isUploading ? "rgba(255,255,255,0.3)" : "white", fontSize: "0.9rem", fontWeight: 600, cursor: isUploading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <Upload size={18} />
              {isUploading ? "Uploading to Cloudinary..." : "Upload Video File"}
            </button>
            <input id="showreel-upload" type="file" accept="video/*" onChange={handleFileUpload} style={{ display: "none" }} />
          </div>

          {/* Paste URL */}
          <div>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>Option 2 — Paste a Cloudinary or direct video URL:</p>
            <div style={{ position: "relative" }}>
              <LinkIcon size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
              <input
                type="text"
                value={videoUrl}
                onChange={e => setVideoUrl(e.target.value)}
                placeholder="https://res.cloudinary.com/your-cloud/video/upload/..."
                style={{ width: "100%", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.85rem 1rem 0.85rem 2.75rem", color: "white", outline: "none", fontSize: "0.9rem" }}
              />
            </div>
          </div>

          {/* Live Preview */}
          {videoUrl && (
            <div>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>Live Preview:</p>
              <video
                src={videoUrl}
                controls
                muted
                style={{ width: "100%", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", maxHeight: "300px", objectFit: "cover" }}
              />
            </div>
          )}
        </section>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving || isUploading}
          style={{
            padding: "1.1rem",
            backgroundColor: saved ? "rgba(0,210,100,0.2)" : isSaving ? "rgba(255,255,255,0.1)" : "var(--color-accent-blue)",
            border: saved ? "1px solid rgba(0,210,100,0.5)" : "none",
            borderRadius: "12px",
            color: isSaving ? "rgba(255,255,255,0.3)" : saved ? "rgba(0,255,150,1)" : "black",
            fontWeight: 700,
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            cursor: isSaving || isUploading ? "not-allowed" : "pointer",
            transition: "all 0.3s ease",
            boxShadow: saved || isSaving ? "none" : "0 10px 20px rgba(0, 210, 255, 0.2)"
          }}
        >
          <Save size={20} />
          {saved ? "✓ Showreel Saved Successfully!" : isSaving ? "Saving..." : "Save Showreel"}
        </button>
      </div>
    </div>
  );
}

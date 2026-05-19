"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ModelViewer from "@/components/canvas/ModelViewer";
import { Box, Cpu, Maximize2, Zap } from "lucide-react";

import { getStoredModels } from "@/components/utils/adminData";
import { ModelAsset } from "@/data/models";

function ModelCard({ model, index }: { model: ModelAsset, index: number }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseEnter={() => setHoveredId(model.id)}
      onMouseLeave={() => setHoveredId(null)}
      style={{ 
        borderRadius: "24px", 
        overflow: "hidden", 
        border: "1px solid var(--color-border)",
        position: "relative",
        backgroundColor: "var(--color-bg-secondary)",
        boxShadow: hoveredId === model.id ? `0 20px 40px rgba(0,0,0,0.2)` : "none",
        transition: "all 0.4s ease",
        height: "600px"
      }}
    >
      {/* HUD Overlay */}
      <div style={{ 
        position: "absolute", 
        inset: "2rem", 
        zIndex: 10, 
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem", letterSpacing: "0.05em", color: "var(--color-text)" }}>
              {model.name}
            </h3>
            <div style={{ display: "flex", gap: "1rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: model.color, background: "rgba(255,255,255,0.05)", padding: "0.3rem 0.6rem", borderRadius: "4px", border: `1px solid ${model.color}33` }}>
                LOD 01
              </span>
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--color-text-muted)", background: "rgba(255,255,255,0.05)", padding: "0.3rem 0.6rem", borderRadius: "4px" }}>
                PBR READY
              </span>
            </div>
          </div>
          <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: "1px solid var(--color-border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text)" }}>
            <Maximize2 size={18} />
          </div>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "1rem",
          opacity: hoveredId === model.id ? 1 : 0.4,
          transition: "opacity 0.3s ease"
        }}>
          <div style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(10px)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <Box size={14} style={{ color: model.color, marginBottom: "0.5rem" }} />
            <div style={{ fontSize: "0.6rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Polygons</div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-text)" }}>{model.polys}</div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(10px)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <Cpu size={14} style={{ color: model.color, marginBottom: "0.5rem" }} />
            <div style={{ fontSize: "0.6rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Resolution</div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-text)" }}>{model.textures}</div>
          </div>
          <div style={{ background: "rgba(0,0,0,0.2)", backdropFilter: "blur(10px)", padding: "1rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <Zap size={14} style={{ color: model.color, marginBottom: "0.5rem" }} />
            <div style={{ fontSize: "0.6rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Render</div>
            <div style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--color-text)" }}>{model.time}</div>
          </div>
        </div>
      </div>

      <div style={{ width: "100%", height: "100%", cursor: "grab" }}>
        {isInView ? (
          <ModelViewer modelUrl={model.modelUrl} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--color-bg-secondary)" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.1)", borderTopColor: "var(--color-accent-blue)", animation: "spin 1s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}
      </div>

      {/* Subtle glow effect on hover */}
      <motion.div 
        animate={{ opacity: hoveredId === model.id ? 0.3 : 0 }}
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "10%",
          right: "10%",
          height: "40%",
          background: `radial-gradient(ellipse at center, ${model.color} 0%, transparent 70%)`,
          filter: "blur(50px)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
    </motion.div>
  );
}

export default function Gallery3D() {
  const [models, setModels] = useState<ModelAsset[]>([]);

  useEffect(() => {
    setModels(getStoredModels());
  }, []);

  return (
    <section id="gallery3d" className="section container">
      <div style={{ marginBottom: "5rem", textAlign: "center" }}>
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ color: "var(--color-accent-blue)", letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "0.75rem", fontWeight: 700 }}
        >
          Interactive Showroom
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", margin: "1rem 0" }}
        >
          Real-time <span className="text-gradient">3D Assets</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ color: "var(--color-text-muted)", maxWidth: "600px", margin: "0 auto", fontSize: "1.1rem" }}
        >
          Explore our photorealistic high-fidelity models. Drag to orbit, scroll to zoom into the details.
        </motion.p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
        gap: "3rem",
        minHeight: "600px"
      }}>
        {models.map((model, i) => (
          <ModelCard key={model.id} model={model} index={i} />
        ))}
      </div>
    </section>
  );
}

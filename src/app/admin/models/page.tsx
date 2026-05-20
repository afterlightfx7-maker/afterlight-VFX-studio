"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Box, 
  Plus, 
  Edit3, 
  Trash2, 
  Search,
  Cpu,
  Zap
} from "lucide-react";
import { getStoredModels, deleteModel } from "@/components/utils/adminData";
import { ModelAsset } from "@/data/models";

export default function AdminModels() {
  const [models, setModels] = useState<ModelAsset[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const load = () => {
      getStoredModels().then(data => setModels(data));
    };
    load();
    setMounted(true);
    window.addEventListener("focus", load);
    return () => window.removeEventListener("focus", load);
  }, []);


  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this 3D asset?")) {
      const updated = await deleteModel(id);
      setModels(updated);
    }
  };

  const filteredModels = models.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <div>
      <header style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>3D Interactive Assets</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>Manage high-fidelity models for the real-time showcase.</p>
        </div>
        <Link href="/admin/models/new" style={{ 
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
          Add Asset
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
            placeholder="Search assets..." 
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

      {/* Model List View */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filteredModels.length > 0 ? filteredModels.map((model, i) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 120px",
              alignItems: "center",
              padding: "1.5rem",
              backgroundColor: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "16px",
              gap: "2rem"
            }}
          >
            <div>
              <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>Asset Name</div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "white" }}>{model.name}</div>
            </div>

            <div>
              <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>Polycount</div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Box size={14} style={{ color: model.color }} />
                {model.polys}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>Texturing</div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Cpu size={14} style={{ color: model.color }} />
                {model.textures}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.65rem", color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>Render Time</div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Zap size={14} style={{ color: model.color }} />
                {model.time}
              </div>
            </div>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <Link 
                href={`/admin/models/edit/${model.id}`}
                style={{ 
                  width: "38px", 
                  height: "38px", 
                  borderRadius: "10px", 
                  backgroundColor: "rgba(255,255,255,0.05)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.6)"
                }}
              >
                <Edit3 size={18} />
              </Link>
              <button 
                onClick={() => handleDelete(model.id)}
                style={{ 
                  width: "38px", 
                  height: "38px", 
                  borderRadius: "10px", 
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
          <div style={{ padding: "5rem", textAlign: "center", backgroundColor: "rgba(255,255,255,0.01)", border: "2px dashed rgba(255,255,255,0.05)", borderRadius: "12px", color: "rgba(255,255,255,0.3)" }}>
            <Box size={48} style={{ opacity: 0.1, marginBottom: "1.5rem" }} />
            <div style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: "0.5rem" }}>No interactive assets found</div>
            <p style={{ fontSize: "0.9rem" }}>Configure your first 3D model to see it in the showroom.</p>
          </div>
        )}
      </div>
    </div>
  );
}

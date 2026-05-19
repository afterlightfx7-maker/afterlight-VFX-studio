"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Search,
  Filter
} from "lucide-react";
import { getStoredProducts, deleteProduct } from "@/components/utils/adminData";
import { Product } from "@/data/products";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProducts(getStoredProducts());
    setMounted(true);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updated = deleteProduct(id);
      setProducts(updated);
    }
  };

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <div>
      <header style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Products</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>Manage your studio's premium digital assets and 3D environments.</p>
        </div>
        <Link href="/admin/products/new" style={{ 
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
          New Product
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
            placeholder="Search products..." 
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
        <button style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.75rem 1.25rem",
          backgroundColor: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "8px",
          color: "rgba(255,255,255,0.6)",
          fontSize: "0.9rem",
          cursor: "pointer"
        }}>
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Product List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filteredProducts.length > 0 ? filteredProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            style={{
              display: "grid",
              gridTemplateColumns: "80px 2fr 3fr 1fr 120px",
              alignItems: "center",
              padding: "1.25rem",
              backgroundColor: "rgba(255,255,255,0.01)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "12px",
              gap: "2rem"
            }}
          >
            <div style={{ width: "80px", height: "45px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
              {product.image ? (
                <img src={product.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.2 }}><Package size={16} /></div>
              )}
            </div>
            
            <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{product.title}</div>
            
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {product.description}
            </div>

            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>
              {product.id}
            </div>

            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
              <a 
                href={product.link} 
                target="_blank" 
                style={{ 
                  width: "36px", 
                  height: "36px", 
                  borderRadius: "8px", 
                  backgroundColor: "rgba(255,255,255,0.05)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.4)"
                }}
              >
                <ExternalLink size={16} />
              </a>
              <Link 
                href={`/admin/products/edit/${product.id}`}
                style={{ 
                  width: "36px", 
                  height: "36px", 
                  borderRadius: "8px", 
                  backgroundColor: "rgba(255,255,255,0.05)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.6)"
                }}
              >
                <Edit3 size={16} />
              </Link>
              <button 
                onClick={() => handleDelete(product.id)}
                style={{ 
                  width: "36px", 
                  height: "36px", 
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
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        )) : (
          <div style={{ padding: "5rem", textAlign: "center", backgroundColor: "rgba(255,255,255,0.01)", border: "2px dashed rgba(255,255,255,0.05)", borderRadius: "12px", color: "rgba(255,255,255,0.3)" }}>
            <Package size={48} style={{ opacity: 0.1, marginBottom: "1.5rem" }} />
            <div style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: "0.5rem" }}>No products found</div>
            <p style={{ fontSize: "0.9rem" }}>Try adjusting your search or add a new product to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

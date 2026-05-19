"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Package, 
  TrendingUp, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink 
} from "lucide-react";
import { getStoredProducts, deleteProduct } from "@/components/utils/adminData";
import { Product } from "@/data/products";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
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

  if (!mounted) return null;

  const recentProducts = products.slice(0, 3);

  return (
    <div>
      <header style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Dashboard</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem" }}>Welcome back! Here's what's happening with your studio assets.</p>
      </header>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
        {[
          { name: "Total Products", value: products.length, icon: Package, color: "var(--color-accent-blue)" },
          { name: "Active Links", value: products.filter(p => p.link).length, icon: ExternalLink, color: "#10b981" },
          { name: "Growth", value: "+12%", icon: TrendingUp, color: "var(--color-accent-violet)" },
        ].map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              padding: "2rem",
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem"
            }}
          >
            <div style={{ 
              width: "50px", 
              height: "50px", 
              backgroundColor: `rgba(${stat.color === 'var(--color-accent-blue)' ? '0, 210, 255' : '138, 43, 226'}, 0.1)`, 
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: stat.color
            }}>
              <stat.icon size={24} />
            </div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{stat.name}</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Products Section */}
      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700 }}>Recent Products</h2>
          <Link href="/admin/products/new" style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0.5rem", 
            padding: "0.75rem 1.25rem", 
            backgroundColor: "var(--color-accent-blue)", 
            color: "black", 
            borderRadius: "8px", 
            textDecoration: "none",
            fontSize: "0.85rem",
            fontWeight: 700
          }}>
            <Plus size={16} />
            Add New
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {recentProducts.length > 0 ? recentProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "1.25rem",
                backgroundColor: "rgba(255,255,255,0.01)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "12px",
                gap: "1.5rem"
              }}
            >
              <div style={{ width: "80px", height: "45px", borderRadius: "6px", backgroundColor: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                {product.image ? (
                  <img src={product.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.2 }}><Package size={16} /></div>
                )}
              </div>
              
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "0.25rem" }}>{product.title}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>ID: {product.id}</div>
              </div>

              <div style={{ display: "flex", gap: "0.75rem" }}>
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
                    color: "rgba(255,255,255,0.6)",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = "white"}
                  onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
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
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          )) : (
            <div style={{ padding: "4rem", textAlign: "center", backgroundColor: "rgba(255,255,255,0.01)", border: "2px dashed rgba(255,255,255,0.05)", borderRadius: "12px", color: "rgba(255,255,255,0.3)" }}>
              No products found. Start by adding a new one!
            </div>
          )}
        </div>
        
        {products.length > 3 && (
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link href="/admin/products" style={{ color: "var(--color-accent-blue)", fontSize: "0.9rem", textDecoration: "none", fontWeight: 500 }}>
              View All Products
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}

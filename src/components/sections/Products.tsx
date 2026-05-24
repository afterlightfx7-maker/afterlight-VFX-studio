"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Maximize2, X } from "lucide-react";

import { initialProducts, Product } from "@/data/products";
import { getStoredProducts } from "@/components/utils/adminData";

function ProductCard({ product, index, onImageClick }: { product: Product, index: number, onImageClick: (product: Product) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Adjusted tilt intensity for a more subtle, premium feel
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    cardRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      className="product-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
        transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.4s ease, box-shadow 0.4s ease",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
      }}
    >
      <div className="product-card-glow" />
      
      {/* Thumbnail Area */}
      <div 
        className="product-thumbnail-container"
        onClick={() => onImageClick(product)}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16/9",
          overflow: "hidden",
          cursor: "zoom-in",
          borderBottom: "1px solid var(--color-border)",
          background: "linear-gradient(135deg, rgba(20,20,25,1) 0%, rgba(5,5,5,1) 100%)"
        }}
      >
        {/* Render Image, Video or Placeholder */}
        {product.image ? (
          product.image.startsWith('data:video') || (product.image.includes("cloudinary.com") && product.image.includes("/video/upload/")) ? (
            <video 
              src={product.image} 
              autoPlay 
              muted 
              loop 
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
              className="product-img"
            />
          ) : (
            <img 
              src={product.image.includes("cloudinary.com") ? product.image.replace("/upload/", "/upload/f_auto,q_auto,w_800/") : product.image} 
              alt={product.title} 
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
              className="product-img"
            />
          )
        ) : (
          <div className="placeholder-content" style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "var(--color-text-muted)",
            transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), filter 0.5s ease",
          }}>
            <div style={{
               width: "60px",
               height: "60px",
               borderRadius: "50%",
               border: "1px solid rgba(255,255,255,0.1)",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
               marginBottom: "1rem",
               background: "rgba(0,0,0,0.3)",
               backdropFilter: "blur(4px)"
            }}>
              <Maximize2 size={24} style={{ opacity: 0.5 }} />
            </div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.5 }}>
              Thumbnail Placeholder
            </span>
          </div>
        )}

        {/* Inner glow on hover */}
        <div className="thumbnail-overlay" style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
          opacity: 0.5,
          transition: "opacity 0.4s ease",
          pointerEvents: "none"
        }} />
      </div>

      {/* Content Area */}
      <div style={{ padding: "2.5rem 2rem 2rem", display: "flex", flexDirection: "column", flexGrow: 1, position: "relative", zIndex: 2 }}>
        <h3 style={{ fontSize: "1.4rem", marginBottom: "1rem", lineHeight: 1.3, letterSpacing: "0.05em" }}>
          {product.title}
        </h3>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2.5rem", flexGrow: 1 }}>
          {product.description}
        </p>
        
        <a 
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="product-btn"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            padding: "1rem 2rem",
            fontFamily: "var(--font-display)",
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "var(--color-text)",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "4px",
            transition: "all 0.3s ease",
            textTransform: "uppercase",
            textDecoration: "none",
            width: "fit-content"
          }}
        >
          View Product <ExternalLink size={16} />
        </a>
      </div>

      <style jsx>{`
        .product-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            800px circle at var(--mouse-x, 0) var(--mouse-y, 0),
            rgba(0, 210, 255, 0.08),
            transparent 40%
          );
          z-index: 1;
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
        }
        .product-card:hover::before {
          opacity: 1;
        }
        .product-card:hover {
          border-color: rgba(0, 210, 255, 0.3);
          box-shadow: 0 20px 40px -10px rgba(0, 210, 255, 0.1);
        }
        .product-card-glow {
          position: absolute;
          inset: 0;
          opacity: 0;
          box-shadow: inset 0 0 60px rgba(0, 210, 255, 0.05);
          transition: opacity 0.4s ease;
          z-index: 0;
          pointer-events: none;
        }
        .product-card:hover .product-card-glow {
          opacity: 1;
        }
        .product-thumbnail-container:hover .placeholder-content {
          transform: scale(1.05);
          filter: brightness(1.2);
        }
        .product-thumbnail-container:hover .product-img {
          transform: scale(1.05);
        }
        .product-thumbnail-container:hover .thumbnail-overlay {
          opacity: 0;
        }
        .product-btn:hover {
          background: rgba(0, 210, 255, 0.1) !important;
          border-color: var(--color-accent-blue) !important;
          color: white !important;
          box-shadow: 0 0 20px rgba(0, 210, 255, 0.2);
        }
      `}</style>
    </motion.div>
  );
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load products from our database
    getStoredProducts().then(data => {
      setProducts(data);
      setIsLoading(false);
    });
  }, []);

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);

  return (
    <section id="products" className="section container" style={{ position: "relative" }}>
      <div style={{ marginBottom: "5rem", textAlign: "center" }}>
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ color: "var(--color-accent-blue)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600 }}
        >
          Premium Assets
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginTop: "1rem" }}
        >
          OUR <span className="text-gradient" style={{ background: "linear-gradient(90deg, var(--color-accent-blue), #ffffff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>PRODUCTS</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ color: "var(--color-text-muted)", maxWidth: "600px", margin: "1.5rem auto 0", fontSize: "1.1rem" }}
        >
          A luxury cinematic marketplace for elite 3D environments and production-ready worlds.
        </motion.p>
      </div>

      <div className="products-grid" style={{ position: "relative", zIndex: 10 }}>
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={`skeleton-${i}`} style={{ height: "450px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)", animation: "shimmer 1.5s infinite" }} />
              <style>{`@keyframes shimmer { 100% { left: 200%; } }`}</style>
            </div>
          ))
        ) : (
          products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} onImageClick={setSelectedProduct} />
          ))
        )}
      </div>

      {/* Floating background elements for premium feel */}
      <div style={{
        position: "absolute",
        top: "20%",
        left: "-10%",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle, rgba(0, 210, 255, 0.05) 0%, transparent 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(5, 5, 5, 0.95)",
              backdropFilter: "blur(20px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: "2rem"
            }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              onClick={() => setSelectedProduct(null)}
              style={{
                position: "absolute",
                top: "2rem",
                right: "2rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="product-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fullscreen Content */}
              {selectedProduct.image ? (
                selectedProduct.image.startsWith('data:video') || (selectedProduct.image.includes("cloudinary.com") && selectedProduct.image.includes("/video/upload/")) ? (
                  <video 
                    src={selectedProduct.image} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <img 
                    src={selectedProduct.image.includes("cloudinary.com") ? selectedProduct.image.replace("/upload/", "/upload/f_auto,q_auto,w_1920/") : selectedProduct.image} 
                    alt={selectedProduct.title} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )
              ) : (
                <div style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
                  <Maximize2 size={48} style={{ opacity: 0.2, margin: "0 auto 1.5rem" }} />
                  <h3 style={{ fontFamily: "var(--font-display)", color: "white", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                    {selectedProduct.title}
                  </h3>
                  <p style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "0.8rem", opacity: 0.5 }}>
                    High-Resolution Preview Pending
                  </p>
                </div>
              )}

              {/* Cinematic scanline/glow effect */}
              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "20%",
                  background: "linear-gradient(to bottom, transparent, rgba(0, 210, 255, 0.05), transparent)",
                  pointerEvents: "none"
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

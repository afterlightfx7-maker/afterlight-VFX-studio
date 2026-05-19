"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const headline = "AFTERLIGHTFX STUDIOS";
  const words = headline.split(" ");

  return (
    <section id="hero" style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div className="container" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
        
        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.6 }}
            style={{ marginBottom: "2.5rem" }}
          >
            <span style={{ 
              color: "var(--color-accent-silver)", 
              fontFamily: "var(--font-primary)", 
              letterSpacing: "0.3em",
              fontSize: "0.95rem",
              textTransform: "uppercase"
            }}>
              Immersive Design and Visualization
            </span>
          </motion.div>
        )}

        <div style={{ perspective: "1000px", marginBottom: "4rem" }}>
          <h1 style={{ 
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: 0,
            gap: "0.5rem",
            position: "relative"
          }}>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 2.8, ease: [0.2, 0.65, 0.3, 0.9] }}
              style={{
                fontSize: "clamp(2rem, 5vw, 5rem)",
                lineHeight: 1.1,
                letterSpacing: "0.05em",
                color: "var(--color-text)",
                textShadow: "0 0 40px rgba(255,255,255,0.1)",
              }}
            >
              AFTERLIGHTFX
            </motion.span>
            
            {/* Cinematic Glowing Flare Separator */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={mounted ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 3.2, ease: "easeOut" }}
              style={{
                width: "100%",
                maxWidth: "800px",
                height: "2px",
                background: "linear-gradient(90deg, transparent 0%, rgba(0, 210, 255, 0.8) 50%, transparent 100%)",
                boxShadow: "0 0 20px 2px rgba(0, 210, 255, 0.5), 0 0 40px 5px rgba(255, 255, 255, 0.2)",
                margin: "0.5rem 0 1.5rem",
                position: "relative"
              }}
            >
              {/* Bright center star/flare */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "150px",
                height: "4px",
                background: "white",
                borderRadius: "50%",
                boxShadow: "0 0 30px 10px rgba(0, 210, 255, 0.9), 0 0 50px 15px rgba(255, 255, 255, 0.6)"
              }} />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={mounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 3.5, ease: [0.2, 0.65, 0.3, 0.9] }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                letterSpacing: "0.4em",
                color: "var(--color-text)",
                textTransform: "uppercase"
              }}
            >
              STUDIOS
            </motion.span>
          </h1>
        </div>

        {mounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 4.2 }}
            style={{ display: "flex", gap: "1.5rem", justifyContent: "center" }}
          >
            <button className="btn btn-primary" style={{ padding: "1.2rem 3rem" }}>View Showreel</button>
          </motion.div>
        )}
      </div>

      {/* Floating decorative elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, var(--color-accent-blue) 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.3,
          zIndex: 1,
          pointerEvents: "none"
        }}
      />
      <motion.div 
        animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, var(--color-accent-violet) 0%, transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.2,
          zIndex: 1,
          pointerEvents: "none"
        }}
      />
    </section>
  );
}

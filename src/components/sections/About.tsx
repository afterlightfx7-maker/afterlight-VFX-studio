"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "120+", label: "Projects" },
  { value: "40+", label: "Global Clients" },
];

export default function About() {
  return (
    <section id="about" className="section container about-section">
      <div className="about-grid">
        
        <div>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ color: "var(--color-accent-gold)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600 }}
          >
            Our Story
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", margin: "1rem 0 2rem", lineHeight: 1.1 }}
          >
            We are <span className="text-gradient">AfterLightFX.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ color: "var(--color-text-muted)", fontSize: "1.2rem", lineHeight: 1.8, marginBottom: "2rem" }}
          >
            A studio obsessed with the craft of visuals. We build photorealistic 3D worlds, design visionary brand identities, produce cinematic VFX, and create motion work that stops people mid-scroll.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ color: "var(--color-text-muted)", fontSize: "1.2rem", lineHeight: 1.8, marginBottom: "3rem" }}
          >
            Working globally with architects, brands, directors, and agencies who need visuals that don't just look good—they hit different.
          </motion.p>


        </div>

        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute",
            inset: "-2rem",
            background: "radial-gradient(circle, var(--color-accent-violet) 0%, transparent 60%)",
            opacity: 0.1,
            filter: "blur(40px)",
            zIndex: 0
          }} />
          
          <div className="about-stats-grid">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                className="glass"
                style={{
                  padding: "3rem 2rem",
                  borderRadius: "12px",
                  textAlign: "center"
                }}
              >
                <div style={{ fontSize: "3rem", fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--color-accent-blue)", marginBottom: "0.5rem" }}>
                  {stat.value}
                </div>
                <div style={{ color: "var(--color-text)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.8rem" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

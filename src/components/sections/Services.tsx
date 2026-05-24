"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const services = [
  { id: "01", title: "VFX & CGI", desc: "Cinematic visual effects and computer-generated imagery that blur the line between reality and imagination." },
  { id: "02", title: "3D Animation", desc: "High-end character and product animation featuring fluid dynamics and photorealistic rendering." },
  { id: "03", title: "Motion Graphics", desc: "Kinetic typography, broadcast packages, and abstract motion design that captivate and communicate." },
  { id: "04", title: "Video Editing", desc: "Story-driven post-production, seamless transitions, and cinematic color grading." },
  { id: "05", title: "Brand Design", desc: "Futuristic brand identity systems, UI/UX, and digital assets crafted for tomorrow." },
  { id: "06", title: "Arch Viz", desc: "Immersive architectural visualizations and product rendering built to impress." },
];

function ServiceCard({ service, index }: { service: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="service-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: "3rem 2rem",
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "8px",
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.4s ease",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <div className="card-glow" />
      <div style={{ position: "relative", zIndex: 2 }}>
        <span style={{ 
          color: "var(--color-accent-blue)", 
          fontFamily: "var(--font-primary)", 
          fontWeight: 600,
          fontSize: "0.9rem",
          letterSpacing: "0.1em"
        }}>
          {service.id}
        </span>
        <h3 style={{ fontSize: "1.5rem", marginTop: "1rem", marginBottom: "0.5rem" }}>
          {service.title}
        </h3>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
          {service.desc}
        </p>
      </div>

      <style jsx>{`
        .service-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            800px circle at var(--mouse-x, 0) var(--mouse-y, 0),
            rgba(138, 43, 226, 0.06),
            transparent 40%
          );
          z-index: 1;
          opacity: 0;
          transition: opacity 0.5s;
        }
        .service-card:hover::before {
          opacity: 1;
        }
        .service-card:hover {
          border-color: rgba(0, 210, 255, 0.3);
        }
        .card-glow {
          position: absolute;
          inset: 0;
          opacity: 0;
          box-shadow: inset 0 0 40px rgba(0, 210, 255, 0.1);
          transition: opacity 0.4s ease;
          z-index: 0;
        }
        .service-card:hover .card-glow {
          opacity: 1;
        }
      `}</style>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section container">
      <div style={{ marginBottom: "5rem" }}>
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ color: "var(--color-accent-violet)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600 }}
        >
          What We Do
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginTop: "1rem" }}
        >
          Our <span className="text-gradient">Expertise</span>
        </motion.h2>
      </div>

      <div className="services-grid">
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}

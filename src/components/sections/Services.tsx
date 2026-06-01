"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const services = [
  {
    title: ["3D & Visualization", "Cinematics"],
    desc: "Cinematic 3D visuals crafted to bring ideas and brands to life with stunning realism.",
    color: "#00d2ff", // Cyan
    bgImage: "/images/service_3d_vis.png",
  },
  {
    title: ["AI Creative", "Solution"],
    desc: "Smart AI-driven creativity designed for innovative and next-generation visual content.",
    color: "#a855f7", // Purple
    bgImage: "/images/service_ai.png",
  },
  {
    title: ["VFX & CGI", "Advertising"],
    desc: "High-impact CGI and VFX built to create visually powerful advertising campaigns.",
    color: "#f97316", // Orange
    bgImage: "/images/service_vfx.png",
  },
  {
    title: ["AR/VR", "Experiences"],
    desc: "Immersive AR and VR experiences that blend storytelling with digital innovation.",
    color: "#22c55e", // Green
    bgImage: "/images/service_arvr.jpg",
  },
  {
    title: ["Game", "Environment"],
    desc: "Detailed digital worlds and environments designed for immersive interactive experiences.",
    color: "#0ea5e9", // Sky Blue
    bgImage: "/images/service_game.jpg",
  },
  {
    title: ["Motion Design", "Editing"],
    desc: "Dynamic motion graphics and seamless editing for engaging visual storytelling.",
    color: "#ec4899", // Pink/Magenta
    bgImage: "/images/service_motion.jpg",
  },
];

function ServiceCard({ service, index }: { service: any, index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    cardRef.current.style.boxShadow = `0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 35px ${service.color}1d`;
    cardRef.current.style.borderColor = service.color;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    cardRef.current.style.boxShadow = "0 10px 30px -15px rgba(0, 0, 0, 0.7)";
    cardRef.current.style.borderColor = "rgba(255, 255, 255, 0.05)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="service-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: "3.5rem 2.5rem",
        backgroundColor: "rgba(6, 6, 15, 0.85)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        borderRadius: "16px",
        position: "relative",
        overflow: "hidden",
        height: "320px",
        transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.4s ease, box-shadow 0.4s ease",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 1,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Right Side Visual Background */}
      <div 
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "55%",
          opacity: 0.65,
          maskImage: "linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 100%)",
          zIndex: 1,
          pointerEvents: "none",
          transition: "transform 0.5s ease-out, opacity 0.5s ease",
        }}
        className="card-bg-visual"
      >
        <img 
          src={service.bgImage} 
          alt={service.title.join(" ")} 
          style={{ 
            width: "100%", 
            height: "100%", 
            objectFit: "cover",
            objectPosition: "center right",
          }} 
        />
      </div>

      {/* Content overlay */}
      <div className="card-content">
        <h3 style={{ 
          fontSize: "1.3rem", 
          fontWeight: 700, 
          fontFamily: "var(--font-display)", 
          letterSpacing: "0.05em",
          lineHeight: 1.2,
          textTransform: "uppercase",
          color: "#ffffff",
          margin: 0,
        }}>
          <span style={{ display: "block", whiteSpace: "nowrap" }}>{service.title[0]}</span>
          <span style={{ display: "block", whiteSpace: "nowrap" }}>{service.title[1]}</span>
        </h3>

        {/* Color Accent line */}
        <div style={{
          width: "35px",
          height: "3.5px",
          backgroundColor: service.color,
          margin: "1rem 0",
          borderRadius: "2px",
          boxShadow: `0 0 10px ${service.color}`,
        }} />

        <p style={{ 
          color: "var(--color-text-muted)", 
          fontSize: "0.92rem", 
          lineHeight: 1.5,
          margin: 0,
        }}>
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
            ${service.color}0c,
            transparent 45%
          );
          z-index: 1;
          opacity: 0;
          transition: opacity 0.5s;
        }
        .service-card:hover::before {
          opacity: 1;
        }
        .service-card:hover .card-bg-visual {
          transform: scale(1.05);
          opacity: 0.85;
        }
        .card-content {
          position: relative;
          z-index: 2;
          max-width: 70%;
        }
        @media (max-width: 768px) {
          .card-content {
            max-width: 100%;
          }
          .service-card {
            height: auto !important;
            min-height: 280px;
            padding: 2.5rem 1.75rem !important;
          }
          .card-bg-visual {
            opacity: 0.35 !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section container" style={{ position: "relative", zIndex: 10 }}>
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
          <ServiceCard key={service.title.join(" ")} service={service} index={i} />
        ))}
      </div>

      <style jsx>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
          gap: 2.5rem;
        }
      `}</style>
    </section>
  );
}

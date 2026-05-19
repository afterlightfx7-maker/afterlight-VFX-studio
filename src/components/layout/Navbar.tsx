"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 2.5, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "1.5rem 0",
        transition: "background-color 0.3s ease",
        backgroundColor: scrolled ? (theme === 'dark' ? "rgba(5, 5, 5, 0.8)" : "rgba(255, 255, 255, 0.8)") : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
      }}
    >
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <img 
            src="/images/logo.png" 
            alt="AfterLightFX Logo" 
            style={{ 
              width: "40px", 
              height: "40px", 
              objectFit: "contain",
              filter: theme === 'dark' ? "drop-shadow(0 0 10px rgba(0, 210, 255, 0.5))" : "none" 
            }} 
          />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.1em", fontSize: "1.2rem", color: "var(--color-text)" }}>
            AFTERLIGHTFX
          </span>
        </Link>

        <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {["Services", "Work", "About", "Contact"].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.9rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-text)",
                position: "relative",
                padding: "0.5rem 0"
              }}
              className="nav-link"
            >
              {item}
            </Link>
          ))}
          
          <button 
            onClick={toggleTheme}
            style={{
              background: "none",
              border: "none",
              color: "var(--color-text)",
              cursor: "pointer",
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "rotate(15deg)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "rotate(0deg)"}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button className="btn btn-primary" style={{ padding: "0.75rem 1.5rem", fontSize: "0.8rem", marginLeft: "1rem" }}>
            Start a Project
          </button>
        </nav>
      </div>

      <style jsx>{`
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: 0;
          left: 0;
          background-color: var(--color-accent-blue);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </motion.header>
  );
}

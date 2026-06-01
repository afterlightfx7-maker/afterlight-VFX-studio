"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Make sure body overflow is locked when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" }
  ];

  return (
    <>
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
          padding: scrolled ? "1rem 0" : "1.5rem 0",
          transition: "background-color 0.3s ease, border-color 0.3s ease, padding 0.3s ease",
          backgroundColor: scrolled ? "rgba(5, 5, 5, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} onClick={() => setMobileMenuOpen(false)}>
            <img 
              src="/images/logo.png" 
              alt="AfterLightFX Logo" 
              style={{ 
                width: "35px", 
                height: "35px", 
                objectFit: "contain",
                filter: "drop-shadow(0 0 8px rgba(0, 210, 255, 0.5))" 
              }} 
            />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.1em", fontSize: "1.1rem", color: "var(--color-text)" }}>
              AFTERLIGHTFX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={{ display: "flex", gap: "1.75rem", alignItems: "center", marginLeft: "auto" }}>

            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                style={{
                  fontFamily: "var(--font-primary)",
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "rgba(255, 255, 255, 0.75)",
                  position: "relative",
                  padding: "0.5rem 0",
                  transition: "color 0.3s ease"
                }}
                className="nav-link"
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Right Container */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Mobile Menu Toggle Button */}
            <button 
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "none",
                border: "none",
                color: "var(--color-text)",
                cursor: "pointer",
                padding: "0.5rem",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 101,
                transition: "transform 0.3s ease"
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              height: "100vh",
              backgroundColor: "rgba(5, 5, 5, 0.98)",
              backdropFilter: "blur(20px)",
              zIndex: 99,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "2rem"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center", width: "100%" }}>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    color: "var(--color-text)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent-blue)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text)'}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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

        @media (max-width: 1024px) {
          :global(.desktop-nav) {
            display: none !important;
          }
          :global(.mobile-toggle) {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}

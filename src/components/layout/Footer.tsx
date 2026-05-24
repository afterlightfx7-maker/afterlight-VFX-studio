"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer style={{ padding: "4rem 0 2rem", borderTop: "1px solid var(--color-border)", position: "relative", zIndex: 10, backgroundColor: "var(--color-bg)" }}>
      <div className="container footer-upper-row">
        
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <img 
              src="/images/logo.png" 
              alt="AfterLightFX Logo" 
              style={{ 
                width: "30px", 
                height: "30px", 
                objectFit: "contain",
                filter: "drop-shadow(0 0 8px rgba(138, 43, 226, 0.5))" 
              }} 
            />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "0.1em", fontSize: "1rem" }}>
              AFTERLIGHTFX STUDIOS
            </span>
          </div>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", maxWidth: "300px" }}>
            Immersive design and visualization for visionary brands and creators worldwide.
          </p>
        </div>

        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { name: "Instagram", url: "https://www.instagram.com/afterlightfx_studios_?igsh=MXNjc2VmOXB2dXR1Nw%3D%3D&utm_source=qr", target: "_blank" },
            { name: "LinkedIn", url: "#" }
          ].map((social) => (
            <a 
              key={social.name} 
              href={social.url} 
              target={social.target}
              rel={social.target ? "noopener noreferrer" : undefined}
              style={{ 
                color: "var(--color-text-muted)", 
                fontSize: "0.85rem", 
                textTransform: "uppercase", 
                letterSpacing: "0.1em",
                transition: "color 0.3s ease"
              }} 
              onMouseOver={(e) => e.currentTarget.style.color = 'white'} 
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              {social.name}
            </a>
          ))}
        </div>

      </div>
      
      <div className="container footer-lower-row">
        <span style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>
          &copy; {new Date().getFullYear()} AfterLightFX Studios. All rights reserved.
        </span>
        <span style={{ color: "var(--color-text-muted)", fontSize: "0.75rem" }}>
          Designed with precision. • <a href="/admin/login" style={{ color: "inherit", textDecoration: "none", opacity: 0.5 }}>Admin</a>
        </span>
      </div>
    </footer>
  );
}

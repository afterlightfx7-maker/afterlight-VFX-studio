"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    
    setStatus("sending");
    
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      
      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section container" style={{ paddingBottom: "0" }}>
      <div className="glass contact-card-container">
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "2px",
          background: "linear-gradient(90deg, transparent, var(--color-accent-blue), transparent)",
          opacity: 0.5
        }} />

        <div className="contact-grid">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ color: "var(--color-accent-silver)", letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600 }}
            >
              Collaborate
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", margin: "1rem 0 2rem", lineHeight: 1.1 }}
            >
              Let's craft <br/>something <span className="text-gradient">Iconic.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ color: "var(--color-text-muted)", fontSize: "1.1rem", maxWidth: "400px", marginBottom: "3rem" }}
            >
              Reach out to discuss your next visionary project. Our team is ready to bring your imagination into reality.
            </motion.p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <a href="mailto:contact@afterlightfx.com" style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)", fontWeight: 700, transition: "color 0.3s ease", color: "var(--color-text)" }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-accent-blue)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text)'}>
                contact@afterlightfx.com
              </a>
              <div style={{ color: "var(--color-text-muted)" }}>
                Available Worldwide
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {status === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ padding: "3rem", textAlign: "center", background: "rgba(0, 210, 255, 0.05)", borderRadius: "16px", border: "1px solid var(--color-accent-blue)" }}
              >
                <h3 style={{ color: "var(--color-accent-blue)", marginBottom: "1rem" }}>Inquiry Sent!</h3>
                <p style={{ color: "var(--color-text-muted)" }}>Thank you for reaching out. We will get back to you shortly.</p>
                <button onClick={() => setStatus("")} className="btn" style={{ marginTop: "2rem", padding: "0.5rem 1.5rem" }}>Send Another</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <div style={{ position: "relative" }}>
                  <input type="text" name="name" required placeholder="Your Name" style={{
                    width: "100%",
                    padding: "1rem 0",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                    fontSize: "1rem",
                    outline: "none",
                    fontFamily: "var(--font-primary)"
                  }} />
                </div>
                <div style={{ position: "relative" }}>
                  <input type="email" name="email" required placeholder="Email Address" style={{
                    width: "100%",
                    padding: "1rem 0",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                    fontSize: "1rem",
                    outline: "none",
                    fontFamily: "var(--font-primary)"
                  }} />
                </div>
                <div style={{ position: "relative" }}>
                  <textarea name="message" required placeholder="Tell us about your project" rows={4} style={{
                    width: "100%",
                    padding: "1rem 0",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid var(--color-border)",
                    color: "var(--color-text)",
                    fontSize: "1rem",
                    outline: "none",
                    resize: "none",
                    fontFamily: "var(--font-primary)"
                  }} />
                </div>
                <button type="submit" disabled={status === "sending"} className="btn btn-primary" style={{ alignSelf: "flex-start", marginTop: "1rem" }}>
                  {status === "sending" ? "Sending..." : "Submit Inquiry"}
                </button>
                {status === "error" && (
                  <p style={{ color: "#ff4d4d", fontSize: "0.9rem" }}>Oops! Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

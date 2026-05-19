"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Mock Authentication Logic
    setTimeout(() => {
      if (username === "admin" && password === "afterlight2026") {
        localStorage.setItem("afterlight_admin_token", "mock_token_" + Date.now());
        router.push("/admin/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      backgroundColor: "#050505",
      backgroundImage: "radial-gradient(circle at 50% 50%, rgba(0, 210, 255, 0.05) 0%, transparent 50%)",
      padding: "2rem"
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "rgba(15, 15, 20, 0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          borderRadius: "24px",
          padding: "3rem",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          textAlign: "center"
        }}
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          style={{ marginBottom: "2.5rem" }}
        >
          <div style={{ 
            width: "60px", 
            height: "60px", 
            background: "linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-violet))", 
            borderRadius: "16px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center", 
            margin: "0 auto 1.5rem",
            boxShadow: "0 0 30px rgba(0, 210, 255, 0.3)"
          }}>
            <ShieldCheck size={32} color="white" />
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, letterSpacing: "0.05em", color: "white", marginBottom: "0.5rem" }}>
            Admin Login
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", letterSpacing: "0.05em" }}>
            Secure access to AfterLightFX Control Center
          </p>
        </motion.div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem", marginLeft: "0.5rem" }}>
              Username
            </label>
            <div style={{ position: "relative" }}>
              <User size={18} style={{ position: "absolute", left: "1.2rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter username"
                style={{
                  width: "100%",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1rem 1rem 1rem 3.5rem",
                  color: "white",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  outline: "none"
                }}
                className="admin-input"
              />
            </div>
          </div>

          <div style={{ textAlign: "left" }}>
            <label style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem", marginLeft: "0.5rem" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={18} style={{ position: "absolute", left: "1.2rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.2)" }} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
                style={{
                  width: "100%",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1rem 1rem 1rem 3.5rem",
                  color: "white",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  outline: "none"
                }}
                className="admin-input"
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: "#ff4d4d", fontSize: "0.85rem", fontWeight: 500 }}
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: "1rem",
              padding: "1.1rem",
              backgroundColor: "var(--color-accent-blue)",
              border: "none",
              borderRadius: "12px",
              color: "black",
              fontWeight: 700,
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              cursor: isLoading ? "wait" : "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 10px 20px rgba(0, 210, 255, 0.2)"
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 210, 255, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 210, 255, 0.2)";
              }
            }}
          >
            {isLoading ? "Authenticating..." : "Sign In"}
            {!isLoading && <ArrowRight size={20} />}
          </button>
        </form>

        <p style={{ marginTop: "3rem", color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Authorized Personnel Only
        </p>
      </motion.div>

      <style jsx>{`
        .admin-input:focus {
          border-color: var(--color-accent-blue) !important;
          background-color: rgba(255, 255, 255, 0.05) !important;
          box-shadow: 0 0 15px rgba(0, 210, 255, 0.1);
        }
      `}</style>
    </div>
  );
}

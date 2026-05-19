"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduce artificial loading time to improve perceived speed
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#050505",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "var(--color-text)",
              marginBottom: "2rem",
              position: "relative",
            }}
          >
            AFTERLIGHTFX
            <motion.span
              style={{ color: "var(--color-accent-blue)", marginLeft: "8px" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              STUDIOS
            </motion.span>
          </motion.div>
          
          <div style={{ width: "200px", height: "2px", background: "rgba(255,255,255,0.1)", overflow: "hidden" }}>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "100%", height: "100%", background: "var(--color-accent-blue)" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

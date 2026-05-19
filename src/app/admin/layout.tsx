"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Package, 
  FolderOpen,
  Box,
  Settings, 
  LogOut, 
  ChevronRight,
  ExternalLink
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if user is "logged in" (Mock check)
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
      const isLoggedIn = localStorage.getItem("afterlight_admin_token");
      if (!isLoggedIn) {
        router.push("/admin/login");
      }
    }
  }, [pathname, router]);

  if (!mounted) return null;

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Projects", href: "/admin/projects", icon: FolderOpen },
    { name: "3D Assets", href: "/admin/models", icon: Box },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem("afterlight_admin_token");
    router.push("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#020202", color: "white" }}>
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        style={{
          width: "280px",
          backgroundColor: "#050505",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          height: "100vh",
          zIndex: 50
        }}
      >
        <div style={{ padding: "2rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
            <div style={{ width: "32px", height: "32px", background: "var(--color-accent-blue)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>A</div>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, letterSpacing: "0.1em", color: "white" }}>AFTERLIGHTFX</div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)" }}>CONTROL CENTER</div>
            </div>
          </Link>
        </div>

        <nav style={{ flexGrow: 1, padding: "2rem 1rem" }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", marginBottom: "1.5rem", paddingLeft: "1rem" }}>MAIN MENU</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.85rem 1rem",
                    borderRadius: "8px",
                    textDecoration: "none",
                    color: isActive ? "white" : "rgba(255,255,255,0.5)",
                    backgroundColor: isActive ? "rgba(0, 210, 255, 0.05)" : "transparent",
                    transition: "all 0.2s ease",
                    position: "relative"
                  }}
                >
                  <Icon size={18} color={isActive ? "var(--color-accent-blue)" : "currentColor"} />
                  <span style={{ fontSize: "0.9rem", fontWeight: isActive ? 600 : 400 }}>{item.name}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-glow"
                      style={{ position: "absolute", left: 0, width: "2px", height: "60%", background: "var(--color-accent-blue)", borderRadius: "0 2px 2px 0" }} 
                    />
                  )}
                  <ChevronRight size={14} style={{ marginLeft: "auto", opacity: isActive ? 0.5 : 0 }} />
                </Link>
              );
            })}
          </div>
        </nav>

        <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <Link href="/" target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.85rem 1rem", color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
            <ExternalLink size={16} />
            View Site
          </Link>
          <button 
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.85rem 1rem",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 50, 50, 0.05)",
              color: "#ff4d4d",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              fontSize: "0.9rem",
              fontWeight: 500
            }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main style={{ marginLeft: "280px", flexGrow: 1, padding: "2rem 3rem", position: "relative" }}>
        {/* Background glow for premium feel */}
        <div style={{ position: "fixed", top: 0, right: 0, width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0, 210, 255, 0.03) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        
        <div style={{ position: "relative", zIndex: 1 }}>
          {children}
        </div>
      </main>
    </div>
  );
}

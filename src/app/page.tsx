"use client";

import dynamic from "next/dynamic";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";

// Heavy 3D and interaction components loaded dynamically
const BackgroundScene = dynamic(() => import("@/components/canvas/BackgroundScene"), { ssr: false });
const Showreel = dynamic(() => import("@/components/sections/Showreel"), { ssr: false });
const Products = dynamic(() => import("@/components/sections/Products"), { ssr: false });
const Work = dynamic(() => import("@/components/sections/Work"), { ssr: false });
const Gallery3D = dynamic(() => import("@/components/sections/Gallery3D"), { ssr: false });
const Contact = dynamic(() => import("@/components/sections/Contact"), { ssr: false });

export default function Home() {
  return (
    <main style={{ position: "relative", width: "100%", overflow: "hidden" }}>
      <LoadingScreen />
      <Navbar />
      <BackgroundScene />
      
      <div style={{ position: "relative", zIndex: 10 }}>
        <Hero />
        <Showreel />
        <Services />
        <Products />
        <Work />
        <Gallery3D />
        <About />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}

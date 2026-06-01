"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useState, useRef, Suspense } from "react";
import * as THREE from "three";

// ─── Starfield ────────────────────────────────────────────────────────────────
function Starfield() {
  const ref = useRef<THREE.Points>(null!);

  const [sphere] = useState(() => {
    const count = 3000;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.5 * Math.cbrt(Math.random());
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 18;
      ref.current.rotation.y -= delta / 24;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#a0c8ff"
          size={0.0045}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// ─── Scene root ───────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <Starfield />
    </>
  );
}

// ─── Exported component ───────────────────────────────────────────────────────
export default function BackgroundScene() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        backgroundImage:
          "linear-gradient(to bottom, rgba(2,2,6,0.05) 0%, rgba(2,2,6,0.80) 100%), url('/images/space_hero_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#020206",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 0.95,
        }}
      >
        <Canvas camera={{ position: [0, 0, 2.8], fov: 55 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

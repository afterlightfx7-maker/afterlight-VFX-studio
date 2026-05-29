"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
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

// ─── Rotating Earth ───────────────────────────────────────────────────────────
function Earth() {
  const earthRef  = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);

  // Textures from Three.js official CDN (jsDelivr — always available)
  const [earthMap, cloudsMap, bumpMap] = useLoader(THREE.TextureLoader, [
    "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/planets/earth_atmos_2048.jpg",
    "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/planets/earth_clouds_1024.png",
    "https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/textures/planets/earth_normal_2048.jpg",
  ]);

  useFrame((_state, delta) => {
    if (earthRef.current)  earthRef.current.rotation.y  += delta * 0.055;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.065;
  });

  return (
    // Position: right-centre, partially below viewport for a planet-horizon look
    <group position={[1.4, -1.1, 0]}>
      {/* Sun-like directional light from top-left */}
      <directionalLight position={[-4, 3, 4]} intensity={2.2} color="#e8d8c0" />
      {/* Faint fill light for the dark side */}
      <ambientLight intensity={0.08} color="#1a3a6c" />

      {/* ── Earth sphere ── */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.1, 96, 96]} />
        <meshStandardMaterial
          map={earthMap}
          normalMap={bumpMap}
          normalScale={new THREE.Vector2(0.08, 0.08)}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>

      {/* ── Cloud layer ── */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.115, 96, 96]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.35}
          depthWrite={false}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* ── Atmospheric rim glow (BackSide trick) ── */}
      <mesh>
        <sphereGeometry args={[1.18, 96, 96]} />
        <meshBasicMaterial
          color="#00aaff"
          transparent
          opacity={0.07}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* ── Outer soft halo ── */}
      <mesh>
        <sphereGeometry args={[1.28, 64, 64]} />
        <meshBasicMaterial
          color="#0055aa"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ─── Scene root ───────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <Starfield />
      <Earth />
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

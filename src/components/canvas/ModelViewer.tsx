"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";

// Component that actually loads the model
function GLTFModel({ url }: { url: string }) {
  // We use useGLTF to load the model. If it fails, we need to handle it or let Suspense catch it.
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

// Fallback abstract shape if no URL is provided
function PlaceholderModel() {
  return (
    <mesh castShadow receiveShadow>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial 
        color="#00d2ff" 
        roughness={0.1} 
        metalness={0.8}
        emissive="#000000"
      />
    </mesh>
  );
}

interface ModelViewerProps {
  modelUrl?: string; // e.g. "/models/my-project.glb"
  cameraPosition?: [number, number, number];
}

export default function ModelViewer({ modelUrl, cameraPosition = [0, 0, 5] }: ModelViewerProps) {
  return (
    <div style={{ width: "100%", height: "100%", cursor: "grab", backgroundColor: "#0a0a0c" }}>
      <Canvas shadows camera={{ position: cameraPosition, fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          
          {modelUrl ? (
            <GLTFModel url={modelUrl} />
          ) : (
            <PlaceholderModel />
          )}

          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={4} 
            color="#00d2ff"
          />
          
          <OrbitControls 
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={1}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

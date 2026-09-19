"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Float } from "@react-three/drei";
import * as THREE from "three";

// Visual 3D Stylized Playbox Koper
function PlayboxModel() {
  const meshRef = useRef<THREE.Group>(null);

  // Animasi rotasi halus otomatis saat tidak di-drag
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Box Koper Playbox Utama */}
      <RoundedBox args={[3.2, 2.2, 1.2]} radius={0.15} smoothness={4}>
        <meshStandardMaterial color="#121520" roughness={0.3} metalness={0.8} />
      </RoundedBox>

      {/* Frame / Trim Neon Cyan */}
      <RoundedBox args={[3.25, 2.25, 0.1]} radius={0.1} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.6} wireframe />
      </RoundedBox>

      {/* Layar/Monitor Gaming di Dalam Box */}
      <mesh position={[0, 0.1, 0.55]}>
        <planeGeometry args={[2.6, 1.5]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Logo / Branding Screen Glow */}
      <mesh position={[0, 0.1, 0.56]}>
        <planeGeometry args={[2.4, 1.3]} />
        <meshStandardMaterial color="#ff007f" emissive="#ff007f" emissiveIntensity={0.8} />
      </mesh>

      {/* Controller DualShock 3D Mini */}
      <mesh position={[-0.6, -0.6, 0.7]} rotation={[0.2, -0.2, 0]}>
        <boxGeometry args={[0.7, 0.3, 0.4]} />
        <meshStandardMaterial color="#00f0ff" roughness={0.2} />
      </mesh>
      <mesh position={[0.6, -0.6, 0.7]} rotation={[0.2, 0.2, 0]}>
        <boxGeometry args={[0.7, 0.3, 0.4]} />
        <meshStandardMaterial color="#ff007f" roughness={0.2} />
      </mesh>
    </group>
  );
}

export default function Playbox3D() {
  return (
    <div className="w-full h-[350px] md:h-[450px] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#ff007f" />
        
        {/* Efek melayang (Floating effect) */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
          <PlayboxModel />
        </Float>

        {/* Orbit Controls agar kursor mouse bisa memutar & merotasi objek 360 derajat */}
        <OrbitControls enableZoom={false} autoRotate={false} />
      </Canvas>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#00f0ff]/70 bg-[#06070a]/80 px-3 py-1 rounded-full border border-[#00f0ff]/30">
        🖱️ Klik & Putar Model 3D Playbox
      </div>
    </div>
  );
}
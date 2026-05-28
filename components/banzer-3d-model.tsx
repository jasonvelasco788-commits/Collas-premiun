"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Text3D, Center } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function CyborgBody() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Torso - Main Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 1.5, 0.6]} />
        <meshStandardMaterial color="#2a2a3a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Chest Plate */}
      <mesh position={[0, 0.2, 0.31]}>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshStandardMaterial color="#1a1a2a" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Heart Glow */}
      <mesh position={[0, 0.2, 0.4]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ff3333" emissive="#ff0000" emissiveIntensity={2} />
      </mesh>
      
      {/* Head */}
      <group position={[0, 1.1, 0]}>
        {/* Skull */}
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#3a3a4a" metalness={0.7} roughness={0.3} />
        </mesh>
        
        {/* Human Face Part */}
        <mesh position={[0, 0, 0.2]}>
          <sphereGeometry args={[0.25, 32, 32, 0, Math.PI]} />
          <meshStandardMaterial color="#d4a574" roughness={0.8} metalness={0.1} />
        </mesh>
        
        {/* Mechanical Eye */}
        <mesh position={[0.15, 0.05, 0.35]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={3} />
        </mesh>
        
        {/* Human Eye */}
        <mesh position={[-0.15, 0.05, 0.35]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.15, 0.05, 0.38]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshStandardMaterial color="#3a2510" />
        </mesh>
        
        {/* Mustache */}
        <mesh position={[0, -0.1, 0.38]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.25, 0.05, 0.05]} />
          <meshStandardMaterial color="#4a4a4a" />
        </mesh>
        
        {/* Metal Skull Plates */}
        <mesh position={[0.2, 0.2, 0.1]}>
          <boxGeometry args={[0.2, 0.15, 0.3]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      
      {/* Left Arm - Mechanical */}
      <group position={[-0.8, 0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.12, 0.8, 8]} />
          <meshStandardMaterial color="#3a3a4a" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Weapon Attachment */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[0.2, 0.15, 0.4, 8]} />
          <meshStandardMaterial color="#1a1a2a" metalness={0.95} roughness={0.05} />
        </mesh>
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.3, 8]} />
          <meshStandardMaterial color="#ff3333" emissive="#ff0000" emissiveIntensity={1} />
        </mesh>
      </group>
      
      {/* Right Arm - Semi Human */}
      <group position={[0.8, 0.3, 0]}>
        <mesh>
          <cylinderGeometry args={[0.13, 0.1, 0.8, 8]} />
          <meshStandardMaterial color="#d4a574" roughness={0.8} metalness={0.1} />
        </mesh>
        {/* Mechanical Hand */}
        <mesh position={[0, -0.6, 0]}>
          <boxGeometry args={[0.15, 0.25, 0.1]} />
          <meshStandardMaterial color="#3a3a4a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Legs */}
      <group position={[-0.3, -1, 0]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.15, 1, 8]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      <group position={[0.3, -1, 0]}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.15, 1, 8]} />
          <meshStandardMaterial color="#2a2a3a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
      
      {/* Military Medals */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.25 + i * 0.2, 0.5, 0.35]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#ffd700" metalness={1} roughness={0.2} />
        </mesh>
      ))}
      
      {/* Energy Rings */}
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
        <mesh position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshStandardMaterial color="#ff3333" emissive="#ff0000" emissiveIntensity={2} transparent opacity={0.6} />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={0} floatIntensity={0.3}>
        <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.8, 0.015, 16, 100]} />
          <meshStandardMaterial color="#3388ff" emissive="#0066ff" emissiveIntensity={2} transparent opacity={0.5} />
        </mesh>
      </Float>
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff3333" wireframe />
    </mesh>
  );
}

interface Banzer3DModelProps {
  onClose: () => void;
}

export function Banzer3DModel({ onClose }: Banzer3DModelProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="text-2xl font-black text-primary uppercase">Modelo 3D</h2>
          <p className="text-muted-foreground text-sm">Hugo Banzer Cyborg - Vista Interactiva</p>
        </div>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-primary hover:bg-primary/80 text-primary-foreground font-bold uppercase tracking-wider transition-all"
        >
          Cerrar
        </button>
      </div>
      
      {/* 3D Canvas */}
      <div className="flex-1">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true }}
        >
          <color attach="background" args={["#0a0a12"]} />
          <fog attach="fog" args={["#0a0a12", 5, 15]} />
          
          <ambientLight intensity={0.3} />
          <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" />
          <spotLight position={[-5, 5, 5]} angle={0.3} penumbra={1} intensity={0.5} color="#ff3333" />
          <pointLight position={[0, 0, 3]} intensity={0.5} color="#3388ff" />
          
          <Suspense fallback={<LoadingFallback />}>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
              <CyborgBody />
            </Float>
            <Environment preset="city" />
          </Suspense>
          
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={8}
            autoRotate
            autoRotateSpeed={0.5}
          />
          
          {/* Grid */}
          <gridHelper args={[20, 20, "#1a1a2a", "#1a1a2a"]} position={[0, -2, 0]} />
        </Canvas>
      </div>
      
      {/* Controls Info */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <span>Arrastra para rotar</span>
          <span>Scroll para zoom</span>
          <span>Rotacion automatica activada</span>
        </div>
      </div>
    </div>
  );
}

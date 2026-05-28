"use client";

import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
} from "@react-three/drei";
import { Suspense } from "react";

interface Banzer3DModelProps {
  onClose: () => void;
}

function CyberBanzerModel() {
  const { scene } = useGLTF("/models/cyberbanzer.glb");

  return (
    <primitive
      object={scene}
      scale={1.5}
      position={[0, -1.5, 0]}
      rotation={[0, Math.PI, 0]}
    />
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

export function Banzer3DModel({ onClose }: Banzer3DModelProps) {
  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h2 className="text-2xl font-black text-primary uppercase">
            Modelo 3D
          </h2>

          <p className="text-muted-foreground text-sm">
            Cyber Banzer Blender Model
          </p>
        </div>

        <button
          onClick={onClose}
          className="px-6 py-2 bg-primary hover:bg-primary/80 text-primary-foreground font-bold uppercase tracking-wider transition-all"
        >
          Cerrar
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1">
        <Canvas
          camera={{ position: [0, 1, 5], fov: 50 }}
          gl={{ antialias: true }}
        >
          {/* Background */}
          <color attach="background" args={["#050510"]} />

          {/* Lights */}
          <ambientLight intensity={1.5} />

          <directionalLight
            position={[5, 5, 5]}
            intensity={2}
            color="#ffffff"
          />

          <pointLight
            position={[-5, 2, 5]}
            intensity={1.5}
            color="#ff0000"
          />

          <pointLight
            position={[5, 2, 5]}
            intensity={1.5}
            color="#0066ff"
          />

          {/* Model */}
          <Suspense fallback={<LoadingFallback />}>
            <CyberBanzerModel />

            <Environment preset="city" />
          </Suspense>

          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1}
            minDistance={2}
            maxDistance={10}
          />

          {/* Floor */}
          <gridHelper
            args={[20, 20, "#222244", "#111122"]}
            position={[0, -2, 0]}
          />
        </Canvas>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <span>Arrastra para rotar</span>
          <span>Scroll para zoom</span>
          <span>Modelo Blender GLB</span>
        </div>
      </div>
    </div>
  );
}

useGLTF.preload("/models/cyberbanzer.glb");
'use client';

import { SkillNode, vectorGalaxyData } from '@/config/VectorGalaxy';
import { Html, OrbitControls, Stars, QuadraticBezierLine } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';

const Node = ({ node, isHovered, onHover }: { node: SkillNode, isHovered: boolean, onHover: (id: string | null) => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Match the hologram aesthetic uniformly (Light cyan)
  const idleColor = '#33ccff';
  const activeColor = '#ffffff';

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(node.id);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          onHover(null);
        }}
      >
        <sphereGeometry args={[isHovered ? 0.25 : 0.12, 32, 32]} />
        <meshStandardMaterial
          color={isHovered ? activeColor : idleColor}
          emissive={isHovered ? activeColor : idleColor}
          emissiveIntensity={isHovered ? 2 : 1}
        />
      </mesh>

      {/* Subtle outer glow ring for the prominent nodes */}
      <mesh>
        <sphereGeometry args={[isHovered ? 0.35 : 0.2, 16, 16]} />
        <meshBasicMaterial color={isHovered ? activeColor : idleColor} wireframe transparent opacity={isHovered ? 0.4 : 0.1} />
      </mesh>

      {isHovered && (
        <Html distanceFactor={10} zIndexRange={[100, 0]} className="pointer-events-none transition-opacity">
          <div className="flex flex-col items-center justify-center -translate-x-1/2 -translate-y-[120%]">
            <div className="bg-[#001122]/90 backdrop-blur-md text-cyan-300 border border-cyan-500/30 px-3 py-2 rounded-lg whitespace-nowrap shadow-[0_0_20px_rgba(0,180,255,0.2)]">
              <p className="font-bold text-sm tracking-wide">{node.name}</p>
              <p className="text-xs opacity-80 mt-0.5 text-cyan-100">{node.category}</p>
              <p className="text-[10px] opacity-60 mt-1 max-w-[150px] whitespace-normal text-center leading-tight text-white">{node.description}</p>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

const MolecularHologram = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Calculate curved edges connecting the nodes
  const edges = useMemo(() => {
    const lines: { start: [number, number, number], end: [number, number, number], color: string, active: boolean }[] = [];

    vectorGalaxyData.forEach(node => {
      node.connections.forEach(targetId => {
        const targetNode = vectorGalaxyData.find(n => n.id === targetId);
        if (targetNode) {
          const isNodeActive = hoveredNodeId === node.id || hoveredNodeId === targetNode.id;
          lines.push({
            start: node.position,
            end: targetNode.position,
            color: isNodeActive ? '#ffffff' : '#33ccff',
            active: isNodeActive || hoveredNodeId === null
          });
        }
      });
    });
    return lines;
  }, [hoveredNodeId]);

  // Create a perfectly rounded circular texture for the molecular dots
  const circleTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    if (context) {
      context.beginPath();
      context.arc(32, 32, 30, 0, 2 * Math.PI, false);
      context.fillStyle = '#ffffff';
      context.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Hologram Base Structural Wireframe (The triangular connections) */}
      <mesh>
        <icosahedronGeometry args={[3.45, 3]} />
        <meshBasicMaterial
          color="#33ccff"
          wireframe
          transparent
          opacity={hoveredNodeId ? 0.05 : 0.12}
        />
      </mesh>

      {/* 2. Hologram Molecular Atoms (The tiny dots at all intersections) */}
      {circleTexture && (
        <points>
          <icosahedronGeometry args={[3.45, 3]} />
          <pointsMaterial
            size={0.07}
            color="#33ccff"
            transparent
            opacity={hoveredNodeId ? 0.15 : 0.5}
            map={circleTexture}
            alphaTest={0.1}
            sizeAttenuation
          />
        </points>
      )}

      {/* 3. The Interactive Skill Nodes (The large glowing data points) */}
      {vectorGalaxyData.map((node) => (
        <Node
          key={node.id}
          node={node}
          isHovered={hoveredNodeId === node.id}
          onHover={setHoveredNodeId}
        />
      ))}

      {/* 4. Draw Connecting Edges Between Clusters */}
      {edges.map((edge, idx) => {
        const start = new THREE.Vector3(...edge.start);
        const end = new THREE.Vector3(...edge.end);

        // Calculate a control point that bows outward from the sphere
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        const distance = start.distanceTo(end);

        // Push the midpoint outwards based on origin
        if (mid.lengthSq() < 0.01) {
          mid.set(0, 1, 0).cross(start).normalize();
        } else {
          mid.normalize();
        }

        // Scale out past the sphere radius (3.45) to create the curve
        mid.multiplyScalar(3.45 + Math.pow(distance, 1.2) * 0.25);

        return (
          <QuadraticBezierLine
            key={idx}
            start={start}
            end={end}
            mid={mid}
            color={edge.color}
            lineWidth={edge.active ? 1.5 : 0.4}
            transparent
            opacity={edge.active ? 0.8 : 0.2}
          />
        );
      })}
    </group>
  );
};

export default function VectorGalaxy() {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] mt-20 mb-20 rounded-xl overflow-hidden border border-white/10 bg-[#000000] shadow-[inset_0_0_80px_rgba(0,0,0,1)] group">

      {/* Title overlay */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-xl font-bold text-cyan-400">AI</h3>
        <p className="text-sm text-cyan-200/50">Holographic neural map of technologies</p>
      </div>

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 8.5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        {/* Simulate the dusty galaxy background from the reference image */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <MolecularHologram />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={false}
          maxDistance={12}
          minDistance={4}
        />
      </Canvas>

      {/* Helper text */}
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none text-xs text-cyan-500/40 flex items-center gap-2">
        <span>Orbit Lattice</span>
        <span>•</span>
        <span>Scroll to zoom</span>
      </div>
    </div>
  );
}

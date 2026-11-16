'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type CoreColorMode = 'cyan' | 'emerald' | 'purple' | 'amber';

interface NeuralCoreCanvasProps {
  isExpanded?: boolean;
  interactive?: boolean;
  className?: string;
  fieldExpanded?: boolean;
  colorMode?: CoreColorMode;
}

const COLOR_CONFIGS: Record<
  CoreColorMode,
  { main: number; nucleus: number; alt: number; light: number }
> = {
  cyan: { main: 0x00f0ff, nucleus: 0x38bdf8, alt: 0x67e8f9, light: 0x00f0ff },
  emerald: { main: 0x10b981, nucleus: 0x34d399, alt: 0x6ee7b7, light: 0x10b981 },
  purple: { main: 0xa855f7, nucleus: 0xc084fc, alt: 0xe9d5ff, light: 0xa855f7 },
  amber: { main: 0xf59e0b, nucleus: 0xfbbf24, alt: 0xfde68a, light: 0xf59e0b },
};

export default function NeuralCoreCanvas({
  isExpanded = false,
  interactive = true,
  className = '',
  fieldExpanded = false,
  colorMode = 'cyan',
}: NeuralCoreCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Keep refs for live dynamic updates without WebGL rebuild
  const fieldExpandedRef = useRef(fieldExpanded);
  useEffect(() => {
    fieldExpandedRef.current = fieldExpanded;
  }, [fieldExpanded]);

  const colorModeRef = useRef(colorMode);
  const updateColorsRef = useRef<((mode: CoreColorMode) => void) | null>(null);

  useEffect(() => {
    colorModeRef.current = colorMode;
    if (updateColorsRef.current) {
      updateColorsRef.current(colorMode);
    }
  }, [colorMode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = isExpanded ? 7.5 : 5.8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Group that holds the entire atomic hologram
    const hologramGroup = new THREE.Group();
    scene.add(hologramGroup);

    const initialPalette = COLOR_CONFIGS[colorModeRef.current] || COLOR_CONFIGS.cyan;

    // 1. Central Nucleus (Pulsing glowing core)
    const nucleusGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: initialPalette.nucleus,
      transparent: true,
      opacity: 0.95,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    hologramGroup.add(nucleus);

    // Nucleus aura
    const auraGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const auraMat = new THREE.MeshBasicMaterial({
      color: initialPalette.main,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const nucleusAura = new THREE.Mesh(auraGeo, auraMat);
    hologramGroup.add(nucleusAura);

    // 2. Geodesic Sphere Lattice
    const baseRadius = isExpanded ? 2.2 : 1.8;
    const geodesicGeo = new THREE.IcosahedronGeometry(baseRadius, 1);
    const wireframeGeo = new THREE.WireframeGeometry(geodesicGeo);

    const wireframeMat = new THREE.LineBasicMaterial({
      color: initialPalette.main,
      transparent: true,
      opacity: 0.7,
      linewidth: 1,
    });
    const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    hologramGroup.add(wireframe);

    // Vertex Nodes
    const posAttr = geodesicGeo.attributes.position;
    const uniqueVertices: THREE.Vector3[] = [];
    for (let i = 0; i < posAttr.count; i++) {
      const v = new THREE.Vector3(posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
      const exists = uniqueVertices.some((u) => u.distanceTo(v) < 0.05);
      if (!exists) uniqueVertices.push(v);
    }

    const nodeGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: initialPalette.alt,
      transparent: true,
      opacity: 0.9,
    });

    const nodes: {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      expandedPos: THREE.Vector3;
    }[] = [];

    uniqueVertices.forEach((vertex) => {
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(vertex);
      hologramGroup.add(nodeMesh);

      const expandedPos = vertex.clone().multiplyScalar(2.2);
      nodes.push({ mesh: nodeMesh, basePos: vertex.clone(), expandedPos });
    });

    // 3. Orbital Energy Rings
    const ringMaterials = [
      new THREE.LineBasicMaterial({ color: initialPalette.nucleus, transparent: true, opacity: 0.55 }),
      new THREE.LineBasicMaterial({ color: initialPalette.main, transparent: true, opacity: 0.45 }),
      new THREE.LineBasicMaterial({ color: initialPalette.alt, transparent: true, opacity: 0.35 }),
    ];

    const rings: { mesh: THREE.Line; speedX: number; speedY: number; speedZ: number }[] = [];
    const ringRadii = [baseRadius * 0.9, baseRadius * 1.15, baseRadius * 1.35];

    ringRadii.forEach((r, idx) => {
      const curve = new THREE.EllipseCurve(0, 0, r, r, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(80);
      const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
      const ringLine = new THREE.Line(ringGeo, ringMaterials[idx]);

      ringLine.rotation.x = (idx * Math.PI) / 3;
      ringLine.rotation.y = (idx * Math.PI) / 4;
      hologramGroup.add(ringLine);
      rings.push({
        mesh: ringLine,
        speedX: 0.006 * (idx % 2 === 0 ? 1 : -1),
        speedY: 0.008 * (idx % 2 === 0 ? -1 : 1),
        speedZ: 0.004,
      });
    });

    // 4. Ambient Energy Particle Field
    const particleCount = isExpanded ? 180 : 80;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = THREE.MathUtils.randFloat(baseRadius * 0.8, baseRadius * 2.8);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: initialPalette.main,
      size: isExpanded ? 0.045 : 0.035,
      transparent: true,
      opacity: 0.65,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    hologramGroup.add(particles);

    // Light
    const centerLight = new THREE.PointLight(initialPalette.light, 2, 20);
    scene.add(centerLight);

    // Color updater callback
    updateColorsRef.current = (mode: CoreColorMode) => {
      const palette = COLOR_CONFIGS[mode] || COLOR_CONFIGS.cyan;
      nucleusMat.color.setHex(palette.nucleus);
      auraMat.color.setHex(palette.main);
      wireframeMat.color.setHex(palette.main);
      nodeMat.color.setHex(palette.alt);
      ringMaterials[0].color.setHex(palette.nucleus);
      ringMaterials[1].color.setHex(palette.main);
      ringMaterials[2].color.setHex(palette.alt);
      particleMat.color.setHex(palette.main);
      centerLight.color.setHex(palette.light);
    };

    // Interactive Drag to Rotate
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !interactive) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (!interactive || !isExpanded) return;
      e.preventDefault();
      const zoomDelta = e.deltaY * -0.0015;
      camera.position.z = THREE.MathUtils.clamp(camera.position.z - zoomDelta, 4.0, 14.0);
    };

    if (interactive) {
      container.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      container.addEventListener('wheel', onWheel, { passive: false });
    }

    // Animation Loop
    let currentExpansion = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      const targetExp = fieldExpandedRef.current ? 1 : 0;
      currentExpansion += (targetExp - currentExpansion) * 0.05;

      if (!isDragging) {
        targetRotationY += 0.004;
        targetRotationX += 0.0015;
      }
      hologramGroup.rotation.y += (targetRotationY - hologramGroup.rotation.y) * 0.1;
      hologramGroup.rotation.x += (targetRotationX - hologramGroup.rotation.x) * 0.1;

      // Pulse nucleus
      const pulse = 1 + Math.sin(elapsed * 3) * 0.08;
      nucleus.scale.set(pulse, pulse, pulse);
      nucleusAura.scale.set(pulse * 1.05, pulse * 1.05, pulse * 1.05);

      // Rotate orbital rings
      rings.forEach((r) => {
        r.mesh.rotation.x += r.speedX;
        r.mesh.rotation.y += r.speedY;
        r.mesh.rotation.z += r.speedZ;
      });

      // Slowly rotate particle field
      particles.rotation.y = elapsed * 0.03;
      particles.rotation.x = Math.sin(elapsed * 0.02) * 0.1;

      nodes.forEach((n) => {
        n.mesh.position.lerpVectors(n.basePos, n.expandedPos, currentExpansion);
      });

      const wireframeScale = 1 + currentExpansion * 1.2;
      wireframe.scale.set(wireframeScale, wireframeScale, wireframeScale);
      wireframeMat.opacity = 0.7 - currentExpansion * 0.35;

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 300;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (interactive) {
        container.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        container.removeEventListener('wheel', onWheel);
      }
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isExpanded, interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full select-none cursor-grab active:cursor-grabbing ${className}`}
    />
  );
}

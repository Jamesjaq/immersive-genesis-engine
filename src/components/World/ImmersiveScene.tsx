import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import { OrbitControls, Float, Environment, Html, Stars } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import * as THREE from "three";

type PortalProps = {
  label: string;
  to: string;
  position: [number, number, number];
};

function Portal({ label, to, position }: PortalProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const nav = useNavigate();

  const handleOver = () => {
    if (!meshRef.current) return;
    gsap.to(meshRef.current.scale, { x: 1.15, y: 1.15, z: 1.15, duration: 0.25, ease: "power2.out" });
  };
  const handleOut = () => {
    if (!meshRef.current) return;
    gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.3, ease: "power2.out" });
  };
  const handleClick = () => {
    if (meshRef.current) {
      gsap.fromTo(meshRef.current.material as any, { opacity: 1 }, { opacity: 0.3, duration: 0.2, yoyo: true, repeat: 1 });
    }
    nav(to);
  };

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color().setStyle(`hsl(var(--primary))`),
    transparent: true,
    opacity: 0.9,
    roughness: 0.2,
    metalness: 0.7,
    transmission: 0.6,
    thickness: 1.2,
  }), []);

  return (
    <group position={position}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
        <mesh
          ref={meshRef}
          onPointerOver={handleOver}
          onPointerOut={handleOut}
          onClick={handleClick}
        >
          <torusKnotGeometry args={[0.6, 0.18, 220, 32]} />
          <primitive object={material} attach="material" />
        </mesh>
        <Html center>
          <div className="glass px-3 py-1 rounded-md text-sm">{label}</div>
        </Html>
      </Float>
    </group>
  );
}

function ParallaxField() {
  const group = useRef<THREE.Group>(null!);
  // Lightweight parallax via pointer position
  // useFrame is not imported here to minimize bundle; slight tilt handled via CSS layer
  return (
    <group ref={group}>
      <mesh position={[0, -2.5, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20, 64, 64]} />
        <meshBasicMaterial color={new THREE.Color().setStyle(`hsl(var(--muted))`)} wireframe opacity={0.12} transparent />
      </mesh>
    </group>
  );
}

export default function ImmersiveScene() {
  return (
    <div className="relative h-[70vh] md:h-[80vh] rounded-lg overflow-hidden bg-aurora">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 1.5, 6], fov: 60 }}>
        <Suspense fallback={
          <Html center>
            <div className="glass px-4 py-2 rounded-md animate-pulse">Loading world…</div>
          </Html>
        }>
          <color attach="background" args={[new THREE.Color().setStyle(`hsl(var(--background))`)]} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Environment preset="city" />
          <Stars radius={60} depth={40} count={3000} factor={2} saturation={0} fade speed={1} />

          <ParallaxField />

          <Portal label="Services" to="/services" position={[-2.5, 0, 0]} />
          <Portal label="Search" to="/search" position={[0, 0.3, 0]} />
          <Portal label="Chat" to="/chat" position={[2.5, 0, 0]} />
          <Portal label="Account" to="/account" position={[-1.2, -1, -0.5]} />
          <Portal label="Payments" to="/payments" position={[1.2, -1, -0.5]} />

          <OrbitControls enablePan={false} minDistance={3} maxDistance={10} />
        </Suspense>
      </Canvas>

      <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-center gap-3">
        <div className="glass rounded-full px-3 py-2 text-xs md:text-sm">
          Tip: Hover portals to energize. Click to enter.
        </div>
      </div>
    </div>
  );
}

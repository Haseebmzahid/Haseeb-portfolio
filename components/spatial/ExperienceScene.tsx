"use client";
import { useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { experiences } from "@/constants/experience.data";

function OrbitNode({
  index,
  animate,
  onSelect,
  onHover,
  portal,
}: {
  portal: RefObject<HTMLElement>;
  index: number;
  animate: boolean;
  onSelect: (index: number) => void;
  onHover: (value: boolean) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const phase = useRef((index * Math.PI * 2) / 5 + 0.38);
  const entry = experiences[index];
  const position = (angle: number): [number, number, number] => [
    Math.cos(angle) * 4.3,
    Math.sin(angle) * 2.9,
    Math.sin(angle + 0.7) * 0.8,
  ];
  useFrame((_, delta) => {
    if (animate) phase.current += Math.min(delta, 0.05) * 0.075;
    ref.current?.position.set(...position(phase.current));
  });
  return (
    <group ref={ref} position={position((index * Math.PI * 2) / 5 + 0.38)}>
      <mesh>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial
          color="#d5e7f1"
          emissive="#7591a5"
          emissiveIntensity={0.25}
        />
      </mesh>
      <Html portal={portal} center zIndexRange={[20, 10]}>
        <button
          className="orbit-node"
          onClick={() => onSelect(index)}
          onPointerEnter={() => onHover(true)}
          onPointerLeave={(event) =>
            onHover(event.currentTarget === document.activeElement)
          }
          onFocus={() => onHover(true)}
          onBlur={(event) => onHover(event.currentTarget.matches(":hover"))}
          aria-controls={`experience-${index}`}
        >
          <span>
            {entry.number} / {entry.type} · {entry.period}
          </span>
          <strong>{entry.role}</strong>
          <small>{entry.org}</small>
        </button>
      </Html>
    </group>
  );
}
export default function ExperienceScene({
  animate,
  onSelect,
  onHover,
}: {
  animate: boolean;
  onSelect: (index: number) => void;
  onHover: (value: boolean) => void;
}) {
  const [portalRoot, setPortalRoot] = useState<HTMLDivElement | null>(null);
  const portal = useMemo(() => ({ current: portalRoot! }), [portalRoot]);
  return (
    <div className="experience-webgl">
      <div ref={setPortalRoot} className="orbit-label-layer" />
      {portalRoot && (
        <Canvas
          camera={{ position: [0, 0, 12.8], fov: 39 }}
          dpr={[1, 1.5]}
          frameloop={animate ? "always" : "demand"}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          aria-label="Five experience nodes orbiting Haseeb's portrait in three-dimensional space"
        >
          <ambientLight intensity={1.1} />
          <pointLight position={[2, 4, 6]} intensity={65} color="#dcecff" />
          <pointLight position={[-4, -2, 3]} intensity={35} />
          {[0, 1, 2].map((i) => (
            <mesh
              key={i}
              rotation={[0.35 + i * 0.18, -0.2 + i * 0.2, i * 0.2]}
              scale={[1, 0.66, 1]}
            >
              <torusGeometry args={[3.7 + i * 0.2, 0.012, 8, 128]} />
              <meshStandardMaterial
                color="#687582"
                roughness={0.28}
                metalness={0.85}
              />
            </mesh>
          ))}
          {experiences.map((_, i) => (
            <OrbitNode
              key={i}
              index={i}
              portal={portal}
              animate={animate}
              onSelect={onSelect}
              onHover={onHover}
            />
          ))}
        </Canvas>
      )}
    </div>
  );
}

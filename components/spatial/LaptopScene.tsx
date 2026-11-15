"use client";

import {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  type RefObject,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import { projects } from "@/constants/projects.data";
import * as THREE from "three";

const displays = projects.map((p) => `/displays/${p.screen}.svg`);

function DisplayMaterial({
  project,
  materialRef,
}: {
  project: number;
  materialRef: RefObject<THREE.MeshBasicMaterial | null>;
}) {
  const texture = useTexture(displays[project], (loaded) => {
    loaded.colorSpace = THREE.SRGBColorSpace;
    loaded.anisotropy = 4;
  });
  return (
    <meshBasicMaterial ref={materialRef} map={texture} toneMapped={false} />
  );
}

function Keyboard() {
  const keys = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const matrix = new THREE.Matrix4();
    for (let i = 0; i < 72; i++) {
      const bottomRow = i >= 65;
      matrix.makeScale(i === 68 ? 7 : 1, 1, 1);
      matrix.setPosition(
        bottomRow
          ? [-2.61, -2.175, -1.74, 0, 1.74, 2.175, 2.61][i - 65]
          : ((i % 13) - 6) * 0.435,
        -1.308,
        bottomRow ? 1.1 : -0.45 + Math.floor(i / 13) * 0.31,
      );
      keys.current!.setMatrixAt(i, matrix);
    }
    keys.current!.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={keys} args={[undefined, undefined, 72]}>
      <boxGeometry args={[0.37, 0.035, 0.25]} />
      <meshStandardMaterial color="#171b21" roughness={0.68} />
    </instancedMesh>
  );
}

function Laptop({
  project,
  animate,
  onReady,
}: {
  project: number;
  animate: boolean;
  onReady: () => void;
}) {
  const group = useRef<THREE.Group>(null);
  const screen = useRef<THREE.MeshBasicMaterial>(null);
  const lastProject = useRef(project);
  const initialTexture = useTexture(displays[0], (loaded) => {
    loaded.colorSpace = THREE.SRGBColorSpace;
    loaded.anisotropy = 4;
  });
  useEffect(() => {
    onReady();
    const prefetch = window.setTimeout(
      () => displays.slice(1).forEach((url) => useTexture.preload(url)),
      250,
    );
    return () => window.clearTimeout(prefetch);
  }, [onReady]);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 0.05);
    g.scale.setScalar(animate ? THREE.MathUtils.damp(g.scale.x, 1, 4, d) : 1);
    const scroll = Math.min(
      window.scrollY / Math.max(window.innerHeight, 1),
      1,
    );
    g.rotation.y = THREE.MathUtils.damp(
      g.rotation.y,
      animate ? -0.19 + state.pointer.x * 0.13 + scroll * 0.12 : -0.19,
      4,
      d,
    );
    g.rotation.x = THREE.MathUtils.damp(
      g.rotation.x,
      animate ? 0.045 + state.pointer.y * 0.035 : 0.045,
      4,
      d,
    );
    g.position.y = THREE.MathUtils.damp(
      g.position.y,
      animate
        ? Math.sin(state.clock.elapsedTime * 0.55) * 0.055 - scroll * 0.15
        : 0,
      3,
      d,
    );
    if (screen.current) {
      if (lastProject.current !== project) {
        screen.current.color.setScalar(0.35);
        lastProject.current = project;
      }
      screen.current.color.lerp(
        new THREE.Color(1, 1, 1),
        animate ? Math.min(d * 5, 1) : 1,
      );
    }
  });
  return (
    <group ref={group} rotation={[0.045, -0.19, 0]} scale={animate ? 0.88 : 1}>
      <RoundedBox
        args={[6.7, 0.16, 4.25]}
        radius={0.055}
        smoothness={4}
        position={[0, -1.45, 0.83]}
      >
        <meshStandardMaterial
          color="#a2a9b2"
          metalness={0.88}
          roughness={0.27}
        />
      </RoundedBox>
      <RoundedBox
        args={[6.63, 0.045, 4.15]}
        radius={0.015}
        position={[0, -1.35, 0.83]}
      >
        <meshStandardMaterial
          color="#8e97a3"
          metalness={0.83}
          roughness={0.32}
        />
      </RoundedBox>
      <Keyboard />
      <RoundedBox
        args={[2.15, 0.017, 1.02]}
        radius={0.006}
        position={[0, -1.319, 2.15]}
      >
        <meshStandardMaterial
          color="#626f7e"
          metalness={0.76}
          roughness={0.35}
        />
      </RoundedBox>
      <mesh position={[0, -1.31, -1.13]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.105, 0.105, 5.8, 24]} />
        <meshStandardMaterial color="#515965" metalness={0.9} roughness={0.3} />
      </mesh>
      <group position={[0, -1.37, -1.12]} rotation={[-0.13, 0, 0]}>
        <RoundedBox
          args={[6.65, 4.28, 0.13]}
          radius={0.05}
          smoothness={4}
          position={[0, 2.14, 0]}
        >
          <meshStandardMaterial
            color="#9da6b0"
            metalness={0.9}
            roughness={0.24}
          />
        </RoundedBox>
        <RoundedBox
          args={[6.48, 4.11, 0.035]}
          radius={0.01}
          position={[0, 2.15, 0.084]}
        >
          <meshStandardMaterial color="#0b0d11" roughness={0.3} />
        </RoundedBox>
        <mesh position={[0, 2.17, 0.109]}>
          <planeGeometry args={[6.15, 3.844]} />
          <Suspense
            fallback={
              <meshBasicMaterial map={initialTexture} toneMapped={false} />
            }
          >
            <DisplayMaterial project={project} materialRef={screen} />
          </Suspense>
        </mesh>
        <mesh position={[0, 4.142, 0.115]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#2e3c47" />
        </mesh>
      </group>
      {[0, 1].map((i) => (
        <mesh key={i} position={[-3.354, -1.435, 0.4 + i * 0.45]}>
          <boxGeometry args={[0.012, 0.045, 0.22]} />
          <meshStandardMaterial color="#252b31" />
        </mesh>
      ))}
    </group>
  );
}

export default function LaptopScene({
  project,
  animate,
  onReady,
}: {
  project: number;
  animate: boolean;
  onReady: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 3.4, 12.5], fov: 37 }}
      dpr={[1, 1.5]}
      frameloop={animate ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      aria-label={`Three dimensional aluminium laptop displaying ${projects[project].title}`}
    >
      <RoundedBox
        args={[7.15, 0.08, 4.65]}
        radius={0.035}
        position={[0, -1.82, 0.8]}
      >
        <meshPhysicalMaterial
          color="#bdceda"
          transparent
          opacity={0.1}
          roughness={0.08}
          metalness={0}
          clearcoat={1}
          transmission={0}
          thickness={0.2}
          ior={1.35}
        />
      </RoundedBox>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 8, 5]} intensity={3} color="#e3efff" />
      <directionalLight position={[-5, 2, -1]} intensity={2} color="#b9c6d9" />
      <Suspense fallback={null}>
        <Environment resolution={128} frames={1}>
          <Lightformer
            position={[0, 5, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[10, 10, 1]}
            intensity={3}
          />
          <Lightformer
            position={[-5, 1, 2]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[3, 8, 1]}
            intensity={4}
          />
          <Lightformer
            position={[6, 2, 1]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[2, 6, 1]}
            intensity={3}
          />
        </Environment>
        <Laptop project={project} animate={animate} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}

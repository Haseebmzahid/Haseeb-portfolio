"use client";
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

type SceneProps = {
  variant: "health" | "mobile" | "agent";
  screen: string;
  step: number;
  animate: boolean;
  onReady: () => void;
};
const white = new THREE.Color(1, 1, 1);

function Phone({ variant, screen, step, animate, onReady }: SceneProps) {
  const ref = useRef<THREE.Group>(null);
  const glass = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);
  const previous = useRef(screen);
  const textures = useTexture(
    variant === "health"
      ? ["/displays/foreseeme-phone-0.svg", "/displays/foreseeme-phone-1.svg"]
      : ["/displays/finflow-capture.jpeg"],
    (loaded) => {
      for (const t of loaded) {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 4;
        if (variant === "mobile") {
          const slice = (844 / 390) * (237 / 1580);
          t.repeat.set(1, slice);
          t.offset.set(
            0,
            (step === 0 ? 1 / 3 : step === 1 ? 0 : 2 / 3) + (1 / 3 - slice) / 2,
          );
        }
      }
    },
  );
  const texture =
    textures[variant === "health" && screen.includes("-1.svg") ? 1 : 0];
  useEffect(() => {
    onReady();
  }, [onReady, texture]);
  useFrame((state, delta) => {
    if (!ref.current) return;
    const d = Math.min(delta, 0.05);
    ref.current.rotation.y = THREE.MathUtils.damp(
      ref.current.rotation.y,
      -0.18 + (animate ? state.pointer.x * 0.13 : 0),
      4,
      d,
    );
    ref.current.rotation.z = THREE.MathUtils.damp(
      ref.current.rotation.z,
      -0.065 + (animate ? state.pointer.y * 0.025 : 0),
      4,
      d,
    );
    ref.current.position.y = animate
      ? Math.sin(state.clock.elapsedTime * 0.55) * 0.055
      : 0;
    if (glass.current && animate)
      glass.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 0.22) * 0.06;
    if (material.current) {
      if (previous.current !== screen) {
        material.current.color.setScalar(0.5);
        previous.current = screen;
      }
      material.current.color.lerp(white, animate ? Math.min(d * 6, 1) : 1);
    }
  });
  return (
    <group position={[2.2, 0, 0]}>
      <group ref={glass} position={[0.15, 0, -0.7]} rotation={[0.05, 0.1, 0]}>
        <RoundedBox
          args={[3.5, 4.7, 0.065]}
          radius={0.025}
          rotation={[0, 0.12, 0.15]}
        >
          <meshPhysicalMaterial
            color={variant === "health" ? "#cbdccf" : "#c0d9e4"}
            transparent
            opacity={0.12}
            roughness={0.14}
            metalness={0}
            clearcoat={1}
          />
        </RoundedBox>
        <mesh rotation={[0.3, 0.25, -0.12]}>
          <torusGeometry args={[2.55, 0.012, 8, 128]} />
          <meshStandardMaterial
            color={variant === "health" ? "#87a28e" : "#708d9f"}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>
      </group>
      <group ref={ref} rotation={[0, -0.18, -0.065]}>
        <RoundedBox args={[2.58, 5.5, 0.22]} radius={0.095} smoothness={5}>
          <meshStandardMaterial
            color={variant === "health" ? "#bdc7c0" : "#77838e"}
            metalness={0.88}
            roughness={0.2}
          />
        </RoundedBox>
        <RoundedBox
          args={[2.49, 5.37, 0.06]}
          radius={0.025}
          position={[0, 0, 0.14]}
        >
          <meshStandardMaterial color="#060a0c" roughness={0.25} />
        </RoundedBox>
        <mesh position={[0, 0, 0.177]}>
          <planeGeometry args={[2.36, 5.108]} />
          <meshBasicMaterial ref={material} map={texture} toneMapped={false} />
        </mesh>
        <RoundedBox
          args={[0.68, 0.13, 0.025]}
          radius={0.01}
          position={[0, 2.4, 0.195]}
        >
          <meshBasicMaterial color="#060a0c" />
        </RoundedBox>
        <mesh position={[0.2, 2.4, 0.211]}>
          <circleGeometry args={[0.025, 16]} />
          <meshBasicMaterial color="#15242e" />
        </mesh>
        <mesh position={[-1.307, 0.9, 0]}>
          <boxGeometry args={[0.035, 0.48, 0.09]} />
          <meshStandardMaterial
            color="#7d8b8c"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[1.307, 0.6, 0]}>
          <boxGeometry args={[0.035, 0.65, 0.09]} />
          <meshStandardMaterial
            color="#7d8b8c"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, -2.38, 0.189]}>
          <planeGeometry args={[0.75, 0.035]} />
          <meshBasicMaterial
            color={variant === "health" ? "#809687" : "#718792"}
          />
        </mesh>
      </group>
    </group>
  );
}

function AgentNetwork({ step, animate, onReady }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const particle = useRef<THREE.Mesh>(null);
  const progress = useRef(0);
  const points = useMemo(
    () =>
      [-4, -2, 0, 2, 4].map(
        (x, i) => new THREE.Vector3(x, -2.38 + (i % 2) * 0.15, (i % 2) * 0.3),
      ),
    [],
  );
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);
  const geometry = useMemo(
    () => new THREE.BufferGeometry().setFromPoints(curve.getPoints(100)),
    [curve],
  );
  useEffect(() => {
    onReady();
    return () => geometry.dispose();
  }, [onReady, geometry]);
  useFrame((state, delta) => {
    if (animate)
      progress.current = (progress.current + Math.min(delta, 0.05) * 0.13) % 1;
    if (particle.current)
      curve.getPointAt(
        animate ? progress.current : step / 4,
        particle.current.position,
      );
    if (group.current)
      group.current.rotation.y = animate
        ? Math.sin(state.clock.elapsedTime * 0.2) * 0.035
        : 0;
  });
  return (
    <group ref={group}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial color="#5d7793" transparent opacity={0.75} />
      </lineSegments>
      {points.map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <sphereGeometry args={[i === step ? 0.18 : 0.12, 24, 24]} />
            <meshStandardMaterial
              color={i === step ? "#d7e4ee" : "#506579"}
              metalness={0.75}
              roughness={0.19}
            />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 4]}>
            <torusGeometry args={[0.34, 0.016, 8, 40]} />
            <meshStandardMaterial
              color={i === step ? "#bfd3e5" : "#40556c"}
              metalness={0.7}
              roughness={0.28}
            />
          </mesh>
        </group>
      ))}
      <mesh ref={particle}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#e4f3ff" />
      </mesh>
    </group>
  );
}

export default function ProductScene(props: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 37 }}
      dpr={[1, 1.5]}
      frameloop={props.animate ? "always" : "demand"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      aria-label={
        props.variant === "agent"
          ? "Three dimensional message routing and appointment workflow"
          : "Three dimensional mobile product with an attached interface screen"
      }
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[-3, 6, 5]} intensity={3} color="#e8f1ff" />
      <directionalLight position={[5, 2, 1]} intensity={2} />
      <Suspense fallback={null}>
        <Environment frames={1} resolution={64}>
          <Lightformer
            position={[0, 4, 2]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={[8, 8, 1]}
            intensity={3}
          />
          <Lightformer
            position={[-4, 0, 3]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[2, 8, 1]}
            intensity={4}
          />
        </Environment>
        {props.variant === "agent" ? (
          <AgentNetwork {...props} />
        ) : (
          <Phone {...props} />
        )}
      </Suspense>
    </Canvas>
  );
}

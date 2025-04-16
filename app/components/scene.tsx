"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const SpinningCube = () => {
  const cubeMeshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (cubeMeshRef.current) {
      cubeMeshRef.current.rotation.x += 0.01;
      cubeMeshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={cubeMeshRef}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
};

const Sphere = () => {
  return (
    <mesh position={[1, 1, 0]}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

const Scene = () => {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      {/* <ambientLight intensity={0.5} /> */}
      {/* <pointLight position={[30, 30, 30]} /> */}
      <SpinningCube />
      <Sphere />
      {/* <OrbitControls /> */}
    </Canvas>
  );
};

export default Scene;

"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const AutoBoxHelpers = () => {
  const { scene } = useThree();

  useEffect(() => {
    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        const helper = new THREE.BoxHelper(object, 0xff0000);
        scene.add(helper);
      }
    });
  }, [scene]);

  return null;
};

const CustomModel = ({ path }: { path: string }) => {
  const { scene } = useGLTF(path); // path to your model

  const cloned = scene.clone(true); // clone the model so we can modify it

  // Override all materials in the model
  cloned.traverse((child: any) => {
    if ((child as THREE.Mesh).isMesh) {
      (child as THREE.Mesh).position.set(0, 0, 0); // set position to origin
      (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
        color: "green",
      });
    }
  });

  return <primitive object={cloned} position={[0, 0, 0]} />;
};

const TexturedModel = ({ path }: { path: string }) => {
  const { scene } = useGLTF(path);

  return <primitive object={scene} position={[0, 0, 0]} />;
};

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
      <meshStandardMaterial color="green" metalness={1} roughness={0.1} />
    </mesh>
  );
};

const Sphere = () => {
  return (
    <mesh position={[0.5, 0, 0]}>
      <sphereGeometry args={[0.2, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};
const Scene = () => {
  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[1, 1, 0]} intensity={20} />
      <SpinningCube />
      <Sphere />
      {/* <CustomModel path="/5.glb" /> */}
      {/* <TexturedModel path="/dog.glb" /> */}
      <OrbitControls />
      <axesHelper args={[5]} />
      <gridHelper args={[10, 10]} />
      <AutoBoxHelpers />
      <Environment preset="sunset" background />
    </Canvas>
  );
};

export default Scene;

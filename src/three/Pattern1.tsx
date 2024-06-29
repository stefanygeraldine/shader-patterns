import * as THREE from "three";
import { IObjectProps } from "../types.ts";
import flagVertexShader from "../shaders/pattern1/vertex.glsl";
import flagFragmentShader from "../shaders/pattern1/fragment.glsl";
import { forwardRef, useImperativeHandle, useRef } from "react";

const Pattern1 = forwardRef((props: IObjectProps, ref) => {
  const { scene } = props;
  const meshRef = useRef<THREE.Mesh>();

  const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
  const count = geometry.attributes.position.count;
  const randoms = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    randoms[i] = Math.random();
  }
  geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
  const material = new THREE.RawShaderMaterial({
    vertexShader: flagVertexShader,
    fragmentShader: flagFragmentShader,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.y = 2 / 3;
  meshRef.current = mesh;

  useImperativeHandle(ref, () => ({
    updatePositionAndSize: (
      width: number,
      height: number,
      x: number,
      y: number,
    ) => {
      // Positioning the planes
      if (meshRef.current) {
        meshRef.current.geometry.dispose();
        meshRef.current.geometry = new THREE.PlaneGeometry(width, height);

        meshRef.current.position.x = x;
        meshRef.current.position.y = y;
        scene.add(meshRef.current);
      }
    },
  }));

  return null;
});

export default Pattern1;

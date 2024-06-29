import * as THREE from "three";
import { IObjectProps } from "../types.ts";
import flagVertexShader from "../shaders/flag/vertex.glsl";
import flagFragmentShader from "../shaders/flag/fragment.glsl";
import { forwardRef, useImperativeHandle, useRef } from "react";
import MyTexture from "../assets/textures/gradients/texture.png";

const FlagShader = forwardRef((props: IObjectProps, ref) => {
  const { scene } = props;
  const textureLoader = new THREE.TextureLoader();
  const meshRef = useRef<THREE.Mesh>();

  textureLoader.load(MyTexture, (texture) => {
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
      uniforms: {
        uFrequency: { value: new THREE.Vector2(10, 5) },
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("orange") },
        uTexture: { value: texture },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.y = 2 / 3;
    meshRef.current = mesh;
  });

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

export default FlagShader;

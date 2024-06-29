import * as THREE from "three";
import { IObjectProps } from "../types.ts";
import flagVertexShader from "../shaders/pattern11/vertex.glsl";
import flagFragmentShader from "../shaders/pattern11/fragment.glsl";
import { forwardRef, useImperativeHandle } from "react";

const Pattern2 = forwardRef((props: IObjectProps, ref) => {
  const { scene } = props;

  const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
  const material = new THREE.RawShaderMaterial({
    vertexShader: flagVertexShader,
    fragmentShader: flagFragmentShader,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.y = 2 / 3;

  useImperativeHandle(ref, () => ({
    updatePositionAndSize: (
      width: number,
      height: number,
      x: number,
      y: number,
    ) => {
      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(width, height);

      mesh.position.x = x;
      mesh.position.y = y;
      scene.add(mesh);
    },
  }));

  return null;
});

export default Pattern2;

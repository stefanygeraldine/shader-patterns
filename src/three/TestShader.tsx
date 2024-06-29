import * as THREE from "three";
import { IObjectProps } from "../types.ts";
import testVertexShader from "../shaders/test/vertex.glsl";
import testFragmentShader from "../shaders/test/fragment.glsl";

const TestShader = (props: IObjectProps) => {
  const { scene } = props;

  const geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
  const count = geometry.attributes.position.count;
  const randoms = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    randoms[i] = Math.random();
  }
  geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
  const material = new THREE.RawShaderMaterial({
    vertexShader: testVertexShader,
    fragmentShader: testFragmentShader,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
};

export default TestShader;

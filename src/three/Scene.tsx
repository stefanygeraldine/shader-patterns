import { useEffect, useRef } from "react";
import * as THREE from "three";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import FlagShader from "./FlagShader.tsx";

import useSize from "../hooks/useSize.ts";
import TestShader from "./TestShader.tsx";
import Pattern1 from "./Pattern1.tsx";
import Pattern3 from "./Pattern3.tsx";
import Pattern2 from "./Pattern2.tsx";
import Pattern7 from "./Pattern7.tsx";
import Pattern8 from "./Pattern8.tsx";
import Pattern11 from "./Pattern11.tsx";

interface FlagShader {
  updateTime: (elapsedTime: number) => void;
}

const scene = new THREE.Scene();
// Canvas
const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//renderer.setClearAlpha(0);

const getAspectRatio = () => window.innerWidth / window.innerHeight;
// Base camera
document.body.appendChild(renderer.domElement);
const groupCamera = new THREE.Group();
scene.add(groupCamera);

const camera = new THREE.OrthographicCamera(
  -getAspectRatio(),
  getAspectRatio(),
  1,
  -1,
  0.1,
  1000,
);
camera.position.z = 10;

groupCamera.add(camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

function Scene() {
  const { innerWidth, innerHeight, devicePixelRatio } = useSize();
  const flagShaderRef1 = useRef<FlagShader | null>(null);
  const flagShaderRef2 = useRef<FlagShader | null>(null);
  const flagShaderRef3 = useRef<FlagShader | null>(null);
  const flagShaderRef4 = useRef<FlagShader | null>(null);
  const flagShaderRef5 = useRef<FlagShader | null>(null);
  const flagShaderRef6 = useRef<FlagShader | null>(null);
  const flagShaderRef7 = useRef<FlagShader | null>(null);
  const flagShaderRef8 = useRef<FlagShader | null>(null);
  const flagShaderRef9 = useRef<FlagShader | null>(null);

  const shadersRows = [
    [flagShaderRef1, flagShaderRef2, flagShaderRef3],
    [flagShaderRef4, flagShaderRef5, flagShaderRef6],
    [flagShaderRef7, flagShaderRef8, flagShaderRef9],
  ];

  const calculetePlanesPosition = () => {
    const numPlanes = 3;
    const planeWidth = (2 * getAspectRatio()) / numPlanes;
    const planeHeight = 2 / numPlanes;

    // Create and position planes
    shadersRows.forEach((row, rowPosition) => {
      row.forEach((ref, colPosition) => {
        // Positioning the planes
        const positionX = (colPosition - numPlanes / 2 + 0.5) * planeWidth;
        const positionY = (numPlanes / 2 - rowPosition - 0.5) * planeHeight;

        if (ref.current) {
          // @ts-ignore
          ref.current?.updatePositionAndSize(
            planeWidth,
            planeHeight,
            positionX,
            positionY,
          );
        }
      });
    });
  };

  const tick = () => {
    // Update controls
    controls.update();

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  };

  useEffect(() => {
    tick();
    setTimeout(() => {
      calculetePlanesPosition();
    }, 1000);
  }, []);

  useEffect(() => {
    // Update camera
    camera.left = -getAspectRatio();
    camera.right = getAspectRatio();
    camera.top = 1;
    camera.bottom = -1;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(innerWidth, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    calculetePlanesPosition();
  }, [innerWidth, innerHeight, devicePixelRatio]);

  return (
    <>
      <TestShader scene={scene} ref={flagShaderRef1} />
      <FlagShader scene={scene} ref={flagShaderRef2} />
      <Pattern1 scene={scene} ref={flagShaderRef3} />
      <Pattern2 scene={scene} ref={flagShaderRef4} />
      <Pattern3 scene={scene} ref={flagShaderRef5} />
      <Pattern7 scene={scene} ref={flagShaderRef6} />
      <Pattern8 scene={scene} ref={flagShaderRef7} />
      <Pattern11 scene={scene} ref={flagShaderRef8} />
      <TestShader scene={scene} ref={flagShaderRef9} />
    </>
  );
}

export default Scene;

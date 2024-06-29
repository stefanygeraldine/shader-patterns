import { IObjectProps } from "../types.ts";
import * as THREE from "three";
const EnvironmentMap =(props: IObjectProps) => {
  const { scene} = props;
  /**
   * Loaders
   */
// ...
  const cubeTextureLoader = new THREE.CubeTextureLoader()
  /**
   * Environment map
   */
// LDR cube texture
  const environmentMap = cubeTextureLoader.load([
    'environmentMaps/0/px.png',
    'environmentMaps/0/nx.png',
    'environmentMaps/0/py.png',
    'environmentMaps/0/ny.png',
    'environmentMaps/0/pz.png',
    'environmentMaps/0/nz.png'
  ])

  scene.environment = environmentMap
  scene.background = environmentMap

  return null
};

export default EnvironmentMap;

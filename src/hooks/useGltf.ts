import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from "three";

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()

const useGltfLoader = (modelUrl: string, scene: THREE.Scene, scale: THREE.Vector3): void =>{
    console.log(`/threejs-envoirement-map/assets/${modelUrl}`)
    gltfLoader.load(
        `${modelUrl}`,
        (gltf) =>

        {
            gltf.scene.scale.copy(scale)
            scene.add(gltf.scene)
        },
    (progress) => {
        console.error('on progress', progress);
    },
        (error) => {
            console.error('An error occurred', error);
        }
    )
}
export default useGltfLoader
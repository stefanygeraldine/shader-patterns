uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;
attribute vec2 uv;

varying vec2 vUv;


void main() {
    vec4 modelPosition = modelMatrix *  vec4(position, 1.0);
    // Flag waves
    //modelPosition.z += sin(modelPosition.x * 10.0);
    //modelPosition.z += aRandom;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    vUv = uv;
}
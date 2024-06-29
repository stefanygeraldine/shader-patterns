precision mediump float;


uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vRandom;

void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    float border = 0.05; // Adjust this to change the thickness of the border
    vec3 borderColor = vec3(1.0, 0.0, 0.0); // This is the color of the border

    // Check if we are near the edge of the texture
    if (vUv.x < border || vUv.y < border || vUv.x > 1.0 - border || vUv.y > 1.0 - border) {
        gl_FragColor = vec4(borderColor, 1.0);
    } else {
        gl_FragColor = vec4(0.5, vRandom, 1.0, 1.0);
    }
}

const scene = new THREE.Scene();

// Mesh
/**
 * Made out of:
 * geometry (shape) and material(color)
 */

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
    color: "#ff0000"
});

const mesh = new THREE.Mesh(geometry, material);
// don't forget to add to the scene
scene.add(mesh);

// Camera
// First parameter: Field of View
// Second Parameter: Aspect ratio

const sizes = {
    width: 800,
    height: 600
};
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
camera.position.x = 2;
scene.add(camera);

let canvas = document.querySelector(".webgl");
// Create renderer by pulling canvas from html
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
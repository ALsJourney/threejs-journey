import './style.css'
import * as THREE from 'three';
import gsap from 'gsap';


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 * Creating an infinite Loop
 * window.AnimationFrame(tick)
 * need a frame every 16ms for 60 fps
 * Adaptation to the framerate
 */
let time = Date.now();
/*
const tick = () => {

    // Fixing problem for too high
    // Framerate Monitors

    const currentTime = Date.now();
    const deltaTime = currentTime + time;
    time = currentTime;

    // Update projects
    mesh.rotation.y += 0.0001 * deltaTime;
    // Render
    renderer.render(scene, camera);

    // Calling tick again on the next frame
    window.requestAnimationFrame(tick);
}
tick();
 */

// Less complicated: Using Clock


// Using no loops for animations: GSAP
// Move to a certain point with a certain delay

gsap.to(mesh.position,
    {
        duration: 1,
        delay: 1,
        x: 2
    });

const clock = new THREE.Clock();

const tick = () =>
{
    //const elapsedTime = clock.getElapsedTime();

    //mesh.position.y = Math.sin(elapsedTime);
    //mesh.position.x = Math.cos(elapsedTime);
    //camera.position.x = Math.cos(elapsedTime);
    //camera.position.y = Math.sin(elapsedTime);
    //camera.lookAt(mesh.position);


    // Render
    renderer.render(scene, camera);

    // Calling tick again on the next frame
    window.requestAnimationFrame(tick);
}
tick();

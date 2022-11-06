import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4)
directionalLight.position.set(2, 2, -1)
gui.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
gui.add(directionalLight.position, 'x').min(-5).max(5).step(0.001)
gui.add(directionalLight.position, 'y').min(-5).max(5).step(0.001)
gui.add(directionalLight.position, 'z').min(-5).max(5).step(0.001)
scene.add(directionalLight)

// Enable cast shadows on light
directionalLight.castShadow = true;

// console.log(directionalLight.shadow);

directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;


// DirectionalLight uses orthographic camera
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;

directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.radius = 10;


const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(directionalLightCameraHelper);
directionalLightCameraHelper.visible = false

// Spotlight
const spotlight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3);

spotlight.castShadow = true;

spotlight.position.set(0, 2, 2);

scene.add(spotlight);
scene.add(spotlight.target);

const spotlightCameraHelper = new THREE.CameraHelper(spotlight.shadow.camera);
scene.add(spotlightCameraHelper);

// Quality of shadows
spotlight.shadow.mapSize.width = 1024;
spotlight.shadow.mapSize.height = 1024;

// spotlight is using perspectiveCamera, that's why we have fov
spotlight.shadow.camera.fov = 30;

spotlight.shadow.camera.near = 1;
spotlight.shadow.camera.far = 6;

spotlightCameraHelper.visible = false;

// Pointlight
const pointLight = new THREE.PointLight(0xffffff, 0.3);

pointLight.castShadow = true;
pointLight.position.set(-1, 1, 0);


scene.add(pointLight);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(pointLightCameraHelper);

pointLight.shadow.mapSize.width = 1024
pointLight.shadow.mapSize.height = 1024

pointLight.shadow.camera.near = 0.1
pointLight.shadow.camera.far = 5

pointLightCameraHelper.visible = false;


/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial( {side: THREE.DoubleSide})
material.roughness = 0.7
gui.add(material, 'metalness').min(0).max(1).step(0.001)
gui.add(material, 'roughness').min(0).max(1).step(0.001)

/**
 * Baking textures
 */

const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load('/textures/bakedShadow.jpg');
const simpleShadow = textureLoader.load('/textures/simpleShadow.jpg')

/**
 * Objects
 */
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)

// Enable Shadows
sphere.castShadow = true;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    /*new THREE.MeshBasicMaterial({
        map: bakedShadow
    })
     */
    material
);
plane.rotation.x = -Math.PI * 0.5
plane.position.y = -0.5
// Enabling shadows to be received

plane.receiveShadow = true;

const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        alphaMap: simpleShadow
    })
)
sphereShadow.rotation.x = -Math.PI * 0.5
sphereShadow.position.y = plane.position.y + 0.01

scene.add(sphere, plane, sphereShadow)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Enabling shadows
renderer.shadowMap.enabled = false;

// Shadow map algorithm
// Less performant but even softer edges
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()


    // Update the sphere
    sphere.position.x = Math.cos(elapsedTime) * 1.5
    sphere.position.z = Math.sin(elapsedTime) * 1.5
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 2.69))

    // Update the shadow
    sphereShadow.position.x = sphere.position.x
    sphereShadow.position.z = sphere.position.z
    sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
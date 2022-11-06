import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui';
import {MeshStandardMaterial} from "three";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

/**
 * Debug
 */

const gui = new dat.GUI();


// Scene
const scene = new THREE.Scene()

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
//const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')


const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])


// const material = new THREE.MeshBasicMaterial
/*
const material = new THREE.MeshNormalMaterial(
    {
        //map: doorColorTexture,
        //color: '#ff0000',
        //wireframe: true,
        //transparent: true,
        //alphaMap:  doorAlphaTexture,
        side: THREE.DoubleSide,
        flatShading: true,
        //opacity: 0.8,
    }
);
 */
/*const matcapTexture = textureLoader.load('/textures/matcaps/2.png')
const matcapTexture = textureLoader.load('/textures/matcaps/3.png')
const matcapTexture = textureLoader.load('/textures/matcaps/4.png')
const matcapTexture = textureLoader.load('/textures/matcaps/5.png')
const matcapTexture = textureLoader.load('/textures/matcaps/6.png')
const matcapTexture = textureLoader.load('/textures/matcaps/7.png')

 */
/*
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')

const material = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,

})
 */
// const material = new THREE.MeshDepthMaterial();

// For lights
// const material = new THREE.MeshLambertMaterial()


/**
 * Lights
 */
/*
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

 */
/*
const material = new THREE.MeshPhongMaterial()
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
material.shininess = 100
material.specular = new THREE.Color(0x1188ff)
scene.add(pointLight)
 */

/*
const material = new THREE.MeshToonMaterial({
    gradientMap: gradientTexture,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    generateMipmaps: false,

})
 */
/*
const material = new THREE.MeshStandardMaterial({
    side: THREE.DoubleSide,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
    //metalness: 0,
    //roughness: 1,
    map: doorColorTexture,
    normalMap: doorNormalTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.05,
    transparent: true,
    alphaMap: doorAlphaTexture,

});
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4


scene.add(pointLight)

gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);


 */

// Need lights for this too
const material = new MeshStandardMaterial({
    metalness: 0.7,
    roughness: 0.2,
    side: THREE.DoubleSide,
    envMap: environmentMapTexture,
});

gui.add(material, 'metalness').min(0).max(1).step(0.0001);
gui.add(material, 'roughness').min(0).max(1).step(0.0001);

const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
scene.add(pointLight);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
);

const plane = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(1, 1, 100, 100),
    material
);
plane.position.x = -1.5;

const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(0.3, 0.2, 64, 128),
    material
);

torus.position.x = 1.5;
scene.add(sphere, plane, torus);

sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))


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

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = 0.15 * elapsedTime;
    plane.rotation.x = 0.15 * elapsedTime;
    torus.rotation.x = 0.15 * elapsedTime;

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
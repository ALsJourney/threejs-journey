import './style.css'
import * as THREE from 'three'
import {AxesHelper} from "three";

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
/*
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// Position is a Vector3 Object
mesh.position.x = 1.5;
console.log(mesh.position.length());
// You can normalize its values (meaning that you will
// reduce the length of the vector to 1 unit but preserve its direction):
mesh.position.normalize();
mesh.position.set(0.7,-0.6,1);
/**
 * Scaling: Default to 1, Vector3 Object
 */

//mesh.scale.set(2,0.25,0.5);
/**
 * Rotation: Euler
 * You can imagine putting a stick through your object's center
 * in the axis's direction and then rotation that object on the stick
 * If you spin on the y axis, you can picture it like a carousel.
 * If you spin on the x axis, you can imagine that you are rotating the wheels of a car you'd be in.
 * And if you rotate on the z axis, you can imagine that you are rotating the propellers in front of an aircraft you'd be in.
 */

/*
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.y = Math.PI * 0.25;
 */

/**
 * Quarternions
 * We will not cover how quaternions work in this lesson
 * but keep in mind that the quaternion updates when you
 * change the rotation. This means that you can use any one
 * of the two as you please.
 */




// Add mesh to scene

//scene.add(mesh)


/**
 * Objects Group
 */

const group = new THREE.Group();
group.scale.y = 2;
group.rotation.y = 0.2;
scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
);

cube1.position.x = -1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
);
cube2.position.x = 0;
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
);

cube3.position.x = 1.5;
group.add(cube3);





/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
//console.log(mesh.position.distanceTo(camera.position));

/**
 * LookAt()
 * Automatically rotates its -z axis toward the target you provided.
 * No complicated maths needed
 */
//camera.lookAt(new THREE.Vector3(0, -1, 0));
//camera.lookAt(mesh.position);

camera.position.z = 3
scene.add(camera)

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
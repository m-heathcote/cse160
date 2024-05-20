import * as THREE from 'three';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import * as Shapes from "./Shapes.js"
import * as SetUp from "./SetUp.js"

var showLightHelper = false;

export function createDoor() {
  // load the MTL file
  const mtlLoader = new MTLLoader();
  mtlLoader.load('../objs/RoundedDoor/materials.mtl', (mtl) => {
    mtl.preload();

    // load the OBJ file
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('../objs/RoundedDoor/model.obj', (root) => {
      // scale
      const scaleFactor = 12;
      root.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // rotate
      root.rotation.y = - Math.PI;

      // move
      const newPosition = new THREE.Vector3(0, 2.8, 3.8);
      root.position.copy(newPosition);

      // add to scene
      SetUp.scene.add(root);
    });
  });
}

function createWindow(pos, rot) {
  // load the MTL file
  const mtlLoader = new MTLLoader();
  mtlLoader.load('../objs/Window/materials.mtl', (mtl) => {
    mtl.preload();

    // load the OBJ file
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('../objs/Window/model.obj', (root) => {
      // scale
      const scaleFactor = 4;
      root.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // rotate
      root.rotation.y = rot;

      // move
      root.position.copy(pos);

      // add to scene
      SetUp.scene.add(root);
    });
  });
}

export function createWindows() {
  var pos = new THREE.Vector3(0.8, 17, 3.5);
  createWindow(pos, Math.PI / 2);

  var pos = new THREE.Vector3(-1.5, 8.2, 3.2);
  createWindow(pos, Math.PI / 2);

  var pos = new THREE.Vector3(-3.65, 14.5, 0);
  createWindow(pos, Math.PI);

  var pos = new THREE.Vector3(3.15, 11.5, -0.6);
  createWindow(pos, - Math.PI);

  var pos = new THREE.Vector3(0.2, 18, -3.65);
  createWindow(pos, Math.PI / 2);

  var pos = new THREE.Vector3(-1.15, 5.8, -3.15);
  createWindow(pos, Math.PI / 2);
}

function loadGLB(path) {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

  return new Promise((resolve, reject) => {
    loader.load(path, (gltf) => {
      const model = gltf.scene;
  
      // Add the model to the scene
      SetUp.scene.add(model);
  
      console.log("returning model");
  
      resolve(model);
  
    }, undefined, (error) => {
      console.error(error);
  
      reject(error);
    });
  });
}

export function createFrog() {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

  /*
  const model = loadGLB('../objs/Frog/Frog.glb');

  loadGLB('../objs/Frog/Frog.glb')
  .then((model) => {
    console.log("Frog model loaded:", model);

    // set position, scale, and rotation
    model.position.set(1.1, -17.25, 0); // x, y, z coordinates
    model.rotation.y = - Math.PI / 2;
    model.scale.set(0.1, 0.1, 0.1); // x, y, z scale factors

    // add to swing pivot
    Shapes.left_pivot.add(model);
  })
  .catch((error) => {
    console.error("Error occurred while loading the frog model:", error);
  });
  */

  loader.load('../objs/Frog/Frog.glb', (gltf) => {
    const model = gltf.scene;

    // set position, scale, and rotation
    model.position.set(1.1, -17.25, 0); // x, y, z coordinates
    model.rotation.y = - Math.PI / 2;
    model.scale.set(0.1, 0.1, 0.1); // x, y, z scale factors

    // Add the model to the scene
    SetUp.scene.add(model);

    // add to swing pivot
    Shapes.left_pivot.add(model);
  }, undefined, (error) => {
    console.error(error);
  });
}

export function createLanturn() {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

  loader.load('../objs/Lights/PostLantern.glb', (gltf) => {
    const model = gltf.scene;

    // Change the position of the model
    model.position.set(3, 0, 5.5); // x, y, z coordinates

    // Change the scale of the model
    model.scale.set(1.8, 1.8, 1.8); // x, y, z scale factors

    // Add the model to the scene
    SetUp.scene.add(model);
  }, undefined, (error) => {
    console.error(error);
  });

  // create a point light (for the lantern light)
  const color = 0xF6D45D;
  const intensity = 10;
  const distance = 15;
  const pointLight = new THREE.PointLight(color, intensity, distance);
  pointLight.position.set(3, 4, 7.4);

  SetUp.scene.add(pointLight);

  if (showLightHelper) {
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    SetUp.scene.add(pointLightHelper);
  }
}
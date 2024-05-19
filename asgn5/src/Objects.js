import * as THREE from 'three';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
import * as SetUp from "./SetUp.js"

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

export function createLanturn() {
  console.log("...");
}
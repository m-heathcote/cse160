import * as THREE from 'three';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
import {MTLLoader} from 'three/addons/loaders/MTLLoader.js';
import * as SetUp from "./SetUp.js"


export function createBookshelf() {
  // load the MTL file
  const mtlLoader = new MTLLoader();
  mtlLoader.load('../objs/Shelf1/materials.mtl', (mtl) => {
    mtl.preload();

    // load the OBJ file
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('../objs/Shelf1/model.obj', (root) => {
      // create different material
      const material = new THREE.MeshPhongMaterial({color: 0x956D56});

      // apply new material to each mesh in the object
      root.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = material;
        }
      });

      // scale
      const scaleFactor = 5.5;
      root.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // rotate
      root.rotation.y = Math.PI / 4

      // move
      const newPosition = new THREE.Vector3(6.4, 2, -6.4);
      root.position.copy(newPosition);

      // add to scene
      SetUp.scene.add(root);
    });
  });
}

export function createBooks() {
  // load the MTL file
  const mtlLoader = new MTLLoader();
  mtlLoader.load('../objs/Books/materials.mtl', (mtl) => {
    mtl.preload();

    // load the OBJ file
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('../objs/Books/model.obj', (root) => {
      // scale
      const scaleFactor = 4.5;
      root.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // rotate
      root.rotation.y = - Math.PI / 4

      // move
      const newPosition = new THREE.Vector3(6.2, 1.5, -6.2);
      root.position.copy(newPosition);

      // add to scene
      SetUp.scene.add(root);
    });
  });
}
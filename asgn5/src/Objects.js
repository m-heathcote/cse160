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

export function createFrog() {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

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

export function createMat() {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

  loader.load('../objs/Mat/DoorMat.glb', (gltf) => {
    const model = gltf.scene;

    // set position, scale, and rotation
    model.position.set(-0.5, 0, 6); // x, y, z coordinates
    model.rotation.y = - Math.PI / 2;
    model.scale.set(0.09, 0.09, 0.08); // x, y, z scale factors

    // Add the model to the scene
    SetUp.scene.add(model);

  }, undefined, (error) => {
    console.error(error);
  });
}

export function createFrame1() {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

  loader.load('../objs/Frame/PictureFrame.glb', (gltf) => {
    const model = gltf.scene;

    // set position, scale, and rotation
    //model.position.set(4.1, 5.3, 2.5); // x, y, z coordinates
    model.position.set(5.6, 3, 3.1); // x, y, z coordinates
    //model.rotation.y = - Math.PI / 2;
    model.scale.set(3.2, 3.2, 2.3); // x, y, z scale factors

    // Add the model to the scene
    SetUp.scene.add(model);

  }, undefined, (error) => {
    console.error(error);
  });

  // create an image to go in the frame
  const width = 1;
  const height = 1;
  const widthSegments = 1;
  const heightSegments = 1;
  const plane_geo = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);

  //const photo = Shapes.makeInstTextured(plane_geo, '../imgs/toby-dilly-2.png', 1);
  const photo = Shapes.makeInstTextured(plane_geo, '../imgs/toby-dilly-4.png', 1);
  //photo.position.set(4.18, 5.35, 2.4);
  photo.position.set(5.68, 3.05, 3);
  photo.rotation.y = Math.PI / 2;
  photo.scale.set(1.4, 1.4, 1.4);
}

export function createFrame2() {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

  loader.load('../objs/Frame/PictureFrame.glb', (gltf) => {
    const model = gltf.scene;

    // set position, scale, and rotation
    //model.position.set(5.6, 3.5, 1.5); // x, y, z coordinates
    model.position.set(5.6, 2.5, 1.15); // x, y, z coordinates
    //model.rotation.y = - Math.PI / 2;
    model.scale.set(3.2, 3.2, 2.3); // x, y, z scale factors

    // Add the model to the scene
    SetUp.scene.add(model);

  }, undefined, (error) => {
    console.error(error);
  });

  // create an image to go in the frame
  const width = 1;
  const height = 1;
  const widthSegments = 1;
  const heightSegments = 1;
  const plane_geo = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);

  //const photo = Shapes.makeInstTextured(plane_geo, '../imgs/frog.png', 1);
  const photo = Shapes.makeInstTextured(plane_geo, '../imgs/fergus-2.png', 1);
  //photo.position.set(5.68, 3.55, 1.4);
  photo.position.set(5.68, 2.55, 1.05);
  photo.rotation.y = Math.PI / 2;
  photo.scale.set(1.4, 1.4, 1.4);
}

function createLanturn(x, y, z) {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

  loader.load('../objs/Lights/PostLantern.glb', (gltf) => {
    const model = gltf.scene;

    // Change the position of the model
    model.position.set(x, y, z); // x, y, z coordinates

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
  pointLight.position.set(x, y + 3.9, z + 1.9);

  SetUp.scene.add(pointLight);

  if (showLightHelper) {
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    SetUp.scene.add(pointLightHelper);
  }
}

export function createAllLanturns() {
  createLanturn(3, 0, 5.5);
  createLanturn(-8, 0, 15);
  createLanturn(4, 0, 25);
  createLanturn(-6.5, 0, 40.5);
}

export function createHangingLanturn() {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

  loader.load('../objs/Lights/HangingLantern.glb', (gltf) => {
    const model = gltf.scene;

    // Change the position of the model
    model.position.set(-6, 19.8, 0); // x, y, z coordinates

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
  pointLight.position.set(-6, 18.2, 0);

  SetUp.scene.add(pointLight);

  if (showLightHelper) {
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    SetUp.scene.add(pointLightHelper);
  }
}

function createBulb(x, y, z) {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

  loader.load('../objs/Lights/LightBulb.glb', (gltf) => {
    const model = gltf.scene;

    // Change the position of the model
    model.position.set(x, y, z);

    // Change the scale of the model
    model.scale.set(0.2, 0.2, 0.2); // x, y, z scale factors

    // Add the model to the scene
    SetUp.scene.add(model);

  }, undefined, (error) => {
    console.error(error);
  });

  // create a point light (for the bulb light)
  const color = 0xF6D45D;
  const intensity = 10;
  const distance = 15;
  const pointLight = new THREE.PointLight(color, intensity, distance);
  pointLight.position.set(x, y, z);

  SetUp.scene.add(pointLight);

  if (showLightHelper) {
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    SetUp.scene.add(pointLightHelper);
  }
}

export function createAllBulbs() {
  createBulb(11, 13.3, 0.5);
  createBulb(19.5, 13.3, 0.5);

  createBulb(15.25, 13.3, 5);
  createBulb(15.25, 13.3, -4);
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function createPartialForest(x, y, z, rot) {
  // load the MTL file
  const mtlLoader = new MTLLoader();
  mtlLoader.load('../objs/Forest/PUSHILIN_forest.mtl', (mtl) => {
    mtl.preload();

    // load the OBJ file
    const objLoader = new OBJLoader();
    objLoader.setMaterials(mtl);
    objLoader.load('../objs/Forest/PUSHILIN_forest.obj', (root) => {
      // scale
      const scaleFactor = 22;
      root.scale.set(scaleFactor, scaleFactor, scaleFactor);

      // rotate
      root.rotation.y = toRadians(rot);

      // move
      const newPosition = new THREE.Vector3(x, y, z);
      root.position.copy(newPosition);

      // add to scene
      SetUp.scene.add(root);
    });
  });
}

export function createForest() {
  // right, left
  createPartialForest(75, 6, 0, -60);
  createPartialForest(-75, 6, 0, 120);

  // front, back
  createPartialForest(0, 6, 75, 30);
  createPartialForest(0, 6, -75, 210);

  // right corners
  createPartialForest(50, 6, -50, -15);
  createPartialForest(50, 6, 50, 75);

  // left corners
  createPartialForest(-50, 6, -50, 75);
  createPartialForest(-50, 6, 50, 165);
}

function createRocksRight(x, y, z, rot) {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

  loader.load('../objs/Rocks/Rocks-6.glb', (gltf) => {
    const model = gltf.scene;

    // set position, scale, and rotation
    //model.position.set(0, 0, 35.5); // x, y, z coordinates
    //model.rotation.y = - toRadians(90);
    //model.scale.set(7, 7, 7); // x, y, z scale factors

    model.position.set(7 + x, 0 + y, 34 + z); // x, y, z coordinates
    model.rotation.y = - toRadians(70) + toRadians(rot);
    model.scale.set(7, 7, 7); // x, y, z scale factors

    // Add the model to the scene
    SetUp.scene.add(model);

  }, undefined, (error) => {
    console.error(error);
  });
}

function createRocksLeft(x, y, z, rot) {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

  loader.load('../objs/Rocks/Rocks-6.glb', (gltf) => {
    const model = gltf.scene;

    // set position, scale, and rotation
    //model.position.set(-6, 0, 1); // x, y, z coordinates
    //model.rotation.y = toRadians(90);
    //model.scale.set(7, 7, 7); // x, y, z scale factors

    model.position.set(-11 + x, 0 + y, 4 + z); // x, y, z coordinates
    model.rotation.y = toRadians(110) + toRadians(rot);
    model.scale.set(7, 7, 7); // x, y, z scale factors

    // Add the model to the scene
    SetUp.scene.add(model);

  }, undefined, (error) => {
    console.error(error);
  });
}

export function createPath() {
  createRocksRight(0, 0, -1, 0);
  createRocksLeft(0, 0, -1, 0);
  createRocksRight(-2, 0, 18, 0);
  createRocksLeft(8, 0, 14.5, -5);
  createRocksRight(1, 0, 32.8, 0);
  //createRocksRight(4, 0, 34, 0);
}

export function createTable() {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

  var x = 20;
  var y = 2.5;
  var z = 17;

  loader.load('../objs/Table/BarTable.glb', (gltf) => {
    const model = gltf.scene;

    // Change the position and rotation of the model
    model.position.set(x, y, z); // x, y, z coordinates
    model.rotation.y = toRadians(-20);

    // Change the scale of the model
    var s = 5;
    model.scale.set(s, s, s); // x, y, z scale factors

    // Add the model to the scene
    SetUp.scene.add(model);
  }, undefined, (error) => {
    console.error(error);
  });

  // create a point light (for the lantern light)
  const color = 0xF6D45D;
  const intensity = 5;
  const distance = 8;
  const pointLight = new THREE.PointLight(color, intensity, distance);
  pointLight.position.set(x, y + 1.5, z - 1.5);

  SetUp.scene.add(pointLight);

  if (showLightHelper) {
    const pointLightHelper = new THREE.PointLightHelper(pointLight);
    SetUp.scene.add(pointLightHelper);
  }
}

export var fireLight;
export function createFirePit() {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

  var x = -22;
  var y = 0.5;
  var z = 22;

  loader.load('../objs/Fire/Bonfire.glb', (gltf) => {
    const model = gltf.scene;

    // Change the position and rotation of the model
    model.position.set(x, y, z); // x, y, z coordinates
    //model.rotation.y = toRadians(-20);

    // Change the scale of the model
    var s = 20;
    model.scale.set(s, s, s); // x, y, z scale factors

    // Add the model to the scene
    SetUp.scene.add(model);
  }, undefined, (error) => {
    console.error(error);
  });

  // create a point light
  var fireLit = true;
  if (fireLit) {
    const color = 0xF6D45D;
    const intensity = 5;
    const distance = 5;
    fireLight = new THREE.PointLight(color, intensity, distance);
    fireLight.position.set(x, y + 1, z);

    SetUp.scene.add(fireLight);

    if (showLightHelper) {
      const pointLightHelper = new THREE.PointLightHelper(fireLight);
      SetUp.scene.add(pointLightHelper);
    }
  }
}

// why did it take me this long to create this function
function createGLB(path, x, y, z, s, rot) {
  // GLTFLoader to load the .glb file
  const loader = new GLTFLoader();

  loader.load(path, (gltf) => {
    const model = gltf.scene;

    // Change the position and rotation of the model
    model.position.set(x, y, z); // x, y, z coordinates
    model.rotation.y = toRadians(rot);

    // Change the scale of the model
    model.scale.set(s, s, s); // x, y, z scale factors

    // Add the model to the scene
    SetUp.scene.add(model);
  }, undefined, (error) => {
    console.error(error);
  });
}

export function createLogAndShrooms() {
  createGLB('../objs/Fire/Log.glb', -26, 1, 15, 10, 110);
  createGLB('../objs/Fire/Mushrooms.glb', -33.5, 1.5, 18, 5, 150);
  createGLB('../objs/Fire/Mushrooms.glb', -32, 0.8, 15, 3, 70);

  createGLB('../objs/Fire/Mushrooms.glb', 5, 1.5, -2, 5.5, 25);
  createGLB('../objs/Fire/Mushrooms.glb', -5, 0.8, -4, 3, 110);

  //createGLB('../objs/Fire/Mushrooms.glb', 5.5, 1, 26.5, 3, 110);
}

export function createAnimals() {
  createGLB('../objs/Animals/Hedgehog.glb', -27, 2.65, 16.2, 0.028, 20);
  createGLB('../objs/Animals/Ladybug.glb', -24.8, 1.8, 14.9, 0.045, 0);
  createGLB('../objs/Animals/Ant.glb', -25.2, 1.7, 15.7, 0.02, 90);
  createGLB('../objs/Animals/Ant.glb', -25.9, 1.8, 15.55, 0.02, 60);
  createGLB('../objs/Animals/Ant.glb', -24, 1.4, 15.75, 0.02, 100);
  createGLB('../objs/Animals/CottontailRabbit.glb', -23.5, 1.7, 14.45, 0.4, 20);
  createGLB('../objs/Animals/BearCub.glb', -30, 2.3, 25, 0.08, 100);
  createGLB('../objs/Animals/Fox.glb', -26, 0, 29, 0.9, 130);
  createGLB('../objs/Animals/Duck.glb', 18, 1.7, 23.3, 0.25, 160);
  createGLB('../objs/Animals/Skunk.glb', 24.3, 1.6, 15.4, 0.65, -20);
  createGLB('../objs/Animals/Mouse.glb', 16, 0, 15, 0.8, 20);
  createGLB('../objs/Animals/Deer-Male.glb', 18.6, 3.77, 8, 0.056, -40);
  createGLB('../objs/Animals/Deer-Female.glb', 16, 3.2, 5.5, 0.092, -15);
  createGLB('../objs/Animals/Squirrell.glb', 5.2, 22.3, 1, 1.5, 100);
}
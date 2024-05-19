import * as THREE from 'three';
import * as SetUp from "./SetUp.js"


export function createPlane() {
  const planeSize = 50;

  // texture loader
  const loader = new THREE.TextureLoader();
  const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.magFilter = THREE.NearestFilter;
  const repeats = planeSize / 2;
  texture.repeat.set(repeats, repeats);

  // create plane and add texture
  const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
  const planeMat = new THREE.MeshPhongMaterial({
    map: texture,
    side: THREE.DoubleSide,
  });

  // mesh
  const mesh = new THREE.Mesh(planeGeo, planeMat);
  mesh.rotation.x = Math.PI * - .5;
  SetUp.scene.add(mesh);
}

// make a geometry object and add it to the scene
function makeInstance(geometry, color) {
  // create a material and set its color
  // MeshPhongMaterial IS affected by lights
  const material = new THREE.MeshPhongMaterial({color});

  // create a mesh
  // (combines: geometry, material, and position/orientation/scale)
  const shape = new THREE.Mesh(geometry, material);
  
  // add mesh to scene
  SetUp.scene.add(shape);

  return shape;
}

// make a textured geometry object and add it to the scene
function makeInstTextured(geometry, path, num) {
  // load the texture
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(path);

  // configure repeating pattern
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(num, num);

  // create a material with the texture
  const material = new THREE.MeshPhongMaterial({map: texture});

  // create a mesh
  // (combines: geometry, material, and position/orientation/scale)
  const shape = new THREE.Mesh(geometry, material);
  
  // add mesh to scene
  SetUp.scene.add(shape);

  return shape;
}

// function to get the side lengths of an isosceles right triangle if you know the hypotenuse
function getSide(hypotenuse) {
  return Math.sqrt(Math.pow(hypotenuse, 2) / 2);
}

// function to get the hypotenuse of an isosceles right triangle if you know the side lengths
function getHypotenuse(side) {
  return Math.sqrt(2 * Math.pow(side, 2));
}

export function createWalls() {
  // define size
  const size = 20;
  const height = size * 0.8;
  const thickness = 0.4;

  // (width, height, depth)
  const floor_geo = new THREE.BoxGeometry(size, thickness, size);
  const wall_geo = new THREE.BoxGeometry(size, height, thickness);
  const corner_geo = new THREE.BoxGeometry(thickness, height, thickness);

  const floor = makeInstTextured(floor_geo, '../imgs/wood.png', 5);
  //const floor = makeInstance(floor_geo, 0x877057); // dark brown
  const r_wall = makeInstance(wall_geo, 0xC4ACDF); // light purple
  const l_wall = makeInstance(wall_geo, 0xC4ACDF);
  const corner = makeInstance(corner_geo, 0XC4ACDF);

  // rotate
  floor.rotation.y = Math.PI / 4;    // 45 degrees
  r_wall.rotation.y = - Math.PI / 4; // -45 degrees
  l_wall.rotation.y = Math.PI / 4;   // 45 degrees
  corner.rotation.y = Math.PI / 4;    // 45 degrees
  
  // move y
  floor.position.y = thickness/2;
  r_wall.position.y = height/2;
  l_wall.position.y = height/2;
  corner.position.y = height/2;
  
  // move xz
  const shift1 = getSide(size/2);
  const shift2 = getSide(thickness/2);
  const shift3 = getHypotenuse(size/2);
  const shift4 = getHypotenuse(thickness/2);

  r_wall.position.x = shift1 + (shift2);
  r_wall.position.z = (-1 * shift1) - (shift2);
  
  l_wall.position.x = (-1 * shift1) - (shift2);
  l_wall.position.z = (-1 * shift1) - (shift2);
  
  corner.position.z = (-1 * shift3) - (shift4);
}

export var d20;
export var d12;

export function createDice() {
  // -- D20 --
  //var d20;
	// (radius, detail)
  const d20_geo = new THREE.IcosahedronGeometry(0.22, 0);

  d20 = makeInstance(d20_geo, 0xA73265);

  // move
  var newPosition = new THREE.Vector3(4.4, 5.89, -8.3);
  d20.position.copy(newPosition);

  // -- D12 --
  //var d12;
	// (radius, detail)
  const d12_geo = new THREE.DodecahedronGeometry(0.17, 0);

  d12 = makeInstance(d12_geo, 0xA73265);

  // move
  newPosition = new THREE.Vector3(5.4, 5.86, -7.9);
  d12.position.copy(newPosition);
}

export function createGround() {
  // define size
  const radius = 100;
  const segments = 40;

  // create circle
  const grass_geo = new THREE.CircleGeometry(radius, segments);
  const grass = makeInstTextured(grass_geo, '../imgs/grass-2.png', 4);
  grass.rotation.x = - Math.PI / 2;  // -90 degrees
}

export function createBigTree() {
  // create geomentry
  const cube_geo = new THREE.BoxGeometry(1, 1, 1);

  // create instances
  const c_trunk_1 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 2);
  const c_trunk_2 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);

  const r_trunk_1 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const r_trunk_2 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const r_trunk_3 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const r_trunk_4 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const r_trunk_5 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const r_trunk_6 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const r_trunk_7 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const r_trunk_8 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);

  const l_trunk_1 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const l_trunk_2 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const l_trunk_3 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const l_trunk_4 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const l_trunk_5 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const l_trunk_6 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const l_trunk_7 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);

  const f_trunk_1 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const f_trunk_2 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const f_trunk_3 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);

  const b_trunk_1 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const b_trunk_2 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const b_trunk_3 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const b_trunk_4 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const b_trunk_5 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);

  const r_branch_1 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const r_branch_2 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const r_branch_3 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);

  const rr_branch_1 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);

  const l_branch_1 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const l_branch_2 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);
  const l_branch_3 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);

  const r_leaves_1 = makeInstTextured(cube_geo, '../imgs/grass-8.jpg', 1);
  const r_leaves_2 = makeInstTextured(cube_geo, '../imgs/grass-8.jpg', 1);
  const r_leaves_3 = makeInstTextured(cube_geo, '../imgs/grass-8.jpg', 1);
  const r_leaves_4 = makeInstTextured(cube_geo, '../imgs/grass-8.jpg', 1);
  const r_leaves_5 = makeInstTextured(cube_geo, '../imgs/grass-8.jpg', 1);

  const l_leaves_1 = makeInstTextured(cube_geo, '../imgs/grass-8.jpg', 1);
  const l_leaves_2 = makeInstTextured(cube_geo, '../imgs/grass-8.jpg', 1);
  const l_leaves_3 = makeInstTextured(cube_geo, '../imgs/grass-8.jpg', 1);
  const l_leaves_4 = makeInstTextured(cube_geo, '../imgs/grass-8.jpg', 1);
  
  const rr_leaves_1 = makeInstTextured(cube_geo, '../imgs/grass-8.jpg', 1);
  const rr_leaves_2 = makeInstTextured(cube_geo, '../imgs/grass-8.jpg', 1);
  const rr_leaves_3 = makeInstTextured(cube_geo, '../imgs/grass-8.jpg', 1);
  const rr_leaves_4 = makeInstTextured(cube_geo, '../imgs/grass-8.jpg', 1);

  // trunk base coords
  const x = 0;
  const y = 0;
  const z = 0;

  // center
  c_trunk_1.scale.set(6, 25, 6);
  c_trunk_1.position.set(x, y + (c_trunk_1.scale.y*0.49), z);
  //c_trunk_2.scale.set(4.5, 1.5, 4.5);
  //c_trunk_2.position.set(x, y + (c_trunk_2.scale.y*0.49) + 24.5, z);

  // right
  r_trunk_1.scale.set(4, 6.6, 4.4);
  r_trunk_1.position.set(x + 2, y + (r_trunk_1.scale.y*0.49), z + 1.5);
  r_trunk_2.scale.set(4, 4.5, 4);
  r_trunk_2.position.set(x + 3.5, y + (r_trunk_2.scale.y*0.49), z + 2);
  r_trunk_3.scale.set(2, 1.5, 3);
  r_trunk_3.position.set(x + 5.5, y + (r_trunk_3.scale.y*0.49), z + 2);
  r_trunk_4.scale.set(2.5, 1, 1.5);
  r_trunk_4.position.set(x + 6, y + (r_trunk_4.scale.y*0.49), z + 2);
  r_trunk_5.scale.set(2, 10, 3.5);
  r_trunk_5.position.set(x + 2.5, y + (r_trunk_5.scale.y*0.49), z + 1.5);

  r_trunk_6.scale.set(2, 10, 5);
  r_trunk_6.position.set(x + 2.5, y + (r_trunk_6.scale.y*0.49) + 13, z);
  r_trunk_7.scale.set(2, 7.5, 4.5);
  r_trunk_7.position.set(x + 3.5, y + (r_trunk_7.scale.y*0.49) + 14.5, z);
  r_trunk_8.scale.set(3, 5, 3.5);
  r_trunk_8.position.set(x + 4.5, y + (r_trunk_8.scale.y*0.49) + 16, z + 0.2);

  // left
  l_trunk_1.scale.set(2, 8, 3.5);
  l_trunk_1.position.set(x - 3.5, y + (l_trunk_1.scale.y*0.49) + 5, z);
  l_trunk_2.scale.set(2, 6, 4);
  l_trunk_2.position.set(x - 4, y + (l_trunk_2.scale.y*0.49) + 2, z);
  l_trunk_3.scale.set(3, 6, 4.5);
  l_trunk_3.position.set(x - 4, y + (l_trunk_3.scale.y*0.49), z);

  l_trunk_4.scale.set(1, 12, 4.5);
  l_trunk_4.position.set(x - 3, y + (l_trunk_4.scale.y*0.49) + 5, z);
  l_trunk_5.scale.set(1, 8.1, 5);
  l_trunk_5.position.set(x - 3.5, y + (l_trunk_5.scale.y*0.49), z);
  l_trunk_6.scale.set(2, 6.1, 5.5);
  l_trunk_6.position.set(x - 3.5, y + (l_trunk_6.scale.y*0.49), z);

  l_trunk_7.scale.set(2, 4, 2.5);
  l_trunk_7.position.set(x - 5.25, y + (l_trunk_7.scale.y*0.49), z + 0.7);

  // front
  //f_trunk_1.scale.set(2, 3.5, 1.5);
  //f_trunk_1.position.set(x - 1, y + (f_trunk_1.scale.y*0.49), z + 2.6);
  f_trunk_1.scale.set(3, 6, 2);
  f_trunk_1.position.set(x - 1, y + (f_trunk_1.scale.y*0.49), z + 2.65);
  f_trunk_2.scale.set(2, 8, 1.5);
  f_trunk_2.position.set(x - 1, y + (f_trunk_2.scale.y*0.49) + 11, z + 2.7);
  f_trunk_3.scale.set(2, 8, 1.5);
  f_trunk_3.position.set(x + 1, y + (f_trunk_3.scale.y*0.49) + 15, z + 2.7);

  // back
  b_trunk_1.scale.set(2, 12, 1.5);
  b_trunk_1.position.set(x + 1, y + (b_trunk_1.scale.y*0.49) + 8, z - 2.8);
  b_trunk_2.scale.set(2, 12, 1.5);
  b_trunk_2.position.set(x - 1, y + (b_trunk_2.scale.y*0.49) + 12, z - 2.8);

  b_trunk_3.scale.set(3.5, 4, 1.5);
  b_trunk_3.position.set(x - 2, y + (b_trunk_3.scale.y*0.49), z - 3);
  b_trunk_4.scale.set(2.5, 3, 1.5);
  b_trunk_4.position.set(x - 1.7, y + (b_trunk_4.scale.y*0.49), z - 4);
  b_trunk_5.scale.set(1.5, 2, 1);
  b_trunk_5.position.set(x - 1.5, y + (b_trunk_5.scale.y*0.49), z - 4.6);

  // branch base coords
  const x2 = x;
  const y2 = y + 21;
  const z2 = z;

  // right branch
  r_branch_1.scale.set(4.8, 7, 4);
  r_branch_1.rotation.x = - Math.PI / 2;  // -90 degrees
  r_branch_1.position.set(x2 + 1, y2 + (r_branch_1.scale.y*0.49) - 1, z2 - 4);
  r_branch_2.scale.set(3, 8, 3.5);
  r_branch_2.position.set(x2 + 1, y2 + (r_branch_2.scale.y*0.49) + 2.5, z2 - 8);
  r_branch_3.scale.set(4, 4, 4);
  r_branch_3.position.set(x2 + 1, y2 + (r_branch_2.scale.y*0.49) - 0.5, z2 - 7);

  // *right* right branch
  rr_branch_1.scale.set(3.5, 6, 2.5);
  rr_branch_1.rotation.z = Math.PI / 2;  // 90 degrees
  rr_branch_1.position.set(x2 + 6, y2 + (rr_branch_1.scale.y*0.49) - 5, z2 + 0.2);

  // left branch
  l_branch_1.scale.set(4, 10, 4);
  l_branch_1.rotation.z = - Math.PI / 2;  // -90 degrees
  l_branch_1.position.set(x2 - 7, y2 + (l_branch_1.scale.y*0.49) - 4, z2 + 0.25);
  l_branch_2.scale.set(3.5, 8, 3.5);
  l_branch_2.position.set(x2 - 12, y2 + (l_branch_2.scale.y*0.49) + 0.5, z2 + 0.25);
  l_branch_3.scale.set(3, 5.5, 4.5);
  l_branch_3.position.set(x2 - 3, y2 + (l_branch_3.scale.y*0.49) -2, z2 + 0.25);

  // right leaves
  r_leaves_1.scale.set(12, 13, 12);
  r_leaves_1.position.set(x2 + 2, y2 + (r_leaves_1.scale.y*0.49) + 7.5, z2 - 8);
  r_leaves_2.scale.set(12, 11.5, 10.5);
  r_leaves_2.position.set(x2 + 4, y2 + (r_leaves_2.scale.y*0.49) + 6.5, z2 - 1);
  r_leaves_3.scale.set(11, 12, 11);
  r_leaves_3.position.set(x2, y2 + (r_leaves_3.scale.y*0.49) + 11, z2 - 12);
  r_leaves_4.scale.set(12, 13, 14.5);
  r_leaves_4.position.set(x2 - 3, y2 + (r_leaves_4.scale.y*0.49) + 8.5, z2 - 4.5);
  r_leaves_5.scale.set(9, 10, 9);
  r_leaves_5.position.set(x2 - 3, y2 + (r_leaves_5.scale.y*0.49) + 9.5, z2 + 3);

  // *right* right leaves
  rr_leaves_1.scale.set(8, 8, 8);
  rr_leaves_1.position.set(x2 + 11, y2 + (rr_leaves_1.scale.y*0.49) - 5, z2 + 1);
  rr_leaves_2.scale.set(11, 11, 11);
  rr_leaves_2.position.set(x2 + 15, y2 + (rr_leaves_2.scale.y*0.49) - 6, z2 + 0.5);
  rr_leaves_3.scale.set(10, 10, 10);
  rr_leaves_3.position.set(x2 + 19, y2 + (rr_leaves_3.scale.y*0.49) - 3, z2 - 3);
  rr_leaves_4.scale.set(8, 8, 8);
  rr_leaves_4.position.set(x2 + 22, y2 + (rr_leaves_4.scale.y*0.49) + 1, z2 - 6);

  // left leaves
  l_leaves_1.scale.set(12, 12, 12);
  l_leaves_1.position.set(x2 - 12.5, y2 + (l_leaves_1.scale.y*0.49) + 2, z2 + 0.75);
  l_leaves_2.scale.set(10, 10, 10);
  l_leaves_2.position.set(x2 - 16.5, y2 + (l_leaves_1.scale.y*0.49) + 5, z2 + 6);
  l_leaves_3.scale.set(8, 8, 8);
  l_leaves_3.position.set(x2 - 12.5, y2 + (l_leaves_3.scale.y*0.49) + 4, z2 - 4.5);
  l_leaves_4.scale.set(7, 7, 7);
  l_leaves_4.position.set(x2 - 20.5, y2 + (l_leaves_4.scale.y*0.49) + 10, z2 + 9);
  l_leaves_4.scale.set(9, 5, 9);
  l_leaves_4.position.set(x2 - 10.5, y2 + (l_leaves_4.scale.y*0.49) + 13, z2);
}
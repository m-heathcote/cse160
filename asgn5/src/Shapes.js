import * as THREE from 'three';
import * as SetUp from "./SetUp.js"

// make a geometry object and add it to the scene
export function makeInstance(geometry, color) {
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
export function makeInstTextured(geometry, path, num) {
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

export function createGround() {
  // define size
  const radius = 100;
  const segments = 32;

  // create circle
  const grass_geo = new THREE.CircleGeometry(radius, segments);
  const grass = makeInstTextured(grass_geo, '../imgs/grass-2.png', 5);
  grass.rotation.x = - Math.PI / 2;  // -90 degrees
}

export function createIsland() {
  // define size
  const rTop = 100;
  const rBottom = 92;
  const height = 10;
  const segments = 32;

  // create geometry
  const layer_geo = new THREE.CylinderGeometry(rTop, rBottom, height, segments);

  // create instances
  const layer_1 = makeInstTextured(layer_geo, '../imgs/grass-dirt.png', 1);
  
  // position
  layer_1.position.set(0, -5.06, 0);
}

export function createBigTree() {
  // create geomentry
  const cube_geo = new THREE.BoxGeometry(1, 1, 1);

  // create instances
  const c_trunk_1 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 2);
  //const c_trunk_2 = makeInstTextured(cube_geo, '../imgs/wood-3.jpg', 1);

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

export var left_pivot;
export var right_pivot;

export function createSwing() {
  // create cylinder geomentry
  const radiusTop = 0.11;
  const radiusBottom = 0.11;
  const height = 18;
  const radialSegments = 6; 
  const heightSegments = 1;
  const openEnded = false;  // Whether the ends of the cylinder are open or capped
  const cyl_geo = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded);

  // create cube geometry
  const cube_geo = new THREE.BoxGeometry(1, 1, 1);

  // create instances
  const left_rope = makeInstance(cyl_geo, 0x9F8F6B);
  const right_rope = makeInstance(cyl_geo, 0x9F8F6B);
  const seat = makeInstance(cube_geo, 0xC93218);

  // base coords for swing
  var x = -9.5;
  var y = 20;
  var z = 0.25;

  // create pivot points for the ropes
  left_pivot = new THREE.Object3D();
  right_pivot = new THREE.Object3D();

  // position the pivots
  left_pivot.position.set(x - 1.1, y, z);
  right_pivot.position.set(x + 1.1, y, z);

  // add the pivots to the scene
  SetUp.scene.add(left_pivot);
  SetUp.scene.add(right_pivot);

  // position the ropes relative to their pivots
  left_rope.position.set(0, -height / 2, 0);
  right_rope.position.set(0, -height / 2, 0);

  // scale the ropes
  left_rope.scale.set(1, 1, 1);
  right_rope.scale.set(1, 1, 1);

  // add the ropes to their pivots
  left_pivot.add(left_rope);
  right_pivot.add(right_rope);

  // scale and position the seat
  seat.scale.set(3, 0.35, 1.5);
  seat.position.set(1.1, -17.5, 0);
  left_pivot.add(seat);
}

export var fireflies = [];

function addFirefly() {
  // get randomized position
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  const size = THREE.MathUtils.randFloatSpread(2) + 1.5;

  // load glow texture
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('../imgs/glow.png');
	
	// use sprite because it appears the same from all angles
	var spriteMaterial = new THREE.SpriteMaterial( { 
		map: texture,
    color: 0xF9BE00,
    transparent: true,
    blending: THREE.AdditiveBlending
	});

	// create the sprite
  const sprite = new THREE.Sprite(spriteMaterial);
  var s = size * 0.6;
  sprite.scale.set(s, s, s); // Scale the sprite
  sprite.position.set(x, y + 40, z);
  SetUp.scene.add(sprite);

  // Add velocity for movement
  sprite.velocity = new THREE.Vector3(
    THREE.MathUtils.randFloatSpread(0.2),
    THREE.MathUtils.randFloatSpread(0.2),
    THREE.MathUtils.randFloatSpread(0.2)
  );

  // add to array
  fireflies.push(sprite);
}

export function addFireflies() {
  Array(180).fill().forEach(addFirefly);
}
import * as THREE from 'three';
import * as SetUp from "./SetUp.js"


export function createLights() {
  // -- Hemisphere Light --
  var h_skyColor = 0xC4E4FF; // light blue
  var h_groundColor = 0x596090; // grayish purple
  var h_intensity = 3;
  var h_light = new THREE.HemisphereLight(h_skyColor, h_groundColor, h_intensity);
  SetUp.scene.add(h_light);

  // -- Directional Light --
  var d_color = 0xFFFFFF;
  var d_intensity = 3;
  var d_light = new THREE.DirectionalLight(d_color, d_intensity);
  //d_light.position.set(5, 10, 2);
  d_light.position.set(-10, 10, 20);
  d_light.castShadow = true;
  d_light.shadow.mapSize.width = 512;  // Shadow map width
  d_light.shadow.mapSize.height = 512; // Shadow map height
  d_light.shadow.camera.near = 0.5;    // Near shadow camera distance
  d_light.shadow.camera.far = 50;      // Far shadow camera distance
  SetUp.scene.add(d_light);
  SetUp.scene.add(d_light.target);

  return([h_light, d_light]);
}
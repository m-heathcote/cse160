import * as THREE from 'three';
import * as SetUp from "./SetUp.js"

var showHelper = true;

export function createLights() {
  // -- Ambient Light --
  var a_color = 0x404040;
  var a_intensity = 0.5;
  const a_light = new THREE.AmbientLight(a_color, a_intensity); // Soft white light
  SetUp.scene.add(a_light);

  // -- Hemisphere Light --
  var h_skyColor = 0xC4E4FF; // light blue
  var h_groundColor = 0x596090; // grayish purple
  var h_intensity = 0.5;
  const h_light = new THREE.HemisphereLight(h_skyColor, h_groundColor, h_intensity);
  SetUp.scene.add(h_light);

  // -- Directional Light --
  var d_color = 0xFFFFFF;
  var d_intensity = 1;
  const d_light = new THREE.DirectionalLight(d_color, d_intensity);
  //d_light.position.set(-20, 10, 10);
  d_light.position.set(-30, 5, 30);
  SetUp.scene.add(d_light);
  SetUp.scene.add(d_light.target);

  if (showHelper) {
    // Add a helper to visualize the directional light
    const lightHelper = new THREE.DirectionalLightHelper(d_light, 5);
    SetUp.scene.add(lightHelper);
  }
}
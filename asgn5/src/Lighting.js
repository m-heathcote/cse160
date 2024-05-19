import * as THREE from 'three';
import { RectAreaLightUniformsLib } from '../three/RectAreaLightUniformsLib.js';
import { RectAreaLightHelper } from '../three/RectAreaLightHelper.js';
import * as SetUp from "./SetUp.js"

var showDirHelper = false;
var showRectHelpers = true;

function createRectLight(x, y, z, at) {
  // Create a RectAreaLight
  const rectLight = new THREE.RectAreaLight(0xFFD18C, 0.1, 2, 2); // Color, Intensity, Width, Height
  rectLight.position.set(x, y, z);

  if (at == 1) {
    rectLight.lookAt(x, y, z + 10);
  } else
  if (at == 2) {
    rectLight.lookAt(x - 10, y, z);
  } else
  if (at == 3) {
    rectLight.lookAt(x, y, z - 10);
  } else {
    rectLight.lookAt(x + 10, y, z);
  }
  
  SetUp.scene.add(rectLight);

  return rectLight;
}

function addRectLightHelper(light) {
  // Create a helper to visualize the RectAreaLight
  const helper = new RectAreaLightHelper(light);
  light.add(helper);
  SetUp.scene.add(helper);
}

export function createLights() {
  // -- Ambient Light --
  var a_color = 0x76629F;
  var a_intensity = 1;
  const a_light = new THREE.AmbientLight(a_color, a_intensity); // Soft white light
  SetUp.scene.add(a_light);

  // -- Hemisphere Light --
  var h_skyColor = 0x714C88;
  var h_groundColor = 0x4B5D3F;
  var h_intensity = 0.5;
  const h_light = new THREE.HemisphereLight(h_skyColor, h_groundColor, h_intensity);
  SetUp.scene.add(h_light);

  // -- Directional Light --
  var d_color = 0xFFFFFF;
  var d_intensity = 1;
  const d_light = new THREE.DirectionalLight(d_color, d_intensity);
  d_light.position.set(-50, 20, 20);
  SetUp.scene.add(d_light);
  SetUp.scene.add(d_light.target);

  if (showDirHelper) {
    // Add a helper to visualize the directional light
    const lightHelper = new THREE.DirectionalLightHelper(d_light, 5);
    SetUp.scene.add(lightHelper);
  }

  // -- Rect Area Lights (for the windows)
  RectAreaLightUniformsLib.init();
  const r_light_1 = createRectLight(0.8, 17, 3.5, 1);
  const r_light_2 = createRectLight(-1.5, 8.2, 3.2, 1);
  const r_light_3 = createRectLight(-3.65, 14.5, 0, 2);
  const r_light_4 = createRectLight(0.2, 18, -3.65, 3);
  const r_light_5 = createRectLight(-1.15, 5.8, -3.15, 3);
  const r_light_6 = createRectLight(3.15, 11.5, -0.6, 4);
  
  if (showRectHelpers) {
    addRectLightHelper(r_light_1);
    addRectLightHelper(r_light_2);
    addRectLightHelper(r_light_3);
    addRectLightHelper(r_light_4);
    addRectLightHelper(r_light_5);
    addRectLightHelper(r_light_6);
  }

}
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

// Globals
export var canvas;
export var renderer;
export var camera;
export var scene;
export var controls;

export function setCanvas() {
  canvas = document.querySelector('#c');
}

export function createRenderer() {
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
  });
}

export function initCamera() {
  // create a camera
	var fov = 45;
	var aspect = 2; // the canvas default
	var near = 0.1;
	var far = 400;
	camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 15, 60);

  // orbit controls
	controls = new OrbitControls(camera, canvas);
	controls.target.set(0, 5, 0);
  controls.enableDamping = true;
	controls.update();

  // don't allow user to pan below y = 0
  controls.addEventListener('change', () => {
      // Ensure camera doesn't go below y=0
      const { x, y, z } = camera.position;
      if (y < 1) {
          camera.position.set(x, 1, z);
      }
  });

  // ensure zooming (scroll to zoom) is enabled
  controls.enableZoom = true;
}

export function createScene() {
  scene = new THREE.Scene();
	//scene.background = new THREE.Color(0xADD9FF);

  const loader = new THREE.CubeTextureLoader();
  const texture = loader.load([
    '../imgs/cubemaps/stars-3.png',
    '../imgs/cubemaps/stars-3.png',
    '../imgs/cubemaps/stars-3.png',
    '../imgs/cubemaps/stars-3.png',
    '../imgs/cubemaps/stars-3.png',
    '../imgs/cubemaps/stars-3.png'
  ]);
  scene.background = texture;
}

export function addFog() {
  // Add linear fog to the scene
  const fogColor = 0x0B0C2D; // Color of the fog
  const fogNear = 300; // The distance at which the fog starts
  const fogFar = 350; // The distance at which the fog completely covers objects
  scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
}
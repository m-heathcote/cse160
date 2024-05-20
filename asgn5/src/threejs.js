import * as THREE from 'three';
import * as SetUp from "./SetUp.js"
import * as Lighting from "./Lighting.js"
import * as Shapes from "./Shapes.js"
import * as Objects from "./Objects.js"
import * as Animation from "./Animation.js"

var showGrid = false;

function main() {

  // ---------- Set Up Scene ----------

  // look up the canvas
  SetUp.setCanvas();
	
  // create a renderer
  SetUp.createRenderer()

  // create camera (with orbit controls)
  SetUp.initCamera();

  // create a scene
  SetUp.createScene();

  // add fog
  SetUp.addFog();

  // create lights
  Lighting.createLights();

  // ---------- Grid Helper ----------

  if (showGrid) {
    // Create a grid helper
    const size = 100; // Size of the grid
    const divisions = 50; // Number of divisions
    const gridHelper = new THREE.GridHelper(size, divisions);
    SetUp.scene.add(gridHelper);
  }
	
  // ---------- Objects ----------

  // Shapes
  Shapes.createGround();
  Shapes.createBigTree();
  Shapes.createSwing();
  Shapes.addFireflies();

  // Objects
  Objects.createDoor();
  Objects.createWindows();
  Objects.createLanturn();

  // ---------- Animation ----------

  // begin animation
	requestAnimationFrame(Animation.render);
}

main();


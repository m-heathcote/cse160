import * as SetUp from "./SetUp.js"
import * as Shapes from "./Shapes.js"

// resize to match window dimensions if necessary 
function resizeRendererToDisplaySize(renderer) {
  const canvas = SetUp.renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  
  if (needResize) {
    renderer.setSize(width, height, false);
  }

  return needResize;
}

// animation vars
let angle = 0;
let direction = 1;
let amplitude = Math.PI / 8;  // max rotation angle
let frequency = 2.5;

// animation loop
export function render(time) {
  if (resizeRendererToDisplaySize(SetUp.renderer)) {
    const canvas = SetUp.renderer.domElement;
    SetUp.camera.aspect = canvas.clientWidth / canvas.clientHeight;
    SetUp.camera.updateProjectionMatrix();
  }

  // determine speed and rotation
  time *= 0.001; // convert to seconds
  const speed = 1.5;
  const rot = time * speed;

  // calculate rotation angle using sine function
  angle = amplitude * Math.sin(frequency * time);

  // apply rotation
  Shapes.left_pivot.rotation.x = angle;
  Shapes.right_pivot.rotation.x = angle;

  // render the scene
  SetUp.renderer.render(SetUp.scene, SetUp.camera);

  // animate
  requestAnimationFrame(render);
}
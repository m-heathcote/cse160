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
let amplitude = Math.PI / 8;  // max swing rotation angle
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

  // -- swing --

  // calculate rotation angle using sine function
  angle = amplitude * Math.sin(frequency * time);

  // apply rotation
  Shapes.left_pivot.rotation.x = angle;
  Shapes.right_pivot.rotation.x = angle;

  // -- fireflies --

  // Update firefly positions
  Shapes.fireflies.forEach(firefly => {
    firefly.position.add(firefly.velocity);

    // Check bounds and reverse velocity if out of bounds
    if (firefly.position.x > 75 || firefly.position.x < -75) firefly.velocity.x = -firefly.velocity.x;
    if (firefly.position.y > 90 || firefly.position.y < -10) firefly.velocity.y = -firefly.velocity.y;
    if (firefly.position.z > 75 || firefly.position.z < -75) firefly.velocity.z = -firefly.velocity.z;
  });

  // render the scene
  SetUp.renderer.render(SetUp.scene, SetUp.camera);

  // update controls
  SetUp.controls.update();

  // animate
  requestAnimationFrame(render);
}
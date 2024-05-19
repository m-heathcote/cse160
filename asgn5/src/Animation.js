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

  /*
  // set rotations (in radians)
  Shapes.d20.rotation.x = rot;
  Shapes.d20.rotation.y = rot;
  Shapes.d12.rotation.x = rot;
  Shapes.d12.rotation.y = rot;
  */

  // render the scene
  SetUp.renderer.render(SetUp.scene, SetUp.camera);

  // animate
  requestAnimationFrame(render);
}
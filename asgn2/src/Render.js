// Render.js


// ----- renderAllShapes -----
// Draw every shape that is supposed to be in the canvas
function renderAllShapes() {
  // Check time at start of function
  var startTime = performance.now();

  // Pass a matrix to u_GlobalRotateMatrix attribute
  var globalRotMat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Draw Red Cube
  var body = new Cube();
  body.color = [1, 0, 0, 1]; // red
  body.matrix.translate(-0.25, -0.75, -0.1);
  body.matrix.scale(0.5, 0.6, 0.5);
  body.render();

  // Draw Yellow Cube
  var leftArm = new Cube();
  leftArm.color = [1, 1, 0, 1]; // yellow
  leftArm.matrix.translate(-0.1, -0.2, 0);
  leftArm.matrix.rotate(g_yellowAngle, 0, 0, 1);
  var yellowCoordsMat = new Matrix4(leftArm.matrix);
  leftArm.matrix.scale(0.25, 0.6, 0.3);
  leftArm.render();

  // Draw Magenta Cube
  var box = new Cube();
  box.color = [1, 0, 1, 1]; // magenta
  box.matrix = yellowCoordsMat;
  box.matrix.translate(-0.2, 0.5, 0.1, 0);
  box.matrix.rotate(g_magentaAngle, 1, 0, 0);
  box.matrix.scale(0.4, 0.3, 0.3);
  box.render();

  // Check time at end of function
  var duration = performance.now() - startTime;
  sendTextToHTML(" ms: " + Math.floor(duration) +
                 "&nbsp;&nbsp;  fps: " + Math.floor(10000/duration)/10, "numdot");
}
// ----- end renderAllShapes -----


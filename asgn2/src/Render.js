// Render.js


// ----- renderAllShapes -----
// Draw every shape that is supposed to be in the canvas
function renderAllShapes() {
  // Check time at start of function
  var startTime = performance.now();

  // Pass a matrix to u_GlobalRotateMatrix attribute
  var globalRotMat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
  globalRotMat.rotate(g_globalAngle_2, 1, 0, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  /*
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
  
  // Draw Pyramid
  var funky = new Pyramid();
  funky.color = [0.3, 0.2, 0.9, 1];
  funky.matrix.translate(0, -0.4, 0);
  funky.matrix.rotate(180, 1, 0, 0);
  funky.matrix.scale(0.5, 0.3, 0.5);
  funky.render();
  */

  // Base of Shell
  var shell_base = new Cube();
  shell_base.color = [201/255, 184/255, 152/255, 1];
  shell_base.matrix.translate(-0.5, -0.4, -0.5);
  shell_base.matrix.rotate(-5, 1, 0, 0);
  var baseCoords = new Matrix4(shell_base.matrix);
  shell_base.matrix.scale(1, 0.08, 1);
  shell_base.render();

  // Layer 1, Cube 1
  var l1c1 = new Cube();
  l1c1.color = [116/255, 118/255, 54/255, 1];
  l1c1.matrix = new Matrix4(baseCoords);
  l1c1.matrix.translate(0.05, 0.05, 0.05);
  l1c1.matrix.scale(0.45, 0.2, 0.45);
  l1c1.render();

  // Layer 1, Cube 2
  var l1c2 = new Cube();
  l1c2.color = [156/255, 146/255, 88/255, 1];
  l1c2.matrix = new Matrix4(baseCoords);
  l1c2.matrix.translate(0.5, 0.05, 0.05);
  l1c2.matrix.scale(0.45, 0.2, 0.45);
  l1c2.render();

  // Layer 1, Cube 3
  var l1c3 = new Cube();
  l1c3.color = [116/255, 118/255, 54/255, 1];
  l1c3.matrix = new Matrix4(baseCoords);
  l1c3.matrix.translate(0.5, 0.05, 0.5);
  l1c3.matrix.scale(0.45, 0.2, 0.45);
  l1c3.render();

  // Layer 1, Cube 4
  var l1c4 = new Cube();
  l1c4.color = [156/255, 146/255, 88/255, 1];
  l1c4.matrix = new Matrix4(baseCoords);
  l1c4.matrix.translate(0.05, 0.05, 0.5);
  l1c4.matrix.scale(0.45, 0.2, 0.45);
  l1c4.render();



  // Check time at end of function
  var duration = performance.now() - startTime;
  sendTextToHTML(" ms: " + Math.floor(duration) +
                 "&nbsp;&nbsp;  fps: " + Math.floor(10000/duration)/10, "numdot");
}
// ----- end renderAllShapes -----


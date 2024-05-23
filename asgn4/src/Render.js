// Render.js

// ----- renderAllShapes -----
// Draw every shape that is supposed to be in the canvas
function renderAllShapes() {
  // Check time at start of function
  var startTime = performance.now();

  // Pass the Projection matrix
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, camera.projMat.elements);

  // Pass the View matrix
  gl.uniformMatrix4fv(u_ViewMatrix, false, camera.viewMat.elements);

  // Pass a matrix to u_GlobalRotateMatrix attribute
  var globalRotMat = new Matrix4().rotate(g_globalAngle_y, 0, 1, 0);
  globalRotMat.rotate(g_globalAngle_x, 1, 0, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  // ---------- ENVIRONMENT ----------

  // Color
  var grass = [62/255, 90/255, 52/255, 1];
  var sky = [127/255, 194/255, 231/255, 1];

  // yee ol ground cube
  var ground = new Cube();
  ground.textureNum = 0;
  ground.color = grass;
  ground.matrix.translate(0, -0.75, 0);
  ground.matrix.scale(16, 0, 16);
  ground.matrix.translate(-0.5, 0, -0.5);
  ground.render();

  // yee ol sky box
  var sky_box = new Cube();
  sky_box.textureNum = 1;
  sky_box.color = sky;
  sky_box.matrix.scale(16, 16, 16);
  sky_box.matrix.translate(-0.5, -0.5, -0.5);
  sky_box.render();


  // ---------- MAP ----------
  drawMap();


  // ---------- TEST SHAPES ----------
  
  /*
  // test cube 1
  var testCube1 = new Cube();
  testCube1.textureNum = 10;
  testCube1.color = [1, 0, 0, 1];  // red
  testCube1.matrix.translate(-1, -0.7, -0.1);
  testCube1.matrix.scale(0.4, 0.4, 0.4);
  testCube1.render();

  // test cube 2
  var testCube2 = new Cube();
  testCube2.textureNum = 12;
  testCube2.color = [1, 0, 0, 0.1];  // red
  testCube2.matrix.translate(-0.5, -0.7, -0.1);
  testCube2.matrix.scale(0.4, 0.4, 0.4);
  testCube2.render();
  */


  // ---------- TURTLE ----------
  var turtleLoc = [g_turtleX, 0, g_turtleZ];
  var shellTopCoords = renderTurtle(0.8, turtleLoc, g_turtleRot);

  
  // ---------- DUCK ----------
  renderDuck(1, shellTopCoords);


  // Check time at end of function
  var duration = performance.now() - startTime;
  sendTextToHTML(" ms: " + Math.floor(duration) +
                 "&nbsp;&nbsp;  fps: " + Math.floor(10000/duration)/10, "numdot");
}
// ----- end renderAllShapes -----


// Render.js

// -- Globals for Camera View --
var g_eye = [0, 0, 3];
var g_at = [0, 0, -100];
var g_up = [0, 1, 0];

// ----- renderAllShapes -----
// Draw every shape that is supposed to be in the canvas
function renderAllShapes() {
  // Check time at start of function
  var startTime = performance.now();

  // Pass the Projection matrix
  var projMat = new Matrix4();
  projMat.setPerspective(60, canvas.width/canvas.height, 0.1, 100)   // (degrees wide, aspect, near, far)
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

  // Pass the View matrix
  var viewMat = new Matrix4();
  viewMat.setLookAt(g_eye[0],g_eye[1],g_eye[2],  g_at[0],g_at[1],g_at[2],  g_up[0],g_up[1],g_up[2]);   // (eye, at, up)
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

  // Pass a matrix to u_GlobalRotateMatrix attribute
  var globalRotMat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
  globalRotMat.rotate(g_globalAngle_2, 1, 0, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  // ---------- ENVIRONMENT ----------

  // Color
  var grass = [62/255, 90/255, 52/255, 1];
  var sky = [127/255, 194/255, 231/255, 1];

  // yee ol ground cube
  var ground = new Cube();
  ground.textureNum = 0;  // ****
  ground.color = grass;
  ground.matrix.translate(0, -0.75, 0);
  ground.matrix.scale(10, 0, 10);
  ground.matrix.translate(-0.5, 0, -0.5);
  ground.render();

  // yee ol sky box
  var sky_box = new Cube();
  sky_box.textureNum = 1;  // ****
  sky_box.color = sky;
  sky_box.matrix.scale(50, 50, 50);
  sky_box.matrix.translate(-0.5, -0.5, -0.5);
  sky_box.render();


  // ---------- TURTLE ----------
  var shellTopCoords = renderTurtle();

  // ---------- DUCK ----------
  renderDuck(shellTopCoords);


  // Check time at end of function
  var duration = performance.now() - startTime;
  sendTextToHTML(" ms: " + Math.floor(duration) +
                 "&nbsp;&nbsp;  fps: " + Math.floor(10000/duration)/10, "numdot");
}
// ----- end renderAllShapes -----


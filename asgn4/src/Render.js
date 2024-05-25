// Render.js

// -- Light Globals --
var g_pointLightPos = [6, 6, -6];
var g_spotLightPos = [-6, 6, -6];
var g_spotTarget = [0, 0, 0];
var g_pointColor = [1, 0, 0];
var g_spotColor = [1, 0, 0];
var g_spotAngleCutoff = 5;
var g_spotExp = 100;
var g_spotIntensity = 0.5;
var g_pointLightOn = true;
var g_pointColorOn = false;
var g_spotColorOn = false;
var g_spotLightOn = false;
var g_normalsOn = false;

// -- Globals for Turtle Movement --
var E = 0;  // east
var S = 1;  // south
var W = 2;  // west
var N = 3;  // north
var g_facing = E;  // also adjust g_turtleRot if you change this
var g_turtleRot = 0;  // S = -90
var g_turtleX = -1;
var g_turtleZ = 0.6;


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
  ground.shiny = 0;  // no shine
  ground.matrix.translate(0, -0.75, 0);
  ground.matrix.scale(16, 0, 16);
  ground.matrix.translate(-0.5, 0, -0.5);
  ground.render();

  // yee ol sky box
  var sky_box = new Cube();
  sky_box.textureNum = 1;
  sky_box.color = sky;
  sky_box.shiny = 0;  // no shine
  sky_box.updateNormals = false;
  sky_box.matrix.scale(-16, -16, -16);
  sky_box.matrix.translate(-0.5, -0.5, -0.5);
  sky_box.render();


  // ---------- MAP ----------
  drawMap();


  // ---------- LIGHTS ----------

  // pass light status
  gl.uniform1i(u_PointLightOn, g_pointLightOn);
  gl.uniform1i(u_SpotLightOn, g_spotLightOn);

  // colors
  var sun = [255/255, 225/255, 130/255, 1];
  var spotlight = [100/255, 100/255, 100/255, 1];

  // point light
  var p_light = new Cube();
  p_light.textureNum = -2;
  p_light.color = sun;
  p_light.updateNormals = false;
  p_light.matrix.translate(g_pointLightPos[0], g_pointLightPos[1], g_pointLightPos[2]);
  p_light.matrix.scale(-0.2, -0.2, -0.2);
  p_light.matrix.translate(-0.5, -0.5, -0.5);
  p_light.render();

  // spot light
  var s_light = new Cube();
  s_light.textureNum = -2;
  s_light.color = spotlight;
  s_light.updateNormals = false;
  s_light.matrix.translate(g_spotLightPos[0], g_spotLightPos[1], g_spotLightPos[2]);
  s_light.matrix.scale(0.2, 0.2, 0.2);
  s_light.matrix.translate(-0.5, -0.5, -0.5);
  s_light.render();

  // pass the light and camera positions to GLSL
  gl.uniform3f(u_PointLightPos, g_pointLightPos[0], g_pointLightPos[1], g_pointLightPos[2]);
  gl.uniform3f(u_SpotLightPos, g_spotLightPos[0], g_spotLightPos[1], g_spotLightPos[2]);
  gl.uniform3f(u_SpotTarget, g_spotTarget[0], g_spotTarget[1], g_spotTarget[2]);
  gl.uniform3f(u_CameraPos, camera.eye.elements[0], camera.eye.elements[1], camera.eye.elements[2]);
  
  // pass color to GLSL
  gl.uniform1i(u_PointColorOn, g_pointColorOn);
  gl.uniform3f(u_PointColor, g_pointColor[0], g_pointColor[1], g_pointColor[2]);
  gl.uniform1i(u_SpotColorOn, g_spotColorOn);
  gl.uniform3f(u_SpotColor, g_spotColor[0], g_spotColor[1], g_spotColor[2]);

  // pass other light settings to GLSL
  gl.uniform1f(u_SpotCosCutoff, Math.cos(g_spotAngleCutoff * (Math.PI/180)));
  gl.uniform1f(u_SpotExp, g_spotExp);
  gl.uniform1f(u_SpotIntensity, g_spotIntensity);
  

  // ---------- FORBIDDEN MINECRAFT SPHERE ----------
  
  // sphere
  var test_sphere = new Sphere();
  test_sphere.textureNum = -2;
  test_sphere.color = [184/255, 121/255, 194/255, 1];
  test_sphere.shiny = 1;  // full shine
  test_sphere.matrix.translate(2, 0, 0.5);
  test_sphere.matrix.scale(0.6, 0.6, 0.6);
  test_sphere.render();


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


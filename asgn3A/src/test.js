// BlockyAnimal.js

// Vertex shader program
var VSHADER_SOURCE = `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  varying vec2 v_UV;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_UV;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
    //gl_FragColor = vec4(v_UV, 1.0, 1.0);
  }`

// -- Global Variables --
let canvas;
let gl;
let a_Position;
let u_UV;
let u_FragColor;
let u_Size;
let u_ModelMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;
let u_GlobalRotateMatrix;

// ----- setupWebGL -----
function setupWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Enable 3D
  gl.enable(gl.DEPTH_TEST);
}
// ----- end setupWebGL -----

// ----- connectVariablesToGLSL -----
function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_ModelMatrix
  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  // Set an initial value for this matrix to identity
  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
  
  // Get the storage location of u_GlobalRotateMatrix
  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix) {
    console.log('Failed to get the storage location of u_u_GlobalRotateMatrix');
    return;
  }
}
// ----- end connectVariablesToGLSL -----

// -- Animation Constants --
const OFF = 0;
const ON = 1;

// -- Globals for UI elements --
let g_globalAngle = 0;
let g_yellowAngle = 0;
let g_magentaAngle = 0;
let g_animationSpeed = 1;
let g_animation = OFF;

// ----- addActionsForHtmlUI -----
// Set up actions for the HTML UI elements
function addActionsForHtmlUI() {
  
  // Background Color Buttons
  document.getElementById('black-bg').onclick = function() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    renderAllShapes();
  };
  document.getElementById('gray-bg').onclick = function() {
    gl.clearColor(140/255, 140/255, 150/255, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    renderAllShapes();
  };
  document.getElementById('white-bg').onclick = function() {
    gl.clearColor(250/255, 245/255, 250/255, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    renderAllShapes();
  };
  document.getElementById('blue-bg').onclick = function() {
    gl.clearColor(140/255, 180/255, 255/255, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    renderAllShapes();
  };

  // Animation Buttons
  document.getElementById('offButton').onclick = function() {
    g_animation = OFF;
  };
  document.getElementById('onButton').onclick = function() {
    g_animation = ON;
  };

  // Global Angle Slider
  document.getElementById("angleSlide").addEventListener("mousemove", function() {
    g_globalAngle = -this.value;
    renderAllShapes();
  });
  
  // Animation Speed Slider
  document.getElementById("animationSlide").addEventListener("mousemove", function() {
    g_animationSpeed = this.value;
    renderAllShapes();
  });
  
  // Yellow Arm Angle Slider
  document.getElementById("yellowSlide").addEventListener("mousemove", function() {
    g_yellowAngle = -this.value;
    renderAllShapes();
  });
  
  // Magenta Arm Angle Slider
  document.getElementById("magentaSlide").addEventListener("mousemove", function() {
    g_magentaAngle = -this.value;
    renderAllShapes();
  });
}
// ----- end addActionsForHtmlUI -----

// ----- fixSlider -----
function fixSlider(id, val) {
  // get slder
  var slider = document.getElementById(id);

  // set slider position
  slider.value = val;
}
// ----- end fixSlider -----


// ---------- MAIN ---------------------------------------------------
function main() {
  // setup canvas and gl variables
  setupWebGL();
  
  // set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();

  // Set up actions for the HTML UI elements
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) {if (ev.buttons == 1) { drag(ev) }};

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  // Render
  //renderAllShapes();
  requestAnimationFrame(tick);
}
// ---------- END MAIN -----------------------------------------------


// -- Global Time Variables --
var g_startTime = performance.now() / 1000.0;
var g_seconds = (performance.now() / 1000.0) - g_startTime;
var g_onTime = 0;
var g_offTime = g_seconds - g_onTime;

// ----- tick -----
function tick() {
  // Save the current time
  g_seconds = (performance.now() / 1000.0) - g_startTime;
  
  if (g_animation == ON) {
    // count seconds on
    g_onTime = g_seconds - g_offTime;
  }
  else if (g_animation == OFF) {
    // count seconds off
    g_offTime = g_seconds- g_onTime;
  }
  
  // Update Animation Angles
  updateAnimationAngles();

  // Draw Everything
  renderAllShapes();

  // Tell the browser to update again when it has time
  requestAnimationFrame(tick);
}
// ----- end tick -----

// -- Global Mouse Position Variables --
var g_clickX = 0;
var g_clickY = 0;
var g_initialRotation = g_globalAngle;

// ----- click -----
function click(ev) {
  // Extract the event click and return it in WebGL coordinates
  [x, y] = convertCoordinatesEventToGL(ev);

  // save in global variables
  g_clickX = x;
  g_clickY = y;
  g_initialRotation = g_globalAngle;
}
// ----- end click -----

// ----- drag -----
function drag(ev) {
  // Extract the event click and return it in WebGL coordinates
  [x, y] = convertCoordinatesEventToGL(ev);

  // Get Difference (drag length)
  let xDiff = x - g_clickX;
  let yDiff = y - g_clickY;

  // Rotate
  g_globalAngle = g_initialRotation - (xDiff * 100);
  fixSlider("angleSlide", -g_globalAngle);

  // Redraw
  renderAllShapes();
}
// ----- end drag -----

// ----- updateAnimationAngles -----
function updateAnimationAngles() { 
  if (g_animation == ON) {
    g_yellowAngle = 45 * Math.sin(g_onTime * g_animationSpeed);
    fixSlider("yellowSlide", -45 * Math.sin(g_onTime * g_animationSpeed));
  }
}
// ----- end updateAnimationAngles -----

// ----- renderAllShapes -----
// Draw every shape that is supposed to be in the canvas
function renderAllShapes() {
  // Check time at start of function
  var startTime = performance.now();

  // **************************
  //  Pass a matrix to u_ProjectionMatrix
  var projMat = new Matrix4();
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

  //  Pass a matrix to u_ViewMatrix
  var viewMat = new Matrix4();
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

  console.log("helloooo");
  // **************************

  // Pass a matrix to u_GlobalRotateMatrix
  var globalRotMat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  console.log("after matrix stuff");

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  console.log("cleared canvas");

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

// ----- sendTextToHTML -----
// Set the text of an HTML element
function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }
  htmlElm.innerHTML = text;
}
// ----- end sendTextToHTML -----

// ----- convertCoordinatesEventToGL -----
// Extract the event click and return it in WebGL coordinates
function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x, y]);
}
// ----- end convertCoordinatesEventToGL -----
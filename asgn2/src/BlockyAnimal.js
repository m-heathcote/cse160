// BlockyAnimal.js

// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  void main() {
    gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`

// Global Variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_ModelMatrix;
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

// Globals for UI elements
let g_globalAngle = 0;
let g_yellowAngle = 0;

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

  // Clear Button
  document.getElementById('clearButton').onclick = function() {
    renderAllShapes();
  };

  // Global Angle Slider
  document.getElementById("angleSlide").addEventListener("mousemove", function() {
    g_globalAngle = this.value;
    renderAllShapes();
  });
  
  // Yellow Arm Angle Slider
  document.getElementById("yellowSlide").addEventListener("mousemove", function() {
    g_yellowAngle = this.value;
    renderAllShapes();
  });
}
// ----- end addActionsForHtmlUI -----


// ---------- MAIN ---------------------------------------------------
function main() {
  // setup canvas and gl variables
  setupWebGL();
  
  // set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();

  // Set up actions for the HTML UI elements
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  //canvas.onmousedown = click;
  //canvas.onmousemove = function(ev) { if (ev.buttons == 1) { click(ev) } };
  //canvas.onmouseup = release;

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  // Render
  renderAllShapes();
}
// ---------- END MAIN -----------------------------------------------


// ----- click -----
function click(ev) {
  // Extract the event click and return it in WebGL coordinates
  [x, y] = convertCoordinatesEventToGL(ev);

  // Draw every shape that is supposed to be in the canvas
  renderAllShapes();
}
// ----- end click -----

// ----- renderAllShapes -----
// Draw every shape that is supposed to be in the canvas
function renderAllShapes() {
  // Check time at start of function
  var startTime = performance.now();

  // Pass a matrix to u_GlobalRotateMatrix attribute
  var globalRotMat = new Matrix4().rotate(-g_globalAngle, 0, 1, 0);
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
  leftArm.matrix.rotate(-g_yellowAngle, 0, 0, 1);
  leftArm.matrix.scale(0.25, 0.6, 0.3);
  leftArm.render();

  // Draw Magenta Cube
  var box = new Cube();
  box.color = [1, 0, 1, 1]; // magenta
  box.matrix.translate(-0.2, 0.3, 0.1, 0);
  box.matrix.rotate(-20, 1, 0, 0);
  box.matrix.scale(0.4, 0.3, 0.3);
  box.render();

  // Check time at end of function
  var duration = performance.now() - startTime;
  //sendTextToHTML("numdot: " + len + ", ms: " + Math.floor(duration) +
  sendTextToHTML(" ms: " + Math.floor(duration) +
                 ", fps: " + Math.floor(10000/duration)/10, "numdot");
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

// ----- convertCoordinatesEventTGL -----
// Extract the event click and return it in WebGL coordinates
function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x, y]);
}
// ----- end convertCoordinatesEventTGL -----


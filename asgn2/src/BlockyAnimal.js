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
let g_selectedColor = [1.0, 1.0, 1.0, 1.0]; // start with white
let g_globalAngle = 0;

// ----- addActionsForHtmlUI -----
// Set up actions for the HTML UI elements
function addActionsForHtmlUI() {
  
  // Background Color Buttons
  document.getElementById('black-bg').onclick = function() {
    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // redraw
    renderAllShapes(); };
  document.getElementById('gray-bg').onclick = function() {
    // Specify the color for clearing <canvas>
    gl.clearColor(140/255, 140/255, 150/255, 1.0);
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // redraw
    renderAllShapes(); };
  document.getElementById('white-bg').onclick = function() {
    // Specify the color for clearing <canvas>
    gl.clearColor(250/255, 245/255, 250/255, 1.0);
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // redraw
    renderAllShapes(); };
  document.getElementById('blue-bg').onclick = function() {
    // Specify the color for clearing <canvas>
    gl.clearColor(140/255, 180/255, 255/255, 1.0);
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // redraw
    renderAllShapes(); };

  // Clear Button
  document.getElementById('clearButton').onclick = function() {
    g_shapesList = [];
    g_erasedList = [];
    g_strokeCountList = [];
    g_erasedCountList = [];
    renderAllShapes(); };

  // Size Slider Event
  document.getElementById("angleSlide").addEventListener("mousemove", function() {
    g_globalAngle = this.value;
    renderAllShapes();
  });
  
  // Color Slider Events
  document.getElementById("redSlide").addEventListener("mousemove", function() {
    g_selectedColor[0] = this.value/100;
    updateBrushDisplay();
  });
}
// ----- end addActionsForHtmlUI -----

// ----- adjustSliders -----
function adjustSliders(r, g, b) {
  // get sliders
  var Rslide = document.getElementById("redSlide");
  var Gslide = document.getElementById("greenSlide");
  var Bslide = document.getElementById("blueSlide");

  // set vals
  Rslide.value = r;
  Gslide.value = g;
  Bslide.value = b;
}
// ----- end adjustSliders -----


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
  canvas.onmousemove = function(ev) { if (ev.buttons == 1) { click(ev) } };
  canvas.onmouseup = release;

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  // Render
  renderAllShapes();
}
// ---------- END MAIN -----------------------------------------------


// List of all shapes (points)
var g_shapesList = [];
var g_erasedList = [];

// Globals for counting the number of points in a stroke
var g_strokeCount = 0;
var g_strokeCountList = [];
var g_erasedCountList = [];

// ----- click -----
function click(ev) {
  // Extract the event click and return it in WebGL coordinates
  [x, y] = convertCoordinatesEventToGL(ev);

  // Create the new point
  let point;
  if (g_selectedType == POINT) {
    point = new Point();
  } else if (g_selectedType == TRIANGLE) {
    point = new Triangle();
  } else if (g_selectedType == CIRCLE) {
    point = new Circle();
    point.segments = g_selectedSegments;
  } else {
    point = new Heart();
  }

  point.position = [x, y];
  point.color = g_selectedColor.slice();  // without ".slice()", it pushes a pointer
  point.size = g_selectedSize;

  // Store the new point
  g_shapesList.push(point);
  g_erasedList = []; // forget undos in memory

  // Add to stroke count
  g_strokeCount += 1;

  // Draw every shape that is supposed to be in the canvas
  renderAllShapes();
}
// ----- end click -----

// ----- release -----
function release(ev) {
  g_strokeCountList.push(g_strokeCount);
  g_strokeCount = 0;
}
// ----- end release -----

// ----- renderAllShapes -----
// Draw every shape that is supposed to be in the canvas
function renderAllShapes() {
  // Check time at start of function
  var startTime = performance.now();

  // 
  var globalRotMat = new Matrix4().rotate(g_globalAngle, 0, 1, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Draw a Triangle
  //drawTriangle3D([-1.0, 0.0, 0.0,  -0.5, -1.0, 0.0,  0.0, 0.0, 0.0]);

  // Draw Body Cube
  var body = new Cube();
  body.color = [1.0, 0.0, 0.0, 1.0]; // red
  body.matrix.translate(-0.25, -0.5, 0.0);
  body.matrix.scale(0.5, 1, 0.5);
  body.render();

  // Draw Left Arm
  var leftArm = new Cube();
  leftArm.color = [1.0, 1.0, 0.0, 1.0]; // yellow
  leftArm.matrix.translate(0.7, 0.0, 0.0);
  leftArm.matrix.rotate(45, 0, 0, 1);
  leftArm.matrix.scale(0.25, 0.7, 0.5);
  leftArm.render();

  // Test Box
  var box = new Cube();
  box.color = [1, 0, 1, 1]; // magenta
  box.matrix.translate(0, 0, -0.5, 0);
  box.matrix.rotate(-30, 1, 0, 0);
  box.matrix.scale(0.5, 0.5, 0.5);
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


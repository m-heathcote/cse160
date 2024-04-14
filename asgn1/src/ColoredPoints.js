// ColoredPoint.js (c) 2012 matsuda

// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
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
let canvas2;
let gl;
let gl2;
let a_Position;
let a_Position2;
let u_FragColor;
let u_FragColor2;
let u_Size;
let u_Size2;

function setupWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Retrieve 2nd <canvas> element
  canvas2 = document.getElementById('brushDisplay');
  
  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", {preserveDrawingBuffer: true});
  gl2 = canvas2.getContext("webgl", {preserveDrawingBuffer: true});
  if (!gl || !gl2) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
}

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

  // Get the storage location of u_Size
  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
}

function connectVariablesToGLSL_2() {
  // Initialize shaders
  if (!initShaders(gl2, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the storage location of a_Position
  a_Position2 = gl2.getAttribLocation(gl2.program, 'a_Position');
  if (a_Position2 < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor2 = gl2.getUniformLocation(gl2.program, 'u_FragColor');
  if (!u_FragColor2) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_Size
  u_Size2 = gl2.getUniformLocation(gl2.program, 'u_Size');
  if (!u_Size2) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
}

// Constants
const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

// Globals for UI elements
let g_selectedColor = [1.0, 1.0, 1.0, 1.0]; // start with white
let g_selectedSize = 8;
let g_selectedSegments = 15;
let g_selectedType = POINT;

// Set up actions for the HTML UI elements
function addActionsForHtmlUI() {
        
  // Color Buttons
  document.getElementById('red').onclick = function() {
    g_selectedColor = [1.0, 0.0, 0.0, 1.0];
    adjustSliders(100, 0, 0);
    updateBrushDisplay(); };
  document.getElementById('orange').onclick = function() {
    g_selectedColor = [1.0, 0.5, 0.0, 1.0];
    adjustSliders(100, 50, 0);
    updateBrushDisplay(); };
  document.getElementById('yellow').onclick = function() {
    g_selectedColor = [1.0, 1.0, 0.0, 1.0];
    adjustSliders(100, 100, 0);
    updateBrushDisplay(); };
  document.getElementById('green').onclick = function() {
    g_selectedColor = [0.0, 1.0, 0.0, 1.0];
    adjustSliders(0, 100, 0);
    updateBrushDisplay(); };
  document.getElementById('blue').onclick = function() {
    g_selectedColor = [0.0, 0.0, 1.0, 1.0];
    adjustSliders(0, 0, 100);
    updateBrushDisplay(); };
  document.getElementById('purple').onclick = function() {
    g_selectedColor = [0.5, 0.0, 1.0, 1.0];
    adjustSliders(50, 0, 100);
    updateBrushDisplay(); };
  document.getElementById('pink').onclick = function() {
    g_selectedColor = [1.0, 0.0, 1.0, 1.0];
    adjustSliders(100, 0, 100);
    updateBrushDisplay(); };
  document.getElementById('black').onclick = function() {
    g_selectedColor = [0.0, 0.0, 0.0, 1.0];
    adjustSliders(0, 0, 0);
    updateBrushDisplay(); };
  document.getElementById('white').onclick = function() {
    g_selectedColor = [1.0, 1.0, 1.0, 1.0];
    adjustSliders(100, 100, 100);
    updateBrushDisplay(); };

  // Background Color Buttons
  document.getElementById('black-bg').onclick = function() {
    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl2.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl2.clear(gl2.COLOR_BUFFER_BIT);
    // redraw
    renderAllShapes(); };
  document.getElementById('gray-bg').onclick = function() {
    // Specify the color for clearing <canvas>
    gl.clearColor(140/255, 140/255, 150/255, 1.0);
    gl2.clearColor(140/255, 140/255, 150/255, 1.0);
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl2.clear(gl2.COLOR_BUFFER_BIT);
    // redraw
    renderAllShapes(); };
  document.getElementById('white-bg').onclick = function() {
    // Specify the color for clearing <canvas>
    gl.clearColor(250/255, 245/255, 250/255, 1.0);
    gl2.clearColor(250/255, 245/255, 250/255, 1.0);
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl2.clear(gl2.COLOR_BUFFER_BIT);
    // redraw
    renderAllShapes(); };
  document.getElementById('blue-bg').onclick = function() {
    // Specify the color for clearing <canvas>
    gl.clearColor(140/255, 180/255, 255/255, 1.0);
    gl2.clearColor(140/255, 180/255, 255/255, 1.0);
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl2.clear(gl2.COLOR_BUFFER_BIT);
    // redraw
    renderAllShapes(); };

  // Clear Button
  document.getElementById('clearButton').onclick = function() {
    g_shapesList = [];
    g_erasedList = [];
    g_strokeCountList = [];
    g_erasedCountList = [];
    renderAllShapes(); };

  // Undo Button
  document.getElementById('undoButton').onclick = function() {
    if (g_shapesList.length > 0) {
      let num = g_strokeCountList.pop();
      g_erasedCountList.push(num);
      
      for (let i = 0; i < num; i++) {
        g_erasedList.push(g_shapesList.pop());
      }
    }
    renderAllShapes(); };

  // Redo Button
  document.getElementById('redoButton').onclick = function() {
    if (g_erasedList.length > 0) {
      let num = g_erasedCountList.pop();
      g_strokeCountList.push(num);
      
      for (let i = 0; i < num; i++) {
        g_shapesList.push(g_erasedList.pop());
      }
    }
    renderAllShapes(); };

  // My Drawing Button
  document.getElementById('drawingButton').onclick = function() {
    // clear canvas
    g_shapesList = [];
    g_erasedList = [];
    g_strokeCountList = [];
    g_erasedCountList = [];
    // draw
    g_shapesList.push(new Drawing());
    g_strokeCountList.push(1);
    renderAllShapes(); };

  // Shape Buttons
  document.getElementById('pointButton').onclick = function() {
    g_selectedType = POINT;
    updateBrushDisplay(); };
  document.getElementById('triButton').onclick = function() {
    g_selectedType = TRIANGLE;
    updateBrushDisplay(); };
  document.getElementById('circleButton').onclick = function() {
    g_selectedType = CIRCLE;
    updateBrushDisplay(); };

  // Color Slider Events
  document.getElementById("redSlide").addEventListener("mouseup", function() {
    g_selectedColor[0] = this.value/100;
    updateBrushDisplay(); });
  document.getElementById("greenSlide").addEventListener("mouseup", function() {
    g_selectedColor[1] = this.value/100;
    updateBrushDisplay(); });
  document.getElementById("blueSlide").addEventListener("mouseup", function() {
    g_selectedColor[2] = this.value/100;
    updateBrushDisplay(); });

  // Size Slider Event
  document.getElementById("sizeSlide").addEventListener("mouseup", function() {
    g_selectedSize = this.value;
    updateBrushDisplay(); });
  
  // Segment Slider Event
  document.getElementById("segmentSlide").addEventListener("mouseup", function() {
    g_selectedSegments = this.value;
    updateBrushDisplay(); });
}

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


// ---------- MAIN ----------
function main() {
  // setup canvas and gl variables
  setupWebGL();
  
  // set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();
  connectVariablesToGLSL_2();

  // Set up actions for the HTML UI elements
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) { if (ev.buttons == 1) { click(ev) } };
  canvas.onmouseup = release;

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl2.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl2.clear(gl2.COLOR_BUFFER_BIT);

  // Update Brush Display
  updateBrushDisplay();
}
// ---------- END MAIN ----------


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
  } else {
    point = new Circle();
    point.segments = g_selectedSegments;
  }

  point.position = [x, y];
  point.color = g_selectedColor.slice();  // without ".slice()", it pushes a pointer
  point.size = g_selectedSize;

  // Store the new point
  g_shapesList.push(point);
  g_erasedList = [];

  // Add to stroke count
  g_strokeCount += 1;

  // Draw every shape that is supposed to be in the canvas
  renderAllShapes();
}
// ----- end click -----

function release(ev) {
  g_strokeCountList.push(g_strokeCount);
  g_strokeCount = 0;
}

// Draw every shape that is supposed to be in the canvas
function renderAllShapes() {
  // Check time at start of function
  var startTime = performance.now();

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw each shape in the list
  var len = g_shapesList.length;
  for(var i = 0; i < len; i++) {
    g_shapesList[i].render();
  }

  // Check time at end of function
  var duration = performance.now() - startTime;
  sendTextToHTML("numdot: " + len + ", ms: " + Math.floor(duration) +
                 ", fps: " + Math.floor(10000/duration)/10, "numdot");
}

// Set the text of an HTML element
function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }
  htmlElm.innerHTML = text;
}

// Extract the event click and return it in WebGL coordinates
function convertCoordinatesEventToGL(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x, y]);
}

// Update Brush Display
function updateBrushDisplay() {
  // Create point
  let point;
  if (g_selectedType == POINT) {
    point = new Point();
  } else if (g_selectedType == TRIANGLE) {
    point = new Triangle();
  } else {
    point = new Circle();
    point.segments = g_selectedSegments;
  }

  point.position = [0, 0];
  point.color = g_selectedColor.slice();  // without ".slice()", it pushes a pointer
  point.size = g_selectedSize;

  // Clear <canvas>
  gl2.clear(gl2.COLOR_BUFFER_BIT);

  // Draw point
  point.renderDisplay();
}


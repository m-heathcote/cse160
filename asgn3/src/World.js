// World.js

// Vertex shader program
var VSHADER_SOURCE = `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  varying vec2 v_UV;
  uniform mat4 u_ModelMatrix;           // sets where shape located
  uniform mat4 u_GlobalRotateMatrix;    // sets global rotation
  uniform mat4 u_ViewMatrix;            // set by lookAt command
  uniform mat4 u_ProjectionMatrix;      // set by GL perspective command
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    //gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_UV;

  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;

  uniform int u_WhichTexture;
  void main() {
    if (u_WhichTexture == -2) {                     // Use color
      gl_FragColor = u_FragColor;
    } else if (u_WhichTexture == -1) {              // Use UV debug color
      gl_FragColor = vec4(v_UV, 1.0, 1.0);
    } else if (u_WhichTexture == 0) {               // Use texture 0
      gl_FragColor = texture2D(u_Sampler0, v_UV);
    } else if (u_WhichTexture == 1) {               // Use texture 1
      gl_FragColor = texture2D(u_Sampler1, v_UV);
    } else {                                        // Error: use red
      gl_FragColor = vec4(1, 0.2, 0.2, 1);
    }
  }`

// -- Global Variables --
let canvas;
let gl;
let a_Position;
let a_UV;
let u_FragColor;
let u_WhichTexture;
let u_Sampler0;
let u_Sampler1;
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

  // Get the storage location of a_UV
  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if (a_UV < 0) {
    console.log('Failed to get the storage location of a_UV');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_WhichTexture
  u_WhichTexture = gl.getUniformLocation(gl.program, 'u_WhichTexture');
  if (!u_WhichTexture) {
    console.log('Failed to get the storage location of u_WhichTexture');
    return false;
  }

  // Get the storage location of u_Sampler0
  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if (!u_Sampler0) {
    console.log('Failed to get the storage location of u_Sampler0');
    return false;
  }

  // Get the storage location of u_Sampler1
  u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
  if (!u_Sampler1) {
    console.log('Failed to get the storage location of u_Sampler1');
    return false;
  }

  // Get the storage location of u_ModelMatrix
  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  // Get the storage location of u_GlobalRotateMatrix
  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if (!u_GlobalRotateMatrix) {
    console.log('Failed to get the storage location of u_GlobalRotateMatrix');
    return;
  }

  // Get the storage location of u_ViewMatrix
  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if (!u_ViewMatrix) {
    console.log('Failed to get the storage location of u_ViewMatrix');
    return;
  }

  // Get the storage location of u_ProjectionMatrix
  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if (!u_ProjectionMatrix) {
    console.log('Failed to get the storage location of u_ProjectionMatrix');
    return;
  }

  // Set an initial value for these matrix to identity
  var identityM = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityM.elements);
}
// ----- end connectVariablesToGLSL -----

// -- Animation Constants --
const OFF = 0;
const ON = 1;
const POKE = 2;

// -- Globals for UI elements --
let g_globalAngle = 0;    // rotate around y axis
let g_globalAngle_2 = 0;  // rotate around x axis
let g_animationSpeed = 4;
let g_animation = OFF;

// ----- addActionsForHtmlUI -----
// Set up actions for the HTML UI elements
function addActionsForHtmlUI() {
  
  // Animation Buttons
  document.getElementById('offButton').onclick = function() {
    g_wasON = false;
    g_animation = OFF;
  };
  document.getElementById('onButton').onclick = function() {
    g_wasON = true;
    g_animation = ON;
  };
  document.getElementById('pokeButton').onclick = function() {
    g_animation = POKE;
  };

  /*
  // Global Angle Slider
  document.getElementById("angleSlide").addEventListener("mousemove", function() {
    g_globalAngle = -this.value;
    renderAllShapes();
  });
  
  // Global Angle Slider 2
  document.getElementById("angleSlide2").addEventListener("mousemove", function() {
    g_globalAngle_2 = this.value;
    renderAllShapes();
  });
  */

  // Animation Speed Slider
  document.getElementById("animationSlide").addEventListener("mousemove", function() {
    g_animationSpeed = this.value;
    renderAllShapes();
  });
  
  /*
  // Head Slider
  document.getElementById("headSlide").addEventListener("mousemove", function() {
    g_headX = this.value * 0.01;
    renderAllShapes();
  });
  
  // Joint 1 Slider
  document.getElementById("j1Slide").addEventListener("mousemove", function() {
    g_j1Angle = -this.value;
    renderAllShapes();
  });
  
  // Joint 2 Slider
  document.getElementById("j2Slide").addEventListener("mousemove", function() {
    g_j2Angle = -this.value;
    renderAllShapes();
  });
  
  // Joint 3 Slider
  document.getElementById("j3Slide").addEventListener("mousemove", function() {
    g_j3Angle = -this.value;
    renderAllShapes();
  });
  */
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


// -------------------------------------------------------------------
// ---------- MAIN ---------------------------------------------------
function main() {
  console.log("hellooo")

  // setup canvas and gl variables
  setupWebGL();
  
  // set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();

  // Set up actions for the HTML UI elements
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) {if (ev.buttons == 1) { drag(ev) }};

  // Initialize Textures
  initTextures();

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
  // Render
  //renderAllShapes();
  requestAnimationFrame(tick);
}
// ---------- END MAIN -----------------------------------------------
// -------------------------------------------------------------------


// -- Global Time Variables --
var g_startTime = performance.now() / 1000.0;
var g_seconds = (performance.now() / 1000.0) - g_startTime;
var g_onTime = 0;
var g_offTime = g_seconds - g_onTime;
var g_pokeTime = 0;
var g_wasON = false;

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
    g_offTime = g_seconds - g_onTime;
  }
  else if (g_animation == POKE) {
    // count seconds for poke animation
    g_pokeTime = g_seconds - (g_onTime + g_offTime);

    if (g_pokeTime > 2) {
      g_offTime += g_pokeTime;
      g_pokeTime = 0;
      
      if (g_wasON) {
        g_animation = ON;
      }
      else {
        g_animation = OFF; // animation over
      }
    }
  }
  
  // Update Animation Variables
  updateAnimationAngles();
  updateAnimationXY();

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
var g_initialRotation_2 = g_globalAngle_2;

// ----- click -----
function click(ev) {
  if (ev.shiftKey) {
    g_animation = POKE;
  }
  else {
    // Extract the event click and return it in WebGL coordinates
    [x, y] = convertCoordinatesEventToGL(ev);

    // save in global variables
    g_clickX = x;
    g_clickY = y;
    g_initialRotation = g_globalAngle;
    g_initialRotation_2 = g_globalAngle_2;
  }
}
// ----- end click -----

// ----- convertTo360 -----
function convertTo360(degrees) {
  return ((degrees % 360) + 360) % 360;
}
// ----- end convertTo360 -----

// ----- drag -----
function drag(ev) {
  // Extract the event click and return it in WebGL coordinates
  [x, y] = convertCoordinatesEventToGL(ev);

  // Get Difference (drag length)
  let xDiff = x - g_clickX;
  let yDiff = y - g_clickY;

  // Rotate around y axis
  g_globalAngle = convertTo360(g_initialRotation - (xDiff * 100));
  //fixSlider("angleSlide", -g_globalAngle);

  // Rotate around x axis
  if (g_initialRotation > 90 && g_initialRotation < 270) {
    g_globalAngle_2 = convertTo360(g_initialRotation_2 - (yDiff * 100));
  }
  else {
    g_globalAngle_2 = convertTo360(g_initialRotation_2 + (yDiff * 100));
  }
  //fixSlider("angleSlide2", g_globalAngle_2);

  // Redraw
  renderAllShapes();
}
// ----- end drag -----

// ----- updateAnimationAngles (moved to Render.js) -----

// ----- renderAllShapes (moved to Render.js) -----

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

// ----- initTextures (moved to Texture.js) -----

// ----- sendImageToTEXTURE0 (moved to Texture.js) -----
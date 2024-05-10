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

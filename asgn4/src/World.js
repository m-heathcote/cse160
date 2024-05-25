// World.js - contains shaders and main function

// Vertex shader program
var VSHADER_SOURCE = `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  attribute vec3 a_Normal;
  varying vec2 v_UV;
  varying vec3 v_Normal;
  varying vec4 v_VertPos;

  uniform mat4 u_ModelMatrix;           // sets where shape located
  uniform mat4 u_NormalMatrix;          // transforms normals based on rotation
  uniform mat4 u_GlobalRotateMatrix;    // sets global rotation
  uniform mat4 u_ViewMatrix;            // set by lookAt command
  uniform mat4 u_ProjectionMatrix;      // set by GL perspective command

  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    //gl_Position = u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    
    v_UV = a_UV;
    v_Normal = normalize(vec3(u_NormalMatrix * vec4(a_Normal, 1)));
    v_VertPos = u_ModelMatrix * a_Position;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_UV;
  varying vec3 v_Normal;

  uniform vec4 u_FragColor;
  uniform int u_WhichTexture;

  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;
  uniform sampler2D u_Sampler2;
  uniform sampler2D u_Sampler3;
  uniform sampler2D u_Sampler4;
  uniform sampler2D u_Sampler5;
  uniform sampler2D u_Sampler6;
  uniform sampler2D u_Sampler7;
  uniform sampler2D u_Sampler8;
  uniform sampler2D u_Sampler9;
  uniform sampler2D u_Sampler10;
  uniform sampler2D u_Sampler11;
  uniform sampler2D u_Sampler12;
  uniform sampler2D u_Sampler13;

  uniform bool u_PointLightOn;
  uniform bool u_SpotLightOn;
  uniform float u_HowShiny;     // 0 = not shiny, 1 = shiny
  uniform vec3 u_PointLightPos;
  uniform vec3 u_SpotLightPos;
  uniform vec3 u_CameraPos;
  uniform vec3 u_SpotTarget;
  varying vec4 v_VertPos;

  void main() {

    if (u_WhichTexture == -3) {                     // Use normal debug color
      gl_FragColor = vec4((v_Normal + 1.0)/2.0, 1.0);
    } else if (u_WhichTexture == -2) {              // Use color
      gl_FragColor = u_FragColor;
    } else if (u_WhichTexture == -1) {              // Use UV debug color
      gl_FragColor = vec4(v_UV, 1.0, 1.0);
    } else if (u_WhichTexture == 0) {               // Use texture 0
      gl_FragColor = texture2D(u_Sampler0, v_UV);
    } else if (u_WhichTexture == 1) {               // Use texture 1
      gl_FragColor = texture2D(u_Sampler1, v_UV);
    } else if (u_WhichTexture == 2) {               // Use texture 2
      gl_FragColor = texture2D(u_Sampler2, v_UV);
    } else if (u_WhichTexture == 3) {               // Use texture 3
      gl_FragColor = texture2D(u_Sampler3, v_UV);
    } else if (u_WhichTexture == 4) {               // Use texture 4
      gl_FragColor = texture2D(u_Sampler4, v_UV);
    } else if (u_WhichTexture == 5) {               // Use texture 5
      gl_FragColor = texture2D(u_Sampler5, v_UV);
    } else if (u_WhichTexture == 6) {               // Use texture 6
      gl_FragColor = texture2D(u_Sampler6, v_UV);
    } else if (u_WhichTexture == 7) {               // Use texture 7
      gl_FragColor = texture2D(u_Sampler7, v_UV);
    } else if (u_WhichTexture == 8) {               // Use texture 8
      gl_FragColor = texture2D(u_Sampler8, v_UV);
    } else if (u_WhichTexture == 9) {               // Use texture 9
      gl_FragColor = texture2D(u_Sampler9, v_UV);
    } else if (u_WhichTexture == 10) {               // Use texture 10
      gl_FragColor = texture2D(u_Sampler10, v_UV);
    } else if (u_WhichTexture == 11) {               // Use texture 11
      gl_FragColor = texture2D(u_Sampler11, v_UV);
    } else if (u_WhichTexture == 12) {               // Use texture 12
      gl_FragColor = texture2D(u_Sampler12, v_UV);
    } else if (u_WhichTexture == 13) {               // Use texture 13
      gl_FragColor = texture2D(u_Sampler13, v_UV);
    } else {                                        // Error: use red
      gl_FragColor = vec4(1, 0.2, 0.2, 1);
    }

    vec3 lightVector = u_PointLightPos - vec3(v_VertPos);  // vertex -> light
    float r = length(lightVector);

    // Distance Visualization
    //if (r < 1.5) {
    //  gl_FragColor = vec4(1, 1, 0.9, 1);
    //} else if (r < 3.0) {
    //  gl_FragColor = vec4(1, 0.9, 0.7, 1);
    //} else if (r < 5.0) {
    //  gl_FragColor = vec4(1, 0.7, 0, 1);
    //}

    // Light Falloff Visualization
    //gl_FragColor = vec4(vec3(gl_FragColor)/(r*r), 1);

    // N dot L
    vec3 L = normalize(lightVector);
    vec3 N = normalize(v_Normal);
    float nDotL = max(dot(N,L), 0.0);

    // Reflection
    vec3 R = reflect(-L, N);

    // eye
    vec3 E = normalize(u_CameraPos - vec3(v_VertPos));  // vertex -> eye

    float specular = pow(max(dot(E, R), 0.0), 100.0);
    vec3 diffuse = vec3(gl_FragColor) * nDotL;
    vec3 ambient = vec3(gl_FragColor) * 0.3;

    if (u_LightOn) {
      gl_FragColor = vec4((specular*u_HowShiny) + diffuse + ambient, 1.0);
    }
  }`


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

  // Create camera
  camera = new Camera();

  // Register click function
  canvas.onmousedown = click;

  // Register keydown/keyup functions
  document.onkeydown = keydown;
  document.onkeyup = keyup;

  // Register mousemove function
  document.onmousemove = mousemove;

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

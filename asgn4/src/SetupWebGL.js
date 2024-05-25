// SetupWebGL.js

// -- Global Variables --
let canvas;
let gl;
let a_Position;
let a_UV;
let a_Normal;
let u_FragColor;
let u_WhichTexture;
let u_Sampler0;
let u_Sampler1;
let u_Sampler2;
let u_Sampler3;
let u_Sampler4;
let u_Sampler5;
let u_Sampler6;
let u_Sampler7;
let u_Sampler8;
let u_Sampler9;
let u_Sampler10;
let u_Sampler11;
let u_Sampler12;
let u_Sampler13;
let u_PointLightPos;
let u_SpotLightPos;
let u_SpotTarget;
let u_SpotCosCutoff;
let u_SpotExp;
let u_CameraPos;
let u_PointLightOn;
let u_SpotLightOn;
let u_HowShiny;
let u_Size;
let u_ModelMatrix;
let u_NormalMatrix;
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

  // Get the storage location of a_UV
  a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
  if (a_Normal < 0) {
    console.log('Failed to get the storage location of a_Normal');
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

  // Get the storage location of u_Sampler0 - u_Sampler13
  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if (!u_Sampler0) {
    console.log('Failed to get the storage location of u_Sampler0');
    return false;
  }
  u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
  if (!u_Sampler1) {
    console.log('Failed to get the storage location of u_Sampler1');
    return false;
  }
  u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
  if (!u_Sampler2) {
    console.log('Failed to get the storage location of u_Sampler2');
    return false;
  }
  u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
  if (!u_Sampler3) {
    console.log('Failed to get the storage location of u_Sampler3');
    return false;
  }
  u_Sampler4 = gl.getUniformLocation(gl.program, 'u_Sampler4');
  if (!u_Sampler4) {
    console.log('Failed to get the storage location of u_Sampler4');
    return false;
  }
  u_Sampler5 = gl.getUniformLocation(gl.program, 'u_Sampler5');
  if (!u_Sampler5) {
    console.log('Failed to get the storage location of u_Sampler5');
    return false;
  }
  u_Sampler6 = gl.getUniformLocation(gl.program, 'u_Sampler6');
  if (!u_Sampler6) {
    console.log('Failed to get the storage location of u_Sampler6');
    return false;
  }
  u_Sampler7 = gl.getUniformLocation(gl.program, 'u_Sampler7');
  if (!u_Sampler7) {
    console.log('Failed to get the storage location of u_Sampler7');
    return false;
  }
  u_Sampler8 = gl.getUniformLocation(gl.program, 'u_Sampler8');
  if (!u_Sampler8) {
    console.log('Failed to get the storage location of u_Sampler8');
    return false;
  }
  u_Sampler9 = gl.getUniformLocation(gl.program, 'u_Sampler9');
  if (!u_Sampler9) {
    console.log('Failed to get the storage location of u_Sampler9');
    return false;
  }
  u_Sampler10 = gl.getUniformLocation(gl.program, 'u_Sampler10');
  if (!u_Sampler10) {
    console.log('Failed to get the storage location of u_Sampler10');
    return false;
  }
  u_Sampler11 = gl.getUniformLocation(gl.program, 'u_Sampler11');
  if (!u_Sampler11) {
    console.log('Failed to get the storage location of u_Sampler11');
    return false;
  }
  u_Sampler12 = gl.getUniformLocation(gl.program, 'u_Sampler12');
  if (!u_Sampler12) {
    console.log('Failed to get the storage location of u_Sampler12');
    return false;
  }
  u_Sampler13 = gl.getUniformLocation(gl.program, 'u_Sampler13');
  if (!u_Sampler13) {
    console.log('Failed to get the storage location of u_Sampler13');
    return false;
  }

  // Get the storage location of u_PointLightPos
  u_PointLightPos = gl.getUniformLocation(gl.program, 'u_PointLightPos');
  if (!u_PointLightPos) {
    console.log('Failed to get the storage location of u_PointLightPos');
    return;
  }

  // Get the storage location of u_SpotLightPos
  u_SpotLightPos = gl.getUniformLocation(gl.program, 'u_SpotLightPos');
  if (!u_SpotLightPos) {
    console.log('Failed to get the storage location of u_SpotLightPos');
    return;
  }

  // Get the storage location of u_SpotTarget
  u_SpotTarget = gl.getUniformLocation(gl.program, 'u_SpotTarget');
  if (!u_SpotTarget) {
    console.log('Failed to get the storage location of u_SpotTarget');
    return;
  }

  // Get the storage location of u_SpotCosCutoff
  u_SpotCosCutoff = gl.getUniformLocation(gl.program, 'u_SpotCosCutoff');
  if (!u_SpotCosCutoff) {
    console.log('Failed to get the storage location of u_SpotCosCutoff');
    return;
  }

  // Get the storage location of u_SpotExp
  u_SpotExp = gl.getUniformLocation(gl.program, 'u_SpotExp');
  if (!u_SpotExp) {
    console.log('Failed to get the storage location of u_SpotExp');
    return;
  }

  // Get the storage location of u_CameraPos
  u_CameraPos = gl.getUniformLocation(gl.program, 'u_CameraPos');
  if (!u_CameraPos) {
    console.log('Failed to get the storage location of u_CameraPos');
    return;
  }

  // Get the storage location of u_PointLightOn
  u_PointLightOn = gl.getUniformLocation(gl.program, 'u_PointLightOn');
  if (!u_PointLightOn) {
    console.log('Failed to get the storage location of u_PointLightOn');
    return;
  }

  // Get the storage location of u_SpotLightOn
  u_SpotLightOn = gl.getUniformLocation(gl.program, 'u_SpotLightOn');
  if (!u_SpotLightOn) {
    console.log('Failed to get the storage location of u_SpotLightOn');
    return;
  }

  // Get the storage location of u_HowShiny
  u_HowShiny = gl.getUniformLocation(gl.program, 'u_HowShiny');
  if (!u_HowShiny) {
    console.log('Failed to get the storage location of u_HowShiny');
    return;
  }

  // Get the storage location of u_ModelMatrix
  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  // Get the storage location of u_NormalMatrix
  u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
  if (!u_NormalMatrix) {
    console.log('Failed to get the storage location of u_NormalMatrix');
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
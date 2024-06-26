// Animation.js

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

// -- Global Animation Variables --
let g_frAngle = 0;
let g_brAngle = 0;
let g_flAngle = 0;
let g_swayAngle = 0;
let g_j1Angle = 0;
let g_j2Angle = 0;
let g_j3Angle = 0;
let g_moveX = 0;
let g_moveX2 = 0;
let g_moveY = 0;
let g_moveY2 = 0;
let g_moveZ = 0;
let g_baseY = 0;
let g_headX = 0;
let g_headY = 0;
let g_eyeLidZ = 0.05;

// ----- updateAnimationXY -----
function updateAnimationXY() { 
  if (g_animation == ON) {
    g_moveX = 0.8 * 0.1 * Math.sin(g_onTime * g_animationSpeed);
    g_moveY = 0.8 * 0.05 * Math.sin(g_onTime * g_animationSpeed + Math.PI / 2);
    
    g_moveX2 = 0.8 * 0.1 * Math.sin(g_onTime * g_animationSpeed - Math.PI / 2);
    g_moveY2 = 0.8 * 0.05 * Math.sin(g_onTime * g_animationSpeed);
    
    g_baseY = 0.05 * Math.sin(g_onTime * g_animationSpeed + Math.PI / 2);
    g_headY = 0.05 * Math.sin(g_onTime * g_animationSpeed + Math.PI / 2);
  }
  else if (g_animation == POKE) {
    let inc = (-0.5 * (g_pokeTime - 1) * (g_pokeTime - 1)) + 0.5;
   
    if (inc*0.2 <= 0.05) {
      g_eyeLidZ = 0.05 - inc*0.2;
    }

    if (inc < 0.34) {
      g_headX = -inc;
      //fixSlider("headSlide", 100 * -inc);

      g_moveY = 0.6 * inc;
      g_moveY2 = 0.6 * inc;
      g_moveZ = 0.4 * inc;

      g_baseY = -0.4 * inc;
    }
  }
}
// ----- end updateAnimationAngles -----

// ----- updateAnimationAngles -----
function updateAnimationAngles() { 
  if (g_animation == ON) {
    g_frAngle = 40 * Math.sin(g_onTime * g_animationSpeed);
    g_brAngle = 40 * Math.sin(g_onTime * g_animationSpeed - Math.PI / 2);
    g_flAngle = 40 * Math.sin(g_onTime * g_animationSpeed + Math.PI / 2);
    g_swayAngle = 40 * Math.sin(g_onTime * g_animationSpeed + Math.PI);
  }
}
// ----- end updateAnimationAngles -----

/* add these later??
// ----- rotate90 -----
function rotate90() {

}
// ----- end rotate90 -----

// ----- bobbing -----
function bobbing() {

}
// ----- end bobbing -----
*/
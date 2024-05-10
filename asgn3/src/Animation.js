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
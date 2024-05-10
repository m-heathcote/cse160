// SetupHTML.js

// -- Animation Constants --
const OFF = 0;
const ON = 1;
const POKE = 2;

// -- Globals for UI elements --
let g_globalAngle_y = 0;    // rotate around y axis
let g_globalAngle_x = 0;  // rotate around x axis
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
    g_globalAngle_y = -this.value;
    renderAllShapes();
  });
  
  // Global Angle Slider 2
  document.getElementById("angleSlide2").addEventListener("mousemove", function() {
    g_globalAngle_x = this.value;
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

/*
// ----- fixSlider -----
function fixSlider(id, val) {
  // get slder
  var slider = document.getElementById(id);

  // set slider position
  slider.value = val;
}
// ----- end fixSlider -----
*/

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
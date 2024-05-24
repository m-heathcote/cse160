// SetupHTML.js

// -- Globals for UI elements --
let g_globalAngle_y = 0;    // rotate around y axis
let g_globalAngle_x = 0;  // rotate around x axis

// ----- addActionsForHtmlUI -----
// Set up actions for the HTML UI elements
function addActionsForHtmlUI() {

  // Lighting Buttons
  document.getElementById('lightButton').onclick = function() {
    g_lightOn = !g_lightOn;
  };
  document.getElementById('normalsButton').onclick = function() {
    g_normalsOn = !g_normalsOn;
  };
  document.getElementById('lightAnimateButton').onclick = function() {
    g_animateLight = !g_animateLight;
  };

  // Light Sliders
  document.getElementById("lightSlideX").addEventListener("mousemove", function() {
    g_lightPos[0] = this.value/10;
  });
  document.getElementById("lightSlideY").addEventListener("mousemove", function() {
    g_lightPos[1] = this.value/10;
  });
  document.getElementById("lightSlideZ").addEventListener("mousemove", function() {
    g_lightPos[2] = this.value/10;
  });

  // Camera View Buttons
  document.getElementById('view1Button').onclick = function() {
    camera.setGroundView();
  };
  document.getElementById('view2Button').onclick = function() {
    camera.setSkyView();
  };
  document.getElementById('view3Button').onclick = function() {
    camera.setCornerView();
  };

  // Map Buttons
  document.getElementById('clearMapButton').onclick = function() {
    g_buildTrees = false;
    g_buildHouse = false;
    g_mapInitialized = false;
  };
  document.getElementById('treesButton').onclick = function() {
    g_buildTrees = !g_buildTrees;
    g_mapInitialized = false;
  };
  document.getElementById('houseButton').onclick = function() {
    g_buildHouse = !g_buildHouse;
    g_mapInitialized = false;
  };
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
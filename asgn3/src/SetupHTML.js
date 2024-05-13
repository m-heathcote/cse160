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

  // Camera View Buttons
  document.getElementById('view1Button').onclick = function() {
    camera.setGroundView();
  };
  document.getElementById('view2Button').onclick = function() {
    camera.setSkyView();
  };

  // Build Mode Buttons
  document.getElementById('noBuildButton').onclick = function() {
    g_buildMode = NOBUILD;

    // deselect blocks
    selectBlocks();
  };
  document.getElementById('buildButton').onclick = function() {
    g_buildMode = BUILD;

    // select blocks
    selectBlocks();
  };
  document.getElementById('breakButton').onclick = function() {
    g_buildMode = BREAK;

    // select blocks
    selectBlocks();
  };

  // Block Type Buttons
  document.getElementById('woodButton').onclick = function() {
    g_blockType = WOOD;
  };
  document.getElementById('cobbleButton').onclick = function() {
    g_blockType = COBBLE;
  };
  document.getElementById('dirtButton').onclick = function() {
    g_blockType = DIRT;
  };
  document.getElementById('bricksButton').onclick = function() {
    g_blockType = BRICKS;
  };
  document.getElementById('logButton').onclick = function() {
    g_blockType = LOG;
  };
  document.getElementById('leavesButton').onclick = function() {
    g_blockType = LEAVES;
  };

  // Animation Speed Slider
  document.getElementById("animationSlide").addEventListener("mousemove", function() {
    g_animationSpeed = this.value;
    renderAllShapes();
  });
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
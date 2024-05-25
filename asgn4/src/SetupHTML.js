// SetupHTML.js

// -- Globals for UI elements --
let g_globalAngle_y = 0;    // rotate around y axis
let g_globalAngle_x = 0;  // rotate around x axis

// ----- addActionsForHtmlUI -----
// Set up actions for the HTML UI elements
function addActionsForHtmlUI() {

  // Lighting Buttons
  document.getElementById('light1Button').onclick = function() {
    g_pointLightOn = !g_pointLightOn;
    console.log("point light: ", g_pointLightOn);
  };
  document.getElementById('light2Button').onclick = function() {
    g_spotLightOn = !g_spotLightOn;
    console.log("spot light: ", g_spotLightOn);
  };
  document.getElementById('normalsButton').onclick = function() {
    g_normalsOn = !g_normalsOn;
  };
  document.getElementById('lightAnimateButton').onclick = function() {
    g_animateLight = !g_animateLight;
  };

  // Point Light Sliders
  document.getElementById("pointSlideX").addEventListener("mousemove", function() {
    g_pointLightPos[0] = this.value/10;
  });
  document.getElementById("pointSlideY").addEventListener("mousemove", function() {
    g_pointLightPos[1] = this.value/10;
  });
  document.getElementById("pointSlideZ").addEventListener("mousemove", function() {
    g_pointLightPos[2] = this.value/10;
  });

  document.getElementById('pointColorButton').onclick = function() {
    g_pointColorOn = !g_pointColorOn;
  };
  document.getElementById("pColorSlide").addEventListener("mousemove", function() {
    g_pointColor = hueToRGB(this.value);
  });

  // Spot Light Sliders
  document.getElementById("spotSlideX").addEventListener("mousemove", function() {
    g_spotLightPos[0] = this.value/10;
  });
  document.getElementById("spotSlideY").addEventListener("mousemove", function() {
    g_spotLightPos[1] = this.value/10;
  });
  document.getElementById("spotSlideZ").addEventListener("mousemove", function() {
    g_spotLightPos[2] = this.value/10;
  });

  document.getElementById('spotColorButton').onclick = function() {
    g_spotColorOn = !g_spotColorOn;
  };
  document.getElementById("sColorSlide").addEventListener("mousemove", function() {
    g_spotColor = hueToRGB(this.value);
  });

  document.getElementById("targetSlideX").addEventListener("mousemove", function() {
    g_spotTarget[0] = this.value/10;
  });
  document.getElementById("targetSlideZ").addEventListener("mousemove", function() {
    g_spotTarget[2] = this.value/10;
  });
  document.getElementById("cutoffSlide").addEventListener("mousemove", function() {
    g_spotAngleCutoff = this.value;
  });
  document.getElementById("exponentSlide").addEventListener("mousemove", function() {
    g_spotExp = this.value;
  });
  document.getElementById("intensitySlide").addEventListener("mousemove", function() {
    g_spotIntensity = this.value/100;
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

// ----- hueToRGB -----
function hueToRGB(hue) {
  let c = 1; // Chromaticity (maximum value)
  let x = c * (1 - Math.abs((hue / 60) % 2 - 1)); // Intermediate value
  let m = 0; // Minimum value (offset)

  let r, g, b;
  if (0 <= hue && hue < 60) {
      [r, g, b] = [c, x, m];
  } else if (60 <= hue && hue < 120) {
      [r, g, b] = [x, c, m];
  } else if (120 <= hue && hue < 180) {
      [r, g, b] = [m, c, x];
  } else if (180 <= hue && hue < 240) {
      [r, g, b] = [m, x, c];
  } else if (240 <= hue && hue < 300) {
      [r, g, b] = [x, m, c];
  } else {
      [r, g, b] = [c, m, x];
  }

  // Convert to RGB
  return [
    (r + m),
    (g + m),
    (b + m)
  ];
}
// ----- end hueToRGB -----
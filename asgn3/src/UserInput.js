// UserInput.js

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
  g_globalAngle = convertTo360(g_initialRotation + (xDiff * 100));
  //fixSlider("angleSlide", -g_globalAngle);

  // Rotate around x axis
  if (g_initialRotation > 90 && g_initialRotation < 270) {
    g_globalAngle_2 = convertTo360(g_initialRotation_2 + (yDiff * 100));
  }
  else {
    g_globalAngle_2 = convertTo360(g_initialRotation_2 - (yDiff * 100));
  }
  //fixSlider("angleSlide2", g_globalAngle_2);

  // Redraw
  renderAllShapes();
}
// ----- end drag -----

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
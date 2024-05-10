// UserInput.js

// -- Global Mouse Position Variables --
var g_clickX = 0;
var g_clickY = 0;
var g_initialRotation_y = g_globalAngle_y;
var g_initialRotation_x = g_globalAngle_x;

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
    g_initialRotation_y = g_globalAngle_y;
    g_initialRotation_x = g_globalAngle_x;
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
  g_globalAngle_y = convertTo360(g_initialRotation_y + (xDiff * 100));
  //fixSlider("angleSlide", -g_globalAngle_y);

  // Rotate around x axis
  if (g_initialRotation_y > 90 && g_initialRotation_y < 270) {
    g_globalAngle_x = convertTo360(g_initialRotation_x + (yDiff * 100));
  }
  else {
    g_globalAngle_x = convertTo360(g_initialRotation_x - (yDiff * 100));
  }
  //fixSlider("angleSlide2", g_globalAngle_x);

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
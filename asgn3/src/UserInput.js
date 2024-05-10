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

  // Rotate around x axis
  if (g_initialRotation_y > 90 && g_initialRotation_y < 270) {
    g_globalAngle_x = convertTo360(g_initialRotation_x + (yDiff * 100));
  }
  else {
    g_globalAngle_x = convertTo360(g_initialRotation_x - (yDiff * 100));
  }

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

// ----- keydown -----
function keydown(ev) {
  if (ev.keyCode == 87 || ev.keyCode == 38) {  // W or up arrow
    camera.moveForward();
  } else
  if (ev.keyCode == 65 || ev.keyCode == 37) {  // A or left arrow
    camera.moveLeft();
  } else
  if (ev.keyCode == 83 || ev.keyCode == 40) {  // S or down arrow
    camera.moveBackward();
  } else
  if (ev.keyCode == 68 || ev.keyCode == 39) {  // D or right arrow
    camera.moveRight();
  } else
  if (ev.keyCode == 32) {  // space
    camera.moveUp();
  } else
  if (ev.keyCode == 16) {  // L-shift
    camera.moveDown();
  } else
  if (ev.keyCode == 81) {  // Q
    camera.panLeft();
  } else
  if (ev.keyCode == 69) {  // E
    camera.panRight();
  }

  console.log("key: ", ev.keyCode);
}
// ----- end keydown -----

g_prevX = 0;
g_prevY = 0;

// ----- mousemove -----
function mousemove(ev) {
  // Extract the event click and return it in WebGL coordinates
  [x, y] = convertCoordinatesEventToGL(ev);

  // Get Difference (drag length)
  let xDiff = x - g_prevX;
  let yDiff = y - g_prevY;

  g_prevX = x;
  g_prevY = y;

  if (xDiff < 0) {
    camera.panLeft();
  } else
  if (xDiff > 0) {
    camera.panRight();
  }

  if (yDiff < 0) {
    camera.panDown();
  } else
  if (yDiff > 0) {
    camera.panUp();
  }
}
// ----- end mousemove -----
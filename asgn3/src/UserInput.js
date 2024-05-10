// UserInput.js

// -- Globals for mouse movement --
g_prevX = 0;
g_prevY = 0;
g_lookWithMouse = false;

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
  } else
  if (ev.keyCode == 27) {  // esc
    g_lookWithMouse = !g_lookWithMouse;

    if (g_lookWithMouse) {
      [x, y] = convertCoordinatesEventToGL(ev);
      g_prevX = x;
      g_prevY = y;
    }
  }

  console.log("key: ", ev.keyCode);
}
// ----- end keydown -----

// ----- mousemove -----
function mousemove(ev) {
  if (g_lookWithMouse) {
    // Extract the event click and return it in WebGL coordinates
    [x, y] = convertCoordinatesEventToGL(ev);

    // Get Difference (drag length)
    let xDiff = x - g_prevX;
    let yDiff = y - g_prevY;

    let xSpeed = xDiff * 10;
    let ySpeed = yDiff * 10;

    console.log("xSpeed = ", xSpeed);

    g_prevX = x;
    g_prevY = y;

    if (xDiff < 0) {
      camera.panLeft(xSpeed);
    } else
    if (xDiff > 0) {
      camera.panRight(xSpeed);
    }

    if (yDiff < 0) {
      camera.panDown(ySpeed);
    } else
    if (yDiff > 0) {
      camera.panUp(ySpeed);
    }
  }
}
// ----- end mousemove -----
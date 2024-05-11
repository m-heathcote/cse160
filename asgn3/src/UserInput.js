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

// save each interval id in a dict indexed by keyCode
var intervals = {};

// save each function to loop in a dict indexed by keyCode
var keyLoop = {
  87: function() {                  // W
    console.log("holding W");
    camera.moveForward();
  },
  65: function() {                  // A
    camera.moveLeft();
  },
  83: function() {                  // S
    camera.moveBackward();
  },
  68: function() {                  // D
    camera.moveRight();
  },
  32: function() {                  // space
    camera.moveUp();
  },
  16: function() {                  // shift
    camera.moveDown();
  }
};

// list of valid movement keys
var moveKeys = [87, 65, 83, 68,  32,    16];
//               W   A   S   D  space  shift

// ----- keydown -----
function keydown(ev) {
  if (moveKeys.includes(ev.keyCode) && !intervals[ev.keyCode]) {   // valid movement key
    console.log("setup intervals");
    intervals[ev.keyCode] = setInterval(keyLoop[ev.keyCode], 50);
  } else
  if (ev.keyCode == 27) {  // esc
    g_lookWithMouse = !g_lookWithMouse;

    if (g_lookWithMouse) {
      [x, y] = convertCoordinatesEventToGL(ev);
      g_prevX = x;
      g_prevY = y;
    }
  } else
  if (ev.keyCode == 9) {  // tab
    // faster speed
    camera.speed = 0.4;
  }

  console.log("key: ", ev.keyCode);
}
// ----- end keydown -----

// ----- keyup -----
function keyup(ev) {
  if (moveKeys.includes(ev.keyCode)) {   // valid movement key
    clearInterval(intervals[ev.keyCode]);
    delete intervals[ev.keyCode];
    console.log("released: ", ev.keyCode);
  } else
  if (ev.keyCode == 9) {  // tab
    // normal speed
    camera.speed = 0.1;
  }
}
// ----- end keyup -----

// ----- mousemove -----
function mousemove(ev) {
  if (g_lookWithMouse) {
    // Extract the event click and return it in WebGL coordinates
    [x, y] = convertCoordinatesEventToGL(ev);

    //console.log("x: ", x);
    //console.log("y: ", y);
    //console.log("--------");

    // Get Difference (drag length)
    let xDiff = x - g_prevX;
    let yDiff = y - g_prevY;

    let xSpeed = xDiff * 10;
    let ySpeed = yDiff * 10;

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

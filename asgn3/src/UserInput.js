// UserInput.js

// -- Globals for Mouse Movement --
g_prevX = 0;
g_prevY = 0;
g_lookWithMouse = false;

// -- Globals for Turtle Movement --
var E = 0;  // east
var S = 1;  // south
var W = 2;  // west
var N = 3;  // north
var g_facing = E;
var g_turtleX = 0;
var g_turtleZ = 0;
var g_turtleRot = 0;

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
var keyFunc = {
  87: function() {                  // W
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
  },
  38: function() {                  // up arrow
    switch(g_facing) {
      case N:
        g_turtleZ -= 0.08;
        break;
      case E:
        g_turtleX += 0.08;
        break;
      case S:
        g_turtleZ += 0.08;
        break;
      case W:
        g_turtleX -= 0.08;
        break;
    }
  },
  37: function() {                  // left arrow
    switch(g_facing) {
      case N:
        g_facing = W;
        g_turtleRot = 180;
        break;
      case E:
        g_facing = N;
        g_turtleRot = 90;
        break;
      case S:
        g_facing = E;
        g_turtleRot = 0;
        break;
      case W:
        g_facing = S;
        g_turtleRot = 270;
        break;
    }
  },
  40: function() {                  // down arrow
    switch(g_facing) {
      case N:
        g_turtleZ += 0.08;
        break;
      case E:
        g_turtleX -= 0.08;
        break;
      case S:
        g_turtleZ -= 0.08;
        break;
      case W:
        g_turtleX += 0.08;
        break;
    }
  },
  39: function() {                  // right arrow
    console.log("in right arrow function");
    switch(g_facing) {
      case S:
        g_facing = W;
        g_turtleRot = 180;
        break;
      case W:
        g_facing = N;
        g_turtleRot = 90;
        break;
      case N:
        g_facing = E;
        g_turtleRot = 0;
        break;
      case E:
        g_facing = S;
        g_turtleRot = 270;
        break;
    }
  }
};

// list of valid camera movement keys
var moveCameraKeys = [87, 65, 83, 68,  32,    16];
//                     W   A   S   D  space  shift

// list of valid turtle movement keys
var moveTurtleKeys = [38,  37,  40, 39];
//                     ^    <    v   >

// ----- keydown -----
function keydown(ev) {
  if (moveCameraKeys.includes(ev.keyCode) && !intervals[ev.keyCode]) {   // valid camera movement key
    console.log("got move key");
    intervals[ev.keyCode] = setInterval(keyFunc[ev.keyCode], 50);
  } else
  if (moveTurtleKeys.includes(ev.keyCode)) {  // valid turtle movement key
    keyFunc[ev.keyCode]();
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
  if (moveCameraKeys.includes(ev.keyCode)) {   // valid camera movement key
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
    // Extract the event click coords
    var x = ev.clientX; // x coordinate of a mouse pointer
    var y = ev.clientY; // y coordinate of a mouse pointer
    x = ((x) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y))/(canvas.height/2);

    // Get Difference (drag length)
    let xDiff = x - g_prevX;
    let yDiff = y - g_prevY;

    let panX = xDiff * 90;
    let panY = yDiff * 90;

    g_prevX = x;
    g_prevY = y;

    if (xDiff < 0) {
      camera.panLeft(panX);
    } else
    if (xDiff > 0) {
      camera.panRight(panX);
    }

    if (yDiff < 0) {
      camera.panDown(panY);
    } else
    if (yDiff > 0) {
      camera.panUp(panY);
    }
  }
}
// ----- end mousemove -----

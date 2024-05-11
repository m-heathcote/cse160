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
var g_facing = N;
var g_turtleRot = 90;
var g_turtleX = 0;
var g_turtleZ = 0;
var g_turtleRot = 90;

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
    g_animation = ON;
    console.log("turtle coords: ", [g_turtleX, 0, g_turtleZ]);
    console.log("    converted: ", [toMapCoords(g_turtleX), 0, toMapCoords(g_turtleZ)]);
    console.log("   map at coords: ", g_map[toMapCoords(g_turtleZ)][toMapCoords(g_turtleX)]);
    //console.log("test: map[0][1] = ", g_map[0][1]);
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
    g_animation = ON
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

// set up looping interval for these functions (until key released)
var loopedKeys = [87, 65, 83, 68,  32,    16,  38, 40];
//                 W   A   S   D  space  shift  ^   v

// run these once when clicked
var clickedKeys = [37, 39];
//                  <   >

// ----- keydown -----
function keydown(ev) {
  if (loopedKeys.includes(ev.keyCode) && !intervals[ev.keyCode]) {
    intervals[ev.keyCode] = setInterval(keyFunc[ev.keyCode], 50);
  } else
  if (clickedKeys.includes(ev.keyCode)) {
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
  if (loopedKeys.includes(ev.keyCode)) {
    clearInterval(intervals[ev.keyCode]);
    delete intervals[ev.keyCode];

    if (ev.keyCode == 38 || ev.keyCode == 40) {
      g_animation = OFF;
    }
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
